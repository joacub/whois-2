const socks = require('socks').SocksClient
const lookup = require('./lookup')

const handleProxy = (addr, options) => {
  return new Promise(async (resolve, reject) => {
    let info
    try {
      info = await socks.createConnection({
        command: 'connect',
        proxy: options.proxy,
        destination: {
          host: options.server.host,
          port: options.server.port
        },
        timeout: options.timeout
      })
    } catch (err) {
      return reject(err)
    }
    let socket = info.socket
    lookup(addr, options, socket)
      .catch(reject)
      .then(resolve)
    return socket.resume()
  })
}

module.exports = handleProxy
