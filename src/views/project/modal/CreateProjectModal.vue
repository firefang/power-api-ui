<template>
  <a-modal
    title="新建项目"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['name', {rules: [
            {required: true, min: 5, message: '请输入项目名称！'},
            {max: 10, message: '项目名称长度不能超过10！'}
            ]}]"
          />
        </a-form-item>
        <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            rows="2"
            v-decorator="['description', {rules: [{max:40, message: '描述长度不能超过30！'}]}]"
          />
        </a-form-item>
        <a-form-item label="归属" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['team', {rules: [{required: true, message: '请选择归属！'}]}]">
            <a-select-option value="0">组一</a-select-option>
            <a-select-option value="1">组二</a-select-option>
            <a-select-option value="2">组三</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,

      form: this.$form.createForm(this)
    }
  },
  methods: {
    open () {
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
