import { client2 as client } from "./client2.js";

(async () => {
    try {
        console.log("Loading ....");

        const res1 = await client.hSet("bike", {
            model: "Honda",
            price: 234
        });
        console.log(res1);
        const res2 = await client.hGet("bike", "model");
        console.log(res2);

        const res3 = await client.hGet("bike", "price");
        console.log(res3);

        const res4 = await client.hGetAll("bike");
        console.log(res4);

    } catch (error) {
        console.log('error ::: ', error);
    } finally {
        client.quit();
    }
})();
