const { default: mongoose } = require("mongoose");

const connectToDb = mongoose.connect("mongodb://localhost:27017/gRPC").then(() => {
    console.log("connect To Db");
}).catch((err) => {
    console.log(err);
})