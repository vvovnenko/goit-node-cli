import { readFile, writeFile } from "fs/promises"
import { resolve } from "path"
import { nanoid } from "nanoid";

const contactsPath = resolve("src", "db", "contacts.json");

const updateContacts = contacts => writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
    const data = await readFile(contactsPath, "utf-8");
    return JSON.parse(data);
}

export async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}

export async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1) return null;
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContacts = {
        name,
        email,
        phone,
        id: nanoid(),
    };
    contacts.push(newContacts);
    await updateContacts(contacts);
    return newContacts;
}
