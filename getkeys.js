#!/usr/bin/env node
//const location = 'data/regular/.config/chromium/Default/Local Storage/leveldb'

const fs = require('fs')
const levelup = require('levelup')
const leveldown = require('leveldown')

let configPath = 'config'
if (process.argv.length > 2) {
  configPath = process.argv[2]
}

const dbpath = process.env.HOME + '/.config/chromium/Default/Local Storage/leveldb'
const port = JSON.parse(fs.readFileSync(configPath)).ws.port
 
var db = levelup(leveldown(dbpath), { })

const k = Buffer.from("_http://localhost:"+port+"\u0000\u0001electroparty-keys")
db.get(k, (err, value) => {
  if (err) return console.error(err)
  console.log(value[0])
  console.log(JSON.parse(value.toString().slice(1)))
})
