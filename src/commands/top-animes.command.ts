import type { Command } from "@/commands";
import { getTopAnimes } from "@/models/TopAnimes.model";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("top-animes")
    .setDescription("Get's the top animes")
    .addNumberOption((option) =>
      option
        .setName("page")
        .setDescription("Page from 1 to Infinite.")
        .setMinValue(1)
        .setMaxValue(999),
    ),
  async execute(interaction) {
    const userSelectedPage = interaction.options.getNumber("page") ?? 1;

    const { page, perPage } = { page: userSelectedPage, perPage: 10 };

    const response = await getTopAnimes(page, perPage);

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
        .setTitle(`Top ${perPage} animes | Page ${page}`)
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
