const express = require('express')
const app = express()
const cors = require("cors");
require("dotenv").config();
const port = 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const query = require("express/lib/middleware/query");


//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@daraz-cluster.dgsggrq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


 client.connect();
 const justForYouProducts = client.db("daraz-clone-server").collection("just-for-you-products-list");

 //get JustForYou services
 app.get("/services", async(req, res) => {
    try {
      const query = {};
      const cursor = justForYouProducts.find(query);
      const services = await cursor.toArray();
      res.send(services);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  //get service by id
 app.get("/services/:id", async(req, res) => {
    try {
      const id = req.params.id;
      const query = {_id: parseInt(id)};
      const cursor = justForYouProducts.find(query);
      const services = await cursor.toArray();
      res.send(services);
    } catch (error) {
      res.status(500).send(error);
    }
  });
app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})