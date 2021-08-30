const express = require("express");
const router = express.Router();

const ctrl = require("../../model/index");
const { joiContactSchema } = require("../../validation/contactSchema");

router.get("/", async (_, res, next) => {
  try {
    const allContacts = await ctrl.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const soughtContact = await ctrl.getContactById(contactId);
    if (soughtContact) {
      return res.json(soughtContact);
    } else {
      return res.status(404).json({
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const newContact = await ctrl.addContact(req.body);

    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const soughtContact = await ctrl.getContactById(contactId);
    if (soughtContact) {
      await ctrl.removeContact(contactId);
      return res.json({ message: "contact deleted" });
    } else {
      return res.status(404).json({
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { contactId } = req.params;
    const newContact = await ctrl.updateContact(contactId, req.body);

    if (!newContact) {
      return res.status(400).json({ message: "Not found" });
    } else {
      res.json(newContact);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
