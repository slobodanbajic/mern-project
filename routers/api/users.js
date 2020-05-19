const Router = require("express");
const bcrypt = require("bcryptjs");
// User Model
const auth = require("../../middleware/auth");
const User = require("../../models/User");

const router = Router();
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error("No users exist");
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});
router.post("/", auth, async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) throw Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    res.status(200).json({
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
router.get("/user/:id/", auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    if (!user) throw Error("User Does not exist");
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.put("/user/:id/", auth, async (req, res) => {
  console.log(req.body.name);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { name: req.body.name }
    );
    res.json({ status: 200, message: "User updated", new: updatedUser });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});
router.delete("/user/:id", auth, async (req, res) => {
  try {
    const deletedUser = await User.remove({ _id: req.params.id });
    res.json({ status: 200, message: "User Deleted" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});
module.exports = router;