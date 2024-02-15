import { CommandInteraction, RoleResolvable, SlashCommandBuilder } from "discord.js";
import { getMoney } from "../data";

export const data = new SlashCommandBuilder()
    .setName("blackjack")
    .setDescription("Get as close to 21 as possible! (whitout going over)")
    .addIntegerOption(option=>
        option
            .setName("bet")
            .setDescription("How much Are you Wagaring?")
            .setRequired(true));
interface Card{
    name: string;
    value: number;
}
const DECK = [":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:", ":keycap_ten:", ":prince:", ":princess:", ":crown:", ":a:"];
const VALUE = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
function drawcard():Card{
    let i = Math.floor(Math.random()*13);
    return {name:DECK[i], value: VALUE[i]};
}
function calchand(cards: Array<Card>): [number, boolean]{
    let sum: number = 0;
    let soft = false;
    for(let card of cards as Card[]){
        sum += card.value;
        if(card.name == "A")
            soft=true;
    }
    return [sum, soft];
}
export async function execute(interaction: any) {
    let D: Array<Card> = [];
    let Y: Array<Card> = [];
    D.push(drawcard());
    Y.push(drawcard());
    Y.push(drawcard());
    let [Dv, Ds] = calchand(D);
    let [Yv, Ys] = calchand(Y);
    let embed = {
        title: "Blackjack!",
        description: "Hit on 16, stand on 17.",
        fields: [
            {name:"Dealer:", value: `${D.map(x=>x.name).join("")} (${Dv})${Ds?"/":""}`},
            {name:"You:", value: `${Y.map(x=>x.name).join("")} (${Yv})${Ys?"/":""}`}
        ]
    };
    interaction.channel.send({embeds: [embed]});

}
