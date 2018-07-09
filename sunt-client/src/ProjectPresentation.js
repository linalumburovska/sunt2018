import React from 'react'
import {ProjectAPI, AuthorAPI} from "./api/client";
import {Link, Route} from "react-router-dom";
import "./ProjectPresentation.css";
import {IndexConsumer} from "./IndexContext";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Carousel } from 'react-responsive-carousel';
import "../node_modules/react-responsive-carousel/lib/styles/carousel.css"

export class ProjectPresentation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            biography: "",
            type: "",
            year: "",
            comment: "",
            images: [],
            authors: "",
            description: "",
            title: "",
            visible: !this.props.location.pathname.includes('/media'),
            hide: () => {{this.setState({visible: !this.state.visible})}}

        };

        this.generateSlider = this.generateSlider.bind(this);

    }

    componentDidMount() {
        let index = parseInt(this.props.match.params.id, 10);
        console.log("INDEX", index);
        if(0 < index && index < 27) {
            if(!this.props.match.path.includes("/en")) {
                ProjectAPI.get(index)
                    .then(item => {
                        this.setState({
                            isLoading: false,
                            images: item.image,
                            title: item.title,
                            description: item.description,
                            type: item.type,
                            year: item.makeYear,
                            comment: item.comment,
                        })
                    });

                AuthorAPI.get(index)
                    .then(item => {
                        this.setState({
                            authors: item.name,
                            biography: item.biography
                        })
                    });
            }else{
                ProjectAPI.get(index)
                    .then(item => {
                        this.setState({
                            isLoading: false,
                            images: item.image,
                            title: item.englishTitle,
                            description: item.englishDescription,
                            type: item.englishType,
                            year: item.makeYear,
                            comment: item.englishComment,
                        })
                    });

                AuthorAPI.get(index)
                    .then(item => {
                        this.setState({
                            authors: item.name,
                            biography: item.englishBiography
                        })
                    });
            }
            console.log("Current State: ", this.state);
            console.log("has match", this.props.match !== undefined);
        }
    }

    generateSlider(){
        const {images} = this.state;
        return images.map(item =>
            <div>
                <img className="ProjectPresentation-Slika" width={"auto"} height={"auto"} src={item.path}/>
            </div>
        )
    }

    render() {
        const {visible, title, description, authors, images, type, year, comment, biography} = this.state;
        let id;

        if (images !== undefined && images[0] !== undefined && visible) {
            return (
                <IndexConsumer>
                    {({index}) => {
                        if (index.value !== undefined) {
                            id = index.value;
                        } else {
                            id = parseInt(this.props.match.params.id, 10);
                        }
                        console.log("sdfsdf", this.props.match);
                        return (
                            <div className="ProjectPresentation">
                                <div className="Present-background"><img id="back" src={images[1].path}
                                                                         alt={images[1].alt}/></div>
                                <div id="content">
                                    <div id="description">
                                        <h1 className="ProjectPresentation-title">{title}</h1>
                                        <h2 className="ProjectPresentation-author">{authors}</h2>
                                        <h3 className="ProjectPresentation-type">{type}</h3>
                                        <h4 className="ProjectPresentation-year">{year}</h4>
                                        <div className="ProjectPresentation-whole-text">
                                            <p className="ProjectPresentation-text">{description}</p>
                                            <br></br>
                                            <p className="ProjectPresentation-text">{comment}</p>
                                            <br></br>
                                            <p className="ProjectPresentation-text">{biography}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ProjectPresentation-buttons">
                                    <div id="Back" align="left"><BackButton index={id} eng={this.props.match.path}
                                                                            onClick={this.props.hide}></BackButton>
                                    </div>
                                    <div id="Media" align="right"><MediaButton index={id} onClick={this.state.hide}
                                                                               eng={this.props.match.path}></MediaButton>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                </IndexConsumer>
            )
        }else if(images !== undefined && images[0] !== undefined){
            return(
                <IndexConsumer>
                    {({index}) => {
                        if (index.value !== undefined) {
                            id = index.value;
                        } else {
                            id = parseInt(this.props.match.params.id, 10);
                        }
                        return(
                        <div className="ProjectPresentation-media">
                            <div className="ProjectPresentation-buttons">
                            <div id="Back" align="left"><InfoBack index={id} eng={this.props.match.path}
                                                                    onClick={this.props.hide}></InfoBack>
                            </div>
                            </div>
                            <Carousel showArrows={true} >
                                {this.generateSlider()}
                            </Carousel>
                        </div>)
                }}
                </IndexConsumer>
            )
        }
        else{return(<div></div>)}
    }
}

function InfoBack(props){
    const {index, onClick, eng} = props;
    let dst="";
    if(eng.includes("/en")){dst="/en"}
    return(
        <Link to={`${dst}/projects/${index}/info`} onClick={onClick}>
            <img src={"/static_ikone/next.png"} alt={"nazaj"} style={{transform: 'rotate(180deg)'}}/>
        </Link>
    )

}
function BackButton(props) {
    const {index, onClick, eng} = props;
    let dst="";
    if(eng.includes("/en")){dst="/en";}
    return (
        <Link to={`${dst}/projects/${index}`} onClick={onClick}>
            <img src={"/static_ikone/next.png"} alt={"nazaj"} style={{transform: 'rotate(180deg)'}}/>
        </Link>
    )
}

function MediaButton(props) {
    const {index, onClick, eng} = props;
    let dst="";
    if(eng.includes("/en")){dst="/en";}
    return(
        <Link to={`${dst}/projects/${index}/info/media`} onClick={onClick}><img src={"/static_ikone/kamera.png"} alt="medija"/></Link>);
};
