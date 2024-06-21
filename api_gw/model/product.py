from pydantic import BaseModel

class ProductModel(BaseModel):
    __tablename__ = "product"

    #id: int = None
    code: str
    name: str
    product_type: str
    trademark: str
    description: str
    sale_price: float
    tags: str
    availability: str
    reviews: str
    status: int
