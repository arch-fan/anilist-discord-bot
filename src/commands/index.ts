import { REST, Routes } from "discord.js";
import type { Command } from "./commands.js";
import path from "path";
import fs from "fs";

export async function getCommands(): Promise<Command[]> {
  const commands: Command[] = [];
  const commandsPath = path.join(import.meta.url, "src", "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".command.ts"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command: Command = await import(filePath);

    if (command.data) {
      commands.push(command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }

  return commands;
}

export async function registerCommands() {
  const commands = [
    {
      name: "ping",
      description: "Replies with Pong!",
    },
  ];

  const rest = new REST().setToken(process.env.TOKEN);

  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
