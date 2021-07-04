import request from 'supertest';
import bootstrapExpress from '../src/libs/bootstrapExpress';
import { ExpressApp, PhotoList, Photo } from '../src/types';
import { redisClient } from '../src/libs/redisClient';
import { loadData } from '../src/datasource/loadData';

let expressApp: ExpressApp;

describe('Photoes routes', () => {
  beforeAll(async () => {
    await loadData();
    expressApp = await bootstrapExpress();
  });

  afterAll(async () => {
    const client = await redisClient();
    await client.quit();
    expressApp.server.close();
  });

  it('can list a range of photoes', (done) => {
    request(expressApp.app)
      .get('/photoes')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const result = response.body as PhotoList;

        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();

        const { cursor, data } = result;
        expect(typeof cursor === 'string').toBeTruthy();
        expect(Array.isArray(data)).toBeTruthy();
        expect(data.length).toBe(10);

        const photoObj = data[0];

        expect(Object.prototype.hasOwnProperty.call(photoObj, 'albumId')).toBeTruthy();
        done();
      })
      .catch((err) => done(err));
  });

  it('can show a single photo', (done) => {
    request(expressApp.app)
      .get('/photo/1_1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const result = response.body;

        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();

        const { title } = result;
        expect(title).toBe('accusamus beatae ad facilis cum similique qui sunt');
        done();
      })
      .catch((err) => done(err));
  });

  it('can list photoes by album ID', (done) => {
    request(expressApp.app)
      .get('/photoes/album/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const result = response.body as Photo[];

        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toBe(50);
        expect(result.every((photo) => photo.albumId === 1) === true).toBeTruthy();

        done();
      })
      .catch((err) => done(err));
  });
});
