import React, {PropTypes} from 'react';
import {Router} from 'react-router';
import {InputFelt} from '../InputFelt/InputFelt.jsx';
import {KalkulatorFelter} from './KalkulatorFelter.jsx';

export class LaneKalkulator extends React.Component{

    /*Konstruktør*/
    constructor(props,context){
        super(props,context);
        this.context = context;
        this.state = {
            verdier: {belop: '', ar: ''},
            resultat: 0,
            feilmelding: {}
        };
        this.setSoknadState = this.setSoknadState.bind(this);
        this.videre = this.videre.bind(this);
        this.beregn = this.beregn.bind(this);
    }

    /*Validerer kalkulatorfeltene mens brukeren skriver inn*/
    valider_input(nokkel,verdi){
        this.state.feilmelding = {};

        if(nokkel === 'belop'){
            if(!(/^\d*$/.test(verdi))){
                this.state.feilmelding.belop = "Beløpet må være et siffer";
                return false;
            }
            if(parseInt(verdi) > 3000000){
                this.state.feilmelding.belop = "Beløpet må være mellom 1 og 3.000.000";
                return false;
            }
        }
        else{
            if(!(/^\d*$/.test(verdi))){
                this.state.feilmelding.ar = "Antall år må være et siffer";
                return false;
            }
            if(parseInt(verdi) > 30){
                this.state.feilmelding.ar = "Antall år må være mellom 1 og 30";
                return false;
            }
        }
        return true;
    }

    /*Validerer feltene ved trykk på knapp*/
    valider_tomme_felter(){
        this.state.feilmelding = {};

        if(this.state.verdier.belop.length === 0){
            this.state.feilmelding.belop = "Fyll inn lånebeløp";
            return false;
        }
        if(parseInt(this.state.verdier.belop) < 10000){
            this.state.feilmelding.belop = "Lånebeløp må være større enn 10.000";
            return false;
        }
        if(this.state.verdier.ar.length === 0){
            this.state.feilmelding.ar = "Fyll inn antall år";
            return false;
        }
        if(parseInt(this.state.verdier.ar) < 1){
            this.state.feilmelding.ar = "Antall år må være større enn 0";
            return false;
        }
        return true;
    }

    /*onChange metode som oppdaterer verdien til feltene*/
    setSoknadState(event){
        var nokkel = event.target.name;
        var verdi = event.target.value;
        
        if(this.valider_input(nokkel,verdi)){
            this.state.verdier[nokkel] = verdi;
            return this.setState({verdier: this.state.verdier})
        }
        else{
            //Oppdaterer feilmeldingene dersom input i feltene ikke stemmer
            this.setState({feilmelding: this.state.feilmelding})
        }
    }

    /*Beregner pris pr mnd for lånebeløpet*/
    beregn(){
        if(this.valider_tomme_felter()){
            var rentefot = 0.07;
            var grunnbelop = this.state.verdier.belop;
            var antAar = this.state.verdier.ar;
            var kalkResultat = Math.floor((((rentefot* parseInt(grunnbelop)) / (1 - Math.pow((1 + rentefot), -parseInt(antAar))) / 12) * 100) / 100);
            this.state.resultat = kalkResultat;
            return this.setState({resultat: this.state.resultat});
        }
        else{
            //Oppdaterer feilmeldingene dersom input i feltene ikke stemmer
            return this.setState({feilmelding: this.state.feilmelding});
        }
    }

    /*Viderefører brukeren til RegistrerSoknad siden dersom feltene er validert*/
    videre(event){
        event.preventDefault();
        if(this.valider_tomme_felter()){
            this.beregn();
            this.context.router.push({pathname: '/RegistrerSoknad', query: {belop: this.state.verdier.belop, ar: this.state.verdier.ar, resultat: this.state.resultat}});
        }
        else{
            //Oppdaterer feilmeldingene dersom input i feltene ikke stemmer
            return this.setState({feilmelding: this.state.feilmelding});
        }
    }

    render(){
        return(
        <div id="kalkulatorInnhold">
            <div id="container">
                <div className="panel panel-default">
                    <div className="panel-heading"><div className="panel-title">Lånekalkulator</div></div>
                    <div className="panel-body">
                        <KalkulatorFelter verdier={this.state.verdier}
                                            onChange={this.setSoknadState}
                                            feilmelding={this.state.feilmelding}/>
                        <div className="form-group row">
                        <div className="col-md-8">
                             <InputFelt className="form-control" value={this.state.resultat} label="Pris pr mnd:" />
                        </div>
                            <div className="col-md-4">
                                <button type="submit" className="btn btn-block btn-success" onClick={this.beregn}>Beregn</button>
                            </div>
                        </div>
                        
                    </div>
                    <div className="panel-footer">
                        <div className="row">
                            <div className="form-group row">
                                <div className="col-md-4"></div>
                                <div className="col-md-4"></div>
                                <div className="col-md-4">
                                    <button type="button" className="btn btn-block btn-primary" onClick={this.videre}>
                                    Videre til søknad <span className="glyphicon glyphicon-arrow-right"></span>  </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
};

LaneKalkulator.contextTypes = {
    router: React.PropTypes.object.isRequired
}