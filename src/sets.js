import { client } from "./client.js";



(async () => {
    try {

        console.log("Loading ....")
        await client.sadd("myset", 1);
        await client.sadd("myset", 1);
        await client.sadd("myset", 2);
        await client.sadd("myset", 7);
        await client.sadd("myset", 5)
        await client.srem("myset", 6);

        const isMember = await client.sismember("myset", 4)
        console.log('isMember ', isMember )

        const intersect = await client.sinter()

        const myset = await client.smembers("myset");
        console.log('myset :: ', myset)
        

    } catch (error) {
        console.log('error ::: ', error);
    } finally{
        client.quit();
    } 
})();