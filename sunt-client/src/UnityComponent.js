import React from "react";
import Unity, {UnityContent} from "react-unity-webgl";


const mapping = {
    18: "posters",
    13: "tv-1",
    3: "tv-2",
    7: "suspended-cards",
    11: "perimiter-2",
    9: "stars",
    14: "projections",
    19: "wall-1",
    24: "floor-tv",
    17: "desk-1",
    23: "3d-print-2",
    6: "heart-2",
    1: "interspecies-1",
    22: "heart-1",
    2: "trees-1",
    16: "ipad-1",
    21: "medij-1",
    12: "headset-1",
    8: "instrument-1",
    20: "bot-1",
    4: "projected-dots",
    5: "entrance-1",
    25: "entrance-2",
    26: "entrance-3",
    27: "small-center-1"
};

const projects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

export class UnityComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: -1,
            loaded: false
        };

        this.unityContent = new UnityContent(
            "/deployment-build/Build/deployment-build.json",
            "/deployment-build/Build/UnityLoader.js"
        );
    }

    componentDidMount() {
        let index = parseInt(this.props.match.params.index, 10);
        this.setState({index: index});

        this.unityContent.on("AppLoaded", () => {
            this.setState({loaded: true});
            let content = this.unityContent;

            let project = mapping[parseInt(this.props.match.params.index, 10)];
            if (project === undefined) {
                project = mapping[1];
            }

            content.send("Tripod", "TransitionToSphere", project);
        });

        this.unityContent.on("SwitchProject", name => {
            let projectIndex = -1;
            for (let i = 1; i <= Object.values(mapping).length; i++) {
                if (mapping[i] === name) {
                    projectIndex = i;
                    break;
                }
            }

            if (projectIndex !== -1) {
                this.setState({index: projectIndex});
                this.props.history.push("/unity/" + projectIndex);
            } else {
                console.warn("No project found named: ", name);
            }
        });

        this.unityContent.on("LoadProject", () => {
            if (projects.includes(this.state.index)) {
                this.props.history.push("/projects/" + this.state.index);
            }
        });
    }

    render() {
        return (
            <div id="project-view">
                <Unity unityContent={this.unityContent} height="100%" width="100%"/>
            </div>
        );
    }
}
