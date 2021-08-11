const express = require('express')
const app = express()
const router = express.Router();
const port = 3310
const conectdb = require("./conectdb");
const User = require("./models/User")
conectdb();
app.use(express.json())

//display  Users
router.get("/", async (req, res) => {
    try {
      const response = await User.find();
  
      res.send({ res: response, message: "Gentting Users Successufly" });
    } catch (error) {
      console.log(error);
      res.status(400).send("Can not Get Users");
    }
  });

//add new User
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const response = await newUser.save();
    res.send({ res: response, message: "New User added" });
  } catch (error) {
    console.log(error);
    res.status(400).send("status 400");
  }
});

// find User by id
router.get("/:id", async (req, res) => {
  try {
    const response = await User.findOne({ _id: req.params.id });

    res.send({ res: response, message: "Gentting User Successufly" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Can not Get User");
  }
});
// Delete User
router.delete("/:id", async (req, res) => {
  try {
    const response = await User.deleteOne({ _id: req.params.id });
    response.deletedCount
      ? res.send({ message: "User Deleted Successufly" })
      : res.send({ message: "User Already DELETED" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Can not Delete User");
  }
});

// Update User
router.put("/:id", async (req, res) => {
  try {
    const response = await User.updateOne({ _id: req.params.id },{$set:{...req.body}});
    response.nModified
      ? res.send({ message: "User Updated Successufly" })
      : res.send({ message: "User Already Update" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Can not Update User");
  }
});
//test the server
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${3310}!`))