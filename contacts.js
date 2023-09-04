const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, 'db','contacts.json');


async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        return JSON.parse(data);
    }
    catch(error) {
        console.error(error);
        return [];
    }
};

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        return contacts.find(contact => contact.id === contactId) || null;
    }
    catch(error) {
        console.error(error);
        return null;
    }
};

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        const removedContact = contacts.find(contact => contact.id === contactId);
        if(!removedContact) {
            return null;
        }
        const updatedContact = contacts.filter(contact => contact.id !== contact);
        await fs.writeFile(contactsPath, JSON.stringify(updatedContact, null, 2));
        return removedContact;
    }
    catch(error) {
        console.error(error);
        return null;
    }
};

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        const newContact = { id: Date.now(), name, email, phone };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}