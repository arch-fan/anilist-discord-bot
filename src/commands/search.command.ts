import type { Command } from "@/commands";
import { searchAnimes } from "@/fetchers/search.fetcher";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("Search for an anime")
    .addStringOption((option) =>
      option.setName("query").setDescription("Search query").setRequired(true),
    )
    .addNumberOption((option) =>
      option
        .setName("page")
        .setDescription("Page from 1 to Infinite.")
        .setMinValue(1)
        .setMaxValue(999),
    ),
  async execute(interaction) {
    const userSelectedPage = interaction.options.getNumber("page") ?? 1;
    const query = interaction.options.getString("query");

    const { page, perPage } = { page: userSelectedPage, perPage: 10 };

    const response = await searchAnimes(query, page, perPage);

    if (response) {
      const animes = response.data.Page.media;

      const description = animes
        .map(
          (anime, index) =>
            `**[${index + 1 + 10 * (page - 1)}. ${anime.title.romaji}](${
              anime.siteUrl
            })**`,
        )
        .join("\n");

      const embed = new EmbedBuilder()
        .setTitle(`Results for "${query}" | Page ${page}`)
        .setTimestamp()
        .setFooter({
          text: "AniList Bot By @arch-fan",
        })
        .setColor(0x02a9ff)
        .setDescription(description)
        .setThumbnail(animes[0].coverImage.medium);

      interaction.reply({ embeds: [embed] });
    } else {
      interaction.reply(
        "There was an error recovering data. Please try again later.",
      );
    }
  },
};

export default command;
