const express = require("express");
const router = express.Router();

// Require controller modules.
const home_controller = require("../controllers/homeController");
const owner_controller = require("../controllers/ownerController");
const type_controller = require("../controllers/typeController");
const home_instance_controller = require("../controllers/homeinstanceController");

/// HOME ROUTES ///

// GET search home page.
router.get("/", home_controller.index);

// GET request for creating a Home. NOTE This must come before routes that display Home (uses id).
router.get("/home/create", home_controller.home_create_get);

// POST request for creating Home.
router.post("/home/create", home_controller.home_create_post);

// GET request to delete Home.
router.get("/home/:id/delete", home_controller.home_delete_get);

// POST request to delete Home.
router.post("/home/:id/delete", home_controller.home_delete_post);

// GET request to update Home.
router.get("/home/:id/update", home_controller.home_update_get);

// POST request to update Home.
router.post("/home/:id/update", home_controller.home_update_post);

// GET request for one Home.
router.get("/home/:id", home_controller.home_detail);

// GET request for list of all Home items.
router.get("/homes", home_controller.home_list);

/// OWNER ROUTES ///

// GET request for creating Owner. NOTE This must come before route for id (i.e. display owner).
router.get("/owner/create", owner_controller.owner_create_get);

// POST request for creating Owner.
router.post("/owner/create", owner_controller.owner_create_post);

// GET request to delete Owner.
router.get("/owner/:id/delete", owner_controller.owner_delete_get);

// POST request to delete Owner.
router.post("/owner/:id/delete", owner_controller.owner_delete_post);

// GET request to update Owner.
router.get("/owner/:id/update", owner_controller.owner_update_get);

// POST request to update Owner.
router.post("/owner/:id/update", owner_controller.owner_update_post);

// GET request for one Owner.
router.get("/owner/:id", owner_controller.owner_detail);

// GET request for list of all Owners.
router.get("/owners", owner_controller.owner_list);

/// TYPE ROUTES ///

// GET request for creating a Type. NOTE This must come before route that displays Type (uses id).
router.get("/type/create", type_controller.type_create_get);

//POST request for creating Type.
router.post("/type/create", type_controller.type_create_post);

// GET request to delete Type.
router.get("/type/:id/delete", type_controller.type_delete_get);

// POST request to delete Type.
router.post("/type/:id/delete", type_controller.type_delete_post);

// GET request to update Type.
router.get("/type/:id/update", type_controller.type_update_get);

// POST request to update Type.
router.post("/type/:id/update", type_controller.type_update_post);

// GET request for one Type.
router.get("/type/:id", type_controller.type_detail);

// GET request for list of all Type.
router.get("/types", type_controller.type_list);

/// HOMEINSTANCE ROUTES ///

// GET request for creating a HomeInstance. NOTE This must come before route that displays HomeInstance (uses id).
router.get(
  "/homeinstance/create",
  home_instance_controller.homeinstance_create_get,
);

// POST request for creating HomeInstance.
router.post(
  "/homeinstance/create",
  home_instance_controller.homeinstance_create_post,
);

// GET request to delete HomeInstance.
router.get(
  "/homeinstance/:id/delete",
  home_instance_controller.homeinstance_delete_get,
);

// POST request to delete HomeInstance.
router.post(
  "/homeinstance/:id/delete",
  home_instance_controller.homeinstance_delete_post,
);

// GET request to update HomeInstance.
router.get(
  "/homeinstance/:id/update",
  home_instance_controller.homeinstance_update_get,
);

// POST request to update HomeInstance.
router.post(
  "/homeinstance/:id/update",
  home_instance_controller.homeinstance_update_post,
);

// GET request for one HomeInstance.
router.get("/homeinstance/:id", home_instance_controller.homeinstance_detail);

// GET request for list of all HomeInstance.
router.get("/homeinstances", home_instance_controller.homeinstance_list);

module.exports = router;

