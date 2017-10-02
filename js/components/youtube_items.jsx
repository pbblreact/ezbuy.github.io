import React from 'react';

class YoutubeItems extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getYoutubeItems(this.props.keywords);
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.keywords !== this.props.keywords) {
      this.props.getYoutubeItems(this.props.keywords);
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
          <a className="btn btn-danger btn-sm" target="_blank" href={"https://www.youtube.com/results?search_query=" + this.props.keywords}>Browse {this.props.keywords} on Youtube</a>
        </div>
        <div className="card-columns">
          {this.props.items.map((item, idx)=>{
            let title = item.snippet.title.length > 20 ? item.snippet.title.slice(0, 20) + "..." : item.snippet.title;
            return <div className="card" key={idx}>
                <img className="card-img-top" src={item.snippet.thumbnails.default.url} />
                <div className="card-block">
                  <div className="card-title">{title}</div>
                  <div className="item-location"><span>Channel: </span>{item.snippet.channelTitle}</div>
                  <a className="btn btn-danger btn-block view-on-ebay" target="_blank" href={"https://www.youtube.com/watch?v=" + item.id.videoId}>View</a>
              </div>
            </div>
          })}

        </div>
      </div>
    );
  }
}

export default YoutubeItems;
