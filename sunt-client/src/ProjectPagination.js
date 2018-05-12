import React from 'react'
import {Project} from "./Project";
import {Link, Switch, Route} from 'react-router-dom';
import {ProjectAPI} from "./api/client";

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
            <div>
                <h1>Projects</h1>
                <NextButton match={match} index={currentIndex} onClick={this.handleNext}/>
                <PrevButton match={match} index={currentIndex} onClick={this.handlePrev}/>

                <hr />

                <Route path={`${match.path}/:index`} component={Project} />
            </div>
        )
    }
}

function NextButton(props) {
    const {match, index, onClick} = props;
    return (
        <Link to={`${match.url}/${index + 1}`}>
            <button onClick={onClick}>Next</button>
        </Link>
    )
}

function PrevButton(props) {
    const {match, index, onClick} = props;

    return (
        <Link to={`${match.url}/${index - 1}`}>
            <button  onClick={onClick}>Previous</button>
        </Link>
    )
}

