import React from 'react';
import { Profile } from './Profile';
import nba from 'nba';
import { DataViewContainer } from './DataViewContainer';
import { SearchBar } from './SearchBar';
import { DEFAULT_PLAYER_INFO } from '../constants';
import {_} from 'lodash';

export class Main extends React.Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INFO,
    }

    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.playerName);
    }

    loadPlayerInfo = (playerName) => {
        const playerId = nba.findPlayer(playerName).playerId;
        nba.stats.playerInfo({
            PlayerID: playerId
        }).then((info) => {
            const playerInfo = Object.assign({}, info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            console.log(playerInfo);
            this.setState({playerInfo})
        });
    }

    render() {
        const { playerInfo } = this.state;
        var object = [ 
                { 'obj': 'moto', 'active': true }, 
                { 'obj': 'lenovo',   'active': false } ]; 
   
        // Use of _.some() method 
        // The `_.matches` iteratee shorthand 
  
        let gfg = _.some(object, { 'obj': 'moto', 'active': false }); 
        console.log(gfg);
        return (
            <div className="main">
                <SearchBar loadPlayerInfo = {this.loadPlayerInfo}/>
                <div className="player">
                    <Profile playerInfo = {this.state.playerInfo}/>
                    < DataViewContainer 
                            playerId={this.state.playerInfo.playerId}
                    />
                </div>
            </div>
        );
    }
}
