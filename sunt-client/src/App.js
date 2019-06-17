import React, {Component} from 'react';
import {Link, Route, Switch, Redirect} from "react-router-dom";
import {ProjectPagination} from "./ProjectPagination";
import {ProjectPresentation} from "./ProjectPresentation";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import './App.css';
import first from './images/first.png';
import second from './images/second.png';
import {IndexProvider} from "./IndexContext";
import {About2} from "./About2";
import {ProjectAPI} from "./api/client";
import {UnityComponent} from "./UnityComponent";


class App extends Component {
  constructor() {
    super();
    this.state = {
      imgLeft: '',
      imgRight: '',
      projects: []
    }
  }

  componentWillMount() {
    ProjectAPI.all().then(data => {this.setState({ projects: data})});
    this.setState({ imgLeft: first, imgRight: second });
  }


  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={(props) => (<Home index={this.state.index} imgLeft={this.state.imgLeft} imgRight={this.state.imgRight} {...props} />)} />
          <Route path='/gallery' render={(props) => (<IndexProvider value={this.state}><Gallery projects={this.state.projects} {...props} /></IndexProvider>)}/>
          <Route path={"/projects"} render={(props) => (<IndexProvider value={this.state}><ProjectPagination {...props} /></IndexProvider>)}/>
          <Route path='/about' render={(props) => (<IndexProvider value={this.state}><About2 {...props} /></IndexProvider>)}/>
          <Route path={"/info"} component={ProjectPresentation}/>
          <Route path='/en/gallery' render={(props) => (<IndexProvider value={this.state}><Gallery projects={this.state.projects} {...props} /></IndexProvider>)}/>
          <Route path={"/en/projects"} render={(props) => (<IndexProvider value={this.state}><ProjectPagination {...props} /></IndexProvider>)}/>
          <Route path='/en/about' render={(props) => (<IndexProvider value={this.state}><About2 {...props} /></IndexProvider>)}/>
          <Route path="/unity/:index" component={UnityComponent}/>
          <Redirect path="/unity" to="/unity/1" />

          <Redirect from="*" to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
