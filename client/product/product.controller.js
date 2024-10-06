const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const protoDir = path.join(__dirname, "..", "..", "proto", "product.proto");
const productProto = protoLoader.loadSync(protoDir);
const { productPackage } = grpc.loadPackageDefinition(productProto);
const productServiceURL = "localhost:3001";
const productClient = new productPackage.ProductService(productServiceURL, grpc.credentials.createInsecure());
function productList(req, res, next) {
    productClient.productList(null, (err, data) => {
        if (err) return res.json(err);
        return res.json({ data })
    })
}
function getProduct(req, res, next) {
    const { productId } = req.params
    productClient.getProduct({ id: productId }, (err, data) => {
        if (err) return res.json(err);
        return res.json({ data })
    })
}
function createProduct(req, res, next) {
    const { title, price } = req.body
    productClient.createProduct({ title, price }, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json({ data, message: "created successfully" })
    })
}
function updateProduct(req, res, next) {
    const { id } = req.params
    const { title, price } = req.body
    console.log({ id, title, price });
    productClient.updateProduct({ _id: id, title, price }, (err, data) => {
        if (err) return res.json(err);
        return res.json({ data })
    })
}
function removeProduct(req, res, next) {
    const { id } = req.params
    productClient.removeProduct({ id }, (err, data) => {
        if (err) return res.json(err);
        return res.json({ data })
    })
}
module.exports = {
    productList,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct,
}