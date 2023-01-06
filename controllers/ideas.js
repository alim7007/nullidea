const Idea = require("../models/idea");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const ideas = await Idea.find({});
  res.render("ideas/index", { ideas });
};

module.exports.renderNewForm = (req, res) => {
  res.render("ideas/new");
};

module.exports.createIdea = async (req, res, next) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.idea.location,
      limit: 1,
    })
    .send();
  const idea = new Idea(req.body.idea);
  idea.geometry = geoData.body.features[0].geometry;
  idea.author = req.user._id;
  await idea.save();
  console.log(idea);
  req.flash("success", "Successfully made a new idea!");
  res.redirect(`/ideas/${idea._id}`);
};

module.exports.showIdea = async (req, res) => {
  const idea = await Idea.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!idea) {
    req.flash("error", "Cannot find that idea!");
    return res.redirect("/ideas");
  }
  res.render("ideas/show", { idea });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const idea = await Idea.findById(id);
  if (!idea) {
    req.flash("error", "Cannot find that idea!");
    return res.redirect("/ideas");
  }
  res.render("ideas/edit", { idea });
};

module.exports.updateIdea = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const idea = await Idea.findByIdAndUpdate(id, {
    ...req.body.idea,
  });
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  await idea.save();
  req.flash("success", "Successfully updated idea!");
  res.redirect(`/ideas/${idea._id}`);
};

module.exports.deleteIdea = async (req, res) => {
  const { id } = req.params;
  await Idea.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted idea");
  res.redirect("/ideas");
};
