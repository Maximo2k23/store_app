from fastapi import FastAPI
import json
from repository.product_repository import ProductRepository
from repository.product_repository_redis import ProductRepositoryRedis
from model.product import ProductModel
from fastapi.encoders import jsonable_encoder
from service.product_service import ProductService
from service.rabbit_service import RabbitService

app = FastAPI()

@app.get("/health")
def get_health():
    return {"status": "connection success"}

@app.get("/product/{id}")
def get_one(id: str):
    prod_obj = ProductRepository()
    prod_obj_redis = ProductRepositoryRedis()
    result = prod_obj_redis.get_by_id(id)
    ## consulta a redis si tiene data
    if result is None:
        # consulta a base de datos
        result = prod_obj.get_by_id(id)
        result = result[0]
        # consulta si la db esta vacio
        if result == None:
            result = []
        else:
            # insertar data a redis
            prod_obj_redis.insert_by_id(id, json.dumps(jsonable_encoder(result)))
    else:
        result = json.loads(result)
    return {"status": "success","data": result}

@app.get("/product")
def get_all(status=''):
    params={}
    params_str=''
    prod_obj = ProductRepository()
    prod_obj_redis = ProductRepositoryRedis()

    if status != '':
        # para el key de redis
        params_str = f'status={status}'
        # para filtrer en la base de datos
        params = {"status": status}
        result = prod_obj_redis.get_all(params_str)
    else:
        result = prod_obj_redis.get_all()
    ## consulta a redis si tiene data
    if result is None:
        #print('no tiene data redis consulta db')
        # consulta a base de datos
        result = prod_obj.get_all(params)
        # consulta si la db esta vacio
        if result == None:
            result = []
        else:
            # insertar data a redis            
            prod_obj_redis.insertAll(json.dumps(jsonable_encoder(result)), params_str)
    else:
        result = json.loads(result)
    return {"status": "success","data": result}

@app.post("/product")
def create(data: ProductModel):
    prod_obj = ProductRepository()
    prod_obj_redis = ProductRepositoryRedis()

    count, id = prod_obj.create(data.__dict__)
    if count > 0:
        # borrar cache
        prod_obj_redis.deleteAll()
        prod_obj_redis.deleteAll('status=1')
        rabbit_srv = RabbitService()
        print('id: ',id)
        rabbit_srv.send({"product_id":id})
    print('guarda en base de datos')
    return {"count": count,"message": "save success"}

@app.put("/product/{id}")
def update(id: str, data: ProductModel):
    prod_serv_obj = ProductService()
    result = prod_serv_obj.update(id, data.__dict__)
    return result

