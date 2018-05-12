import React from 'react'

import {ProjectAPI} from "./api/client";
import {getImageSrc} from "./utility";

export class ProjectPresentation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            images: [],
            authors: [],
            description: "",
            title: ""

        };
    }

    componentDidMount() {
        let index = parseInt(this.props.match.params.index, 10);

        ProjectAPI.get(index)
            .then(item => {
                console.log(item);
                this.setState({
                    isLoading: false,
                    images: item.image,
                    authors: item.author,
                    title: item.title,
                    description: item.description
                })
            });
        console.log(this.props);
        console.log("has match", this.props.match !== undefined);
    }

    render() {
        const {isLoading, title, description} = this.state;
        if (isLoading) {
            return <p>Loading ...</p>;
        }

        const path = this.state.images[0].path;
        const author = this.state.authors[0].name;

        return (
            <div className="ProjectPresentation">
                <img src={getImageSrc(path)} alt="None" width="300px"/>
                {description} <br/>
                {title} <br/>
                {author}
            </div>
        )
    }
}