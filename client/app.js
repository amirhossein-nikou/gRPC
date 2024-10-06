const express = require('express')
const { AllRoutes } = require('./router/index.routes')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(AllRoutes)


app.use((req,res,next) => {
    try {
        res.status(404).json({
            message: 'route not found'
        })
    } catch (error) {
        next(error)
    }
})
app.listen(port, () => console.log('> Server running => http://localhost:' + port))