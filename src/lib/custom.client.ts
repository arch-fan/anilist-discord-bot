import type { Command } from "@/commands";
import { Client, Collection } from "discord.js";

export class DiscordClient extends Client<true> {
  public commands: Collection<string, Command> = new Collection();
}
