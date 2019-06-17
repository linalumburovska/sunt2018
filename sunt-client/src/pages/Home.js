import React, {Component} from 'react';
import './Home.css';


class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        backgroundImage: 'none'
      };

    }


    onClick(side) {
      if (side === 'right') this.props.history.push('/gallery');
      else this.props.history.push('/unity/1');
    }


    /*
    * Detect mouse position - if out of window - reset background
    */
    mouseOut() {
      this.setState({backgroundImage: 'none'});
    }


    /*
    * Detect mouse position (left/right) and set background image
    */
    mouseOver(side) {
      let imgUrl = (side === 'left') ? ''+this.props.imgLeft+'' : ''+this.props.imgRight+'';
      this.setState({ backgroundImage: 'url(' + imgUrl + ')' });
    }


  render() {
    return (
      <div className="container" style={{ backgroundImage: this.state.backgroundImage }}>
        <div className="left" onClick={() => this.onClick('left')} onMouseOut={() => this.mouseOut()} onMouseOver={() => this.mouseOver('left')} >
          <div className="verticalL" style={{color:'white !important'}}>{'SPREHOD PO RAZSTAVI'}</div>
        </div>
        <div className="right" onClick={() => this.onClick('right')} onMouseOut={() => this.mouseOut()} onMouseOver={() => this.mouseOver('right')} >
          <div className="verticalR">{'VSTOP V GALERIJO'}</div>
        </div>
      </div>
    );
  }
}


export default Home;
