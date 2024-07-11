import pika
import os

rabbitmq_uri = os.getenv("RABBITMQ_URI", "amqp://usuario:clave@localhost/servidor_dev_1")
params = pika.URLParameters(rabbitmq_uri)
conexion = pika.BlockingConnection(params)

#Crea cola, exchange y unelos vía bindings tipo "Direct"
queue_="store"
exchange_="store_exc"
canal = conexion.channel()
canal.queue_declare(queue=queue_, 
                    durable=True)
canal.exchange_declare(exchange=exchange_,
                       exchange_type="direct", 
                       durable=True, 
                       auto_delete=True)
canal.queue_bind(exchange=exchange_, 
                 queue=queue_, 
                 routing_key="message")

conexion. close()