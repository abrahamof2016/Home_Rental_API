const HomeInstance = require("../models/homeinstance");
const asyncHandler = require("express-async-handler");

// Display list of all HomeInstance.
exports.homeinstance_list = asyncHandler(async (req, res, next) => {
	const allHomeInstances = await
		HomeInstance.find().populate("home").exec();

	res.render("homeinstance_list", {
		title: "Home Instance List",
		homeinstance_list: allHomeInstances,
	});
});

// Display detail page for a specific HomeInstance.
exports.homeinstance_detail = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: HomeInstance detial: ${req.params.id}`);
});


// Display HomeInstance create form on GET.
exports.homeinstance_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: HomeInstance create GET");
});

// Handle HomeInstance create on POST.
exports.homeinstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: HomeInstance create POST");
});

// Display HomeInstance delete form on GET.
exports.homeinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: HomeInstance delete GET");
});

// Handle HomeInstance delete on POST.
exports.homeinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: HomeInstance delete POST");
});

// Display HomeInstance update form on GET.
exports.homeinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: HomeInstance update GET");
});

// Handle Homeinstance update on POST.
exports.homeinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: HomeInstance update POST");
});
