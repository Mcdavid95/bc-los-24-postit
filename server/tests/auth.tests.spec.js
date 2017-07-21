import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import models from '../models';
import { valid, anotherValid, inValid } from '../seeders/authSeeds';

chai.use(chaiHttp);
const api = supertest(server);
const should = chai.should();
const expect = chai.expect();

models.User.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

models.Message.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

models.Group.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

models.GroupMember.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

describe('Authentication Route', () => {
  it('Returns a Welcome message for an empty route', (done) => {
    api
      .get('/')
      .expect(200)
      .end((err, res) => {
        res.body.message.should.equal('Welcome to postit');
        done();
      });
  });

  it('Prevents access to an undefined route', (done) => {
    api
      .get('/api/creepy')
      .expect(501)
      .end((err, res) => {
        res.body.message.should.equal('Sorry, this address is not supported by this API.');
        done();
      });
  });

  it('Should prevent users not logged in to access protected routes', (done) => {
    api
      .get('api/users')
      .expect(403)
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('You have to be loggedin first');
        done();
      });
  });

  it('Should allow a new user to register', (done) => {
    api
      .post('api/user/register')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(valid)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal(`Welcome to POSTIT!! ${valid.username}`);
        done();
      });
  });
});
