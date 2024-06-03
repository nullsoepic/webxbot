import { Events } from "discord.js";
import { ExpandedClient } from "..";

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: ExpandedClient) {
    console.log(`Connected to Gateway (${client.user?.username})`);

    // const guild = await client.guilds.fetch('GUILD_ID_HERE');
    // await guild.commands.set(
    //   client.commands?.map((command) => command.data.toJSON()) ?? []
    // );

    client.application?.commands.set(
      client.commands?.map((command) => command.data.toJSON()) ?? []
    );
  },
};

