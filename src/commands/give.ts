import { CommandInteraction, RoleResolvable, SlashCommandBuilder } from "discord.js";
import { getMoney, setMoney } from "../data";

export const data = new SlashCommandBuilder()
    .setName("give")
    .setDescription("Give money to a friend! (or an enemy)")
    .addIntegerOption(option=>
        option
            .setName("cash")
            .setDescription("How much are you giving?")
            .setRequired(true))
    .addUserOption(option=>
        option
            .setName("user")
            .setDescription("Who are you sending to?")
            .setRequired(true));
export async function execute(interaction: any) {
    const target = interaction.options.getUser('user');
    const cash = interaction.options.getInteger('cash');
    if(getMoney(interaction.user.tag)<cash)
        return interaction.reply("You dont have that much");
    
    setMoney(target.tag, cash, true);
    setMoney(interaction.tag, -cash, true);

    return interaction.reply("Gave "+cash+" to "+target.tag);

}
