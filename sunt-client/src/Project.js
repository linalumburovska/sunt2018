import React from 'react'
import {AuthorAPI, ProjectAPI} from "./api/client";
import {Link, Redirect} from 'react-router-dom';
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
            error: false
        };
    }

    loadFromServer(match) {
        if (match !== undefined && 0 < match.params.id && match.params.id < 27) {
            console.log("MATCH PROJECT", match);
            if(match.path.includes("/en")) {
                ProjectAPI.get(match.params.id)
                    .then(project => this.setState({images: project.image, title: project.englishTitle}));
            }else{
                ProjectAPI.get(match.params.id)
                    .then(project => this.setState({images: project.image, title: project.title}));
            }
            AuthorAPI.get(match.params.id)
                .then(project => this.setState({author: project.name}));
            console.log("Project mounted", this.state);
        }else{
            this.setState({error:true});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {match} = this.props;
        if (prevProps.match.params.id !== this.props.match.params.id || prevProps.match.path !== this.props.match.path){
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
        const {images, author, title} = this.state;
        const {match} = this.props;

        if(this.state.error){
            return(<Redirect to={"/"}/>)
        }
        console.log("STATE", this.state);
        if (images !== undefined && images[1] !== undefined && images[1].videoPath) {
            return (
                <div className="ProjectTitle">
                    <div className="Project-video"><video autoPlay loop muted id="videoPlayer" src={images[1].videoPath}/></div>
                    <table id="Buttons">
                        <tr>
                            <td id="360" align="left"><Link to={`/unity/${match.params.id}`}>360°</Link></td>
                            <td id="info" align="right"><Link to={`${match.url}/info`} onClick={this.props.hide}>Info</Link></td>
                        </tr>
                    </table>
                    <table id="title-and-author">
                        <tr style={{height:'50%'}}>
                            <th style={{height:'50%'}} id="title">{title}</th>
                            <td style={{height:'50%'}} id="author">{author}</td>
                        </tr>
                    </table>
                </div>
            )
        }else if(images !== undefined && images[1] !== undefined){
            return(
            <div className="ProjectTitle">
                <div className="Project-video"><img id="videoPlayer" src={images[1].path} alt={images[1].alt}/></div>
                <table id="Buttons">
                    <tr>
                        <td id="360" align="left"><Link to="/360">360°</Link></td>
                        <td id="info" align="right"><Link to={`${match.url}/info`} onClick={this.props.hide}>Info</Link></td>
                    </tr>
                </table>
                <table id="title-and-author">
                    <tr style={{height:'50%'}}>
                        <th style={{height:'50%'}} id="title">{title}</th>
                        <td style={{height:'50%'}} id="author">{author}</td>
                    </tr>
                </table>
            </div>)
        }else {
            return (
                <div className="ProjectTitle">
                    <div className="Project-video"></div>
                    <table id="Buttons">
                        <tr>
                            <td id="360" align="left"><Link to="/360">360°</Link></td>
                            <td id="info" align="right"><Link to="/info">Info</Link></td>
                        </tr>
                    </table>
                    <table id="title-and-author">
                        <tr>
                            <div id="title"><h1>{title}</h1></div>
                        </tr>
                        <tr>
                            <div id="author"><h2>{author}</h2></div>
                        </tr>
                    </table>
                </div>
            )
        }
    }
}