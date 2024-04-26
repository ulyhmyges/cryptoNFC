const http = require('http')
const {WebSocketServer} = require('ws')
const url = require('url')
const server =http.createServer()
const wsServer = new WebSocketServer({ server })
const port = 7777


const handleMessage = (bytes) => {
    const m = JSON.parse(bytes.toString())
    console.log(m)
}
const handleClose = () => {}

wsServer.on('connection', (connection, request) => {
    const {data} = url.parse(request.url, true).query
    console.log("data: ",data)
    connection.send("Hi")
    connection.on('message', message => handleMessage(message))
    connection.on('close', () => handleClose())
})


server.listen(port, () => console.log(`WebSocket running on port ${port}`))