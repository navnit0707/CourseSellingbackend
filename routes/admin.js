const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { SECRET } = require("../middleware/auth");

const { Admin } = require("../db");

const router = express.Router();

router.get("/me", (req, res) => {
  res.send("me");
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const obj = { username: username, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();

      const token = jwt.sign({ username, role: "admin" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin created successfully", token });
    }
  }
  Admin.findOne({ username }).then(callback);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/courses", (req, res) => {
  res.send("courses ");
});

router.put("/courses/:courseId", (req, res) => {
  res.send("courses with id");
});

router.get("/courses", (req, res) => {
  res.send("get courses");
});

router.get("/course/:courseId", (req, res) => {
  res.send("get courses with id");
});
module.exports = router;