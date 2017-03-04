import React from 'react';
import 'whatwg-fetch';

export class Soknader extends React.Component{

    /*Konstruktør*/
    constructor(props){
        super(props);
        this.state = { 
            soknader: [],
            sokPnrTekst: ''
        };
        this.listeMedSoknader = this.listeMedSoknader.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    /*Henter søknader ved GET*/
    componentWillMount(){
        fetch('http://localhost:34695/api/Soknad',{
            method: 'GET'})
          .then(function(response){
              return response.json();  
          })
          .then(function(json) {
              //json response i form av en array settes i soknader
              this.setState({soknader: json})
          }.bind(this))
    }

    /*onChange metode som oppdaterer verdien til søkefeltet*/
    onInputChange(event){
        event.preventDefault();
        this.state.sokPnrTekst = event.target.value;
        return this.setState({sokPnrTekst: this.state.sokPnrTekst})
    }

    /*Henter søknader basert på personnummer*/
    listeMedSoknader(){
        var personnummer = this.state.sokPnrTekst;
        fetch('http://localhost:34695/api/Soknad/Get/?personnummer='+personnummer)
        .then(function(response){
            return response.json();  
        }.bind(this))
        .then(function(json) {
            //json response i form av en array settes i soknader
            this.setState({soknader: json})
        }.bind(this))
    }

    render(){
        return(
            <div id="soknaderListeInnhold">
                <div id="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h1>Søknader</h1>
                            <div id="sokFelt" className="row">
                                <div className="col-md-6">
                                    <input id="sokInput" name="sokPnrTekst" type="text" value={this.state.sokPnrTekst} onChange={this.onInputChange} placeholder="Personnummer" />
                                </div>
                                <div className="col-md-3">
                                    <button id="sokeKnapp" type="button" className="btn btn-block btn-default" onClick={this.listeMedSoknader}>
                                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span> Søk
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                              <tr>
                                <th>Personnummer</th>
                                <th>Telefonnummer</th>
                                <th>Epost</th>
                                <th>Lånebeløp</th>
                                <th>Antall år</th>
                                <th>Pris per mnd</th>
                              </tr>
                            </thead>
                            <tbody>
                                {this.state.soknader.map(function(verdi,nokkel) {
                                return (
                                     <tr key={nokkel}>
                                        <td>{verdi.personnummer}</td>
                                        <td>{verdi.telefonnr}</td>
                                        <td>{verdi.epost}</td>
                                        <td>{verdi.belop}</td>
                                        <td>{verdi.ar}</td>
                                        <td>{verdi.resultat}</td>
                                     </tr> )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
