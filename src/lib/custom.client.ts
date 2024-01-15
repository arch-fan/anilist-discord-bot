import { Client, Collection, type ClientOptions } from "discord.js";
import type { Command } from "@/commands/commands.js";

export class CustomClient extends Client<true> {
  public commands: Collection<string, Command> = new Collection();

  constructor(options: ClientOptions) {
    super(options);
  }
}
