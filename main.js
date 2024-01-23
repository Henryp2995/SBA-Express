const express = require('express')
const app = express()

const products = require("./routes/products");
app.use("/api/products", products);

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    console.log('here')
    
    res.render('index', {text:'World'})
})

const productRouter = require('./routes/products')  // Change userRouter to productRouter
app.use('/products', productRouter)  // Change userRouter to productRouter

app.listen(3000)
