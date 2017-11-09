import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../serverTest';
import models from '../models';
import { valid, yetAnotherValid, anotherValid, invalidUsername, invalidEmail, invalidNumber } from '../seeders/authSeeds';
import { Group1 } from '../seeders/groupSeeds';

chai.use(chaiHttp);
const api = supertest.agent(server);
const should = chai.should();
const expect = chai.expect;

let token;

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('Authentication Route', () => {
  it('should return a status 200', (done) => {
    api
      .get('/')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });

  it('should prevent access to an undefined route', (done) => {
    api
      .get('/api/v1/creepy')
      .expect(501)
      .end((err, res) => {
        res.body.message.should.equal('Sorry, this endpoint is not supported by this API.');
        done();
      });
  });

  it('should prevent users not logged from accessing protected routes', (done) => {
    api
      .get('/api/v1/users')
      .expect(403)
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('You have to be loggedin first');
        done();
      });
  });

  it('should not allow a new user to register with an empty field', (done) => {
    api
      .post('/api/v1/user/register')
      .expect(403)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('Username field must not be empty');
        done();
      });
  });

  it('should not allow user with empty password field to log in', (done) => {
    api
      .post('/api/v1/user/register')
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

  it('should not create user with empty email field', (done) => {
    api
      .post('/api/v1/user/register')
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

  it('should allow new user to create an account', (done) => {
    api
      .post('/api/v1/user/register')
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

  it('should not allow new user to create an account if username is in use', (done) => {
    api
      .post('/api/v1/user/register')
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

  it('should not allow new user to create an account if Email is in use', (done) => {
    api
      .post('/api/v1/user/register')
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

  it('should not allow new user to create an account if phone number is in use', (done) => {
    api
      .post('/api/v1/user/register')
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

  it('should allow new user to create an account', (done) => {
    api
      .post('/api/v1/user/register')
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

  it('should generate token when user creates an account', (done) => {
    api
      .post('/api/v1/user/register')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(yetAnotherValid)
      .end((err, res) => {
        res.status.should.equal(201);
        expect(res.body.token).to.be.a('string');
        done();
      });
  });

  it('should allow registered user to log in ', (done) => {
    api
      .post('/api/v1/user/login')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'mcdavid',
        password: 'janike_13'
      })
      .end((err, res) => {
        token = res.body.token;
        res.status.should.equal(202);
        res.body.message.should.equal('Welcome back mcdavid');
        done();
      });
  });

  it('should not allow user with wrong username to log in ', (done) => {
    api
      .post('/api/v1/user/login')
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

  it('should not allow user with wrong password to log in ', (done) => {
    api
      .post('/api/v1/user/login')
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

  it('should generate token when user logs in', (done) => {
    api
      .post('/api/v1/user/login')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'kelechi',
        password: 'kele_13'
      })
      .end((err, res) => {
        res.status.should.equal(202);
        expect(res.body.token).to.be.a('string');
        done();
      });
  });

  it('should get all registered users ', (done) => {
    api
      .get('/api/v1/users')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.users.length.should.equal(3);
        done();
      });
  });
});

describe('Group Route', () => {
  it('should allow loggedin user to create new group', (done) => {
    api
      .post('/api/v1/group')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(Group1)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal(`Group ${Group1.groupName.toLowerCase()} successfully created`);
        done();
      });
  });

  it('should not allow loggedin user to create new group if group name already exists', (done) => {
    api
      .post('/api/v1/group')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(Group1)
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('groupname already exists');
        done();
      });
  });

  it('should not allow loggedin user to create new group without group name', (done) => {
    api
      .post('/api/v1/group')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        description: 'lodash is vauge'
      })
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('Please add Group name');
        done();
      });
  });

  it('should not allow loggedin user to create new group without description', (done) => {
    api
      .post('/api/v1/group')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        groupName: 'lodash is vauge'
      })
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('Add Group Description');
        done();
      });
  });

  it('should get all created groups', (done) => {
    api
      .get('/api/v1/groups')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.groups.length.should.equal(1);
        done();
      });
  });

  it('should allow loggedin user to add another user to a group', (done) => {
    api
      .post('/api/v1/group/1/user')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'melody'
      })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('User sucessfully addded');
        done();
      });
  });

  it('should not allow loggedin user to add another user twice to a group', (done) => {
    api
      .post('/api/v1/group/1/user')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'melody'
      })
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.Error.should.equal('User already in Group');
        done();
      });
  });

  it('should not allow loggedin user to add another user to group that does not exist', (done) => {
    api
      .post('/api/v1/group/2/user')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'kelechi'
      })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.Error.should.equal('Group does not exist');
        done();
      });
  });

  it('should not allow loggedin user to add another user to group with wrong username', (done) => {
    api
      .post('/api/v1/group/1/user')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'elejo'
      })
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.Error.should.equal('User does not exist');
        done();
      });
  });

  it('should get all users in a particular group', (done) => {
    api
      .get('/api/v1/group/1/users')
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.members.length.should.equal(2);
        done();
      });
  });

  it('should not get all users in a particular group if groupId is incorrect', (done) => {
    api
      .get('/api/v1/group/2/users')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.Error.should.equal('Group with id: 2 does not exist');
        done();
      });
  });

  it('should get all groups belonging to a single user', (done) => {
    api
      .get('/api/v1/user/groups')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.group.length.should.equal(1);
        done();
      });
  });
});

describe('Message Routes', () => {
  it('should not post message if message body is undefined', (done) => {
    api
      .post('/api/v1/group/1/message')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'elejo'
      })
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.Error.should.equal('Message content must not be empty');
        done();
      });
  });

  it('should not post message if message body is has only white spaces', (done) => {
    api
      .post('/api/v1/group/1/message')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        message: '      '
      })
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.Error.should.equal('Message content must not be empty');
        done();
      });
  });

  it('should post message to a group', (done) => {
    api
      .post('/api/v1/group/1/message')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        message: 'hi',
        priority: 'normal'
      })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('hi');
        done();
      });
  });
  it('should post message to a group with wrong id', (done) => {
    api
      .post('/api/v1/group/2/message')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        message: 'hi',
        priority:
         'normal'
      })
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.Error.should.equal('Group with id: 2 does not exist');
        done();
      });
  });

  it('should get all messages belonging to a single group', (done) => {
    api
      .get('/api/v1/group/1/messages')
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.messages.length.should.equal(1);
        done();
      });
  });
});

describe('Forgot Password route', () => {
  it('should generate a token if user passes in a correct email address', (done) => {
    api
      .post('/api/v1/forgot-password')
      .expect(200)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        email: 'mcdavidemereuwa95@gmail.com'
      })
      .end((err, res) => {
        res.status.should.equal(201);
        expect(res.body.token).to.be.a('string');
        done();
      });
  });
});
