const express = require('express')
const Model = require('../models/product_model')
const product_router = express.Router()
module.exports = product_router

 
  product_router.get('/products/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
  })

  product_router.get('/', (req, res) => {
    res.send('Hello, this World is so good!')
  })

  product_router.get('/products/get', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
   })

  product_router.post('/products', async (req, res, next) => {
    const data = new Model({
        name:req.body.name,
        price: req.body.price
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
  })
 //Patch
  product_router.patch('/products/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  })
  product_router.delete('/product/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Product ${data.name} is deleted.`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  })
