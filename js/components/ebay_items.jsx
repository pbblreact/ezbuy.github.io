import React from 'react';

class EbayItems extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getEbayItems(this.props.keywords);
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.keywords !== this.props.keywords) {
      this.props.getEbayItems(this.props.keywords);
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
        <div className="total-results">
          <span>Results found: {this.props.totalResults}</span>
          <a className="btn btn-primary btn-sm" target="_blank" href={this.props.ebayUrl}>Browse {this.props.keywords} on Ebay</a>
        </div>
        <div className="card-columns">
          {this.props.items.map((item, idx)=>{
            let title = item.title[0].length > 20 ? item.title[0].slice(0, 20) + "..." : item.title[0];
            let condition = item.condition ? item.condition[0].conditionDisplayName[0] : "Unknown";
            return <div className="card" key={idx}>
                <img className="card-img-top" src={item.galleryURL[0]} />
                <div className="card-block">
                  <div className="card-title">{title}</div>
                  <div className="item-location"><span>Location: </span>{item.location[0]}</div>
                  <div className="item-condition"><span>Condition: </span>{condition}</div>
                  <a className="btn btn-primary btn-block view-on-ebay" target="_blank" href={item.viewItemURL[0]}>View</a>
              </div>
            </div>
          })}
        </div>
      </div>
    );
  }
}

export default EbayItems;
