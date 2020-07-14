import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import styled from 'styled-components';
import _map from 'lodash/map';
import _get from 'lodash/get';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';
import CardTitle from 'controls/CardTitle';
import { POINTS_MAX_COUNT } from 'constants/index';

const MAX_VALUE = 100 * 1.2;
const RIGHT_CHART_SHIFT = 2000;
const MIN_CHART_DATA_WIDTH = (POINTS_MAX_COUNT / 2) * 1000;

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
    lineColor: '#d93e71',
  };

  render() {
    const { points, lineColor } = this.props;
    let min = 0;
    const data = _map(points, (value, time) => {
      if (time < min || !min) {
        min = time;
      }

      return { value, time };
    });

    const getXMaxDomain = maxX => {
      if ((!data || data.length < POINTS_MAX_COUNT) && min > 0) {
        return parseInt(min, 10) + MIN_CHART_DATA_WIDTH;
      }

      if (maxX > 0) {
        return Math.floor(parseInt(maxX, 10) / 1000) * 1000 + RIGHT_CHART_SHIFT;
      }

      return maxX;
    };

    return (
      <Container>
        <CardTitle>Text 1</CardTitle>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                key={Math.random()}
                dataKey="time"
                domain={[arg => arg, getXMaxDomain]}
                name="Time"
                tickCount={3}
                stroke="#c3c3c3"
                type="number"
                tickFormatter={
                  unixTime => moment(unixTime).milliseconds(0).format('mm:ss')
                }
              />
              <YAxis
                key={Math.random()}
                domain={[MAX_VALUE * -1, MAX_VALUE]}
                tickCount={4}
                dataKey="value"
                stroke="#c3c3c3"
                name="Value"
              />

              <Line
                animationDuration={0}
                type="monotone"
                dataKey="value"
                stroke={lineColor}
                strokeWidth={2}
                dot={false}
              />

            </LineChart>
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
