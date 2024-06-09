import type { Command } from "@/commands";
import { getUser } from "@/models/User.model";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Get a user's info")
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("The user's username on Anilist")
        .setRequired(true),
    ),

  async execute(interaction) {
    const username = interaction.options.getString("username");

    if (username) {
      const userData = await getUser(username);

      if (userData) {
        const { User: user } = userData.data;

        const embed = new EmbedBuilder()
          .setTitle(`${user.name}'s Profile`)
          .setURL(user.siteUrl)
          .setThumbnail(user.avatar.large)
          .setTimestamp()
          .setFooter({
            text: "AniList Bot By @arch-fan",
          })
          .setColor(0x02a9ff)
          .addFields(
            {
              name: "Username",
              value: user.name,
              inline: true,
            },
            {
              name: "Anime Count",
              value: user.statistics.anime.count.toString(),
              inline: true,
            },
            {
              name: "Manga Count",
              value: user.statistics.manga.count.toString(),
              inline: true,
            },
          )
          .addFields(
            {
              name: "Created at",
              value: new Date(user.createdAt * 1000).toLocaleDateString(),
              inline: true,
            },
            {
              name: "Anime Mean Score",
              value: user.statistics.anime.meanScore.toString(),
              inline: true,
            },
            {
              name: "Manga Mean Score",
              value: user.statistics.manga.meanScore.toString(),
              inline: true,
            },
          );

        await interaction.reply({ embeds: [embed] });
      } else {
        interaction.reply("Username not found!");
      }
    } else {
      await interaction.reply("Username cannot be empty!");
    }
  },
};

export default command;
