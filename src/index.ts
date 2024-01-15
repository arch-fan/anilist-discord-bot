import "dotenv/config";
import { GatewayIntentBits, Events } from "discord.js";
import { registerCommands } from "@/commands/index.js";
import { CustomClient } from "./lib/custom.client.js";
import { getCommands } from "@/commands/index.js";

const client = new CustomClient({ intents: [GatewayIntentBits.Guilds] });

for (const command of await getCommands()) {
  client.commands.set(command.data.name, command);
}

client.on(Events.ClientReady, async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  await registerCommands();
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
