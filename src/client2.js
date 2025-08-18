// client.js
import { createClient } from 'redis';

export const client2 = createClient();

client2.on('error', (err) => console.log('Redis Client Error', err));

await client2.connect();