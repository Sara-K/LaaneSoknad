import React from 'react';
import {InputFelt} from '../InputFelt/InputFelt.jsx';

/*Inputfelter for søknad som benytter seg av InputFelt komponenten*/
export class SoknadFelter extends React.Component{
    render() {
        return (
            <form id="soknadFelter">
                <div id="form-container">
                    <div className="form-group row">
                        <div className="col-md-2"> 
                            <label>Lånebeløp: </label>
                        </div>
                        <div className="col-md-2">
                            <p>{this.props.soknad.belop} </p>
                        </div>
                         <div className="col-md-2">
                            <label>Antall år: </label>
                         </div>
                        <div className="col-md-2">
                            <p>{this.props.soknad.ar} </p>
                        </div>
                         <div className="col-md-2">
                            <label>Pris pr mnd: </label>
                         </div>
                        <div className="col-md-2">
                            <p>{this.props.soknad.resultat} </p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <InputFelt placeholder={'Personnummer'}
                                        onChange={this.props.onChange}
                                        id={'personnummer'}
                                        feilmelding={this.props.feilmelding.personnummer}
                                        value={this.props.soknad.personnummer}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <InputFelt placeholder={'Telefonnummer'}
                                        onChange={this.props.onChange}
                                        id={'telefonnr'}
                                        feilmelding={this.props.feilmelding.telefonnr}
                                        value={this.props.soknad.telefonnr} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <InputFelt placeholder={'Epost'}
                                        onChange={this.props.onChange}
                                        id={'epost'}
                                        feilmelding={this.props.feilmelding.epost}
                                        value={this.props.soknad.epost} />
                        </div>
                    </div>
                </div> 
            </form>
      );
    }
};