import React from 'react'

import {ProjectAPI, AuthorAPI} from "./api/client";
import {getImageSrc} from "./utility";
import {Link} from "react-router-dom";
import "./ProjectPresentation.css";
import {IndexConsumer} from "./IndexContext";

export class ProjectPresentation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            images: [],
            authors: "",
            description: "",
            title: ""

        };

    }

    componentDidMount() {
        let index = parseInt(this.props.match.params.id, 10);
        console.log("INDEX", index);

        ProjectAPI.get(index)
            .then(item => {
                this.setState({
                    isLoading: false,
                    images: item.image,
                    title: item.title,
                    description: item.description
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

    render() {
        const {isLoading, title, description, authors, images} = this.state;
        let id

        //const path = this.state.images[0].path;
        //const author = this.state.authors[0].name;

        const inputStyle = {
            transform: 'rotate(180deg)',
        };

        if (images !== undefined && images[0] !== undefined) {
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
                                <div className="Present-background"><img id="back" src={images[0].path}
                                                                         alt={images[0].alt}/></div>
                                <div id="content">
                                    <div id="description">
                                        <h1 className="title">{title}</h1>
                                        <h2 className="author">{authors}</h2>
                                        <h3 className="type">Digitalni print in video 2015-2017</h3>
                                        <div className="text">
                                            <p>{description}</p>
                                            <br></br>
                                            <p>Gre za večletni projekt, za katerega je avtoricadobila nagrado iz
                                                prešernovega
                                                sklada. Projekt je zelo dobro premišljen in kaže na možni razvoj ženske
                                                skozi
                                                evolucijo preko psa v svobodno bitje. Ženska ima
                                                svobodo se odločiti, s komi in s čim bo nadaljevala vrsto človeka. Gre
                                                za tipično
                                                delo hibridne umetnosti, ki nakazuje sodelovanje z znanostjo.

                                            </p>
                                            <br></br>
                                            <p>Maja SMREKAR (1978, Brežice)
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
                                    <div id="Media" align="right"><MediaButton></MediaButton></div>
                                </div>
                            </div>
                        );
                    }}
                </IndexConsumer>
            )
        }else{return(<div></div>)}
    }
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
    return(
    <Link to="/media"><img src={"/static_ikone/kamera.png"} alt="medija"/></Link>);
};
