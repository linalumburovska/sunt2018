import React from 'react'
import {Project} from "./Project";
import {Link, Switch, Route} from 'react-router-dom';
import {ProjectAPI} from "./client";

export class ProjectPagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    componentDidMount() {
        // let index = parseInt(this.props.match.params.id, 10);
        ProjectAPI.all().then(data => this.setState({projects: data}));
    }


    render() {
        const {projects} = this.state;
        const {match} = this.props;

        return (
            <div>
                <h1>Projects</h1>
                <ul>
                    {projects.map(({ title, index }) => (
                        <li key={index}>
                            <Link to={`${match.url}/${index}`}>{title}</Link>
                        </li>
                    ))}
                </ul>

                <hr />

                <Route path={`${match.path}/:index`} component={Project} />
            </div>
        )
    }
}

