import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getUser, initUser } from "../data";

export const data = new SlashCommandBuilder()
    .setName("signup")
    .setDescription("Signup for a Casino Card to start Gamling! (free of charge)");

export async function execute(interaction: CommandInteraction) {
    let usertag = interaction.user.tag;
    if(getUser(usertag) != false){
        interaction.reply("You already have a card!");
        return;
    }
    initUser(interaction.user.tag);
    interaction.reply("Account Created! Try running `/balance`!");
    return;
}
