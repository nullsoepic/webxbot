import { ChatInputCommandInteraction, Client } from "discord.js"

import { Events } from 'discord.js'

export default {
  name: Events.InteractionCreate,
  /**
   * 
   * @param {Client} client 
   * @param {ChatInputCommandInteraction} interaction 
   * @returns 
   */
  async execute(client, interaction) {
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