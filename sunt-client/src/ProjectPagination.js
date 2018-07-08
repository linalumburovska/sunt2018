import React from 'react'
import {Project} from "./Project";
import {Link, Route} from 'react-router-dom';
import {ProjectAPI} from "./api/client";
import "./ProjectPagination.css"
import {ProjectPresentation} from "./ProjectPresentation";
import {IndexConsumer} from "./IndexContext";

export class ProjectPagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            reserveIndex: Math.max.apply(null, this.props.location.pathname.match(/\d+/g)) ,
            visible: true,
            hide: () => {this.setState({visible:!this.state.visible})},
            eng: false
        };

        this.changeLanguage=this.changeLanguage.bind(this)
    }

    componentDidMount() {
        ProjectAPI.all().then(data => this.setState({projects: data}));
    }

    changeLanguage(){
        this.setState(prevState => ({
            eng: !prevState.eng
        }));
        console.log("CHANGE ENG",this.state)
    }

    render() {
        const {visible, hide, reserveIndex} = this.state;
        const {match} = this.props;
        let id=1;
        if(visible) {
            return (
                <IndexConsumer>
                    {({change, index}) => {
                        if(index.value !== undefined){
                            id=index.value;
                        }else{
                            id=reserveIndex;
                        }
                        if(this.props.location.pathname.includes('/info')){
                            this.setState({visible: false});
                        }
                        return(
                        <div className="Content">
                            <div className="ProjectPagination">
                                <div className="ProjectPagination-Header">
                                    <div id="home">
                                        <HomeButton></HomeButton>
                                    </div>
                                    <div id="language">
                                        <LanguageButton loc={this.props.match.path} index={id} onClick={(e) => this.changeLanguage()}></LanguageButton>
                                    </div>
                                    <div></div>
                                    <div id="about">
                                        <AboutButton loc={this.props.match.path} location={this.props.location.pathname}></AboutButton>
                                    </div>
                                </div>
                                <div className="ProjectPagination-buttons">
                                    <div id="prev">
                                        <PrevButton match={match} index={id} onClick={e => change({value: id-1})}/>
                                    </div>
                                    <div id="next">
                                        <NextButton match={match} index={id} onClick={e => change({value: id+1})}/>
                                    </div>
                                </div>
                                <Route path={`${match.path}/:id`} render={(props) => (<Project hide={hide} {...props} />)}/>
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
                        if(index.value !== undefined){
                            id=index.value;
                        }else{
                            id=reserveIndex;
                        }
                        if(!this.props.location.pathname.includes('/info')){
                            this.setState({visible:true});
                        }
                        return(
                            <div className="Content">
                                <Route path={`${match.path}/:id/info`} render={(props) => (<ProjectPresentation hide={hide} {...props}/>)}/>
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
    if(!(index+1 < 27)){return(<div></div>)}
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
    <Link to={'/gallery'}>
        <img src="http://localhost:3000/static_ikone/logo.png" alt="home"/>
    </Link>
);

function LanguageButton(props) {
    const {loc, index, onClick} = props;
    if(loc.includes("/en")){
        return(<Link to={`/projects/${index}`} onClick={onClick}>SI</Link>);
    }else{
        return(<Link to={`/en/projects/${index}`} onClick={onClick}>EN</Link>);
    }
};

function AboutButton(props) {
    const {location, loc} = props;
    if(loc.includes("/en")){
        return(
            <Link to={{
                pathname: "/en/about/1",
                state: {back: location}
            }}>About</Link>)
    }else {
        return (
            <Link to={{
                pathname: "/about/1",
                state: {back: location}
            }}>About</Link>)
    }
};

