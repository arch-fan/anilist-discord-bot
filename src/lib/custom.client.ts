import { Client, Collection, type ClientOptions } from "discord.js";
import type { Command } from "@/commands";

export class CustomClient extends Client<true> {
  public commands: Collection<string, Command> = new Collection();
}
