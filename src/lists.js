import { client } from "./client.js";

const queue = async () => {
    await client.lpush("queue", "item1");
    await client.lpush("queue", "item2");
    await client.lpush("queue", "item3");
    await client.lpush("queue", "item4");
    await client.rpop("queue");

    const queue = await client.lrange("queue", 0, -1);
    console.log('queue : ', queue);
}

const stack = async () => {
    await client.lpush("stack", "item1");
    await client.lpush("stack", "item2");
    await client.lpush("stack", "item3");
    await client.lpush("stack", "item4");
    await client.lpop("stack");

    const stack = await client.lrange("stack", 0, -1);
    console.log('stack : ', stack);
}

(async () => {
    try {
        // await queue();
        await stack();

    } catch (error) {
        console.log('error ::: ', error);
    } finally {
        client.quit();
    }
})();