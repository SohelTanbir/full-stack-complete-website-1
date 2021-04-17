const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const dbName = 'mobilecare'
const user= 'mobilecareuser';
const pass = 'mobilecare1234'


app.use(cors());
app.use(bodyParser.json());


// database connection
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mobilecareuser:mobilecare1234@cluster0.kjddt.mongodb.net/mobilecare?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true,useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("mobilecare").collection("services");

  // insert service into database
    app.post('/addservice', (req, res)=>{
      const newService = req.body;
        serviceCollection.insertOne(newService)
        .then(result =>{
          res.send(result.insertedCount > 0)
        })
    })

    // read service data from database 
    app.get('/services', (req, res)=>{
      serviceCollection.find({})
      .toArray((error, documents)=>{
  
        res.send(documents);
      })
    })

});


app.get('/', (req, res)=>{
  res.send('Server is working properly');
});



app.listen(process.env.PORT || 5000)