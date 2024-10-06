require("./config/mongoose.config")
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path');
const protoDir = path.join(__dirname, "..", "..", "proto", "product.proto")
const productProto = protoLoader.loadSync(protoDir)
const { productPackage } = grpc.loadPackageDefinition(productProto)
const productServiceURL = "localhost:3001"
const { createProduct, getProduct, productList, removeProduct, updateProduct } = require('./functions/rpc.func')
function main() {
    const server = new grpc.Server()
    server.addService(productPackage.ProductService.service, {
        productList,
        getProduct,
        createProduct,
        updateProduct,
        removeProduct,
    })
    server.bindAsync(productServiceURL, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) console.log("error in gRPC: ", err);
        console.log("product service server run on port : ", port);
    })
}
main()