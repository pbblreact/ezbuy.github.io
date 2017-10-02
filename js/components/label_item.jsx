import React from 'react';
import 'rc-progress/assets/index.css';
import { Circle } from 'rc-progress';


class Labels extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      percent: 0
    };
    this.increase = this.increase.bind(this);
  }

  componentDidMount() {
   this.increase();
  }

  increase() {
   const percent = this.state.percent + 1;
   if (percent >= this.props.label.score * 100) {
     clearTimeout(this.tm);
     return;
   }
   this.setState({ percent });
   this.tm = setTimeout(this.increase, 10);
  }

  render () {
    return(
      <div>
        <div className="label-detail">
          <div className="label-description">{this.props.label.description}</div>
          <div className="label-score">{(this.props.label.score * 100 + "").slice(0, 5) + "%"}</div>
        </div>
        <Circle strokeWidth="6" percent={this.state.percent} />
      </div>
    );
  }
};


export default Labels;
