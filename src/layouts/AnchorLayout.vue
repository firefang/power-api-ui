<template>
  <a-row :gutter="20">
    <a-col :span="24 - anchorSpan" ref="container">
      <slot></slot>
    </a-col>
    <a-col :span="anchorSpan" v-if="links.length > 0">
      <a-anchor :offsetTop="offsetTop">
        <a-anchor-link v-for="(link, i) in links" :key="i" :href="link.id" :title="link.title" />
      </a-anchor>
    </a-col>
  </a-row>
</template>

<script>
/**
 * 自动添加锚点布局
 * 使用方法：在需要设置锚点的节点上设置id和title属性即可
 */
export default {
  name: 'AnchorLayout',
  props: {
    anchorSpan: {
      type: Number,
      default: 3
    },
    offsetTop: {
      type: Number,
      default: 64
    }
  },
  data () {
    return {
      links: []
    }
  },
  mounted () {
    const container = this.$refs.container
    this.links = container.$children.filter(n => n.$attrs.id).map(n => {
      return { id: '#' + n.$attrs.id, title: n.$attrs.title || n.$props.title }
    })
  }
}
</script>
