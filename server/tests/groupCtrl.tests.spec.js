import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../serverTest';
import { newUser } from '../seeders/authSeeds';
import { Group3, groupName } from '../seeders/groupSeeds';

chai.use(chaiHttp);
const api = supertest.agent(server);
const should = chai.should();
const expect = chai.expect;

let token;
describe('Add Group member Route', () => {
  it('should allow new user to create an account', (done) => {
    api
      .post('/api/v1/user/register')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(newUser)
      .end((err, res) => {
        token = res.body.token;
        res.status.should.equal(201);
        res.body.message.should.equal(`Welcome to POSTIT!! ${newUser.username}`);
        done();
      });
  });
  it('should allow loggedin user to create new group', (done) => {
    api
      .post('/api/v1/group')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(Group3)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal(`Group ${Group3.groupName.toLowerCase()} successfully created`);
        done();
      });
  });

  it('should not parse string in params', (done) => {
    api
      .post('/api/v1/group/yt/user')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(Group3)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Please add groupId must be a number');
        done();
      });
  });

  it('should allow loggedin user to add another user to a group', (done) => {
    api
      .post('/api/v1/group/2/user')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'mcdavid'
      })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('User sucessfully addded');
        done();
      });
  });

  it('should not allow loggedin user to add another user to a group without username', (done) => {
    api
      .post('/api/v1/group/2/user')
      .set('Connetion', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        name: 'mcdavid'
      })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Please add Username or email');
        done();
      });
  });
});

describe('Get Group members Route', () => {
  it('should notparse string in params', (done) => {
    api
      .get('/api/v1/group/register/users')
      .set('x-access-token', token)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Please groupId must be a number');
        done();
      });
  });
});

describe('Get current Group name', () => {
  it('should not parse string in params', (done) => {
    api
      .get('/api/v1/group/register')
      .set('x-access-token', token)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Please groupId must be a number');
        done();
      });
  });

  it('should return current group name', (done) => {
    api
      .get('/api/v1/group/2')
      .set('x-access-token', token)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.deep.equals(groupName);
        done();
      });
  });

  it('should not return current group name if group does not exist', (done) => {
    api
      .get('/api/v1/group/3')
      .set('x-access-token', token)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.Error.should.deep.equals('Group does not exist');
        done();
      });
  });
});

