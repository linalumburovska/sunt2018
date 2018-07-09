import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./Gallery.css";
import {IndexConsumer} from "../IndexContext";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
        eng:true
    };

    this.generateGallery = this.generateGallery.bind(this);
    this.getAuthor = this.getAuthor.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }


  /*
  * TBD: link to a given project
  */
    /*
  * Get all authors for a given project
  */
  getAuthor(data) {
    return data.map((author, key) => {
      return <h2 className="author-size" key={key}>{author.name}</h2>
    })
  }

  changeLanguage(){
      this.setState(prevState => ({
          eng: !prevState.eng
      }));
  }


  /*
  * Generate gallery grid
  */
  generateGallery(data) {
    console.log("GALLERy", data);
    return data.map((item, key) => {
      if(item != null && item.image != null && item.image["0"] != null && item.image["0"].path != null){
      let imageSrc = item.image[0].path;
      let src="";
      let title=item.title;
      if(this.props.match.path.includes("/en")){src="/en"; title=item.englishTitle}

      return (
      <IndexConsumer>
        {({change, index}) => {
            return (
                <figure key={key} className="wp-caption">
                    <Link to={`${src}/projects/${item.id}`}>
                        <img className="figure-img" src={imageSrc}/>
                        <figcaption onClick={e => change({value: item.id})} className="wp-caption-text">
                            <div className="authors">{this.getAuthor(item.author)}<h1 className="title-size">{title}</h1></div>
                        </figcaption>
                    </Link>
                </figure>
            );
        }}
      </IndexConsumer>
      )
    }
  })
}


  render() {
    return (
      <main className="Gallery">
          <div className="Gallery-Header">
              <div id="home">
                  <HomeButton></HomeButton>
              </div>
              <div id="language">
                  <LanguageButton loc={this.props.match.path} onClick={(e) => this.changeLanguage()}></LanguageButton>
              </div>
              <div></div>
              <div id="about">
                  <AboutButton loc={this.props.match.path} location={this.props.location.pathname}></AboutButton>
              </div>
          </div>
          <div className="Gallery-Gallery">
              <figure className="wp-caption">
                  <iframe className="figure-img" src="https://www.youtube.com/embed/sVt6mtDNufg?rel=0&amp;showinfo=0"
                          frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
              </figure>
              {this.generateGallery(this.props.projects)}</div>
      </main>
    );
  }
}

const HomeButton = () => (
    <Link to={'/'}>
        <img src="http://localhost:3000/static_ikone/logo.png" alt="home"/>
    </Link>
);

function LanguageButton(props) {
    const {loc, onClick} = props;
    if(loc.includes("/en")){
        return(<Link to={`/gallery`} onClick={onClick}>SI</Link>);
    }else{
        return(<Link to={`/en/gallery`} onClick={onClick}>EN</Link>);
    }
};

function AboutButton(props) {
    const {location, loc} = props;
    if(loc.includes("/en")){
        return(
            <Link to={{
                pathname: "/en/about/1",
                state: {back: location}
            }}>About</Link>)
    }else {
        return (
            <Link to={{
                pathname: "/about/1",
                state: {back: location}
            }}>About</Link>)
    }
};

export default Gallery;
