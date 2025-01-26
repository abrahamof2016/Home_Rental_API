#! /usr/bin/env node

console.log(
	'This script populates some test home, owner, type and homeinstances to your database. specified database as argument - e.g: node populatedb "mongodbURL"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Home = require("./models/home");
const Owner = require("./models/owner");
const Type = require("./models/type");
const HomeInstance = require("./models/homeinstance");

const types = [];
const owners = [];
const homes = [];
const homeinstances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
	console.log("Debug: About to connect");
	await mongoose.connect(mongoDB);
	console.log("Debug: Should be connected?");
	await createTypes();
	await createOwners();
	await createHomes();
	await createHomeInstances();

	console.log("Debug: Closing mongoose");
	mongoose.connection.close();
}

async function typeCreate(index, name) {
	const type = new Type({ name: name });
	await type.save();
	types[index] = type;
	console.log(`Adding type: ${name}`);
}

async function ownerCreate(index, first_name, family_name, Email) {
	const ownerdetail = { first_name: first_name, family_name: family_name, Email: Email };

	const owner = new Owner(ownerdetail);

	await owner.save();
	owners[index] = owner;
	console.log(`Adding owner: ${first_name} ${family_name}`);
}

async function homeCreate(index, description, address, state, owner, type) {
	const homedetail = {
		description: description,
		address: address,
		owner: owner,
		type: type,
	};
	if (state != false) homedetail.state = state;

	const home = new Home(homedetail);
	await home.save();
	homes[index] = home;
	console.log(`Adding home: ${description}`);
}

async function homeInstanceCreate(index, home, status) {
	const homeinstancedetail = {
		home: home
	};

	if (status != false) homeinstancedetail.status = status;

	const homeinstance = new HomeInstance(homeinstancedetail);
	await homeinstance.save();
	homeinstances[index] = homeinstance;
	console.log(`Added homeinstance: ${status}`);
}

async function createTypes() {
	console.log("Adding types");
	await Promise.all([
		typeCreate(0, "Apartment"),
		typeCreate(1, "Condominium"),
		typeCreate(2, "Primary Residence"),
		typeCreate(3, "Vacation Home"),
	]);
}

async function createOwners() {
	console.log("Adding owner");
	await Promise.all([
		ownerCreate(0, "Abraham", "Demesse", "jarageda9@gmail.com"),
                ownerCreate(1, "Elias", "Regasa", "eliasregasa@gmail.com"),
		ownerCreate(2, "Kaleb", "Lemesa", "kaleblemesa@gmail.com"),
		ownerCreate(3, "Oda", "Birbirsa", "odabirbirsa@gmail.com"),
		ownerCreate(4, "Tawabech", "Lata", "tawabechlata@gmail.com"),

	]);
}

async function createHomes() {
	console.log("Adding Homes");
	await Promise.all([
		homeCreate(
			0,
			"Cozy Apartment available for rent in Bishoftu City. Features 2 bedrooms, 2 bathrooms, and 1 modern kitchen",
			"Ethiopia, Bishoftu City, Kebele 01",
			"Oromia",
			owners[0],
			types[0]
		),
		homeCreate(
                        1,
                        "Cozy Apartment available for rent in Adama City. Features 2 bedrooms, 2 bathrooms, and 1 modern kitchen",
                        "Ethiopia, Adama City, Kebele 01",
                        "Oromia",
                        owners[0],
                        types[0]
                ),
		homeCreate(
                        2,
                        "Cozy Vacation Home available for rent in Hawasa City. Features 2 bedrooms, 2 bathrooms, and 1 modern kitchen",
                        "Ethiopia, Hawasa City, Kebele 01",
                        "Sidama",
                        owners[3],
                        types[3]
                ),
		homeCreate(
                        3,
                        "Cozy Condominium available for rent in Bishoftu City. Features 2 bedrooms, 2 bathrooms, and 1 modern kitchen",
                        "Ethiopia, Mekele City, Kebele 01",
                        "Tigray",
                        owners[1],
                        types[1]
                ),
		homeCreate(
                        4,
                        "Cozy Primary Residence available for rent in Bishoftu City. Features 2 bedrooms, 2 bathrooms, and 1 modern kitchen",
                        "Ethiopia, Bishoftu City, Kebele 04",
                        "Oromia",
                        owners[2],
                        types[2]
                ),
	])
}

async function createHomeInstances() {
	console.log("Adding HomeInstances");
	await Promise.all([
		homeInstanceCreate(
			0,
			homes[0],
			"Rented",
		),
		homeInstanceCreate(
                        1,
                        homes[1],
                        "Reserved",
                ),
		homeInstanceCreate(
                        2,
                        homes[0], 
                )
	])
}
