const connectToDatabase = require("../../utils/mongoDB");

module.exports = async (req, res) => {
  const db = await connectToDatabase(process.env.DATABASE_URL);

  const collection = await db.collection("transactions");

  const transactions = await collection.find({}).toArray();

  res.status(200).json({ transactions });
};
