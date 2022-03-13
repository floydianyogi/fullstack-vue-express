const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get Posts

// Now this doesn't mean localhost or whateverourdomain"/"
// it actually means "/api/posts" because we directed
// "/api/posts" to posts file, so just putting "/"
// actually references "/api/posts"
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();

  // I want to send basically just an array of posts that
  // are in the database.

  res.send(await posts.find({}).toArray());
  // That should return our posts with a 200 response
});

// Add Post

router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();

  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

// Delete Post
// With delete, we need a specific post to delete.
// We're going to send that along in the URL.
// So, we're gonna say "/:id", which is gonna
// represent whatever the "id" is.

router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();

  // Here we want to put our query, so what do we want
  // to delete by, it's gonna be the "id", so I want to do
  // "_id:", now to get this, whatever is passed into the
  // parameter, we can get that with request.params.whateverwecallthis
  // which in this case is "id" (req.params.id), so that'll
  // get the actual id, but when you're using the MongoDB driver,
  // this, the "id" is a special type of type or special type
  // of field and it's an object id. So far this to work correctly
  // we actually have to wrap this in a special method called
  // ObjectID that's attached to the MongoDB client, so we actually
  // want to do ({_id: new mongodb.ObjectID(req.params.id)})

  await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.status(200).send();
});

// Function to connect to our post collection
// so, this is just a function we're going to use
// within our routes to get the post collection
// so that we can run methods on it like
// inserts and deletes and gets and find etc.
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://berko:bekocann@vueexpress.nif8z.mongodb.net/vueExpress?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );
  return client.db("vueExpress").collection("posts");
}
module.exports = router;
