const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app =express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



//middleware
app.use(cors())
app.use(express.json())

//assingment-10
// WGDdMazBSK695lZ3



const uri = `mongodb+srv://${process.env.DB}:${process.env.PS}@cluster0.hblj92w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const itemColleation=client.db('items').collection('item')
    const itemColleation2=client.db('items').collection('item2')

    app.get('/craft',async(req,res)=>{
        const cursor =itemColleation.find()
        const result=await cursor.toArray()
        res.send(result)
    })
    app.get('/craft2',async(req,res)=>{
        const cursor =itemColleation2.find()
        const result=await cursor.toArray()
        res.send(result)
    })

    app.get('/craft/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await itemColleation.findOne(query);
      res.send(result);
  })

    app.post('/craft',async(req,res)=>{
        const newCraft =req.body
        console.log(newCraft);
        const result =await itemColleation.insertOne(newCraft)
        res.send(result)
    })

    app.put('/craft/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const options = { upsert: true };
      const updatedCraft = req.body;

      const craft = {
          $set: {
             User_Name :updatedCraft.User_Name,
             User_Email :updatedCraft.User_Email,
             name :updatedCraft.name,
             subcategory_Name :updatedCraft.subcategory_Name,
             short_description :updatedCraft.short_description,
             price :updatedCraft.price,
             rating :updatedCraft.rating,
             yesno :updatedCraft.yesno,
             processing_time :updatedCraft.processing_time,
             stocks :updatedCraft.stocks,
             image :updatedCraft.image,
          }
      }

      const result = await itemColleation.updateOne(filter, craft, options);
      res.send(result);
  })
    app.delete('/craft/:id',async (req,res)=>{
      const id =req.params.id
      const quary ={_id: new ObjectId(id)}
      const result =await itemColleation.deleteOne(quary)
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('rening')
})

app.listen(port,()=>{
    console.log(`runing${port}`);
})