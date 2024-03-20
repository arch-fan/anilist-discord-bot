import { REST, Routes } from "discord.js";
import { join } from "node:path";
import { readdirSync } from "node:fs";

import type { ChatInputCommandInteraction } from "discord.js";
import type { SlashCommandBuilder } from "discord.js";

export interface Command {
	data: Partial<SlashCommandBuilder>;

	execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export async function getCommands(): Promise<Command[]> {
	const commands: Command[] = [];

	const commandsPath = join(
		process.cwd(),
		process.env.NODE_ENV === "dev" ? "src" : "dist",
		"commands",
	);
	const commandFiles = readdirSync(commandsPath).filter((file) =>
		file.endsWith(
			process.env.NODE_ENV === "dev" ? ".command.ts" : ".command.js",
		),
	);

	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);

		// Should change to ES6 (import statement) but didn't work at compiled coded.
		// object command was showing but default was wrapping the object, this
		// was the old code:
		//    const command: Command | undefined = await import(filePath).then(
		//      (module: { default: Command }) => module.default
		//    );

		const command: Command | undefined = await require(filePath).default;

		if (command?.data) {
			commands.push(command);
		} else {
			console.log(
				`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
			);
		}
	}

	return commands;
}

export async function refreshCommands() {
	const commands = await getCommands().then((com) =>
		com.map((command) => {
			if (command.data.toJSON) return command.data.toJSON();
		}),
	);

	const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

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
