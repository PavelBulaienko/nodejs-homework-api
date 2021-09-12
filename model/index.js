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
    const soughtContact = await Contact.find(
      { _id: contactId },
      "_id name email phone favorite createdAt updatedAt"
    );
    return soughtContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const deletedContact = await Contact.deleteOne({ _id: contactId });
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
    const updatedContact = await Contact.updateOne(
      { _id: contactId },
      { body }
    );
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

const togleFavoriteContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.updateOne(
      { _id: contactId },
      { body }
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
  togleFavoriteContact,
};
