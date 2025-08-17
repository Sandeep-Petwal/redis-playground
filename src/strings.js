import { client } from "./client.js";
const getKeyFromRedis = async (key) => {
    const res = await client.get(key, (err) => {
        if (err) {
            return "nil";
        }
    });
    return res;
};


const init = async () => {
    await client.set("users:someone", "Sir Someone")
    console.log('waiting ....')
    let a = await getKeyFromRedis("users:someone");
    console.log(a);
}

try {
    init()
} catch (error) {
    console.log('error ::: ', error )
}