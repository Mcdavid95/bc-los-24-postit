import chai from 'chai';
import paginate from '../controllers/pagination';

const expect = chai.expect;

describe('Pagination method', () => {
  it('should return an object with the page, pageCount and pageSize when (count - limit) !> limit', () => {
    const result = {
      page: 2,
      pageCount: 2,
      pageSize: 5,
      count: 10
    };
    expect(paginate(10, 5, 5).should.deep.equals(result));
  });

  it('should return an object with the page, pageCount and pageSize when (count - limit) > limit', () => {
    const result = {
      page: 2,
      pageCount: 3,
      pageSize: 5,
      count: 15
    };
    expect(paginate(15, 5, 5).should.deep.equals(result));
  });
});
