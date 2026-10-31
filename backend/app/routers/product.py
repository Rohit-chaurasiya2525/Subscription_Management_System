
from fastapi import APIRouter, HTTPException
from app.schemas.product import ProductCreate, ProductUpdate
from app.models.product import products

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.post("/")
def create_product(product: ProductCreate):
    new_product = product.model_dump()
    new_product["id"] = len(products) + 1

    products.append(new_product)

    return {
        "success": True,
        "message": "Product created successfully",
        "data": new_product
    }

@router.get("/")
def get_products():
    return {
        "success": True,
        "data": products
    }

@router.get("/{product_id}")
def get_product(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return {"success": True, "data": product}

    raise HTTPException(status_code=404, detail="Product not found")

@router.put("/{product_id}")
def update_product(product_id: int, updated_data: ProductUpdate):
    for product in products:
        if product["id"] == product_id:
            changes = updated_data.model_dump(exclude_unset=True)
            product.update(changes)
            return {
                "success": True,
                "message": "Product updated successfully",
                "data": product
            }

    raise HTTPException(status_code=404, detail="Product not found")

@router.delete("/{product_id}")
def delete_product(product_id: int):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            deleted = products.pop(index)
            return {
                "success": True,
                "message": "Product deleted successfully",
                "data": deleted
            }

    raise HTTPException(status_code=404, detail="Product not found")
