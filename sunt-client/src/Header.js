import React, {Component} from 'react';
import './App.css';
import {Link, Route, Switch, Redirect} from "react-router-dom";
import {Project} from "./Project";
import {ProjectPagination} from "./ProjectPagination";
import {ProjectPresentation} from "./ProjectPresentation";


export class Header extends React.Component {

    render(){
        return (
            <div className="Header">
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
        );
    }
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
