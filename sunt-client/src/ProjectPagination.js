import React from 'react'
import {Project} from "./Project";
import {Link, Switch, Route} from 'react-router-dom';
import {ProjectAPI} from "./api/client";
import "./ProjectPagination.css"

export class ProjectPagination extends React.Component {

    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.state = {
            projects: [],
            currentIndex: 1
        };
    }

    componentDidMount() {
        ProjectAPI.all().then(data => this.setState({projects: data}));
    }

    handleNext(e) {
        this.setState(prevState => ({currentIndex: prevState.currentIndex + 1}))
    }

    handlePrev(e) {
        this.setState(prevState => ({currentIndex: prevState.currentIndex -1}))
    }

    render() {
        const {currentIndex} = this.state;
        const {match} = this.props;


        return (
            <div className="ProjectPagination">
                <div className="ProjectPagination-buttons">
                <div id="prev">
                    <PrevButton match={match} index={currentIndex} onClick={this.handlePrev}/>
                </div>
                <div id="next">
                    <NextButton match={match} index={currentIndex} onClick={this.handleNext}/>
                </div>
                </div>
                <Route path={`${match.path}/:index`} component={Project}/>
            </div>
        )
    }
}

function NextButton(props) {
    const {match, index, onClick} = props;
    if(!(index+1 < 28)){return(<div></div>)}
    return (
        <Link to={`${match.url}/${index + 1}`}>
            <input onClick={onClick} type="image" alt="dol" src="http://localhost:3000/static_ikone/dolga.png" width={"auto"} height={"auto"}/>
        </Link>
    )
}

function PrevButton(props) {
    const {match, index, onClick} = props;
    const inputStyle = {
        transform:'rotate(180deg)',
    };
    if(!(index - 1 > 0)){return(<div></div>)}
    return (
        <Link to={`${match.url}/${index - 1}`}>
            <input onClick={onClick} type="image" alt="gor" src="http://localhost:3000/static_ikone/dolga.png" style={inputStyle}/>
        </Link>
    )
}

