import React from 'react';

/**
   * 
   * @param {*} priority 
   * @return {DOM} DOM
   */
const handlePriority = (priority) => {
  if (priority === 'normal') {
    return (
      <span className="normal">{priority}</span>
    );
  } else if (priority === 'urgent') {
    return (
      <span className="urgent">{priority}</span>
    );
  }
  return (
    <span className="critical">{priority}</span>
  );
};

export default handlePriority;
