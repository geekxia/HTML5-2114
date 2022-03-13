const mongoose = require('mongoose') // 驱动模块

mongoose.connect('mongodb://localhost:27017/qfdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

// 监听数据库连接成功
db.on('open', ()=>console.log('数据库连接成功'))

// 监听数据库连接失败
db.on('error', ()=>console.log('数据库连接失败'))
