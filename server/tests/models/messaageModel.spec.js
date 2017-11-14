import chai from 'chai';
import model from '../../models';
import { message } from '../../seeders/groupSeeds';

const should = chai.should();

const Messages = model.Message;

describe('Message model ', () => {
  it('should create a message', (done) => {
    Messages.create(message).then((newMessage) => {
      newMessage.message.should.equal({ message });
      newMessage.username.should.equal(message.username);
      newMessage.priority.should.equal(message.priority);
      newMessage.userId.should.equal(message.userId);
      newMessage.groupId.should.equal(message.groupId);
    });
    done();
  });

  it('should not create a message if content is null', (done) => {
    Messages.create(message).then().catch((error) => {
      error.errors[0].message.should.equal('content cannot be null');
    });
    done();
  });

  it('should not create a message if authorsName is null', (done) => {
    Messages.create(message).then().catch((error) => {
      error.errors[0].message.should.equal('authorsName cannot be null');
    });
    done();
  });

  it('should create a message with a priorityValue of Normal if there\'s no prioriryValue', (done) => {
    Messages.create(message).then((newMessage) => {
      newMessage.priorityValue.should.equal('NORMAL');
    });
    done();
  });
});
