const { default: mongoose } = require("mongoose");
const { ProductModel } = require("../model/product.model")

async function productList(call, callback) {
    try {
        const products = await ProductModel.find({})
        callback(null, { products })
    } catch (error) {
        callback(error, null)
    }
}
async function getProduct(call, callback) {
    try {
        const { id } = call.request
        const product = await ProductModel.findOne({ _id: id })
        if (!product) {
            callback({ message: "product not found" }, null)
        }
        callback(null, product)
    } catch (error) {
        callback(error, null)
    }
}
async function createProduct(call, callback) {
    try {
        const { title, price } = call.request
        const result = await ProductModel.create({ title, price })
        callback(null, { result: "created" })
    } catch (error) {
        callback(error, null)
    }
}
async function updateProduct(call, callback) { 
    try {
        const {_id,title,price} = call.request
        console.log({_id,title,price});
        const result = await ProductModel.updateOne({_id}, {
            title,
            price
        })
        if(!result.modifiedCount) callback(null,{result:"update failed"})
        callback(null, { result: "updated" })
    } catch (error) {
        callback(error, null)
    }
}
async function removeProduct(call, callback) { 
    try {
        const { id } = call.request
        const result = await ProductModel.deleteOne({_id: id})
        if (!result.deletedCount) {
            callback(null, {result: "there is no product with this id"})
        }
        callback(null, {result: "deleted successfully"})
    } catch (error) {
        callback(error, null)
    }
}
module.exports = {
    productList,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct,
}