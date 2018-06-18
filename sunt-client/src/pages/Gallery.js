import React, {Component} from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import {ProjectPagination} from "../ProjectPagination";
import {Header} from "../Header";
import "./Gallery.css";
import {IndexConsumer} from "../IndexContext";

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.generateGallery = this.generateGallery.bind(this);
    this.getAuthor = this.getAuthor.bind(this);
  }


  /*
  * TBD: link to a given project
  */
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
      return (
      <IndexConsumer>
        {({change, index}) => {
            console.log("Kje smo", change, index);
            return (
                <figure key={key} className="wp-caption">
                    <Link to={`/projects/${item.id}`}>
                        <img className="" src={imageSrc}/>
                        <figcaption onClick={e => change({value: item.id})} className="wp-caption-text">
                            <div className="authors">{this.getAuthor(item.author)}</div>
                        </figcaption>
                    </Link>
                </figure>
            );
        }}
      </IndexConsumer>
      )
    });
  }


  render() {
    console.log("SFSFSDFSDfsdf", this.props);
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
                  <AboutButton location={this.props.location.pathname}></AboutButton>
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

function AboutButton(props) {
    const {location} = props;
    console.log("DA VIDFISMFISMCISMODCMSID", props);
    return(
    <Link to={{
        pathname: "/about",
        state: {back: location}
    }}>About</Link>)
};

export default Gallery;
