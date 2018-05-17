import React, {Component} from 'react';
import './App.css';
import {Link, Route, Switch, Redirect} from "react-router-dom";
import {ProjectPagination} from "./ProjectPagination";


class App extends Component {
    render() {
        return (
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/about'}>About</Link></li>
                        <li><Link to={'/projects'}>Project</Link></li>
                    </ul>
                </nav>

                <Switch>
                    <Route path='/projects' component={ProjectPagination}/>
                </Switch>
            </div>
        );
    }
}

const Home = () => (
    <p>Welcome Home</p>
);

const About = () => (
    <p>Modern Art stuff</p>
);


export default App;
