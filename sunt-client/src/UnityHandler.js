import React from "react";
import Unity, {UnityEvent} from "react-unity-webgl";

const mapping = {
    1: "posters",
    2: "tv-1",
    3: "tv-2"};

export class UnityHandler extends React.Component {
    constructor(props) {
        super(props);
        this.transition = new UnityEvent("Tripod", "TransitionToSphere");

    }

    onClickTransition(index) {
        if (this.transition.canEmit() === true) this.transition.emit(index);
    }
    render() {
        return (

            <div>
                <div onClick={this.onClickTransition.bind(this, "posters")}>
                    Click to load posters sphere
                </div>
                <Unity
                    src="deployment-build/Build/deployment-build.json"
                    loader="deployment-build/Build/UnityLoader.js"
                />
            </div>
        );
    }
}
