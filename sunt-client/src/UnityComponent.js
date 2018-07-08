import React from "react";
import Unity, {UnityContent} from "react-unity-webgl";


const mapping = {
    1: "posters",
    2: "tv-1",
    3: "tv-2",
    4: "suspended-cards",
    5: "perimiter-2",
    6: "stars",
    7: "projections",
    8: "wall-1",
    9: "floor-tv",
    10: "desk-1",
    11: "3d-print-2",
    12: "heart-2",
    13: "interspecies-1",
    14: "heart-1",
    15: "trees-1",
    16: "ipad-1",
    17: "medij-1",
    18: "headset-1",
    19: "instrument-1",
    20: "bot-1",
    21: "projected-dots",
    22: "entrance-1",
    23: "entrance-2",
    24: "entrance-3",
    25: "small-center-1"
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

        console.log(this.state);
        this.unityContent.on("loaded", () => {
            this.setState({loaded: true});
            let content = this.unityContent;
            console.log(this.state);

            let project = mapping[parseInt(this.props.match.params.index, 10)];
            if (project === undefined) {
                project = mapping[1];
            }

            setTimeout(function () {
                content.send("Tripod", "TransitionToSphere", project);
            }, 5000)
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
                <Unity unityContent={this.unityContent}/>
            </div>
        );
    }
}
