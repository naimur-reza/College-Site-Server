const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

ver;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rfvro52.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const collegeCollection = client.db("collegeDb").collection("colleges");
    const admissionCollection = client.db("collegeDb").collection("admission");

    app.get("/colleges", async (req, res) => {
      const result = await collegeCollection.find().toArray();
      res.send(result);
    });
    app.get("/colleges/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await collegeCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/admission", async (req, res) => {
      const newAdmission = req.body;
      const result = await admissionCollection.insertOne(newAdmission);
      res.send(result);
    });
    app.get("/myColleges/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await admissionCollection.find(query).toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("college is running");
});
app.listen(port, () => {
  console.log(`college is running on port ${port}`);
});
