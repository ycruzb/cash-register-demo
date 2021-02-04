const connectToDatabase = require("../../utils/mongoDB");
import { getSession } from "next-auth/client";

module.exports = async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const db = await connectToDatabase(process.env.DATABASE_URL);

    const collection = await db.collection("stores");

    const stores = await collection.find({}).toArray();

    res.status(200).json({ stores });
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
};
