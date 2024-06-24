from fastapi import FastAPI, HTTPException, Request
import httpx
from model.product import ProductModel
from fastapi.middleware.cors import CORSMiddleware
import pika
import os
import json

app = FastAPI()

origins = [
    "http://localhost:5173",
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
    print(data)
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

@app.post("/rabbit/send")
def sent_data(data: ProductModel):
    print(data)
    rabbitmq_uri = os.getenv("RABBITMQ_URI", "amqp://usuario:clave@host.docker.local/servidor_dev_1")

    # Comunicación con RabbitMQ
    params = pika.URLParameters(rabbitmq_uri)
    conexion = pika.BlockingConnection(params)
    canal = conexion. channel()
    canal.queue_declare(queue="chat", 
                    durable=True)
    canal.basic_publish(exchange='chat_exc',
                        routing_key='message', 
                        body=json.dumps(data.__dict__))

    conexion.close()
    print("data enviada")
    return {"message": "send suscces"}
#Para probar swagger:
#http://localhost:8000/docs