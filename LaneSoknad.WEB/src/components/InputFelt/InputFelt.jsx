import React from 'react';

/*Innputfelt komponent som gjennbrukes*/
export class InputFelt extends React.Component{
    render(){
        return(
            <div className="input-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} 
                       name={this.props.id}
                       type="text" 
                       className="form-control"
                       placeholder={this.props.placeholder}
                       aria-describedby="basic-addon1"
                       onChange={this.props.onChange}
                       value={this.props.value} /> 
                <div id="feilmelding" className="text-danger">{this.props.feilmelding}</div>
            </div>
        );
    }
}