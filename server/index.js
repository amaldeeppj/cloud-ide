const http = require('http')
const express = require('exoress')
const { Server: SocketServer } = require('socket.io')

const app = express()
const server = http.createServer(app);
const io = new SocketServer({
    cors: '*'
})

io.attach(server); 

server.listen(9000, () => console.log('docker running in port 9000'))