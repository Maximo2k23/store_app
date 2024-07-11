from adapter.redis_adapter import *
from model.inventory import InventoryModel

class InventoryRepositoryRedis:
    def __init__(self):
        global cnt
        redis = RedisAdapter()
        cnt = redis.connection()

    def get_by_id(self, id):
        result = cnt.get('{}_by_{}'.format(InventoryModel.__tablename__, id))
        return result
    
    def get_all(self, params=''):
        key='{}_table'.format(InventoryModel.__tablename__)
        if params != '':
            key='{}_table_{}'.format(InventoryModel.__tablename__, params)
        result = cnt.get(key)
        return result
    
    def insert_by_id(self, id, data):
        cnt.set('{}_by_{}'.format(InventoryModel.__tablename__, id), data)

    def insertAll(self, data, params=''):
        key='{}_table'.format(InventoryModel.__tablename__)
        if params != '':
            key='{}_table_{}'.format(InventoryModel.__tablename__, params)
        cnt.set(key, data)
    
    def deleteAll(self,params=''):
        key='{}_table'.format(InventoryModel.__tablename__)
        if params != '':
            key='{}_table_{}'.format(InventoryModel.__tablename__, params)
        cnt.delete(key)

    def delete_by_id(self, id):
        cnt.delete('{}_by_{}'.format(InventoryModel.__tablename__, id))