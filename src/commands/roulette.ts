import { SlashCommandBuilder, EmbedBuilder} from "discord.js";
import { getMoney } from "../data";
const BOARD: Array<string> = ['🟩','🟥','⬛','🟥','⬛','🟥','⬛','🟥','⬛','🟥','⬛','⬛','🟥','⬛','🟥','⬛','🟥','⬛','🟥','🟥','⬛','🟥','⬛','🟥','⬛','🟥','⬛','🟥','⬛','⬛','🟥','⬛','🟥','⬛','🟥','⬛','🟥'];
const NUMS: Array<string>  = [':zero:',':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:'];
function clamp(n:number, s = 36){
    while(n > s){
       n-=s; 
    }
    while(n < 0){
        n+=s;
    }
    return n;
}
export const data = new SlashCommandBuilder()
    .setName("roulette")
    .setDescription("Play The Classic Game of Roulette!")
    .addIntegerOption(option =>
        option.setName('bet')
            .setDescription('How much money do you want to wager?')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('color')
            .setDescription('Place Your bet on a color. Pays 2:1 (green pays 31:1)')
            .addChoices(
                { name: 'Red', value: 'Red'},
                { name: 'Black', value: 'Black'},
                { name: 'Green', value: 'Green'}));

export async function execute(interaction: any) {
    const usertag = interaction.user.tag;
    const bet = interaction.options.getInteger('bet');
    const color = interaction.options.getString('color');
    if(getMoney(usertag)<bet){
        interaction.reply("You do not have "+bet+"$!");
        return;
    }
    let roll = Math.floor(Math.random()*36);
    
    let cRow = [BOARD[clamp(roll-2)], BOARD[clamp(roll-1)], BOARD[clamp(roll)], BOARD[clamp(roll+1)], BOARD[clamp(roll+2)]];
    let n1Row:Array<string>=[];// = [NUMS[clamp(digits[0]-2, 10)], NUMS[clamp(digits[0]-1, 10)], NUMS[clamp(digits[0], 10)], NUMS[clamp(digits[0]+1, 10)], NUMS[clamp(digits[0]+2, 10)]];
    let n2Row:Array<string>=[];// = [NUMS[clamp(digits[1]-2, 10)], NUMS[clamp(digits[1]-1, 10)], NUMS[clamp(digits[1], 10)], NUMS[clamp(digits[1]+1, 10)], NUMS[clamp(digits[1]+2, 10)]];
    for(let i = -2; i < 3; i++){
        let d: Array<string> = Array.from((roll+i).toString());
        if(d.length==1){
            d.unshift("0");
        }
        n1Row.push(NUMS[clamp(parseInt(d[0]), 10)]);
        n2Row.push(NUMS[clamp(parseInt(d[1]), 10)]);
    }
    
    console.log(roll);    
    console.log(cRow);
    console.log(n1Row);
    console.log(n2Row);
    const rouletteEmbed = new EmbedBuilder()
        .setColor("#c93434")
        .setTitle("Roulette!")
        .setDescription(`Betting ${bet} on ${color}`)
        .addFields(
            { name: `The ball landed on ${cRow[2]}**${roll}**!`, value:`${cRow.join("")}\n${n1Row.join("")}\n${n2Row.join("")}\n${cRow.join("")}`}
        ); 
   interaction.channel.send({ embeds: [rouletteEmbed]});    
   return;
}
