export const operation = {
  title: '操作',
  dataIndex: 'action',
  width: '150px',
  scopedSlots: { customRender: 'action' }
}

export const envCols = [
  {
    title: '#',
    dataIndex: 'id',
    sorter: true
  },
  {
    title: '名称',
    dataIndex: 'name',
    sorter: true
  },
  {
    title: '地址',
    dataIndex: 'address'
  },
  {
    title: '默认环境',
    dataIndex: 'default',
    scopedSlots: { customRender: 'isDefault' }
  },
  operation
]

export const varCols = [
  {
    title: '#',
    dataIndex: 'id',
    sorter: true
  },
  {
    title: '名称',
    dataIndex: 'name',
    sorter: true
  },
  {
    title: '表达式',
    dataIndex: 'expression'
  },
  operation
]

export const headerCols = [
  {
    title: '#',
    dataIndex: 'id',
    sorter: true
  },
  {
    title: 'key',
    dataIndex: 'key',
    sorter: true
  },
  {
    title: 'value',
    dataIndex: 'value'
  },
  operation
]

export const setupTeardownCols = [
  {
    title: '#',
    dataIndex: 'id',
    sorter: true
  },
  {
    title: '类型',
    dataIndex: 'type'
  },
  {
    title: '表达式',
    dataIndex: 'expression'
  },
  operation
]

export const encryptParamCols = [
  {
    title: '#',
    dataIndex: 'id',
    sorter: true
  },
  {
    title: 'key',
    dataIndex: 'key'
  },
  {
    title: 'value',
    dataIndex: 'value'
  },
  operation
]

export const assertionCols = [
  {
    title: '#',
    dataIndex: 'id',
    sorter: true
  },
  {
    title: '表达式',
    dataIndex: 'expression'
  },
  operation
]
