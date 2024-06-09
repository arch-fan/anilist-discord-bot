import path from "node:path";
import { getCommands, refreshCommands } from "@/commands";
import { CustomClient } from "@/lib/custom.client";
import { Events, GatewayIntentBits } from "discord.js";

const client = new CustomClient({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, async () => {
	console.log(`Logged in as ${client.user.tag}!`);

	for (const command of await getCommands()) {
		if (command.data.name) {
			client.commands.set(command.data.name, command);
		}
	}

	await refreshCommands();
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	}
});

client.login(process.env.TOKEN);
