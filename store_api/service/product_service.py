from repository.product_repository import ProductRepository
from repository.product_repository_redis import ProductRepositoryRedis
from support.tool import Tool

class ProductService:
    def __init__(self):
        None

    def update(self, id, data):
        result={"status": "error","message": 'failed when were update'}
        prod_obj = ProductRepository()
        prod_obj_redis = ProductRepositoryRedis()
        tool_obj = Tool()
        # elimina datos que esten vacios o inicialicen en 2
        data = tool_obj.filter_dic(data)
        count = prod_obj.update(id, data)
        if count==1:
            result=prod_obj.get_by_id(id)
            result= result[0]
            result={"status": "success","data": result}
            # borrar cache
            prod_obj_redis.deleteAll()
            prod_obj_redis.delete_by_id(id)
        return result