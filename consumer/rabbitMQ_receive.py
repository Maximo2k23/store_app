#!/usr/bin/env python
import pika, sys, os
import requests
import json

def main():
    queue_="store"
    rabbitmq_uri = os.getenv("RABBITMQ_URI", "amqp://usuario:clave@localhost/servidor_dev_1")

    # Comunicación con RabbitMQ
    params = pika.URLParameters(rabbitmq_uri)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    channel.queue_declare(queue=queue_,durable=True)

    def callback(ch, method, properties, body):
        print(json.loads(body))
        print(f" [x] Received {body}")
        # enviando a api gateway
        requests.post(url='http://localhost:8001/inventory',json=json.loads(body),headers={"Content-Type": "application/json"})
        

    channel.basic_consume(queue=queue_, on_message_callback=callback, auto_ack=True)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)