import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { Command } from "@/commands";
import { getTopAnime } from "@/models/TopAnimes.model";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("top-animes")
    .setDescription("Get's the top animes"),
  async execute(interaction) {
    const { page, perPage } = { page: 1, perPage: 10 };
    const response = await getTopAnime({ page, perPage });

    if (!response) {
      throw new Error("No se pudo obtener los animes");
    }

    const animes = response.data.Page.media;

    const description = `
    ${animes
      .map(
        (anime, index) =>
          `**[${index + 1 + 10 * (page - 1)}. ${anime.title.romaji}](${
            anime.siteUrl
          })**`
      )
      .join("\n")}
    `;

    const embed = new EmbedBuilder()
      .setTitle(`Top ${perPage} animes | Page ${page}`)
      .setTimestamp()
      .setFooter({
        text: "AniList Bot By @arch-fan",
      })
      .setColor(0x02a9ff)
      .setDescription(description);

    interaction.reply({ embeds: [embed] });
  },
};

export default command;
