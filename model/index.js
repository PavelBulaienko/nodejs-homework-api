const { Contact } = require("./contacts");

const listContacts = async () => {
  try {
    const allContacts = await Contact.find(
      {},
      "_id name email phone favorite createdAt updatedAt"
    );
    return allContacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const soughtContact = await Contact.findById(contactId);
    return soughtContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

const updateFavoriteContact = async (contactId, body) => {
  try {
    const { price } = body;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { price },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteContact,
};
