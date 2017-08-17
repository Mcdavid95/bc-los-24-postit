import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../serverTest';
import models from '../models';
import { valid, anotherValid, invalidUsername, invalidEmail, invalidNumber } from '../seeders/authSeeds';

chai.use(chaiHttp);
const api = supertest.agent(server);
const should = chai.should();
const expect = chai.expect();

let token;

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('Authentication Route', () => {
  it('Returns a status 200', (done) => {
    api
      .get('/')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
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
      .get('/api/users')
      .expect(403)
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('You have to be loggedin first');
        done();
      });
  });

  it('Should not allow a new user to register with an empty field', (done) => {
    api
      .post('/api/user/register')
      .expect(403)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('Username field must not be empty');
        done();
      });
  });

  it('Should not allow user with empty password field to log in', (done) => {
    api
      .post('/api/user/register')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'mcdavid',
        phoneNumber: 9093839393,
        email: 'mcdavidemereuwa@gmail.com'
      })
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('Password field must not be empty');
        done();
      });
  });

  it('Should not create user with empty email field', (done) => {
    api
      .post('/api/user/register')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'mcdavid',
        phoneNumber: 9093839393,
        password: 'mcdavidemereuwa@gmail.com'
      })
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('Email field must not be empty');
        done();
      });
  });

  it('Should allow new user to create an account', (done) => {
    api
      .post('/api/user/register')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(valid)
      .end((err, res) => {
        token = res.body.token;
        res.status.should.equal(201);
        res.body.message.should.equal(`Welcome to POSTIT!! ${valid.username}`);
        done();
      });
  });

  it('Should not allow new user to create an account if username is in use', (done) => {
    api
      .post('/api/user/register')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidUsername)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('Username already in use');
        done();
      });
  });

  it('Should not allow new user to create an account if Email is in use', (done) => {
    api
      .post('/api/user/register')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidEmail)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('Email already in use');
        done();
      });
  });

  it('Should not allow new user to create an account if phone number is in use', (done) => {
    api
      .post('/api/user/register')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidNumber)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('Phone Number already in use');
        done();
      });
  });

  it('Should allow new user to create an account', (done) => {
    api
      .post('/api/user/register')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(anotherValid)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal(`Welcome to POSTIT!! ${anotherValid.username}`);
        done();
      });
  });

  it('Should allow registered user to log in ', (done) => {
    api
      .post('/api/user/login')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'mcdavid',
        password: 'janike_13'
      })
      .end((err, res) => {
        token = res.body.myToken;
        res.status.should.equal(202);
        res.body.message.should.equal('Welcome back mcdavid');
        done();
      });
  });

  it('Should not allow user with wrong username to log in ', (done) => {
    api
      .post('/api/user/login')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'emmanuel',
        password: 'janike_13'
      })
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Username not correct');
        done();
      });
  });

  it('Should not allow user with wrong password to log in ', (done) => {
    api
      .post('/api/user/login')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'mcdavid',
        password: 'janike_13a'
      })
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Incorrect password');
        done();
      });
  });

  it('Should get all registered users ', (done) => {
    api
      .get('/api/users')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.length.should.equal(2);
        done();
      });
  });
});
