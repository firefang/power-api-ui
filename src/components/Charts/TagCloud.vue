<template>
  <div ref="root" class="tagCloud" :style="{ width: '100%', height }">
    <v-chart
      v-if="dv !== null"
      :width="width"
      :height="stateHeight"
      :padding="[0]"
      :data="dv"
      :scale="[{ dataKey: 'x', nice: false }, { dataKey: 'y', nice: false }]"
    >
      <v-tooltip :show-title="false" />
      <v-coord type="rect" direction="TL" />
      <v-point position="x*y" color="text" shape="cloud" tooltip="value*category" />
    </v-chart>
  </div>
</template>

<script>
import { registerShape } from 'viser-vue'
import Debounce from 'lodash.debounce'

const DataSet = require('@antv/data-set')

export default {
  name: 'TagCloud',
  props: {
    data: {
      type: Array,
      required: true
    },
    height: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      dv: null,
      width: 0,
      stateHeight: 0,
      requestRef: 0,
      isUnmount: false,
      imageMask: undefined,
      debounceRender: Debounce(this.renderChart, 200)
    }
  },
  watch: {
    data: function (val) {
      if (JSON.stringify(val) !== JSON.stringify(this.data)) {
        this.debounceRender(val)
      }
    }
  },
  mounted () {
    requestAnimationFrame(() => {
      this.initTagCloud()
      this.debounceRender()
    })
    window.addEventListener('resize', this.resize, { passive: true })
  },
  destroyed () {
    this.isUnmount = true
    window.cancelAnimationFrame(this.requestRef)
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize () {
      this.requestRef = requestAnimationFrame(() => {
        this.debounceRender()
      })
    },
    initTagCloud () {
      /**
       * cfg: {
       *   x?: any
       *   y?: any
       *   style?: any
       *   opacity?: any
       *   origin?: any
       *   color?: any
       * }
       */
      function getTextAttrs (cfg) {
        return {
          ...cfg.style,
          fillOpacity: cfg.opacity,
          fontSize: cfg.origin._origin.size,
          rotate: cfg.origin._origin.rotate,
          text: cfg.origin._origin.text,
          textAlign: 'center',
          fontFamily: cfg.origin._origin.font,
          fill: cfg.color,
          textBaseline: 'Alphabetic'
        }
      }
      registerShape('point', 'cloud', {
        draw (cfg, container) {
          const attrs = getTextAttrs(cfg)
          return container.addShape('text', {
            attrs: {
              ...attrs,
              x: cfg.x,
              y: cfg.y
            }
          })
        }
      })
    },
    renderChart (datasource) {
      const data = datasource || this.data
      const { height } = this
      if (data.length < 1) {
        return
      }
      const h = height
      const w = this.$refs.root.offsetWidth

      const onload = () => {
        const dv = new DataSet.View().source(data)
        const range = dv.range('value')
        const [min, max] = range
        dv.transform({
          type: 'tag-cloud',
          fields: ['name', 'value'],
          imageMask: this.imageMask,
          font: 'Verdana',
          size: [w, h], // 宽高设置最好根据 imageMask 做调整
          padding: 0,
          timeInterval: 5000, // max execute time
          rotate () {
            return 0
          },
          fontSize (d) {
            const size = ((d.value - min) / (max - min)) ** 2
            return size * (17.5 - 5) + 15
          }
        })

        if (this.isUnmount) {
          return
        }

        this.dv = dv.rows
        this.stateHeight = h
        this.width = w
      }

      if (!this.imageMask) {
        this.imageMask = new Image()
        this.imageMask.crossOrigin = ''
        this.imageMask.src = require('@/assets/tagcloud_mask.png')

        this.imageMask.onload = onload
      } else {
        onload()
      }
    }
  }
}
</script>
