import { Icon, Input, AutoComplete } from 'antd';
import React from 'react';
import nba from 'nba';
import { PROFILE_PIC_URL_PREFIX } from '../constants';

const Option = AutoComplete.Option;

export class SearchBar extends React.Component {
    state = {
        dataSource: [],
      }
    
    handleSearch = (value) => {
        this.setState({
          dataSource: nba.searchPlayers(value)
          .map(({playerId, fullName}) => 
                <Option key = {playerId} value = {fullName}> 
                    <img 
                        className="player-option-image"
                        src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}
                        alt={`${fullName}`}
                    />
                    <span className="player-option-label">{`${fullName}`} </span>
                </Option>
          )
        });
    }
    
    onSelect = (value) => {
        console.log(value)
        this.props.loadPlayerInfo(value);
    }

    render() {
        const {dataSource} = this.state;
        return (
            <div>
                <AutoComplete
                    dataSource={dataSource}
                    style={{ width: '100%' }}
                    onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                    placeholder="Search NBA Player"
                    className="search-bar"
                    size="large"
                    optionLabelProp="value"
                >

                    <Input suffix={<Icon type="search" />} />
                </AutoComplete>
            </div>
          );
    }
}