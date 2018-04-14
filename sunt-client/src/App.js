import React, {Component} from 'react';
import './App.css';
import {Link, Route, Switch, Redirect} from "react-router-dom";
import {ProjectPagination} from "./ProjectPagination";
import {ProjectPresentation} from "./ProjectPresentation";


class App extends Component {
    render() {
        return (
            <div className="App">
                {/*<header className="App-header">*/}
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    {/*<h1 className="App-title">Welcome to React</h1>*/}
                {/*</header>*/}
                <nav>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/about'}>About</Link></li>
                        <li><Link to={'/projects'}>Project</Link></li>
                    </ul>
                </nav>

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/about' component={About}/>
                    {/*<Route path='/projects/:id/presentation' component={ProjectPresentation} />*/}
                    {/*<Route exact path='/projects' render={() =>*/}
                        {/*<Redirect to='/projects/1'/>*/}
                    {/*}*/}
                    {/*/>*/}
                    {/*<Route path='/projects/:id' component={ProjectPagination}/>*/}
                    <Route path='/projects' component={ProjectPagination} />
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

const Projects = () => (
    <p>Project X</p>
);

export default App;
