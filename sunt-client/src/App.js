import React, {Component} from 'react';
import './App.css';
import {Link, Route, Switch, Redirect} from "react-router-dom";
import {Project} from "./Project";
import {ProjectPagination} from "./ProjectPagination";


class App extends Component {

    render(){
        return (
            <div className="App">
                <div className="App-header">
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
                <div className="App-content">
                    <Switch>
                        <Route path='/projects' component={ProjectPagination}/>
                    </Switch>
                </div>
            </div>
        );
    }
}
const HomeButton = () => (
    <Link to={'/'}>
        <img src="http://localhost:3000/static_ikone/logo.png" alt="home"/>
    </Link>
);

const LanguageButton = () => (
    <Link to={'/'}>EN</Link>
);

const AboutButton = () => (
    <Link to={'/projects'}>About</Link>

);





export default App;
