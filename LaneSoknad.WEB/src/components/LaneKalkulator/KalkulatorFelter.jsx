import React from 'react';
import {InputFelt} from '../InputFelt/InputFelt.jsx';

/*Inputfelter for lånekalkulator som benytter seg av InputFelt komponenten*/
export class KalkulatorFelter extends React.Component{
    render() {
        return (
            <form id="kalkulatorFelter">
                <div id="form-container">
                    <div className="form-group row">
                        <div className="col-md-4">
                            <InputFelt placeholder={'Lånebeløp'}
                                        onChange={this.props.onChange}
                                        id={'belop'}
                                        feilmelding={this.props.feilmelding.belop}
                                        value={this.props.verdier.belop} />
                        </div>
                        <div className="col-md-4">
                            <InputFelt placeholder={'Antall år'}
                                        value={this.props.verdier.ar}
                                        id={'ar'}
                                        feilmelding={this.props.feilmelding.ar}
                                        onChange={this.props.onChange} />
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
        </form>
      );
    }
};