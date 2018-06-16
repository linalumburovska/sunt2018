import React from 'react'
import {getImageSrc} from "./utility";
import {AuthorAPI, ProjectAPI} from "./api/client";
import {ProjectPresentation} from "./ProjectPresentation";
import {Link, Route, Switch} from 'react-router-dom';
import './Project.css'

export class Project extends React.Component {


    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            path: '',
            author:'',
            images:[],
            title:'',

        };
    }

    loadFromServer(match) {
        if (match !== undefined) {
            ProjectAPI.get(match.params.index)
                .then(project => this.setState({images:project.image, title:project.title}));
            AuthorAPI.get(match.params.index)
                .then(project => this.setState({author: project.name}));
            console.log("Project mounted", this.state);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {match} = this.props;
        if (prevProps.match.params.index !== this.props.match.params.index) {
            this.loadFromServer(match);
        } else {
            console.log("not updating", prevState, this.state);
        }
        console.log("final state:", this.state);
        let neki = this.state.images[0];
        console.log("neki", typeof(neki));
        console.log("slike ", this.state.images[0]['path']);
    }

    componentDidMount() {
        const {match} = this.props;
        this.loadFromServer(match);

    }

    handleClick() {
        this.setState(prevState => ({opened: !prevState.opened}))
    }

    render() {
        const {images, author, title} = this.state;
        const {match} = this.props;


        if (images != null) {
            return (
                <div className="ProjectTitle">
                    <div className="Project-video"><video id="videoPlayer" loop autoPlay muted src={"http://localhost:3000/ales_sedmak.mp4"}/></div>
                    <table id="Buttons">
                        <tr>
                            <td id="360" align="left"><Link to="/360">360°</Link></td>
                            <td id="info" align="right"><Link to="/info">Info</Link></td>
                        </tr>
                    </table>
                    <div id="title-and-author">
                        <div id="title">K-9 Topologija</div>
                        <div id="author">Maja Smrekar</div>
                    </div>
                    <Switch>
                        <Route path="/info" component={ProjectPresentation}/>
                    </Switch>
                </div>
            )
        } else {
            return (
                <div className="ProjectTitle">
                    <div className="Project-video"><img id="videoPlayer" src={images[2].path} alt={images[2].alt}/></div>
                    <table id="Buttons">
                        <tr>
                            <td id="360" align="left"><Link to="/360">360°</Link></td>
                            <td id="info" align="right"><Link to="/info">Info</Link></td>
                        </tr>
                    </table>
                    <div id="title-and-author">
                        <div id="title">{title}</div>
                        <div id="author">{author}</div>
                    </div>
                    <Switch>
                        <Route path="/info" component={ProjectPresentation}/>
                    </Switch>
                </div>
            )
        }
    }
}