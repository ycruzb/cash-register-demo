const connectToDatabase = require("../../utils/mongoDB");
import { getSession } from "next-auth/client";

module.exports = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const db = await connectToDatabase(process.env.DATABASE_URL);

    const collectionTransactions = await db.collection("transactions");

    const collectionStores = await db.collection("stores");

    const transactionsCount = await collectionTransactions.countDocuments({});

    const totalPurchase = await collectionTransactions
      .aggregate([
        {
          $match: {
            transaction_type: "Purchase",
          },
        },
        {
          $group: { _id: "$transaction_type", total: { $sum: "$price" } },
        },
      ])
      .toArray();

    const totalSold = await collectionTransactions
      .aggregate([
        {
          $match: {
            transaction_type: "Sold",
          },
        },
        {
          $group: { _id: "$transaction_type", total: { $sum: "$price" } },
        },
      ])
      .toArray();

    const purchaseByStore = await collectionStores
      .aggregate([
        {
          $lookup: {
            from: "transactions",
            localField: "_id",
            foreignField: "store_id",
            as: "transaction",
          },
        },
        {
          $unwind: "$transaction",
        },
        {
          $project: {
            _id: "$_id",
            name: "$name",
            transaction_type: "$transaction.transaction_type",
            price: "$transaction.price",
          },
        },
        {
          $match: {
            transaction_type: "Purchase",
          },
        },
        {
          $group: {
            _id: "$name",
            purchase: { $sum: "$price" },
          },
        },
      ])
      .toArray();

    const soldByStore = await collectionStores
      .aggregate([
        {
          $lookup: {
            from: "transactions",
            localField: "_id",
            foreignField: "store_id",
            as: "transaction",
          },
        },
        {
          $unwind: "$transaction",
        },
        {
          $project: {
            _id: "$_id",
            name: "$name",
            transaction_type: "$transaction.transaction_type",
            price: "$transaction.price",
          },
        },
        {
          $match: {
            transaction_type: "Sold",
          },
        },
        {
          $group: {
            _id: "$name",
            sold: { $sum: "$price" },
          },
        },
      ])
      .toArray();

    var stores = await collectionStores.find({}).toArray();

    storesData = stores.map((store) => {
      let purchase = purchaseByStore
        .filter((item) => item["_id"] === store.name)
        .reduce(
          (acc, item) =>
            item["_id"] === store.name ? acc + item.purchase : acc + 0,
          0
        );

      let sold = soldByStore
        .filter((item) => item["_id"] === store.name)
        .reduce(
          (acc, item) =>
            item["_id"] === store.name ? acc + item.sold : acc + 0,
          0
        );

      return { name: store.name, purchase: purchase, sold: sold };
    });

    res.status(200).json({
      totalPurchase,
      totalSold,
      purchaseByStore,
      soldByStore,
      transactionsCount,
      storesData,
    });
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
};
