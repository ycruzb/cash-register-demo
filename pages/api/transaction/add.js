const connectToDatabase = require("../../../utils/mongoDB");
var mongo = require("mongodb");
var ObjectID = mongo.ObjectID;

export default async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);

  data.price = parseFloat(data.price);
  data.store_id = ObjectID(data.store_id);
  data.user_id = ObjectID(data.user_id);

  const db = await connectToDatabase(process.env.DATABASE_URL);

  const collection = await db.collection("transactions");

  const result = await collection.insertOne(data);

  res.status(200).json({ result });
};
