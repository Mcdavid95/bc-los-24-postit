import chai from 'chai';
import models from '../../models';
import { groupMember } from '../../seeders/groupSeeds';

const should = chai.should();
const { GroupMember } = models;

describe('GroupMember model', () => {
  it('should create a new GroupMember', (done) => {
    GroupMember.create(groupMember).then((newGroupMember) => {
      newGroupMember.username.should.equal(groupMember.username);
      newGroupMember.groupId.should.equal(groupMember.groupId);
      done();
    });
  });

  it('should not create a new GroupMember if username is null', (done) => {
    GroupMember.create(groupMember).then().catch((error) => {
      error.errors[0].message.should.equal('username cannot be null');
    });
    done();
  });

  it('should not create a new GroupMember if groupId is null', (done) => {
    GroupMember.create(groupMember).then().catch((error) => {
      error.errors[0].message.should.equal('groupId cannot be null');
    });
    done();
  });
});
