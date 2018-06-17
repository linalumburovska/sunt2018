import React, {Component} from 'react';
import {Link, Route, Switch, Redirect, Router} from "react-router-dom";
import {Project} from "./Project";
import {ProjectPagination} from "./ProjectPagination";
import {ProjectPresentation} from "./ProjectPresentation";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import './App.css';
import first from './images/first.png';
import second from './images/second.png';
import { dummy } from './ApiDummyData';
import {About} from "./About";


const IndexContext = React.createContext('1');

class App extends Component {
  constructor() {
    super();
    this.state = {
      imgLeft: '',
      imgRight: '',
      index: 1,
      projects: dummy
    }
  }


  /*
  * Get all projects and get images for home page
  */
  componentWillMount() {
    //ProjectAPI.all().then(data => this.setState({ projects: data, imgLeft: data[0].image[0].path, imgRight: data[1].image[0].path }));
    this.setState({ imgLeft: first, imgRight: second });
  }


  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={(props) => (<Home index={this.state.index} imgLeft={this.state.imgLeft} imgRight={this.state.imgRight} {...props} />)} />
          <Route path='/gallery' render={(props) => (<Gallery index={this.state.index} projects={this.state.projects} {...props} />)} />
          <Route path='/projects' component={ProjectPagination}/>
          <Route path={"/info"} component={ProjectPresentation}/>
          <Route path='/about' component={About}/>
          <Redirect from="*" to="/" />
        </Switch>

      </div>
    );
  }
}

export default App;
