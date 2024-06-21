import express from 'express'
import http from 'http'
import {Server as SocketServer} from 'socket.io'
import amqp from 'amqplib/callback_api.js'

const app = express()
const server = http.createServer(app)
const io =  new SocketServer(server)

io.on('connection', socket => {
    console.log(socket.id);
    amqp.connect('amqp://usuario:clave@host.docker.local/servidor_dev_1',(error,  connection)=>{
        if(error){
            throw error
        }

        connection.createChannel((err1, channel)=>{
            if(err1){
                throw err1
            }
            const QUEUE_1 = 'chat_2'
            //const QUEUE_1 = 'PUSH'
            //const QUEUE_2 = 'PULL'
            channel.assertQueue(QUEUE_1)
            //channel.assertQueue(QUEUE_2)

            socket.on('chat_message', (data) => {
                console.log(data)
                channel.sendToQueue(QUEUE_1, Buffer.from(JSON.stringify(data)))
            })

            channel.consume(QUEUE_1, (messagge)=>{
                const resp = JSON.parse(messagge.content.toString())
                fetch('http://host.docker.local:8000/chat', {
                method: "POST",
                body: JSON.stringify(resp),
                headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => {response.json()}) 
                .then(json => console.log(json))
                .catch(err => console.log(err));
                
                io.emit('chat_message', resp);
                
            }, {noAck: true})
        })
    })

    //socket.on('actualizarTransaccion', (transaccion) => {
    //   io.emit('actualizarTransaccion', transaccion)
    //});
//
    //socket.broadcast.emit('chat_message',{
    //    usuario: 'INFORMACION',
    //    mensaje: 'Se ha conectado un usuario'
    //});

    
});

server.listen(4000)
console.log("server on port", 4000)