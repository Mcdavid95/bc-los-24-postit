import chai from 'chai';
import paginate from '../controllers/pagination';

const expect = chai.expect;

describe('Pagination method', () => {
  it('should return an object with the page, pageCount and pageSize', () => {
    const result = {
      page: 2,
      pageCount: 2,
      pageSize: 5,
      count: 10
    };
    expect(paginate(10, 5, 5).should.to.be(result));
  });
});
