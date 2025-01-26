const Owner = require("../models/owner");
const Home = require("../models/home");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Owners.
exports.owner_list = asyncHandler(async (req, res, next) => {
	const allOwners = await Owner.find().sort({ family_name: 1}).exec();
	
	res.render("owner_list", {
		title: "Owner List",
		owner_list: allOwners,
	});
});

// Display detail page for a specific Owner.
exports.owner_detail = asyncHandler(async (req, res, next) => {
	// Get detials of owner and all their homes (in parallel)
	const [owner, allHomesByOwner] = await Promise.all([
		Owner.findById(req.params.id).exec(),
		Home.find({ owner: req.params.id }, "description address").exec(),
	]);

	if (owner === null) {
		// No results.
		const err = new Error("Owner not found");
		err.status = 404;
		return next(err);
	}

	res.render("owner_detail", {
		title: "Owner Detail",
		owner: owner,
		owner_homes: allHomesByOwner,
	});
});

// Display Owner create form on GET.
exports.owner_create_get = (req, res, next) => {
	res.render("owner_form", { title: "Create Owner" });
};

// Handle Owner create on POST.
exports.owner_create_post = [
	// Validate and sanitize fields.
	body("first_name")
	.trim()
	.isLength({ min: 1 })
	.escape()
	.withMessage("First name must be specified")
	.isAlphanumeric()
	.withMessage("First name has not alphnumeric character"),

	body("family_name")
	.trim()
	.isLength({ min: 1 })
	.escape()
	.withMessage("Family name must be specified")
	.isAlphanumeric()
	.withMessage("Family name has non-alphanumeric character"),

	body("Email", "Invalid Email address"),

	// Process request after validation and sanitization
	asyncHandler(async (req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		// Craate Author object with escaped and trimmed data.
		const owner = new Owner({
			first_name: req.body.first_name,
			family_name: req.body.family_name,
			Email: req.body.Email,
		});

		if (!errors.isEmpty()) {
			// There are errors Render form again with sanitized values / error messages
			res.render("owner_form", {
				title: "Create Owner", 
				owner: owner,
				errors: errors.arry(),
			});
			return;
		} else {
			// Data from form is valid.

			// Save owner.
			await owner.save();
			// Redirect to new owner record.
			res.send(`Owner ${req.body.family_name} added succesfully`);
		}
	}),
];

// Display Owner delete form on GET.
exports.owner_delete_get = asyncHandler(async (req, res, next) => {
	// Get details of owner and all their homes (in parallel)
	const [owner, allHomesByOwner] = await Promise.all([
		Owner.findById(req.params.id).exec(),
		Home.find({ owner: req.params.id }, "address description").exec()
	]);

	if (owner === null) {
		// No results.
		res.redirect("/search/owners");
	}

	res.render("owner_delete", {
		title: "Delete Owner",
		owner: owner,
		owner_homes: allHomesByOwner,
	});
});

// Handle Owner delete form on POST.
exports.owner_delete_post = asyncHandler(async (req, res, next) => {
	// Get details of owner and all their homes (in parallel)
	const [owner, allHomesByOwner] = await Promise.all([
		Owner.findById(req.params.id).exec(),
		Home.find({ owner: req.params.id }, "address description").exec(),
	]);

	if (allHomesByOwner.length > 0) {
		// Owners has homes. Render in same way as for GET route.
		res.render("owner_delete", {
			title: "Delete Owner",
			owner: owner,
			owner_homes: allHomesByOwner,
		});
		return;
	} else {
		// Owners has no homes. Delete object and redirect to the list of owners.
		await Owner.findByIdAndDelete(req.body.ownerid);
		res.redirect("/search/owners");
	}
});

// Display Owner update form on GET.
exports.owner_update_get = asyncHandler(async (req, res, next) => {
	res.send("Not IMPLEMENTED: Owner update GET");
});

// Handle Owner update form on POST.
exports.owner_update_post = asyncHandler(async (req, res, next) => {
	res.send("Not IMPLEMENTED: Owner update POST");
});
