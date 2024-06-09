import type { Command } from "@/commands";
import { Client, type ClientOptions, Collection } from "discord.js";

export class CustomClient extends Client<true> {
  public commands: Collection<string, Command> = new Collection();
}
