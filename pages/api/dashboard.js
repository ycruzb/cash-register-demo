const connectToDatabase = require("../../utils/mongoDB");

module.exports = async (req, res) => {
  const db = await connectToDatabase(process.env.DATABASE_URL);

  const storesCollection = await db.collection("stores");

  const purchaseSum = await storesCollection.aggregate([
    {
      $group: {
        _id: "$payment_type",
      },
    },
  ]);

  res.status(200).json({ purchaseSum });
};
