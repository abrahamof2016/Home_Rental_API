const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HomeTypeSchema = new Schema({
	name: {
		type: String,
		required: true,
		enum: ["Primary Residence", "Vacation Home", "Apartment", "Condominium"]
	}
});

// Virtual for type's URL
HomeTypeSchema.virtual("url").get(function () {
	return `/search/homeinstance/${this._id}`;
});

// Export model
module.exports = mongoose.model("Type", HomeTypeSchema);
