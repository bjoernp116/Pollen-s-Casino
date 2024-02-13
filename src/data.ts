import fs from "fs"

function getJson(): Array<User> {
    return JSON.parse(fs.readFileSync("./data.json", { encoding: 'utf-8', flag: 'r' }));
}
interface User {
    tag: string,
    money: number,
    name: string
}
function initUser(usertag: string){
    let data: Array<User> = getJson();
    let user: User = {"tag":usertag, "money":100, "name":""}
    data.push(user);
    fs.writeFileSync("./data.json", JSON.stringify(data));
}
function getMoney(usertag: string): number {
    let data: Array<User> = getJson();
    for (let user of data as User[]) {
        console.log(usertag);
        if (user.tag == usertag) {
            
            return user.money;


        }

    }
    return -1;
}
function setMoney(userid: string, money: number, r = false) {
    let data = getJson();
    for (let user of data) {
        if (user.tag == userid) {
            if (r) {
                user.money += money;
            } else {
                user.money = money;
            }
        }
    }
    fs.writeFileSync("./data.json", JSON.stringify(data));
}
function getUser(usertag:string){
    let data = getJson();
    for (let user of data as User[]) {
        if(user.tag == usertag){
            return user;
        }
    }
    return false;
}
export {
    getUser,
    getJson,
    User,
    initUser,
    getMoney,
    setMoney
}
