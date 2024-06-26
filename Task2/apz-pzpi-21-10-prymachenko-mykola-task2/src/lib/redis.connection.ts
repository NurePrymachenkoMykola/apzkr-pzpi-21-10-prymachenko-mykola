import { createClient } from 'redis';
import * as process from 'process';

async function redisConnect() {
    const cluster = createClient({
        url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@127.0.0.1:4000`
    });
    await cluster.connect();

    return cluster;
}

export default redisConnect;