import React from 'react'
import {Project} from "./Project";
import {Link, Switch, Route} from 'react-router-dom';
import {ProjectAPI} from "./api/client";
import "./ProjectPagination.css"
import {Header} from "./Header";
import {ProjectPresentation} from "./ProjectPresentation";

export class ProjectPagination extends React.Component {

    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.state = {
            projects: [],
            currentIndex: 1
        };

        if(this.props.location.state != null){
            let temp=this.props.location.identiteta;
            this.setState(temp => ({currentIndex: temp}))
        }
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
        const {currentIndex, data} = this.state;
        const {match} = this.props;

        console.log(data);


        return (
            <div className="ProjectPagination">
                <div className="ProjectPagination-Header">
                    <div id="home">
                        <HomeButton></HomeButton>
                    </div>
                    <div id="language">
                        <LanguageButton></LanguageButton>
                    </div>
                    <div></div>
                    <div id="about">
                        <AboutButton></AboutButton>
                    </div>
                </div>
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

const HomeButton = () => (
    <Link to={'/'}>
        <img src="http://localhost:3000/static_ikone/logo.png" alt="home"/>
    </Link>
);

const LanguageButton = () => (
    <Link to={'/projects'}>EN</Link>
);

const AboutButton = () => (
    <Link to={'/about'}>About</Link>

);

