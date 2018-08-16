import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

export class CountSlider extends React.Component {
    state = {
        value: this.props.defaultValue
    }

    onChange = (value) => {
        if (!value) {
            return;
        }
        const cleanValue = parseInt(value,10) ? parseInt(value, 10) : this.state.value;
        this.setState({
            value: cleanValue,
        })
        this.props.onChange(cleanValue);
    }
    render() {
        const { value } = this.state;

        return (
            <Row>
                <Col offset={4} span={12}>
                <Slider min={2} max={20} onChange={this.onChange} value={value} />
                </Col>
                <Col span={4}>
                <InputNumber
                    min={2}
                    max={20}
                    style={{ marginLeft: 16 }}
                    value={value}
                    onChange={this.onChange}
                />
                </Col>
            </Row>
        )
    }
}