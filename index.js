const express = require("express");
const mongoose = require("mongoose");
// const credit = document.querySelector(".credientials");
const bodyParser = require("body-parser");
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String },
  password: String,
  confirmpassword: String,
});
const User = mongoose.model("User", userSchema);

const stocksSchema = new mongoose.Schema({
  Search_Stock: String,
  Order_Type: String,
  price: Number,
  Quantity: Number,
});
const Stock = mongoose.model("Stock", stocksSchema);

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(
  "mongodb+srv://csecrackers:W1FdGFpN5H9oprW6@cluster0.ln9cv.mongodb.net/customerreview?retryWrites=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// const db = mongoose.connection;

app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });
  return res.redirect("index.html");
});

var x;

app.post("/signup.html", (req, res, next) => {
  console.log(req.body);
  x = new User({
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmpassword,
  });
  x.save();
  console.log(x);
  return res.redirect("index.html");
});

app.post("/userlogin.html", async (req, res) => {
  y = req.body;
  const u = await User.findOne({ email: y.email });
  if (u.password === req.body.password) {
    return res.redirect("userloginto.html");
  } else {
  }
});

app.post("/userloginto.html", (req, res) => {
  y = new Stock({
    Search_Stock: req.body.Search_Stock,
    Order_Type: req.body.Order_Type,
    price: req.body.price,
    Quantity: req.body.Quantity,
  });
  console.log(y);
  y.save();
  return res.red;
});

app.listen(3000, () => {
  console.log("app running on the port");
});
