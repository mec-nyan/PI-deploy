/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

let agent = null;

const aGame = {
  name: 'a game',
  rating: '0',
  description: 'this is a game. well, not really.',
  released: '1-1-1111',
  genres: [],
  platforms: [],
};

const bGame = { ...aGame };

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(aGame)));

  beforeEach(function () {
    agent = session(app);
  });
  
  describe('GET /videogames', () => {
    it('should get 200', (done) => {
      agent.get('/videogames').expect(200);
      done();
    });
  });

  describe('GET /videogame/1', () => {
    it('status should be 200', (done) => {
      agent.get('/videogame/1')
        .then(out => expect(out.status).to.equal(200))
        .catch();
      done();
    });
    it('id should be 1', (done) => {
      agent.get('/videogame/1')
        .then(out => expect(out.body.id).to.equal(1))
        .catch();
      done();
    });
    it('name should be "D/Generation HD"', (done) => {
      agent.get('/videogame/1')
        .then(out => expect(out.body.name).to.equal("D/Generation HD"))
        .catch();
      done();
    });
  });

  describe('POST /videogame', () => {
    it('should return 200', (done) => {
      agent.post('/videogame')
        .send(aGame)
        .expect(200)
        .end(done);
    });
    it('should return 407', (done) => {
      agent.post('/videogame')
        .send({name: 'a game'})
        .expect(407)
        .end(done);
    });
  });
});
