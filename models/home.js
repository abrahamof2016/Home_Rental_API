const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HomeSchema = new Schema({
	// name: { type: String, required: true },
	description: {type: String },
	address: { type: String, required: true },
	// city: { type: String, required: true },
	state: { type: String },
	owner: { type: Schema.Types.ObjectId, ref: 'Owner', required: true },
	type: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
});

// Virtual for home's URL
HomeSchema.virtual("url").get(function () {
	return `/search/home/${this._id}`;
});

// Exports model
module.exports = mongoose.model("Home", HomeSchema);


