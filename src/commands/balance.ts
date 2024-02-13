import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getMoney } from "../data";

export const data = new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check out your money!");

export async function execute(interaction: CommandInteraction) {
    return interaction.reply(getMoney(interaction.user.tag)+"$!");
}
