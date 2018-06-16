import React from 'react'

import {ProjectAPI, AuthorAPI} from "./api/client";
import {getImageSrc} from "./utility";
import {Link} from "react-router-dom";
import "./ProjectPresentation.css";
export class ProjectPresentation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            images: [],
            authors: "",
            description: "",
            title: ""

        };
    }

    componentDidMount() {
        let index = parseInt(this.props.match.params.index, 10);

        ProjectAPI.get(5)
            .then(item => {
                this.setState({
                    isLoading: false,
                    images: item.image,
                    title: item.title,
                    description: item.description
                })
            });

        AuthorAPI.get(index)
            .then(item => {
            console.log(item);
            this.setState({
                authors: item.name
            })
        });
        console.log("Current State: ", this.state);
        console.log("has match", this.props.match !== undefined);
    }

    render() {
        const {isLoading, title, description} = this.state;

        //const path = this.state.images[0].path;
        //const author = this.state.authors[0].name;

        return (
            <div className="ProjectPresentation">
                <div className="Present-background"><img id="back" src={this.state.images} alt="Štiri pravokotne visoke vitrine. V vsaki je majhen…uje statistiko o slovenskih literarnih avtoricah."/></div>
                <div id="content">
                    <div id="description">hgggggggggggggggggggggg</div>
                    <div id="author">hggggggggggggggggggggg</div>
                </div>
                <table id="Buttons">
                    <tr>
                        <td id="Back" align="left"><Link to="/projects">Back</Link></td>
                        <td id="Media" align="right"><Link to="/info">Media</Link></td>
                    </tr>
                </table>

            </div>
        )
    }
}
