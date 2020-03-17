module.exports = [
  {
    type: 'confirm',
    name: 'private',
    message: '是否将仓库设置为私有?',
  },
  {
    type: 'input',
    name: 'author',
    message: '请输入作者?',
  },
  {
    type: 'input',
    name: 'description',
    message: '请输入项目描述信息?',
  },
  {
    type: 'test_rul',
    name: 'description',
    message: '请输入测试服务器地址?',
  },
  {
    type: 'mock_rul',
    name: 'description',
    message: '请输入 mock 服务地址?',
  },
]
