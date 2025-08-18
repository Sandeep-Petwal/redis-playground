import { client2 as client } from './client2.js';

(async () => {
    try {
        console.log("Working with sorted set...");

        const key = 'leaderboard';

        await client.del(key);

        // Add members to the sorted set (score, member)
        await client.zAdd(key, [
            { score: 100, value: 'Alice' },
            { score: 200, value: 'Bob' },
            { score: 150, value: 'Charlie' },
            { score: 180, value: 'Diana' }
        ]);

        console.log('Added members to sorted set.');

        // Get players with score between 120 and 200
        const playersInRange = await client.zRangeByScore(key, 120, 200, { WITHSCORES: true });
        console.log('Players with score between 120 and 200:', playersInRange);

        // Get rank of a player (0-based, high score first)
        const rank = await client.zRevRank(key, 'Charlie');
        console.log('Rank of Charlie:', rank);

        // Get score of a member
        const score = await client.zScore(key, 'Diana');
        console.log('Score of Diana:', score);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.quit();
    }
})();
