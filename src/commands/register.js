import { SlashCommandBuilder } from "discord.js";
import { checkLimit, tldChoices, updateLimit } from "../lib";

export default {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register a webx domain')
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
    )
    .addStringOption(option =>
      option.setName('ip')
        .setDescription('IP/Domain/Github Repository')
        .setRequired(true)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @returns 
     */
  async execute(interaction) {
    await interaction.deferReply()
    const name = interaction.options.getString('name');
    const tld = interaction.options.getString('tld');
    const ip = interaction.options.getString('ip');

    if(checkLimit(interaction.user.id)) return interaction.editReply('Could not create the domain. You have reached the maximum number of domains allowed.');

    const response = await fetch(`https://api.buss.lol/domainapi/${process.env.API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tld,
        name,
        ip
      })
    }).then((res) => res.json()).catch((err) => {
      console.error(err);
      return interaction.editReply('An error occurred while registering the domain. Please try again later.');
    })

    updateLimit(interaction.user.id, interaction.user.username, tld);

    const userText = `Your domain has been registered with the following details:\n\nName: ${name}\nTLD: ${tld}\nIP: ${ip}\nSecret Key: ${response.secret_key}`
    await interaction.user.send(userText);

    return interaction.editReply(`Domain registered successfully! I've sent you the secret key`);
  },
};
