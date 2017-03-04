import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,Link,browserHistory,Redirect} from 'react-router';
import {Navbar} from './components/Navbar/Navbar.jsx';
import {RegistrerSoknad} from './components/RegistrerSoknad/RegistrerSoknad.jsx';
import {Soknader} from './components/Soknader/Soknader.jsx';
import {LaneKalkulator} from './components/LaneKalkulator/LaneKalkulator.jsx';


class Innhold extends React.Component{
    render(){
        return(
            <div>
                <Navbar/>
                {this.props.children}
            </div>
        );
    }

}

ReactDOM.render((
    <Router history={browserHistory}>
        <Route component={Innhold}>
            <Redirect from="/" to="/LaneKalkulator" />
            <Route path="LaneKalkulator" component={LaneKalkulator} />
            <Route path="RegistrerSoknad" component={RegistrerSoknad} /> 
            <Route path="Soknader" component={Soknader} /> 
        </Route>
        <Route path="*" component={Innhold}/>
    </Router>), document.getElementById('root')
);

