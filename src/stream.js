import { client2 as client } from './client2.js';

(async () => {
    try {
        const streamKey = 'mystream';

        // Clear existing stream
        await client.del(streamKey);

        console.log('Adding entries to stream...');

        // XADD: Add items to the stream
        const id1 = await client.xAdd(streamKey, '*', { name: 'Alice', action: 'login' });
        const id2 = await client.xAdd(streamKey, '*', { name: 'Bob', action: 'logout' });

        console.log('Added entries with IDs:', id1, id2);

        // XRANGE: Read all entries from beginning to end
        const allEntries = await client.xRange(streamKey, '-', '+');
        console.log('All entries in stream:');
        console.dir(allEntries, { depth: null });

        // XREAD: Read new entries starting from latest known ID
        console.log('Reading new entries using XREAD...');
        const newEntries = await client.xRead(
            [{ key: streamKey, id: '0' }],
            { COUNT: 10, BLOCK: 2000 }
        );
        console.log('XREAD result:');
        console.dir(newEntries, { depth: null });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.quit();
    }
})();
