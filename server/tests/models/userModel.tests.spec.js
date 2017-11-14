import chai from 'chai';
import models from '../../models';
import { User } from '../../seeders/authSeeds';

const should = chai.should();
const Users = models.User;

let userId;

describe('User model', () => {
  it('should create a user', (done) => {
    Users.create(User.user1).then((newUser) => {
      newUser.userName.should.equal(User.userName);
      newUser.email.should.equal(User.user1.email);
      newUser.telephone.should.equal(User.user1.telephone);
      userId = newUser.id;
    });
    done();
  });

  it('should not create a user when userName is null', (done) => {
    Users.create(User.errorUser1).then().catch((error) => {
      error.errors[0].message.should.equal('userName cannot be null');
    });
    done();
  });

  it('should not create a user when password is null', (done) => {
    Users.create(User.errorUser2).then().catch((error) => {
      error.errors[0].message.should.equal('password cannot be null');
    });
    done();
  });

  it('should not create a user when email is null', (done) => {
    Users.create(User.errorUser3).then().catch((error) => {
      error.errors[0].message.should.equal('email cannot be null');
    });
    done();
  });

  it('should not create a user when telephone is null', (done) => {
    Users.create(User.errorUser4).then().catch((error) => {
      error.errors[0].message.should.equal('telephone cannot be null');
    });
    done();
  });

  it('should update a user\'s password', (done) => {
    Users.findById(1).then((user) => {
      user.update({ password: User.password })
        .then((updatedUser) => {
          updatedUser.UserValues.id.should.equal(userId).then(() => {
            updatedUser.UserValues.password.should.equal(User.password);
          });
        });
      done();
    });
  });
});
