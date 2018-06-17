import React, {Component} from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import {ProjectPagination} from "../ProjectPagination";
import {Header} from "../Header";
import "./Gallery.css";


class Gallery extends Component {
  constructor(props) {
    super(props);

    this.generateGallery = this.generateGallery.bind(this);
    this.getAuthor = this.getAuthor.bind(this);
    this.openProject = this.openProject.bind(this);

    console.log("App", this.props);

  }


  /*
  * TBD: link to a given project
  */
  openProject(id){
      this.props.index=id;
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
      return (<figure key={key} className="wp-caption">
         <Link to={{
             pathname: `/projects/${item.id}`,
             state: {identiteta: item.id}
         }}
         ><img className="" src={imageSrc} />
          <figcaption onClick={this.openProject(item.id)} className="wp-caption-text" ><div className="authors" >{this.getAuthor(item.author)}</div></figcaption>
        </Link>
      </figure>
      )
    });
  }


  render() {
    return (
      <main className="Gallery">
          <div className="Gallery-Header">
              <div id="home">
                  <HomeButton></HomeButton>
              </div>
              <div id="language">
                  <LanguageButton></LanguageButton>
              </div>
              <div></div>
              <div id="about">
                  <AboutButton></AboutButton>
              </div>
          </div>
          <div className="Gallery-Gallery">{this.generateGallery(this.props.projects)}</div>
      </main>
    );
  }
}

const HomeButton = () => (
    <Link to={'/'}>
        <img src="http://localhost:3000/static_ikone/logo.png" alt="home"/>
    </Link>
);

const LanguageButton = () => (
    <Link to={'/projects'}>EN</Link>
);

const AboutButton = () => (
    <Link to={'/about'}>About</Link>

);

export default Gallery;
