import React from 'react'
import {ProjectAPI, AuthorAPI} from "./api/client";
import {Link, Route} from "react-router-dom";
import "./ProjectPresentation.css";
import {IndexConsumer} from "./IndexContext";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

export class ProjectPresentation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
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
        if(1 < index < 28) {

            ProjectAPI.get(index)
                .then(item => {
                    this.setState({
                        isLoading: false,
                        images: item.image,
                        title: item.title,
                        description: item.description,
                    })
                });

            AuthorAPI.get(index)
                .then(item => {
                    this.setState({
                        authors: item.name
                    })
                });
            console.log("Current State: ", this.state);
            console.log("has match", this.props.match !== undefined);
        }
    }

    generateSlider(){
        const {images} = this.state;
        return images.map(item =>
            <div>
                <img className="ProjectPresentation-Slika" width={"auto"} height={"100%"} src={item.path}/>
            </div>
        )
    }

    render() {
        const {visible, title, description, authors, images} = this.state;
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
                        return (
                            <div className="ProjectPresentation">
                                <div className="Present-background"><img id="back" src={images[1].path}
                                                                         alt={images[1].alt}/></div>
                                <div id="content">
                                    <div id="description">
                                        <h1 className="ProjectPresentation-title">{title}</h1>
                                        <h2 className="ProjectPresentation-author">{authors}</h2>
                                        <h3 className="ProjectPresentation-type">Digitalni print in video</h3>
                                        <h4 className="ProjectPresentation-year">2015-2017</h4>
                                        <div className="ProjectPresentation-whole-text">
                                            <p className="ProjectPresentation-text">{description}</p>
                                            <br></br>
                                            <p className="ProjectPresentation-text">Gre za večletni projekt, za katerega je avtoricadobila nagrado iz
                                                prešernovega
                                                sklada. Projekt je zelo dobro premišljen in kaže na možni razvoj ženske
                                                skozi
                                                evolucijo preko psa v svobodno bitje. Ženska ima
                                                svobodo se odločiti, s komi in s čim bo nadaljevala vrsto človeka. Gre
                                                za tipično
                                                delo hibridne umetnosti, ki nakazuje sodelovanje z znanostjo.

                                            </p>
                                            <br></br>
                                            <p className="ProjectPresentation-text">Maja SMREKAR (1978, Brežice)
                                                Diplomirala na Akademiji za likovno umetnost in oblikovanje v Ljubljani
                                                pri prof.
                                                Jožetu Baršiju, smer kiparstvo, in pri somentorju prof. dr. Jožefu
                                                Muhoviču ter
                                                somentorici prof. Meti Hočevar (2006), kjer je na Oddelku za video in
                                                nove medije
                                                zaključila magistrski študij pri prof. Sreču Draganu (2016).</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ProjectPresentation-buttons">
                                    <div id="Back" align="left"><BackButton index={id}
                                                                            onClick={this.props.hide}></BackButton>
                                    </div>
                                    <div id="Media" align="right"><MediaButton index={id} onClick={this.state.hide}></MediaButton></div>
                                </div>
                            </div>
                        );
                    }}
                </IndexConsumer>
            )
        }else if(images !== undefined && images[0] !== undefined){
            const settings = {
                dots:true,
                speed:500,
                accessibility:true
            };
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
                            <Slider className="ProjectPresentation-slider" {...settings}><InfoBack index={id} onClick={this.state.hide}/>{this.generateSlider()}</Slider>
                        </div>)
                }}
                </IndexConsumer>
            )
        }
        else{return(<div></div>)}
    }
}

function InfoBack(props){
    const {index, onClick} = props;
    return(
        <Link to={`/projects/${index}/info`} onClick={onClick}><h1>BACK</h1></Link>
    )

}
function BackButton(props) {
    const {index, onClick} = props;
    return (
        <Link to={`/projects/${index}`} onClick={onClick}>
            <img src={"/static_ikone/next.png"} alt={"nazaj"} style={{transform: 'rotate(180deg)'}}/>
        </Link>
    )
}

function MediaButton(props) {
    const {index, onClick} = props;
    return(
        <Link to={`/projects/${index}/info/media`} onClick={onClick}><img src={"/static_ikone/kamera.png"} alt="medija"/></Link>);
};
