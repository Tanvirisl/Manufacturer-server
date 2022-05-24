const express = require('express')
const cors = require('cors');
// const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
// const verify = require('jsonwebtoken/verify');
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Assignment 12!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aj6mo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const toolsCollection = client.db('Assignment-12').collection('services');
    //get toolsParts
    app.get('/toolsParts', async (req, res) => {
      const toolsPart = await toolsCollection.find().toArray();
      res.send(toolsPart)
    })
  }
  finally {

  }
}
run().catch(console.dir)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})