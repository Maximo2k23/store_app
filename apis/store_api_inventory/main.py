from fastapi import FastAPI
import pika
import os
import json
from repository.inventory_repository import InventoryRepository
from repository.inventory_repository_redis import InventoryRepositoryRedis
from model.inventory import InventoryModel
from fastapi.encoders import jsonable_encoder
from service.inventory_service import InventoryService

app = FastAPI()

@app.get("/health")
def get_health():
    return {"status": "connection success"}

@app.get("/inventory/{id}")
def get_one(id: str):
    inv_obj = InventoryRepository()
    inv_obj_redis = InventoryRepositoryRedis()
    result = inv_obj_redis.get_by_id(id)
    ## consulta a redis si tiene data
    if result is None:
        # consulta a base de datos
        result = inv_obj.get_by_id(id)
        result = result[0]
        # consulta si la db esta vacio
        if result == None:
            result = []
        else:
            # insertar data a redis
            inv_obj_redis.insert_by_id(id, json.dumps(jsonable_encoder(result)))
    else:
        result = json.loads(result)
    return {"status": "success","data": result}

@app.get("/inventory")
def get_all(status=''):
    params={}
    params_str=''
    inv_obj = InventoryRepository()
    inv_obj_redis = InventoryRepositoryRedis()

    if status != '':
        # para el key de redis
        params_str = f'status={status}'
        # para filtrer en la base de datos
        params = {"status": status}
        result = inv_obj_redis.get_all(params_str)
    else:
        result = inv_obj_redis.get_all()
    
    #print(result)
    ## consulta a redis si tiene data
    if result is None:
        #print('no tiene data redis consulta db')
        # consulta a base de datos
        result = inv_obj.get_all(params)
        # consulta si la db esta vacio
        if result == None:
            result = []
        else:
            # insertar data a redis            
            inv_obj_redis.insertAll(json.dumps(jsonable_encoder(result)), params_str)
    else:
        result = json.loads(result)
    return {"status": "success","data": result}

@app.post("/inventory")
def create(data: InventoryModel):
    print(data.__dict__)
    inv_obj = InventoryRepository()
    inv_obj_redis = InventoryRepositoryRedis()

    count = inv_obj.create(data.__dict__)
    if count > 0:
        # borrar cache
        inv_obj_redis.deleteAll()
    print('guarda en base de datos')
    return {"count": count,"message": "save success"}

@app.put("/inventory/{id}")
def update(id: str, data: InventoryModel):
    inv_serv_obj = InventoryService()
    result = inv_serv_obj.update(id, data.__dict__)
    return result

