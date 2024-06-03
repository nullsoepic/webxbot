import type { ChatInputCommandInteraction } from "discord.js"
import type { ExpandedClient } from ".."

import { Events } from 'discord.js'

export default {
  name: Events.InteractionCreate,
  async execute(client: ExpandedClient, interaction: ChatInputCommandInteraction) {
    if (!interaction.isCommand()) return;

    const command = client.commands?.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error while executing this command!');
    }
  }
}