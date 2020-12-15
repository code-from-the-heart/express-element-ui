
function getInputRender (h, context) {
  const { data, props } = context
  const attrs = data.attrs
  const queryItem = props.query
  const options = props.query.options

  // 设置标签
  let tag = `el-${props.query.component || 'input'}`

  // 触发更新外层绑定的值
  function setInput (value) {
    context.listeners['update:value'](value)
  }

  // enter事件
  function onEnter (e) {
    // if (props.query.keyup) {
    //   context.listeners.keyup(e)
    // }
    context.listeners.keyup(e)
  }
  if (props.query.component === 'select') {
    tag = 'base-select'
  }
  const tagContent = _ => (
    <tag
      { ...{ class: 'nhc-search-item' }}
      {...{ attrs }}
      {...{ on: context.listeners }}
      {...{ model:
        {
          value: props.value,
          callback: setInput
        }
      }}
      options={options}
      queryItem={queryItem}
      nativeOnKeyup={onEnter}>
    </tag>
  )
  return tagContent
  // defaultValue={props.query.defaultValue}
}

export default getInputRender
