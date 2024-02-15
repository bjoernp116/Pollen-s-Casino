import { CommandInteraction, RoleResolvable, SlashCommandBuilder } from "discord.js";
import { getLeaderboard, getMoney } from "../data";

export const data = new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Look at all that competition!");

export async function execute(interaction: any) {
    let lb = getLeaderboard();
    let f: Array<Object> = [];
    for(let i = 0; i < lb.length; i++){
       f.push({name:(i+1)+". "+lb[i].tag, value:lb[i].money+"$"});
    }
    let embed = {
        title:"Leaderboard",
        fields:f
    };

    return interaction.channel.send({embeds: [embed]});
}
