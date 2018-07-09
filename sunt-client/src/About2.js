import React from 'react';
import './About2.css';
import {Link} from "react-router-dom";
import {IndexConsumer} from "./IndexContext";
import './About.css';

let aboutDesc = "Salon ZDSLU 2017, osrednja selekcionirana letna razstava, ki jo organizira Zveza društev slovenskih likovnih umetnikov (ZDSLU), je v tokratni ediciji posvečena medijski umetnosti in nosi naslov Podoba v mediju, medij v kontekstu. Snovalec koncepta, skupaj z Janezom Strehovcem selektor in predsednik žirije Srečo Dragan je v besedilu za katalog med drugim zapisal: »Fokus tokratnega Salona je na prehodih slike, grafike, kipa in  fotografije v protokole medijske umetnosti. S poudarkom na uporabi konceptov novomedijske umetnosti v medprostorih, ki jih ti sprožajo z usodnimi preboji v posameznih fazah umetniškega raziskovanja. Ti ključni momenti se realizirajo v natisnjenih izjavah, postavitvah artefaktov v nov, drugačen kontekst, v beleženju sledi komuniciranja – dekodiranega branja in ozaveščanja, da obstaja skupno polje doživetja, tako za avtorja kot za gledalca/obiskovalca.« Razstavno postavitev je zasnoval na podlagi petih platform, ki kartirajo izbor projektov. Selektorja sta na razstavo uvrstila 27 projektov, komisija v sestavi Nicole Hewitt, Srečo Dragan in Janez Strehovec pa je podelila Glavno nagrado žirije Narviki Bovcon in Alešu Vaupotiču za delo 3D vizualizacija literarnih avtoric. Člani umetniških svetov regionalni društev likovnih umetnikov so podelili dve Priznanji Salona ZDSLU 2017 in sicer Gorazdu Krncu za delo Worth not knowing where Knowing is / Europe 2017 in Marku Glavaču za delo (pra)DIH – (digi) NEOKRNJENOST. Od edinega medijski umetnosti posvečenega Majskega salona ZDSLU pred letošnjim je minilo točno 20 let. Na Salonu 2017 je bila razstava z naslovom Modra roka iz leta";
let aboutTitle = "Podoba v mediju medij v kontekstu";
export class About2 extends React.Component {
    constructor(props){
        super(props);
        this.state={
            visible: this.props.location.pathname.includes('/about/1'),
            hide: () => {this.setState({visible:!this.state.visible})}
        };
        console.log("ABOUT", this.props)
    }
    render(){
        if(this.state.visible && this.props.location.state !== undefined){
            if(this.props.location.pathname.includes('/about/2')){
                this.setState({visible: false});
            }
        return (
            <div className="About">
                <div className="About-background-background">
                    <div className="About-background">
                        <NazajButton back={this.props.location.state.back}></NazajButton>
                        <div className="about-scroll">
                            <p class="about-naslov">SEZNAM UMETNIKOV</p>
                            <div className="About-besedilo About-besedilo-levo">
                                <p class="podnaslov">Umetniško raziskovanje-kot-performativne prakse:</p>
                                <p class="navadno">Maja Smrekar</p>
                                <p class="navadno">Marko Glavač</p>
                                <p class="podnaslov">Podatkovne strukture-kot-novomedijski objekt:</p>
                                <p class="navadno">Narvika Bovcon in Aleš Vaupotič</p>
                                <p class="navadno">Franc Solina</p>
                                <p class="navadno">Matija Jašarov</p>
                                <p class="navadno">TNM - V.A.T. (Zoran Poznič, Maša Jazbec, Andrej Uduč)</p>
                                <p class="navadno">Tilen Žbona</p>
                                <p class="navadno">Peter Ciuha</p>
                                <p class="navadno">Miran Kreš</p>
                                <p class="navadno">Evelin Stermitz</p>
                                <p class="podnaslov">Kontekstualni prostori-kot-video TV kolaž:</p>
                                <p class="navadno about-bottom-space">Robert Černelč</p>
                            </div>

                            <div className="About-besedilo About-besedilo-desno">
                                <p class="naslov"></p>
                                <p class="podnaslov-zaceten-zamik">Skupno polje videa in slike:</p>
                                <p class="navadno">Dominik Olmiah Križan</p>
                                <p class="navadno">Aleš Sedmak</p>
                                <p class="navadno">Črtomir Frelih</p>
                                <p class="navadno">Dorian Španzl</p>
                                <p class="navadno">Duša Jesih</p>
                                <p class="navadno">Zoran Srdić Janežič</p>
                                <p class="navadno">Peter Marolt</p>
                                <p class="podnaslov">Video dela-kot-dokumenti, stališča:</p>
                                <p class="navadno">Tomaž Furlan</p>
                                <p class="navadno">Vanja Mervič</p>
                                <p class="navadno">Vesna Čadež</p>
                                <p class="navadno">Jure Fingušt Prebil</p>
                                <p class="navadno">Eva Petrič</p>
                            </div>

                        </div>
                        <SwitchButton dst={"/about/2"}back={this.props.location.state.back} onClick={this.state.hide}></SwitchButton>
                    </div>
                </div>
            </div>
        );}else{
            return(
                <div className="About">
                    <div>
                        <img src="/17_crtomir_frelih/_SIPK-9032.jpg" alt="test-pic" className="about-testback"/>
                        <SwitchButton dst={"/about/1"}back={this.props.location.state.back} onClick={this.state.hide}></SwitchButton>
                        <div className="about-description-left">
                            <h2>Podoba v mediju medij v kontekstu</h2>
                            <p className="about-text">Salon ZDSLU 2017, osrednja selekcionirana letna razstava, ki jo organizira Zveza društev slovenskih likovnih umetnikov (ZDSLU), je v tokratni ediciji posvečena medijski umetnosti in nosi naslov Podoba v mediju, medij v kontekstu. Snovalec koncepta, skupaj z Janezom Strehovcem selektor in predsednik žirije Srečo Dragan je v besedilu za katalog med drugim zapisal: »Fokus tokratnega Salona je na prehodih slike, grafike, kipa in fotografije v protokole medijske umetnosti. S poudarkom na uporabi konceptov novomedijske umetnosti v medprostorih, ki jih ti sprožajo z usodnimi preboji v posameznih fazah umetniškega raziskovanja. Ti ključni momenti se realizirajo v natisnjenih izjavah, postavitvah artefaktov v nov, drugačen kontekst, v beleženju sledi komuniciranja – dekodiranega branja in ozaveščanja, da obstaja skupno polje doživetja, tako za avtorja kot za gledalca/obiskovalca.« Razstavno postavitev je zasnoval na podlagi petih platform, ki kartirajo izbor projektov.
                                <br></br><br></br>Umetniško raziskovanje-kot-performativne prakse. Od premisleka koevolucije živih bitij do čutnega spoznavanja v galerijskem prostoru, Maja Smrekar, Marko Glavač.
                                <br></br>Podatkovne strukture-kot-novomedijski objekt. Narvika Bovcon in Aleš Vaupotič, Franc Solina, Matija Jašarov, TNM – V.A.T. (Zoran Poznič, Maša Jazbec, Andrej Uduč), Tilen Žbona, Peter Ciuha, Miran Kreš, Evelin Stermitz.
                                <br></br>Kontekstualni prostori-kot-video TV kolaž. Gorazd Krnc, Metka Zupanič, Artur Felicijan in Andraž Sedmak.
                                <br></br>Video-kot-remontaža zgodovine vizualnih umetnosti. Robert Černelč: Veliki rop vlaka, 1903.
                                <br></br>Skupno polje videa in slike. Dominik Olmiah Križan, Aleš Sedmak, Črtomir Frelih, Dorian Španzl, Duša Jesih, Zoran Srdić Janežič, Peter Marolt.
                                <br></br>Video dela-kot-dokumenti, stališča. Tomaž Furlan, Vanja Mervič, Vesna Čadež, Jure Fingušt Prebil, Eva Petrič.
                                <br></br><br></br>
                                Postavitev razstave Salon ZDSLU 2017 ni črna kocka, čeprav prevladuje medij videa, ampak je – kjer ne moti projekcije – osvetljena kot inscenacija, skozi katero obiskovalec prehaja in pri tem vidi sebe, celoten prostor in projekte ter obiskovalce, ki jih srečuje med ogledom.
                                <br></br>
                                Selektorja sta na razstavo uvrstila 27 projektov, komisija v sestavi Nicole Hewitt, Srečo Dragan in Janez Strehovec pa je podelila Glavno nagrado žirije Narviki Bovcon in Alešu Vaupotiču za delo 3D vizualizacija literarnih avtoric. Člani umetniških svetov regionalni društev likovnih umetnikov so podelili dve Priznanji Salona ZDSLU 2017 in sicer Gorazdu Krncu za delo Worth not knowing where Knowing is / Europe 2017 in Marku Glavaču za delo (pra) DIH – (digi) NEOKRNJENOST.
                                Od edinega medijski umetnosti posvečenega Majskega salona ZDSLU pred letošnjim je minilo točno 20 let. Na Salonu 2017 je bila razstava z naslovom Modra roka iz leta 1997 predstavljena na informacijski točki z video dokumenti. Leta 1997 je bil v okviru razstave Modra roka zbran in predstavljen pregled slovenskega videa iz desetletja prej, iz osemdesetih.
                            </p>
                        </div>
                        <img src="/logo_financerji.png" alt="test-logos" className="about-logo"/>
                    </div>
                </div>
            );
        }

    }
}
function SwitchButton(props){
    const {onClick, back, dst} = props;
    let add="";
    if(back.includes("/en")){add="/en";}
    if(dst === "/about/2") {
        return (
            <Link to={{
                pathname: `${add}${dst}`,
                state: {back: back}
            }} onClick={onClick}>
                <img class="about-arrow about-arrow-right" src="/static_ikone/next.png"
                     alt="next"/>
            </Link>
        )
    }else{
        return (
            <Link to={{
                pathname: `${add}${dst}`,
                state: {back: back}
            }} onClick={onClick}>
                <img className="about-arrow about-arrow-left" src="/static_ikone/next.png" alt="nazaj"/>
            </Link>
        )
    }

}
function NazajButton(props) {
    const {back} = props;
    if(back.includes("projects")){
        return(
        <IndexConsumer>
            {({index}) => {
                if(index.value !== undefined){
                    return (
                        <Link to={`/projects/${index.value}`}>
                            <img className="about-arrow about-arrow-left" src="/static_ikone/next.png"
                                 alt="next"/>
                        </Link>
                    )
                }else{
                    return (
                        <Link to={back}>
                            <img className="about-arrow about-arrow-left" src="/static_ikone/next.png"
                                 alt="next"/>
                        </Link>
                    )
                }

            }}
        </IndexConsumer>
        )
    }else{
        return(
            <Link to={back}>
                <img className="about-arrow about-arrow-left" src="/static_ikone/next.png"
                     alt="next"/>
            </Link>
        )
    }

}

