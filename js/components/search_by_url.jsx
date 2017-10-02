import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getLabels, clearError } from '../actions/item_actions';


class SearchByUrl extends React.Component {
  constructor(props){
    super(props)
    this.state={
      picture_url: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) =>
      this.setState({[field]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clearError();
    this.props.getLabels(this.state.picture_url);
  }

  render () {

    return (
      <div className="container left">
        <div className="prompt">Please enter the url of an image:</div>
        <div>
          <input type="text" required onChange={this.update('picture_url')} />
        </div>
        <div className="btn btn-primary btn-block submit-btn" onClick={this.handleSubmit}>Submit</div>
        <div className="row search-image">
          {this.state.picture_url === "" ? "" : <img src={this.state.picture_url} />}
          {this.props.loading ? <div className="loader image-loader"></div> : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading.loadingImage
});

const mapDispatchToProps = dispatch => ({
  getLabels: (picture_url) => dispatch(getLabels(picture_url)),
  clearError: () => dispatch(clearError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchByUrl);
