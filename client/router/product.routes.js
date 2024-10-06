const { Router } = require("express");
const { productList, getProduct, createProduct,removeProduct,updateProduct } = require("../product/product.controller");

const router = Router()
router.get("/list", productList)
router.get("/:productId", getProduct)
router.post("/create", createProduct)
router.delete("/remove/:id", removeProduct)
router.put("/update/:id", updateProduct)
module.exports = {
    ProductRoutes: router
}