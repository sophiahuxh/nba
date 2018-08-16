import React from 'react';
import { ShotChart } from './ShotChart';
import { Radio, Switch } from 'antd';
import _ from 'lodash';
import { CountSlider } from './CountSlider'

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
    state = {
        minCount: 2,
        chartType: "hexbin",
        displayToolTip: true
      }
    
      onCountSliderChange = (value) => {
        this.setState({
            minCount: value,
        });
      }

      onChartTypeChange = (e) => {
          this.setState({
              chartType: e.target.value
          })
      }

      onToolTipChange = (value) => {
          this.setState({
            displayToolTip: value
          })
          
      }

    render() {
        const { minCount, chartType, displayToolTip } = this.state;
        return (
            <div className='data-view'> 
                <ShotChart 
                        playerId={this.props.playerId}
                        minCount={minCount}
                        displayToolTip={displayToolTip}
                        chartType={chartType}
                />

                {
                    this.state.chartType === "hexbin" ? (
                        <CountSlider 
                            onChange={_.debounce(this.onCountSliderChange, 500)} 
                            defaultValue = {this.state.minCount}
                        />
                    ) : null
                }
                
                
                <RadioGroup onChange={this.onChartTypeChange} value={chartType}>
                    <Radio value="hexbin">Hexbin</Radio>
                    <Radio value="scatter">Scatter</Radio>
                </RadioGroup>

                <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked 
                    onChange={this.onToolTipChange}
                />
    
            </div>
        )
    }
}