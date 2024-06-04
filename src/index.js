import {
  Client,
  Collection,
  GatewayIntentBits as Intents,
} from "discord.js";
import fs from "fs";


const client = new Client({
  intents: [Intents.DirectMessages],
});

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".ts"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".ts"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`).default;

  if (event.once) {
    client.once(event.name, (...args) => event.execute(client, ...args));
  } else {
    client.on(event.name, (...args) => event.execute(client, ...args));
  }
}

client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`).default;
  client.commands.set(command.data.name, command);
}

client.login(process.env.DISCORD_TOKEN);
