import chai from 'chai';
import models from '../../models';

const should = chai.should();

describe('Database models', () => {
  it('should include User model', () => {
    should.exist(models.User);
  });

  it('should include Group model', () => {
    should.exist(models.Group);
  });

  it('should include GroupMember model', () => {
    should.exist(models.GroupMember);
  });

  it('should include Message model', () => {
    should.exist(models.Message);
  });
});
