import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName('tlds')
    .setDescription('List available TLDs'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    let tlds = await fetch('https://api.buss.lol/tlds', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'webxbot 1.0',
      },
    }).then((res) => res.json()).catch((err) => {
      console.error(err);
      return interaction.editReply('An error occurred while looking up the domain. Please try again later.');
    })

    return interaction.editReply(`Available TLDs: \`${tlds.join(', ')}\``);
  },
};