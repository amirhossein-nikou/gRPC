const { Router } = require("express");
const {ProductRoutes} = require("./product.routes");
const router = Router()
router.use("/product", ProductRoutes)
module.exports = {
    AllRoutes: router
} 