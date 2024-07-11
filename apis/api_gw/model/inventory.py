from pydantic import BaseModel
from datetime import datetime

class InventoryModel(BaseModel):
    __tablename__ = "inventory"

    #id: int = None
    product_id: int
    cost: str = '0.00'
    quantity: int = 0
    quantity_max: int = 0
    quantity_min: int = 0
    due_date: str = datetime.today().strftime('%Y-%m-%d')
