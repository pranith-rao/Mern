const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../db/conn");

const User = require("../models/users");

router.get("/", (req, res) => {
  res.send("Hello World");
});

// promises
// router.post('/register',(req,res) => {
//     const {name,email,phone,work,password,cpassword} = req.body;
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({"message" : "Please enter all the fields"});
//     }
//     User.findOne({email:email})
//     .then((UserExists) => {
//         if (UserExists) {
//             return res.status(422).json({"message" : "Email already exists"});
//         }
//     })
//     const user = new User({name,email,phone,work,password,cpassword});
//     user.save()
//     .then(() => {
//         return res.status(201).json({"message" : "Registration Successfull"});
//     })
//     .catch(err => {
//         res.status(501).json({"message" : "Failed to register"})
//     })
// });

// async-await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ message: "Please enter all the fields" });
  } else if (password != cpassword) {
    return res.status(422).json({ message: "Passwords don't match" });
  }
  try {
    const UserExists = await User.findOne({ email: email });
    if (UserExists) {
      return res.status(422).json({ message: "Email already exists" });
    }

    const user = new User({ name, email, phone, work, password, cpassword });
    const userRegister = await user.save();
    if (userRegister) {
      return res.status(201).json({ message: "Registration Successfull" });
    } else {
      res.status(501).json({ message: "Failed to register" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(206).json({ message: "Please enter all the fields" });
  }
  try {
    const isRegistered = await User.findOne({ email: email });
    if (isRegistered) {
      const match = await bcrypt.compare(password, isRegistered.password);
      if (match) {
        const token = await isRegistered.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 300000),
          httpOnly: true,
        });
        res.status(202).json({ message: "Login Successful" });
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", (req, res) => {
  res.send("Hello World");
});

router.get("/contact", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
