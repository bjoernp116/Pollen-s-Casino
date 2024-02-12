import dotenv from "dotenv"
dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID} = process.env;

if(!DISCORD_TOKEN || !DISCORD_CLIENT_ID)
    throw Error("Missing enviorment variables!");

export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID
}
