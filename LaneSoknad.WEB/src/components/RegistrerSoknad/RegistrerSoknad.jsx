import React, {PropTypes} from 'react';
import {Router} from 'react-router';
import {SoknadFelter} from './SoknadFelter.jsx';
import 'whatwg-fetch';

export class RegistrerSoknad extends React.Component{

    /*Konstruktør*/
    constructor(props,context){
        super(props,context);
        console.dir(props)
        this.context = context;
        this.state = {
            soknad: {
                personnummer: '', 
                telefonnr: '',
                epost: '',
                belop: this.props.location.query.belop,
                ar: this.props.location.query.ar,
                resultat: this.props.location.query.resultat
            },
            feilmelding: {}
        };
        this.lagreSoknad = this.lagreSoknad.bind(this);
        this.setInputState = this.setInputState.bind(this);
    }

    /*Validerer kalkulatorfeltene mens brukeren skriver inn*/
    valider_input(nokkel,verdi){
        this.state.feilmelding = {};

        if(nokkel === 'personnummer'){
            if(!(/^\d*$/.test(verdi))){
                this.state.feilmelding.personnummer = "Personnummer må være et siffer";
                return false;
            }
            if(verdi.length > 11){
                this.state.feilmelding.personnummer = "Personnummer må være 11 siffer";
                return false;
            }
        }
        else if(nokkel === 'telefonnr'){
            if(!(/^\d*$/.test(verdi))){
                this.state.feilmelding.telefonnr = "Telefonnummer må være et siffer";
                return false;
            }
            if(verdi.length > 8){
                this.state.feilmelding.telefonnr = "Telefonnummer må være 8 siffer";
                return false;
            }
        }
        else {
            return true;
        }
        return true;
    }

    /*onChange metode som oppdaterer verdien til feltene*/
    setInputState(event){
        var nokkel = event.target.name;
        var verdi = event.target.value;
        
        if(this.valider_input(nokkel,verdi)){
            this.state.soknad[nokkel] = verdi;
            return this.setState({soknad: this.state.soknad})
        }
        else{
            //Oppdaterer feilmeldingene dersom input i feltene ikke stemmer
            this.setState({feilmelding: this.state.feilmelding})
        }
    }
    
    /*Validerer feltene ved trykk på knapp*/
    valider_tomme_felter(){
        this.state.feilmelding = {};

        if(this.state.soknad.personnummer.length != 11){
            this.state.feilmelding.personnummer = "Fyll inn personnummer, 11 siffer";
            return false;
        }
        if(this.state.soknad.telefonnr.length != 8){
            this.state.feilmelding.telefonnr = "Fyll inn telefonnummer, 8 siffer";
            return false;
        }
        if(this.state.soknad.epost.length === 0){
            this.state.feilmelding.epost = "Fyll inn epost";
            return false;
        }
        if(!(/^[\w.\-]+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/.test(this.state.soknad.epost))){
            this.state.feilmelding.epost = "Epost er ikke gyldig";
            return false;
        }
        return true;
    }

    /*Lagrer søknader ved POST*/
    lagreSoknad(event){
        event.preventDefault();
        //Validerer input i feltene
        if(this.valider_tomme_felter()){
            fetch('http://localhost:34695/api/Soknad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.soknad)
            }).then(function(response){
                return response.json();
            }).then(function(j){
                this.context.router.push('/Soknader');
            }.bind(this));
           
            //Blanker input-felter
            this.state.soknad.personnummer="";
            this.state.soknad.telefonnr="";
            this.state.soknad.epost="";
            this.setState({soknad: this.state.soknad})
           
        }
        else{
            //Oppdaterer feilmeldingene dersom input i feltene ikke stemmer
            this.setState({feilmelding: this.state.feilmelding})
        }
    }

    render(){
        return(
            <div id="soknadInnhold">
                <div id="container">
                    <div className="panel panel-default">
                        <div className="panel-heading"><div className="panel-title">Registrer søknad</div></div>
                        <div className="panel-body">
                            <SoknadFelter soknad={this.state.soknad}
                                          onChange={this.setInputState}
                                          feilmelding={this.state.feilmelding} />
                        </div>
                        <div className="panel-footer">
                            <div className="row">
                                <div className="col-md-offset-8 col-md-4">
                                    <button type="submit" className="btn btn-block btn-success" onClick={this.lagreSoknad}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

RegistrerSoknad.contextTypes = {
    router: React.PropTypes.object.isRequired
}