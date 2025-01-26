const Home = require("../models/home");
const Owner = require("../models/owner");
const Type = require("../models/type");
const HomeInstance = require("../models/homeinstance");
const { body, validationResult } = require("express-validator");


const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
	// Get details of homes, home instances, owners and type counts (in parallel)
	const [
		numHomes,
		numHomeInstances,
    		numAvailableHomeInstances,
		numOwners,
		numTypes,
	] = await Promise.all([
		Home.countDocuments({}).exec(),
    		HomeInstance.countDocuments({}).exec(),
    		HomeInstance.countDocuments({ status: "Available" }).exec(),
    		Owner.countDocuments({}).exec(),
    		Type.countDocuments({}).exec(),
	]);

	res.render("index", {
		title: "Home Rental Home Page",
		home_count: numHomes,
		home_instance_count: numHomeInstances,
    		home_instance_available_count: numAvailableHomeInstances,
		owner_count: numOwners,
		type_count: numTypes,
	});
});

// Display list of all homes.
exports.home_list = asyncHandler(async (req, res, next) => {
  const allHomes = await Home.find({}, "description owner")
	.populate("owner")
	.exec();

	res.render("home_list", { title: "Home List", home_list: allHomes });
});
// Display detail page for a specific home.
exports.home_detail = asyncHandler(async (req, res, next) => {
	// Get details of homes, home instances for specific home.
	const [home, homeInstances] = await Promise.all([
		Home.findById(req.params.id).populate("owner").populate("type").exec(),
		HomeInstance.find({ home: req.params.id }).exec(),
	]);

	if (home === null) {
		// No results.
		const err = new Error("Home not found");
		err.status = 404;
		return next(err);
	}

	res.render("home_detail", {
		title: home.description,
		home: home,
		home_instances: homeInstances,
	});
});

// Display detail page for a specific Owner.
exports.owner_detial = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Owner detial: ${req.params.id}`);
})

// Display home create form on GET.
exports.home_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Home create GET");
});

// Handle home create on POST.
exports.home_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Home create POST");
});

// Display home delete form on GET.
exports.home_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Home delete GET");
});

// Handle home delete on POST.
exports.home_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Home delete POST");
});

// Display home update form on GET.
exports.home_update_get = asyncHandler(async (req, res, next) => {
	// Get home, owners and types for form.
	const [home, allOwners, allTypes] = await Promise.all([
		Home.findById(req.params.id).populate("owner").exec(),
		Owner.find().sort({ family_name: 1 }).exec(),
		Type.find().sort({ name: 1 }).exec(),
	]);

	if (home === null) {
		// No results.
		const err = new Error("Home not found");
		err.status = 404;
		return next(err);
	}

	// Mark our selected types as checked.
	allTypes.forEach((type) => {
		if (home.type.includes(type._id)) type.checked = "true";
	});

	res.render("home_form", {
		title: "Update Home",
		owners: allOwners,
		types: allTypes,
		home: home,
	});
});

// Handle home update on POST.
exports.home_update_post = [
	// Convert the type to an array.
	(req, res, next) => {
		if (!Array.isArray(req.body.type)) {
			req.body.type =
				typeof req.body.type === "undefined" ? [] : [req.body.type];
		}
		next();
	},

	// Validate and sanitize fields.
	body("address", "Address must not be empty.")
	.trim()
	.isLength({ min: 1 })
	.escape(),

	body("owner", "Owner must not be empty.")
	.trim()
	.isLength({ min: 1 })
	.escape(),

	body("description", "Description must not be empty.")
	.trim()
	.isLength({ min: 1 })
	.escape(),

	body("state", "State must not be empty.")
	.trim()
	.isLength({ min: 1 })
	.escape(),

	// Process request after validation and sanitization.
	
	asyncHandler(async (req, res, next) => {
		// Extract the validation errors from a reques.
		const errors = validationResult(req);

		// Create a Home object with escaped/trimmed data and old id.
		const home = new Home({
			description: req.body.description,
			address: req.body.address,
			state: req.body.state,
			owner: req.body.owner,
			type: typeof req.body.type === "undefined" ? [] : req.body.type,
			_id: req.params.id, // This is required, or a new ID will be assigned!
		});

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.
			
			// Get all owners and types for form

			const [allOwners, allTypes] = await Promise.all([
				Owner.find().sort({ family_name: 1 }).exec(),
				Type.find().sort({ name: 1 }).exec(),
			]);

			// Mark our selected types as checked.
			for (const type of allTypes) {
				if (home.type.indexOf(type._id) > -1) {
					type.checked = "true";
				}
			}

			res.render("home_form", {
				title: "Update Home",
				owners: allOwners,
				types: allTypes,
				home: home,
				errors: errors.array(),
			});

			return;
		} else {
			// Data from form is valid, Update the record.
			const updateHome = await Home.findByIDAndUpdate(req.params.id, home, {});

			// Redirect to home detail page.
			res.redirect(updateHome.url);
		}
	}),
];
