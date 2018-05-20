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
                    <div className="Project-video"><video id="videoPlayer" loop autoPlay muted src={"http://localhost:3000/videos/1.mov"} width={"100%"} height={"100%"}/></div>
                    <div id="project-info">Info</div>
                    <div id="project-360">360°</div>
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