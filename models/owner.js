const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
	first_name: { type: String, required: true, maxLength: 100 },
	family_name: { type: String, required: true, maxLength: 100 },
	Email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
	},
});

// Virtual for owner's URL
OwnerSchema.virtual("url").get(function () {
	return `/search/owner/${this._id}`;
});

// Export model
module.exports = mongoose.model("Owner", OwnerSchema); 
