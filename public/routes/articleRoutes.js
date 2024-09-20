const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const { protect, restrictTo } = require("../middleware/authMiddleware");

// create a newArticle

router.post("/", protect, restrictTo("admin"), async (req, res) => {
  try {
    const newArticle = await Article.create({
      ...req.body,
      author: req.user._id,
    });
    res.status(201).json({
      status: "success",
      data: {
        article: newArticle,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fall",
      message: err.message,
    });
  }
});

// Get all articles (admin and guest)

router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json({
      status: "success",
      results: articles.length,
      data: {
        articles,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

// Update an article (Admin Only)

router.put("/:id", protect, restrictTo("admin"), async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedArticle) {
      return res.status(404).json({
        status: "fail",
        message: "No article found with that ID",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

// Delete an article (Admin Only)

router.delete("/:id", protect, restrictTo("admin"), async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({
        status: "fail",
        message: "No article found with that ID",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

module.exports = router;
