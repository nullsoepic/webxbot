import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { tldChoices } from "../lib";

export default {
  data: new SlashCommandBuilder()
    .setName('whois')
    .setDescription('Look up an existing domain')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('Domain name')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('tld')
        .setDescription('Top Level Domain')
        .addChoices(...tldChoices())
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    let name = interaction.options.getString('name')!;
    let tld = interaction.options.getString('tld')!;

    await interaction.deferReply()
    let tlds = await fetch(`https://api.buss.lol/domain/${name}/${tld}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'webxbot 1.0',
      },
    }).then((res) => res.json()).catch((err) => {
      console.error(err);
      return interaction.editReply('An error occurred while looking up the domain. Please try again later.');
    })

    return interaction.editReply(`Domain details for ${name}.${tld}:\n\nName: ${tlds.name}\nTLD: ${tlds.tld}\nIP: ${tlds.ip}`);
  },
};