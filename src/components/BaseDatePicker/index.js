export default {
  name: 'BaseDatePicker',

  functional: true,

  render (h, context) {
    return <el-date-picker
      type="daterange"
      value-format='yyyy-MM-dd'
      {...context.data}
    />
  }
}
