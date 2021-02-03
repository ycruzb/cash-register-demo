const connectToDatabase = require("../../utils/mongoDB");

module.exports = async (req, res) => {
  const db = await connectToDatabase(process.env.DATABASE_URL);

  const collection = await db.collection("transactions");

  const sum_by_payment_type = await collection.aggregate([
    { $group: { _id: "$payment_type", sum: { $sum: "$price" } } },
  ]);

  res.status(200).json({ sum_by_payment_type });
};
