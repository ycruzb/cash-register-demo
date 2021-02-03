const connectToDatabase = require("../../../utils/mongoDB");

export default async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = await db.collection("transactions");

  const result = await collection.insertOne(data);

  res.status(200).json({ result });
};
