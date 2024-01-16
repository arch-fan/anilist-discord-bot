import { SlashCommandBuilder } from "discord.js";
import type { Command } from "@/commands";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Get a user's info")
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("The user's username on Anilist")
        .setRequired(true)
    ),

  async execute(interaction) {
    const username = interaction.options.getString("username");
    await interaction.reply(`The selected user is: ${username}`);
  },
};

export default command;
