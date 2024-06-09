import { styleText } from "node:util";
import { getCommands } from "@/commands";
import { DiscordClient } from "@/lib/custom.client";
import {
  Events,
  GatewayIntentBits,
  REST,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";

const client = new DiscordClient({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, async () => {
  console.log(styleText("blueBright", `Logged in as ${client.user.tag}!`));

  // Fill command collection of discord instance
  for (const command of await getCommands()) {
    if (command.data.name) {
      client.commands.set(command.data.name, command);
    }
  }

  // Refresh slash commands
  const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

  for (const command of client.commands.values()) {
    commands.push(command.data.toJSON());
  }

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
