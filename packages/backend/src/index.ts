import bootstrapExpress from './libs/bootstrapExpress';
import { redisClient } from './libs/redisClient';
import { loadData } from './datasource/loadData';

(async () => {
  try {
    await loadData();

    const { server } = await bootstrapExpress();
    const client = await redisClient();

    process.on('SIGTERM', () => {
      server.close();
      client.end(true);
    });
  } catch (e) {
    console.error(e);
  }
})();
