const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());

app.use(cors());

const posts = require("./routes/api/posts");

// Any route that goes to "/api/posts" is going to be directed
// to posts. And then the router will take over from there.
app.use("/api/posts", posts);

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
