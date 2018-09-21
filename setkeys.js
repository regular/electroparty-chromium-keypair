
//const location = 'data/regular/.config/chromium/Default/Local Storage/leveldb'
const fs = require('fs')
const levelup = require('levelup')
const leveldown = require('leveldown')
const ssbKeys = require('ssb-keys')

const dbpath = process.env.HOME + '/.config/chromium/Default/Local Storage/leveldb'

const keys = ssbKeys.generate()
console.error('Pub key is', keys.id)
const config = JSON.parse(fs.readFileSync('config'))
const port = config.ws.port

const db = levelup(leveldown(dbpath), { })

const k = Buffer.from("_http://localhost:"+port+"\u0000\u0001electroparty-keys")
const v = Buffer.from("\u0001" + JSON.stringify(keys))
db.put(k, v, (err, value) => {
  if (err) return console.error(err)
  config.master = config.master || []
  config.master.push(keys.id)
  fs.writeFileSync('config', JSON.stringify(config, null, 2))
})
