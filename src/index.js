import { program } from "commander";
import { listContacts, addContact, removeContact, getContactById } from "./contacts.js";


program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      return console.table(await listContacts());

    case "get":
      return console.log(await getContactById(id));

    case "add":
      return console.log(await addContact(name, email, phone));

    case "remove":
      return console.log(await removeContact(id));

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
