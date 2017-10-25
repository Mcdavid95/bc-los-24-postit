import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import Footer from './Footer';
import initialState from '../initialState';
import searchUser from '../actions/searchUserAction';
/**
 * @class
 */
export class SearchPage extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      username: initialState.search,
      result: [],
      pages: 0,
      offset: 0,
    };
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  /**
   * 
   * @param {*} nextProps 
   * @return {*} new state
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.result.length === 0) {
      this.setState({
        result: nextProps.result.user,
        pages: nextProps.result.metadata.pageCount
      });
    } else {
      this.setState({
        result: nextProps.result[nextProps.result.length - 1].user,
        pages: nextProps.result[nextProps.result.length - 1].metadata.pageCount
      });
    }
  }
  /**
   * 
   * @param {*} e 
   * @return {DOM} Dom
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.searchUser(this.state, this.state.offset);
  }
  /**
   * 
   * @param {*} e 
   * @return {DOM} DOM element
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.searchUser(this.state, this.state.offset)
      .then(() => {
      });
  }
  /**
 * 
 * @param {*} event 
 * @return {DOM} returns a new page of result
 * 
 */
  handlePageClick(event) {
    const selected = event.selected;
    const limit = 5;
    const offset = Math.ceil(selected * limit);
    this.setState({
      offset
    });
    this.props.searchUser(this.state, offset);
  }
  /**
   * @param {*} event
   * @return {DOM} previous set of results
   */
  prevPage(event) {
    event.preventDefault();
    if (this.state.offset > 0) {
      this.props.searchUser(this.state, this.state.offset - 1);
      const newOffset = this.state.offset;
      this.setState({
        offset: newOffset - 1
      });
    }
  }
  /**
   * 
   * @param {*} e 
   * @return {DOM} next set of results
   */
  nextPage(e) {
    e.preventDefault();
    this.props.searchUser(this.state, this.state.offset + 1);
    const newOffset = this.state.offset;
    this.setState({
      offset: newOffset + 1
    });
  }
  /**
   * @return {DOM} DOM element
   */
  render() {
    console.log(this.state.offset);
    return (
      <div>
        <Header />
        <main>
          <div className="row">
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                onChange={this.onChange}
                name="username"
                value={this.state.username.username}
                placeholder="Search.."
              />
              <button type="submit" className="btn-small right teal btn-floating">
                <i className="small material-icons">send</i>
              </button>
            </form>
          </div>
          <table className="container centered bordered">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {this.state.result.length > 0 ? this.state.result.map(list =>
                (<tr key={list.id}>
                  <td>{list.username}</td>
                  <td>{list.email}</td>
                </tr>)
              ) : <h5>User not found </h5>
              }
            </tbody>
          </table>

          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            pageCount={this.state.pages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

SearchPage.propTypes = {
  searchUser: PropTypes.func.isRequired,
  result: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  result: state.search
});

export default connect(mapStateToProps, { searchUser })(SearchPage);
