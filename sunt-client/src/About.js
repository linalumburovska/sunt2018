import React, {Component} from 'react';
import './About.css';
import {Link, Route, Switch, Redirect} from "react-router-dom";

let aboutDesc = "Salon ZDSLU 2017, osrednja selekcionirana letna razstava, ki jo organizira Zveza društev slovenskih likovnih umetnikov (ZDSLU), je v tokratni ediciji posvečena medijski umetnosti in nosi naslov Podoba v mediju, medij v kontekstu. Snovalec koncepta, skupaj z Janezom Strehovcem selektor in predsednik žirije Srečo Dragan je v besedilu za katalog med drugim zapisal: »Fokus tokratnega Salona je na prehodih slike, grafike, kipa in  fotografije v protokole medijske umetnosti. S poudarkom na uporabi konceptov novomedijske umetnosti v medprostorih, ki jih ti sprožajo z usodnimi preboji v posameznih fazah umetniškega raziskovanja. Ti ključni momenti se realizirajo v natisnjenih izjavah, postavitvah artefaktov v nov, drugačen kontekst, v beleženju sledi komuniciranja – dekodiranega branja in ozaveščanja, da obstaja skupno polje doživetja, tako za avtorja kot za gledalca/obiskovalca.« Razstavno postavitev je zasnoval na podlagi petih platform, ki kartirajo izbor projektov. Selektorja sta na razstavo uvrstila 27 projektov, komisija v sestavi Nicole Hewitt, Srečo Dragan in Janez Strehovec pa je podelila Glavno nagrado žirije Narviki Bovcon in Alešu Vaupotiču za delo 3D vizualizacija literarnih avtoric. Člani umetniških svetov regionalni društev likovnih umetnikov so podelili dve Priznanji Salona ZDSLU 2017 in sicer Gorazdu Krncu za delo Worth not knowing where Knowing is / Europe 2017 in Marku Glavaču za delo (pra)DIH – (digi) NEOKRNJENOST. Od edinega medijski umetnosti posvečenega Majskega salona ZDSLU pred letošnjim je minilo točno 20 let. Na Salonu 2017 je bila razstava z naslovom Modra roka iz leta";
let aboutTitle = "Podoba v mediju medij v kontekstu";
export class About extends React.Component {

    render(){
        return (
            <div className="About">
                <div>
                    <img src="17_crtomir_frelih/_SIPK-9032.jpg" alt="test-pic" className="about-testback"/>
                    <img className="about-arrow about-arrow-left" src="http://localhost:3000/static_ikone/next.png" alt="previous"/>
                    <img className="about-arrow about-arrow-right" src="http://localhost:3000/static_ikone/next.png" alt="next"/>
                    <div className="about-description-left">
                        <h2>Podoba v mediju medij v kontekstu</h2>
                        <p className="about-text">Salon ZDSLU 2017, osrednja selekcionirana letna razstava, ki jo organizira Zveza društev slovenskih likovnih umetnikov (ZDSLU), je v tokratni ediciji posvečena medijski umetnosti in nosi naslov Podoba v mediju, medij v kontekstu. Snovalec koncepta, skupaj z Janezom Strehovcem selektor in predsednik žirije Srečo Dragan je v besedilu za katalog med drugim zapisal: »Fokus tokratnega Salona je na prehodih slike, grafike, kipa in  fotografije v protokole medijske umetnosti. S poudarkom na uporabi konceptov novomedijske umetnosti v medprostorih, ki jih ti sprožajo z usodnimi preboji v posameznih fazah umetniškega raziskovanja. Ti ključni momenti se realizirajo v natisnjenih izjavah, postavitvah artefaktov v nov, drugačen kontekst, v beleženju sledi komuniciranja – dekodiranega branja in ozaveščanja, da obstaja skupno polje doživetja, tako za avtorja kot za gledalca/obiskovalca.« Razstavno postavitev je zasnoval na podlagi petih platform, ki kartirajo izbor projektov. Selektorja sta na razstavo uvrstila 27 projektov, komisija v sestavi Nicole Hewitt, Srečo Dragan in Janez Strehovec pa je podelila Glavno nagrado žirije Narviki Bovcon in Alešu Vaupotiču za delo 3D vizualizacija literarnih avtoric. Člani umetniških svetov regionalni društev likovnih umetnikov so podelili dve Priznanji Salona ZDSLU 2017 in sicer Gorazdu Krncu za delo Worth not knowing where Knowing is / Europe 2017 in Marku Glavaču za delo (pra)DIH – (digi) NEOKRNJENOST. Od edinega medijski umetnosti posvečenega Majskega salona ZDSLU pred letošnjim je minilo točno 20 let. Na Salonu 2017 je bila razstava z naslovom Modra roka iz leta. <br/><br/>Salon ZDSLU 2017, osrednja selekcionirana letna razstava, ki jo organizira Zveza društev slovenskih likovnih umetnikov (ZDSLU), je v tokratni ediciji posvečena medijski umetnosti in nosi naslov Podoba v mediju, medij v kontekstu. Snovalec koncepta, skupaj z Janezom Strehovcem selektor in predsednik žirije Srečo Dragan je v besedilu za katalog med drugim zapisal: »Fokus tokratnega Salona je na prehodih slike, grafike, kipa in  fotografije v protokole medijske umetnosti. S poudarkom na uporabi konceptov novomedijske umetnosti v medprostorih, ki jih ti sprožajo z usodnimi preboji v posameznih fazah umetniškega raziskovanja. Ti ključni momenti se realizirajo v natisnjenih izjavah, postavitvah artefaktov v nov, drugačen kontekst, v beleženju sledi komuniciranja – dekodiranega branja in ozaveščanja, da obstaja skupno polje doživetja, tako za avtorja kot za gledalca/obiskovalca.« Razstavno postavitev je zasnoval na podlagi petih platform, ki kartirajo izbor projektov. Selektorja sta na razstavo uvrstila 27 projektov, komisija v sestavi Nicole Hewitt, Srečo Dragan in Janez Strehovec pa je podelila Glavno nagrado žirije Narviki Bovcon in Alešu Vaupotiču za delo 3D vizualizacija literarnih avtoric. Člani umetniških svetov regionalni društev likovnih umetnikov so podelili dve Priznanji Salona ZDSLU 2017 in sicer Gorazdu Krncu za delo Worth not knowing where Knowing is / Europe 2017 in Marku Glavaču za delo (pra)DIH – (digi) NEOKRNJENOST. Od edinega medijski umetnosti posvečenega Majskega salona ZDSLU pred letošnjim je minilo točno 20 let. Na Salonu 2017 je bila razstava z naslovom Modra roka iz leta <br/><br/>Salon ZDSLU 2017, osrednja selekcionirana letna razstava, ki jo organizira Zveza društev slovenskih likovnih umetnikov (ZDSLU), je v tokratni ediciji posvečena medijski umetnosti in nosi naslov Podoba v mediju, medij v kontekstu. Snovalec koncepta, skupaj z Janezom Strehovcem selektor in predsednik žirije Srečo Dragan je v besedilu za katalog med drugim zapisal: »Fokus tokratnega Salona je na prehodih slike, grafike, kipa in  fotografije v protokole medijske umetnosti. S poudarkom na uporabi konceptov novomedijske umetnosti v medprostorih, ki jih ti sprožajo z usodnimi preboji v posameznih fazah umetniškega raziskovanja. Ti ključni momenti se realizirajo v natisnjenih izjavah, postavitvah artefaktov v nov, drugačen kontekst, v beleženju sledi komuniciranja – dekodiranega branja in ozaveščanja, da obstaja skupno polje doživetja, tako za avtorja kot za gledalca/obiskovalca.« Razstavno postavitev je zasnoval na podlagi petih platform, ki kartirajo izbor projektov. Selektorja sta na razstavo uvrstila 27 projektov, komisija v sestavi Nicole Hewitt, Srečo Dragan in Janez Strehovec pa je podelila Glavno nagrado žirije Narviki Bovcon in Alešu Vaupotiču za delo 3D vizualizacija literarnih avtoric. Člani umetniških svetov regionalni društev likovnih umetnikov so podelili dve Priznanji Salona ZDSLU 2017 in sicer Gorazdu Krncu za delo Worth not knowing where Knowing is / Europe 2017 in Marku Glavaču za delo (pra)DIH – (digi) NEOKRNJENOST. Od edinega medijski umetnosti posvečenega Majskega salona ZDSLU pred letošnjim je minilo točno 20 let. Na Salonu 2017 je bila razstava z naslovom Modra roka iz leta<br/><br/>Salon ZDSLU 2017, osrednja selekcionirana letna razstava, ki jo organizira Zveza društev slovenskih likovnih umetnikov (ZDSLU), je v tokratni ediciji posvečena medijski umetnosti in nosi naslov Podoba v mediju, medij v kontekstu. Snovalec koncepta, skupaj z Janezom Strehovcem selektor in predsednik žirije Srečo Dragan je v besedilu za katalog med drugim zapisal: »Fokus tokratnega Salona je na prehodih slike, grafike, kipa in  fotografije v protokole medijske umetnosti. S poudarkom na uporabi konceptov novomedijske umetnosti v medprostorih, ki jih ti sprožajo z usodnimi preboji v posameznih fazah umetniškega raziskovanja. Ti ključni momenti se realizirajo v natisnjenih izjavah, postavitvah artefaktov v nov, drugačen kontekst, v beleženju sledi komuniciranja – dekodiranega branja in ozaveščanja, da obstaja skupno polje doživetja, tako za avtorja kot za gledalca/obiskovalca.« Razstavno postavitev je zasnoval na podlagi petih platform, ki kartirajo izbor projektov. Selektorja sta na razstavo uvrstila 27 projektov, komisija v sestavi Nicole Hewitt, Srečo Dragan in Janez Strehovec pa je podelila Glavno nagrado žirije Narviki Bovcon in Alešu Vaupotiču za delo 3D vizualizacija literarnih avtoric. Člani umetniških svetov regionalni društev likovnih umetnikov so podelili dve Priznanji Salona ZDSLU 2017 in sicer Gorazdu Krncu za delo Worth not knowing where Knowing is / Europe 2017 in Marku Glavaču za delo (pra)DIH – (digi) NEOKRNJENOST. Od edinega medijski umetnosti posvečenega Majskega salona ZDSLU pred letošnjim je minilo točno 20 let. Na Salonu 2017 je bila razstava z naslovom Modra roka iz leta</p>
                    </div>
                    <img src="logo_financerji.png" alt="test-logos" className="about-logo"/>
                </div>
            </div>
        );
    }
}
