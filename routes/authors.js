const express = require("express");
const Author = require("../models/author");
const router = express.Router();

// render all author route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name != "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOption: req.query });
  } catch {
    res.redirect("/");
  }
});

// render new author
router.get("/new", async (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// create author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthur = await author.save();
    // res.redirect(`authors/${newAuthor.id}`);
    res.redirect("authors");
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error Creating Author",
    });
  }
});
module.exports = router;
