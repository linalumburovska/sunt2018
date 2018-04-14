import React from 'react'
import {getImageSrc} from "./utility";
import {ProjectAPI} from "./client";

// function Project ({match}) {
//
// }

export class Project extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            path: '',
            description: ''
        };
    }

    loadFromServer(match) {
        if (match !== undefined) {
            ProjectAPI.get(match.params.index)
                .then(project => this.setState({path: project.images[0], description: project.description}));
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

    render() {
        const {path, description} = this.state;

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
                    <img src={getImageSrc(path)} alt={description}/>
                </div>
            )
        }
    }
}