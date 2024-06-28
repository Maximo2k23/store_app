from fastapi import FastAPI
import pika
import os
from pydantic import BaseModel
import json
from repository.product_repository import ProductRepository
from repository.product_repository_redis import ProductRepositoryRedis
from model.product import ProductModel
from fastapi.encoders import jsonable_encoder
from service.product_service import ProductService

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
    params_str = f'status={status}'
    prod_obj = ProductRepository()
    prod_obj_redis = ProductRepositoryRedis()

    if status != '':
        params = {"status": status}    
    
    result = prod_obj_redis.get_all(params_str)    
    #print(result)
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
            prod_obj_redis.insertAll(json.dumps(jsonable_encoder(result)))
    else:
        result = json.loads(result)
    return {"status": "success","data": result}

@app.post("/product")
def create(data: ProductModel):
    prod_obj = ProductRepository()
    prod_obj_redis = ProductRepositoryRedis()

    count = prod_obj.create(data.__dict__)
    if count > 0:
        # borrar cache
        prod_obj_redis.deleteAll()
    print('guarda en base de datos')
    return {"count": count,"message": "save success"}

@app.put("/product/{id}")
def update(id: str, data: ProductModel):
    prod_serv_obj = ProductService()
    result = prod_serv_obj.update(id, data.__dict__)
    return result

