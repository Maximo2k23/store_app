from adapter.rabbit_adapter import RabbitAdapter
import json

class StoreNotifier:
  __queue__= "store"
  __exchange__ = 'store_exc'
  __routing_key__='message'

  def __init__(self):
    global canal, cnt
    rabbit = RabbitAdapter()
    cnt = rabbit.connection()
    canal = cnt.channel()

  def send(self, data):
    canal.queue_declare(queue=self.__queue__, 
                    durable=True)
    canal.basic_publish(exchange=self.__exchange__,
                        routing_key=self.__routing_key__, 
                        body=json.dumps(data))
    cnt.close()