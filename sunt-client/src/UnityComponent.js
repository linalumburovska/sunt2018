import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";


const mapping = {
    1: "posters",
    2: "tv-1",
    3: "tv-2"
};

export class UnityComponent extends React.Component {
    constructor(props) {
        super(props);

        this.unityContent = new UnityContent(
            "/deployment-build/Build/deployment-build.json",
            "/deployment-build/Build/UnityLoader.js"
        );

        this.unityContent.on("loaded", () => {
            console.log("Loaded");
            this.setState({loaded: true});
            let content = this.unityContent;
            setTimeout(function() {
                content.send("Tripod", "TransitionToSphere", "posters");
            }, 5000)
        });




        this.state = {
            index: -1,
            loaded: false
        }
    }

    componentDidMount() {
        let index = parseInt(this.props.match.params.index, 10);
        this.setState({index: index})


    }

    render() {
        return (
            <Unity unityContent={this.unityContent} />
        );
    }
}
