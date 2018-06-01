import React, {Component} from 'react';
import {Router, Route, withRouter} from 'react-router';


class Gallery extends Component {
  constructor(props) {
    super(props);

    this.generateGallery = this.generateGallery.bind(this);
    this.getAuthor = this.getAuthor.bind(this);

  }


  /*
  * TBD: link to a given project
  */
  openProject(id) {
    console.log("TBD: Open project ", id);
  }


  /*
  * Get all authors for a given project
  */
  getAuthor(data) {
    return data.map((author, key) => {
      return <h2 key={key}>{author.name}</h2>
    })
  }


  /*
  * Generate gallery grid
  */
  generateGallery(data) {
    return data.map((item, key) => {
      let imageSrc = require('../images/' + item.image[0].path);
      return <figure key={key} className="wp-caption">
         <img className="" src={imageSrc} />
         <figcaption onClick={() => this.openProject(item.id)} className="wp-caption-text" ><div className="authors" >{this.getAuthor(item.author)}</div></figcaption>
      </figure>
    });
  }


  render() {
    return (
      <main className="main">
        {this.generateGallery(this.props.projects)}
      </main>
    );
  }
}


export default Gallery;
