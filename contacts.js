const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

const writeFile = async (data, path = contactsPath) => {
  await fs.writeFile(path, JSON.stringify(data), "utf8");
};

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      return data;
    });

    console.table(JSON.parse(contacts));

    return JSON.parse(contacts);
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => String(id) === String(contactId));

    console.log(`Contact with id ${contactId} :`);
    console.table(contact);

    return contact;
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updateContacts = contacts.filter(
      ({ id }) => String(id) !== String(contactId)
    );

    await writeFile(updateContacts);

    console.log("Updated list after remove");
    listContacts();
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: String(Date.now()),
      name,
      email,
      phone,
    };
    const updateContacts = contacts.concat(newContact);
    await writeFile(updateContacts);

    console.log("Updated list after added contact");
    listContacts();
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
