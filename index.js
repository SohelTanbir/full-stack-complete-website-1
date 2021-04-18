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
const { ObjectId } = require('bson');
const uri = "mongodb+srv://mobilecareuser:mobilecare1234@cluster0.kjddt.mongodb.net/mobilecare?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true,useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("mobilecare").collection("services");
  const ordersCollection = client.db("mobilecare").collection("orders");
  const adminCollection = client.db("mobilecare").collection("admin");
  const reviewCollection = client.db("mobilecare").collection("reviews");

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
    });

    // delete service by id from database
    app.delete('/delete/:id', (req, res)=>{
     serviceCollection.deleteOne({_id:ObjectId(req.params.id)})
     .then(result =>{
       res.send(result.deletedCount >0)
     })
    });
    // add admin for manage dashboard
    app.post('/addAddmin', (req, res)=>{
      const admin = req.body;
      adminCollection.insertOne(admin)
      .then(result =>{
        res.send(result.insertedCount > 0)
      })
    });
    // find user selected service by id from database
    app.get('/checkout/:id', (req, res)=>{
      serviceCollection.find({_id:ObjectId(req.params.id)})
      .toArray((error, document)=>{
        res.send(document)
      })
    });

     // insert service into database
    app.post('/order', (req, res)=>{
      const order = req.body;
       ordersCollection.insertOne(order)
        .then(result =>{
          res.send(result.insertedCount > 0)
        })
    });

    // read order from database
    app.get('/orders', (req, res)=>{
      ordersCollection.find({})
      .toArray((error, documents)=>{
        res.send(documents);
      })
    });

    // save review into database
    app.post('/review', (req, res)=>{
      const review = req.body;
      reviewCollection.insertOne(review)
      .then(result =>{
        res.send(result.insertedCount > 0)
      })
    })

});


app.get('/', (req, res)=>{
  res.send('Server is working properly');
});



app.listen(process.env.PORT || 5000)