import React, {Component} from 'react';
import {Link, Route, Switch, Redirect} from "react-router-dom";
import {ProjectPagination} from "./ProjectPagination";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import './App.css';
import first from './images/first.png';
import second from './images/second.png';
import { dummy } from './ApiDummyData';

class App extends Component {
  constructor() {
    super();
    this.state = {
      imgLeft: '',
      imgRight: '',
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
          <Route exact path='/' render={(props) => (<Home imgLeft={this.state.imgLeft} imgRight={this.state.imgRight} {...props} />)} />
          <Route path='/about' component={About} />
          <Route path='/projects' component={ProjectPagination} />
          <Route path='/gallery' render={(props) => (<Gallery projects={this.state.projects} {...props} />)} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    );
  }
}


const About = () => (
    <p>Modern Art stuff</p>
);


export default App;
