import { CommandInteraction, RoleResolvable, SlashCommandBuilder } from "discord.js";
import { getMoney } from "../data";

export const data = new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check out your money!")
    .addUserOption(option=>
        option
            .setName("target")
            .setDescription("Look at other peoples money")
            .setRequired(false));
export async function execute(interaction: any) {
    let target = interaction.options.getUser("target") ?? false;
    let msg = "You have ";
    if(target!=false){
        interaction.reply(target.tag+" has **"+getMoney(target.tag)+"$**");
    }
    if(!interaction.member?.roles.cache.has("1207714834041413693") && getMoney(interaction.user.tag)>1000){
        msg = "Congratulations, you are officially addicted to this game! You hve ";
        interaction.member.roles.add("1207714834041413693");
    
    }
    if(interaction.member?.roles.cache.has("1207714834041413693") && getMoney(interaction.user.tag)<1000){
        msg = "You sadly lost you role as addicted :(. You have mearly ";
        interaction.member.roles.remove("1207714834041413693");
    }
    return interaction.reply(msg+getMoney(interaction.user.tag)+"$!");

}
