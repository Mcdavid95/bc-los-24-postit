import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      result: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * 
   * @param {*} nextProps 
   * @return {*} new state
   */
  componentWillReceiveProps(nextProps) {
    console.log('!!!!!!!!', nextProps.result);
    if (nextProps.result === 1) {
      this.setState({
        result: nextProps.result
      });
    } else {
      this.setState({
        result: nextProps.result[nextProps.result.length - 1]
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
    this.props.searchUser(1, this.state);
  }
  /**
   * 
   * @param {*} e 
   * @return {DOM} DOM element
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.searchUser(1, this.state)
      .then(() => {
      });
  }

  /**
   * @return {DOM} DOM element
   */
  render() {
    console.log('=======>', this.props);
    console.log('==>>>>>>>', this.state.result);
    return (
      <div>
        <Header />
        <main>
          <div className="row">
            <form onSubmit={this.onSubmit}>
              <input type="text" onChange={this.onChange} name="username" value={this.state.username.username} placeholder="Search.." />
              <button type="submit" className="btn-small right teal btn-floating">
                <i className="small material-icons">send</i>
              </button>
            </form>
          </div>
          <table className="container centered striped highlight">
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
              )}
            </tbody>
          </table>
        </main>
        <Footer />
      </div>
    );
  }
}

SearchPage.propTypes = {
  searchUser: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  result: state.search
});

export default connect(mapStateToProps, { searchUser })(SearchPage);
