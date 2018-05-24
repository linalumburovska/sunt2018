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
            author:'',
            title:'',
            opened: false,
        };
    }

    loadFromServer(match) {
        if (match !== undefined) {
            ProjectAPI.get(match.params.index)
                .then(project => this.setState({author:project.author, title:project.title}));
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
        const {path, author, title} = this.state;
        const {match} = this.props;


        if (0) {
            return (
                <div className="ProjectTitle">
                    <div className="Project-video"><video id="videoPlayer" loop autoPlay muted src={"http://localhost:3000/videos/1.mov"}/></div>
                    <table id="Buttons">
                        <tr>
                            <td id="360" align="left"><a href="https://www.google.com">360°</a></td>
                            <td id="info" align="right"><a href="https://www.google.com">Info</a></td>
                        </tr>
                    </table>
                    <div id="title-and-author">
                        <div id="title">K-9 Topologija</div>
                        <div id="author">Maja Smrekar</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="ProjectTitle">
                    <div className="Project-video"><video id="videoPlayer" loop autoPlay muted src={"http://localhost:3000/videos/1.mov"}/></div>
                    <table id="Buttons">
                        <tr>
                            <td id="360" align="left"><Link onClick={this.handleClick()}>360°</Link></td>
                            <td id="info" align="right"><Link onClick={this.handleClick()}>Info</Link></td>
                        </tr>
                    </table>
                    <div id="title-and-author">
                        <div id="title">{title}</div>
                        <div id="author">{author}</div>
                    </div>
                    <Route path={`${match.path}/info`} component={ProjectPresentation}/>
                </div>
            )
        }
    }
}