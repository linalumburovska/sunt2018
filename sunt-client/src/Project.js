import React from 'react'
import {getImageSrc} from "./utility";
import {ProjectAPI} from "./api/client";
import {ProjectPresentation} from "./ProjectPresentation";
import {Link, Route} from 'react-router-dom';
import './Project.css'
import Fullscreen from "react-full-screen";

export class Project extends React.Component {


    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            path: '',
            description: '',
            opened: false,
        };
    }

    loadFromServer(match) {
        if (match !== undefined) {
            ProjectAPI.get(match.params.index)
                .then(project => this.setState({path: project.image[0].path, description: project.description}));
            console.log("Project mounted", this.props);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {match} = this.props;
        if (prevProps.match.params.index !== this.props.match.params.index) {
            this.loadFromServer(match);
        } else {
            console.log("not updating", prevState, this.state);
        }
    }

    componentDidMount() {
        const {match} = this.props;
        this.loadFromServer(match);

    }

    handleClick() {
        this.setState(prevState => ({opened: !prevState.opened}))
    }

    render() {
        const {path, description, opened} = this.state;
        const {match} = this.props;


        if (path.length === 0) {
            return (
                <div className="ProjectTitle">
                    <div className="Project-video"><video id="videoPlayer" loop autoPlay muted src={"http://localhost:3000/videos/1.mov"}/></div>
                    <table id="Buttons">
                        <tr>
                            <td id="info"><a href="https://www.google.com">Info</a></td>
                            <td id="360" align="right"><a href="https://www.google.com">360°</a></td>
                        </tr>
                    </table>
                    <div className="ProjectPresentation">
                        <div id="title">K-9 Topologija</div>
                        <div id="author">Maja Smrekar</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <video id="background-video" loop autoPlay>
                        <source src={getImageSrc(path)} type="video/mp4"/>
                    </video>
                    <h1>{description}</h1>
                    <Link to={`${match.url}${!opened ? '/description' : ''}`} onClick={this.handleClick}>
                        <div id="project-info">Info</div>
                    </Link>
                    <Link onClick={this.handleClick()}>//za 360
                        <div id="project-360">360°</div>
                    </Link>
                    <Route path={`${match.path}/description`} component={ProjectPresentation}/>
                </div>
            )
        }
    }
}