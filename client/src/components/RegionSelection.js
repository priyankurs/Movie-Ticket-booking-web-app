import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';

import { selectRegion, selectMovie, selectShowing, selectSeats } from '../actions';

class RegionSelection extends React.Component
{
    componentDidMount() {
        if (!this.props.region) {
            this.props.selectRegion('us', 'en-US');
        }
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.region !== prevProps.region) {
            this.props.selectMovie('');
            this.props.selectShowing(null);
            this.props.selectSeats([]);
        }
    }

    renderOptions() {
        const locales = [['hi', 'IN', 'India'], 
                         ['us', 'en-US', 'English']];
        return locales.map(locale => {
            return (
                <button key={locale[1]} className={`option-button ${this.props.region.region === locale[0] ? 'active' : '' }`} onClick={() => {
                    this.props.selectRegion(locale[0], locale[1]);
                    
                }}>{locale[2]}</button>
            );
        })
    }

    render() {
        return (
            <div className="container" style={{backgroundColor: 'rgba(34,34,34,0.3)'}}>
                <div className="option" style={{flexWrap: "nowrap"}}>
                    <h2> Welcome to our online cinema tickets booking app </h2>
                    <h3> Please select your region and language and we can proceed </h3>
                    <h4> <em>if you don't check any region, we'll use default (en-US)</em> </h4>
                    
                    <div className="option-wrapper">
                        {this.renderOptions()}
                    </div>
                </div>
                <NavLink className="arrowright" to="/movies"> <i className = "fas fa-angle-double-right"> </i></NavLink>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { region: state.region };
}

export default connect(mapStateToProps, { selectRegion, selectMovie, selectShowing, selectSeats })(RegionSelection);
