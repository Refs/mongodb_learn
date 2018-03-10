const express = require("express");

// init APP
const app = express();

// load View Engine

// Home router
app.get("/", (req, res) => {
  res.send("Hello world");
});

// start server
app.listen(3000, function() {
  console.log("node server in runing on port 3000...");
});
