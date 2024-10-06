const { Schema, model } = require('mongoose')
const productSchema = new Schema({
    // id: { type: Number },
    title: { type: String },
    price: { type: String },
})
// productSchema.pre("save", async function (next) {
//     let self = this
//     const id = await self.constructor.countDocuments({}) + 1;
//     self.set({id})
//     next()
// })
const ProductModel = model("product", productSchema)
module.exports = {
    ProductModel
}