from fastapi import FastAPI, HTTPException, Request
import httpx
from model.product import ProductModel
from model.inventory import InventoryModel
from fastapi.middleware.cors import CORSMiddleware
import pika
import os
import json

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

#origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#USER_SERVICE_URL = "http://localhost:8000"
USER_SERVICE_URL = "http://host.docker.local:8000"
INVENTORY_SERVICE_URL = "http://host.docker.local:8001"

## START PRODUCT ##
@app.get("/store/product/{id}")
async def get_user(id: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{USER_SERVICE_URL}/product/{id}")
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()
    
@app.get("/store/product")
async def get_all(request: Request):
    async with httpx.AsyncClient() as client:
        params = request.query_params
        
        response = await client.get(f"{USER_SERVICE_URL}/product?{params}")
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

@app.post("/store/product")
async def create(data: ProductModel):
    #print(json.dumps(data.__dict__))
    #print(data)
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{USER_SERVICE_URL}/product",json=data.__dict__)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()
    
@app.put("/store/product/{id}")
async def create(id: str,data: ProductModel):
    #print(json.dumps(data.__dict__))
    async with httpx.AsyncClient() as client:
        response = await client.put(f"{USER_SERVICE_URL}/product/{id}",json=data.__dict__)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

## END PRODUCT ##

## START INVENTORY ##
@app.get("/store/inventory/{id}")
async def get_inventory(id: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{INVENTORY_SERVICE_URL}/inventory/{id}")
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()
    
@app.get("/store/inventory")
async def get_all(request: Request):
    async with httpx.AsyncClient() as client:
        #params = request.query_params
        
        response = await client.get(f"{INVENTORY_SERVICE_URL}/inventory")
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()
@app.put("/store/inventory/{id}")
async def create_inventory(id: str,data: InventoryModel):
    #print(json.dumps(data.__dict__))
    async with httpx.AsyncClient() as client:
        response = await client.put(f"{INVENTORY_SERVICE_URL}/inventory/{id}",json=data.__dict__)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()
## END INVENTORY ##