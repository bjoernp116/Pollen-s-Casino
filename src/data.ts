import fs from "fs"

function getJson(): Array<User> {
    return JSON.parse(fs.readFileSync("../data.json", { encoding: 'utf-8', flag: 'r' }));
}
interface User {
    id: string,
    money: number,
    name: string
}

function getMoney(userid: string): number {
    let data: Array<User> = getJson();
    for (let user of data as User[]) {
        if (user.id == userid) {
            return user.money;

        }

    }
    return -1;
}
function setMoney(userid: string, money: number, r = false) {
    let data = getJson();
    for (let user of data) {
        if (user.id == userid) {
            if (r) {
                user.money += money;
            } else {
                user.money = money;
            }
        }
    }
    fs.writeFileSync("../data.json", JSON.stringify(data));
}
export {
    getJson,
    User,
    getMoney,
    setMoney
}
