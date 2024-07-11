import os
import pika

class RabbitAdapter:
    def __init__(self) -> None:
        pass

    def connection(self):
        rabbitmq_uri = os.getenv("RABBITMQ_URI", "amqp://usuario:clave@host.docker.local/servidor_dev_1")
        # Comunicacion con RabbitMQ
        params = pika.URLParameters(rabbitmq_uri)
        connection = pika.BlockingConnection(params)
        return connection
