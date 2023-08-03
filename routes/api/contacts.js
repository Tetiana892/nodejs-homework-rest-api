const express = require("express");
const ctrl = require("../../controlers/contacts");
const router = express.Router();
const schemas = require("../../schemas/contacts");
const { validateBody } = require("../../middlewares");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", ctrl.removeContact);

router.put("/:id", validateBody(schemas.addPutSchema), ctrl.updateContact);

module.exports = router;
