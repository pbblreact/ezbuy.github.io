import React from 'react';

class AmazonItems extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getAmazonItems(this.props.keywords);
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.keywords !== this.props.keywords) {
      this.props.getAmazonItems(this.props.keywords);
    }
  }

  render () {
    if (this.props.loading) {
      return <div className="loader">Loading...</div>
    }

    if (this.props.totalResults === 0) {
      return <div>Sorry! No results found.</div>;
    }
    return(
      <div className="ebay-items">

      </div>
    );
  }
}

export default AmazonItems;
