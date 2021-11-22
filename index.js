const os = require('os-utils')
const fs = require('fs')
const moment = require('moment')
const path = require('path')

let currentTime= ''
let cpuState = ''
let memoryState = ''

const USER_HOME = process.env.HOME || process.env.USERPROFILE
const dbPath = path.join(USER_HOME, 'os.log')

setInterval(() => {
  // 获取当前系统时间
  currentTime = moment(Date.now()).format('YYYY/MM/DD HH:mm:ss')
  // 获取CPU占用情况
  os.cpuUsage((v) => {
    cpuState = (v * 100).toFixed(2) + '%'
  })
  // 获取内存占用情况
  memoryState = (((os.totalmem() - os.freemem())) / 1024).toFixed(2) + 'G'
  // 写入HOME目录下的log文件
  const log = `${currentTime}  CPU：${cpuState} 内存：${memoryState}\n`
  fs.writeFile(dbPath, log, {flag: 'a+'}, err => {
    if (err) {
      console.error(err)
    }
  })
}, 1000)
