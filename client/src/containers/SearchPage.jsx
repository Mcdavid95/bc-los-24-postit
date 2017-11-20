import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import Footer from './Footer';
import initialState from '../initialState';
import { searchUsers } from '../actions';
/**
 * @class
 */
export class SearchPage extends Component {
  /**
   * Creates Instance of SearchPage
   * @constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      username: initialState.search,
      result: [{ id: 1 }],
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
   * @method ComponentWillRecieveProps
   * @param {*} nextProps 
   * @description updates state when props changes
   * @return {*} new state
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.result.length === 0) {
      this.setState({
        result: nextProps.result.users.users,
        pages: nextProps.result.users.pageInfo.pageCount
      });
    } else {
      this.setState({
        result: nextProps.result[nextProps.result.length - 1].users.users,
        pages: nextProps.result[nextProps.result.length - 1].users.pageInfo.pageCount
      });
    }
  }
  /**
   * @method onChange
   * @param {*} event 
   * @description updates state on event change and makes call to api via props
   * @return {DOM} Dom
   */
  onChange(event) {
    const searchInput = {
      username: event.target.value
    };
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
    this.props.searchUsers(searchInput, this.state.offset);
  }
  /**
   * @method onSubmit
   * @param {*} event 
   * @return {DOM} DOM element
   */
  onSubmit(event) {
    const searchInput = {
      username: event.target.value
    };
    event.preventDefault();
    this.props.searchUsers(searchInput, this.state.offset)
      .then(() => {
      });
  }
  /**
 * @method handlePageClick
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
    this.props.searchUsers(this.state, offset);
  }
  /**
   * @method prevPage
   * @param {*} event
   * @return {DOM} previous set of results
   */
  prevPage(event) {
    event.preventDefault();
    if (this.state.offset > 0) {
      this.props.searchUsers(this.state, this.state.offset - 1);
      const newOffset = this.state.offset;
      this.setState({
        offset: newOffset - 1
      });
    }
  }
  /**
   * 
   * @param {*} event
   * @return {DOM} next set of results
   */
  nextPage(event) {
    event.preventDefault();
    this.props.searchUsers(this.state, this.state.offset + 1);
    const newOffset = this.state.offset;
    this.setState({
      offset: newOffset + 1
    });
  }
  /**
   * @method render
   * @description returns table containing users detaila - username and email
   * @return {DOM} DOM element
   */
  render() {
    const notFound = (
      <h5>User not found </h5>
    );

    const tableBody = (
      <div>
        <table className="container centered bordered">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.result.map(list =>
              (<tr key={list.id}>
                <td>{list.username}</td>
                <td>{list.email}</td>
              </tr>)
            )
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
      </div>
    );
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
          {this.state.result.length > 0 ? tableBody : notFound
          }
        </main>
        <Footer />
      </div>
    );
  }
}

SearchPage.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  result: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  result: state.search,
  username: state.username
});

export default connect(mapStateToProps, { searchUsers })(SearchPage);
