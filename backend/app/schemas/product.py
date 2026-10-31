
from pydantic import BaseModel, Field
from typing import Optional


class ProductCreate(BaseModel):
    name: str = Field(min_length=2)
    type: str = Field(min_length=2)
    sales_price: float = Field(gt=0)
    cost_price: float = Field(ge=0)
    notes: Optional[str] = None


class ProductUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=2)
    type: Optional[str] = Field(default=None, min_length=2)
    sales_price: Optional[float] = Field(default=None, gt=0)
    cost_price: Optional[float] = Field(default=None, ge=0)
    notes: Optional[str] = None
