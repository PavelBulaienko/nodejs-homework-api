const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  return fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data.toString()))
    .catch((err) => console.log(err.message));
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const soughtContact = allContacts.find(
    (contact) => contact.id.toString() === contactId.toString()
  );

  if (soughtContact) {
    return soughtContact;
  } else {
    return null;
  }
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const newContacts = allContacts.filter((contact) => contact.id !== contactId);

  fs.writeFile(contactsPath, JSON.stringify(newContacts));
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const indx = allContacts.findIndex((contact) => contact.id === contactId);
  if (indx === -1) {
    return null;
  }
  allContacts[indx] = { ...allContacts[indx], ...body };
  fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return allContacts[indx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
