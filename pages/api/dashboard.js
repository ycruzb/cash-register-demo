const connectToDatabase = require("../../utils/mongoDB");

module.exports = async (req, res) => {
  const db = await connectToDatabase(process.env.DATABASE_URL);

  const purchaseSum = await db.collection("stores").storesCollection.aggregate([
    {
      $group: {
        _id: "$payment_type",
      },
    },
  ]);

  res.status(200).json({ purchaseSum });
};
