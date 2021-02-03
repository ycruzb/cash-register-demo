const connectToDatabase = require("../../../utils/mongoDB");
const bcrypt = require("bcrypt");

export default async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);

  const saltRounds = 10;

  const db = await connectToDatabase(process.env.DATABASE_URL);

  const usersCollection = await db.collection("users");

  const usersByEmail = await usersCollection
    .find({ email: data.email })
    .toArray();

  if (usersByEmail.length > 0) {
    res.status(400).json({ error: true, message: "The email already exists!" });
  } else {
    bcrypt.hash(data.password, saltRounds, async function (err, hash) {
      if (err) {
        res.status(500).json({
          error: true,
          message: "An error has been occurred, please try again!",
        });
      } else {
        data.password = hash;
        const result = await usersCollection.insertOne(data);

        res.status(200).json({ error: false });
      }
    });
  }
};
