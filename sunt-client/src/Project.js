import React from 'react'
import {getImageSrc} from "./utility";
import {ProjectAPI} from "./api/client";
import {ProjectPresentation} from "./ProjectPresentation";
import {Link, Route} from 'react-router-dom';


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
                    Loading...
                </div>
            )
        } else {
            return (
                <div className="ProjectTitle">
                    <h1>{description}</h1>
                    <Link to={`${match.url}${!opened ? '/description' : ''}`} onClick={this.handleClick}>
                        <img src={getImageSrc(path)} alt={description} width="300px"/>
                    </Link>

                    <hr />
                    <Route path={`${match.path}/description`} component={ProjectPresentation}/>
                </div>
            )
        }
    }
}