const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HomeInstanceSchema = new Schema({
	home: { type: Schema.Types.ObjectId, ref: "Home", required: true }, // reference to the associated home.
	status: {
		type: String,
		required: true,
		enum: ["Available", "Rented", "Reserved"], 
		default: "Available",
	},
});

// Virtual for homeinstance's URL
HomeInstanceSchema.virtual("url").get(function () {
	return `/search/homeinstance/${this._id}`;
});

// Export model
module.exports = mongoose.model("HomeInstance", HomeInstanceSchema);

