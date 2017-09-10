import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGrooupAction from '../actions/loadUserGroupListActions';
import GroupList from './GroupList';

class ShowGroup extends React.Component {
  render() {
    return (
      <div className='col m12'>
        <h3>My Groups</h3>
        <div className="col m4">
          <GroupList userGroupList={this.props.userGroupList} />
        </div>
      </div>
    );
  }
}


ShowGroup.propTypes = {
  userGroupList: PropTypes.array.isRequired

};

const mapStateToProps = (state, ownProps) => ({ userGroupList: state.userGroupList });


// const GroupCard = ({ GroupName, id, onClick, joinGroup }) => (
//   <div className="card #ffcdd2 blue darken-5">
//     <div className="card-content black-text">
//       <a name={id} onClick={onClick} href="#!" className="card-title">{GroupName}</a>
//     </div>
//     <div className="card-action">
//       <i className="material-icons prefix">add</i>
//       <button
//         className="linkcolor"
//         name={id}
//         onClick={joinGroup}
//       > JOIN GROUP
//       </button>
//     </div>
//   </div>
// );

// GroupCard.propTypes = {
//   GroupName: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
//   onClick: PropTypes.func.isRequired,
//   joinGroup: PropTypes.func.isRequired
// };

export default connect(mapStateToProps)(ShowGroup);
