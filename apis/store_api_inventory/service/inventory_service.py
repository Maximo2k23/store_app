from repository.inventory_repository import InventoryRepository
from repository.inventory_repository_redis import InventoryRepositoryRedis
from support.tool import Tool

class InventoryService:
    def __init__(self):
        global tool_obj, inv_obj_redis, inv_obj
        tool_obj = Tool()
        inv_obj_redis = InventoryRepositoryRedis()
        inv_obj = InventoryRepository()

    def update(self, id, data):
        result={"status": "error","message": 'not found or no changes: '+id}
        # elimina datos que esten vacios o inicialicen en 2
        data = tool_obj.filter_dic(data)
        count = inv_obj.update(id, data)
        if count==1:
            result=inv_obj.get_by_id(id)
            result= result[0]
            result={"status": "success","data": result}
            # borrar cache
            params_str = f'status=1'
            inv_obj_redis.deleteAll()
            inv_obj_redis.deleteAll(params_str)
            inv_obj_redis.delete_by_id(id)
        return result