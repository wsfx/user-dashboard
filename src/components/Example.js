import React from 'react';
import { connect } from 'dva';

const Example = ({list}) => {
  return (
    <div>
      Example
      {list[0]}
    </div>
  );
};

Example.propTypes = {
};

export default connect((state) => {
  console.log(state, 'aaa')
  return {
    list: state.example.list
  }
})(Example);
