const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${user}:${password}@cluster0.8d3cohe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const productsCollection = client
      .db("emajohnShopping")
      .collection("products");
    app.get("/products", async (req, res) => {
        const page = req.query.page
        const size = req.query.size
        console.log(page, size)
      const query = {};
      const cursor = productsCollection.find(query);
      const products = await cursor.toArray();
      const count = await productsCollection.estimatedDocumentCount();
      res.send({ count, products });
    });
  } finally {
  }
};

run().catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
