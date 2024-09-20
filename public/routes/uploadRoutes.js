const express = require("express");
const multer = require("multer");
const Article = require("../models/article"); //  Article Model
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload/:articleId", upload.single("image"), async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      return res
        .status(404)
        .json({ status: "fail", message: "Article not found" });
    }

    article.image = `/uploads/images/${req.file.filename}`;
    await article.save();

    res.status(201).json({
      status: "success",
      message: "Image uploaded and added to the article successfully",
      file: req.file,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
});

module.exports = router;
