import React from 'react'

import {ProjectAPI} from "./api/client";
import {getImageSrc} from "./utility";

export class ProjectPresentation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            project: null
        };
    }

    componentDidMount() {
        let index = parseInt(this.props.match.params.index, 10);

        ProjectAPI.get(index)
            .then(item => this.setState({project: item}));
        console.log(this.props);
        console.log("has match", this.props.match !== undefined);

    }

    render() {
        const {project} = this.state;

        if (project === null) {
            return <p>Loading ...</p>;
        }

        return (
            <div className="ProjectPresentation">
                <img src={getImageSrc(project.images[0])} alt="None" width="300px"/>
                {project.description} <br/>
                {project.author}
            </div>
        )
    }
}