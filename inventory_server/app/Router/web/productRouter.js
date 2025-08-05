const {getAllProducts} = require("../../Controller/web/productController")
const express= require('express')
const { authVerify } = require("../../Middleware/authMidlleware")

const productRoute = express.Router()

productRoute.get("/products",authVerify ,getAllProducts)

module.exports={productRoute}