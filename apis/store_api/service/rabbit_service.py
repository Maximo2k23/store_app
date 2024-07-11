
from event.notifier.store_notifier import StoreNotifier

class RabbitService:
    def __init__(self):
        global store_noty
        store_noty = StoreNotifier()
    
    def send(self, data):
        store_noty.send(data)