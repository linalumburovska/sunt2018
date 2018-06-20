import React from 'react'
import {Project} from "./Project";
import {Link, Switch, Route} from 'react-router-dom';
import {ProjectAPI} from "./api/client";
import "./ProjectPagination.css"
import {ProjectPresentation} from "./ProjectPresentation";
import {IndexConsumer} from "./IndexContext";

export class ProjectPagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            reserveIndex: 1,
            visible: true,
            hide: () => {this.setState({visible:!this.state.visible})}
        };

    }

    componentDidMount() {
        ProjectAPI.all().then(data => this.setState({projects: data}));
    }

    render() {
        const {visible, hide, reserveIndex} = this.state;
        const {match} = this.props;

        if(visible) {
            return (
                <IndexConsumer>
                    {({change, index}) => {
                        console.log("ABOUT VRAČANJE",index);
                        console.log(this.props);
                        return(
                        <div className="Content">
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
                                        <AboutButton location={match.path}></AboutButton>
                                    </div>
                                </div>
                                <div className="ProjectPagination-buttons">
                                    <div id="prev">
                                        <PrevButton match={match} index={index.value} onClick={e => change({value: index.value-1})}/>
                                    </div>
                                    <div id="next">
                                        <NextButton match={match} index={index.value} onClick={e => change({value: index.value+1})}/>
                                    </div>
                                </div>
                                <Route path={`${match.path}/:index`} render={(props) => (<Project hide={hide} {...props} />)}/>
                            </div>
                        </div>
                        );
                    }}
                </IndexConsumer>
            )
        }else{
            return(
                <IndexConsumer>
                    {({index}) => {
                        return(
                            <div className="Content">
                                <Route path={`${match.path}/:index/info`} render={(props) => (<ProjectPresentation hide={hide} {...props}/>)}/>
                            </div>
                        );
                    }}
                </IndexConsumer>
            )
        }
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

function AboutButton(props) {
    const {location} = props;
    console.log("DA VIDFISMFISMCISMODCMSID", props);
    return(
        <Link to={{
            pathname: "/about",
            state: {back: location}
        }}>About</Link>)
};

