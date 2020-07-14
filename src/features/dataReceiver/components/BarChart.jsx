import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _isEqual from 'lodash/isEqual';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import CardTitle from 'controls/CardTitle';
import { getRange, getBars, MAX_VALUE, BARS_COUNT } from 'features/dataReceiver/utils/rangeCounter';

const Container = styled.div`
  padding: 10px;
  background: #14333e;
  width: 100%;
`;

const ChartContainer = styled.div`
  padding: 0 20px 0 0;
  width: 100%;
  height: 180px;

  @media (min-width: 769px) {
    height: 320px;
  }
`;

export class TimeChart extends Component {
  static propTypes = {
    points: PropTypes.shape({}).isRequired,
    lineColor: PropTypes.string,
  };

  static defaultProps = {
    lineColor: '#68e2c2',
  };

  state = {
    points: [],
  };

  static getDerivedStateFromProps(props) {
    return { points: getBars(_get(props, 'points', [])) };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.state, nextState);
  }

  render() {
    const { lineColor } = this.props;
    const { points } = this.state;

    const getXMaxDomain = maxX => {
      if (maxX < MAX_VALUE / BARS_COUNT) {
        return MAX_VALUE / BARS_COUNT;
      }

      return maxX;
    };

    return (
      <Container>
        <CardTitle>Text 2</CardTitle>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={points}>
              <XAxis
                key={Math.random()}
                dataKey="name"
                ticks={_map(getRange(), item => item.key)}
              />
            <YAxis key={Math.random()} domain={[arg => arg, getXMaxDomain]}/>
              <Bar dataKey="value" fill={lineColor} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Container>
    );
  }

  static mapStateToProps({ dataReceiver }) {
    return { points: _get(dataReceiver, 'points')};
  }
}

export default compose(
  connect(TimeChart.mapStateToProps)
)(TimeChart);
