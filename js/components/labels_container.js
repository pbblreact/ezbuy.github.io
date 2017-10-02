import React from 'react';
import { connect } from 'react-redux';
import Labels from './labels';

const mapStateToProps = state => {
    return {
      loading: state.loading.loadingImage,
      labels: state.items.labels
    }
};

export default connect(
  mapStateToProps,
  null
)(Labels);
