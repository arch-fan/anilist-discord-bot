import type {
  ChatInputCommandInteraction,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";

export interface Command {
  data: Partial<SlashCommandOptionsOnlyBuilder>;

  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

import topAnimes from "./top-animes.command";
import user from "./user.command";

export const commands: Command[] = [topAnimes, user];
