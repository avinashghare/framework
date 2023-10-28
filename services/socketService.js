const axios = require('axios')
const __config = require('./../config/index')

class SockerServiceClass {
  async blastSocket (data) {
    try {
      const response = await axios.post(`${__config.socket.socketUrl}/callSocket`, data, {
        headers: {
          'content-type': 'application/json'
        }
      })
      console.log('blastSocket body ::::: ', response.data)
    } catch (error) {
      console.log('error', error.response.data)
    }
  }
}
module.exports = new SockerServiceClass()
