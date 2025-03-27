const express = require('express')
const mongoose = require('mongoose')

// schema
const insuranceSchema = mongoose.Schema({
    "insurer_name":{type:String},
    "insurer_nominee":{type:String},
    "insurance_amount":{type:Number}
})

// schema turned into collection
const collection =  mongoose.model('insurance',insuranceSchema)

// connecting mongo db
mongoose.connect("mongodb://mongo:27017/crescent")

const application = express()
application.use(express.json())

// CRUD

// remove/ delete by id
application.delete('/:id',async(req,res)=>{
    req.setTimeout(20000000)
    const data = await collection.findByIdAndDelete(req.params.id)
    res.json(data)
})

// update existing isurance
application.put('/update',async(req,res)=>{
    req.setTimeout(20000000)
    const data = await collection.updateOne(
        {_id:req.body._id},
        req.body
    )
    res.json(data)
})

// read existing insurances
application.get('/',async(req,res)=>{
    req.setTimeout(20000000)
    const data = await collection.find()
    res.json(data)
})

// new entry to insurance collection
application.post('/',async(req,res)=>{
    req.setTimeout(20000000)
    const myInsurance = new collection({
        "insurer_name":req.body.insurer_name,
        "insurer_nominee":req.body.insurer_nominee,
        "insurance_amount":req.body.insurance_amount
    })
    const myResponse = await myInsurance.save()
    res.json(myResponse)
})


application.listen('4433',()=>{
    console.log("My backend express is started!!!!!!!!!!")
})

