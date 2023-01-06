const express = require("express");
const router = express.Router();
const ideas = require("../controllers/ideas");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateIdea } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Idea = require("../models/idea");

router
  .route("/")
  .get(catchAsync(ideas.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateIdea,
    catchAsync(ideas.createIdea)
  );

router.get("/new", isLoggedIn, ideas.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(ideas.showIdea))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateIdea,
    catchAsync(ideas.updateIdea)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(ideas.deleteIdea));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(ideas.renderEditForm));

module.exports = router;
