import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _get from 'lodash/get';
import _each from 'lodash/each';
import _filter from 'lodash/filter';
import styled from 'styled-components';
import { Text, Input, FormGroup, Button } from 'styled-minimal';
import { showAlert } from 'features/systemAlerts/actions/systemAlertsActions';
import { getBars, MIN_VALUE, MAX_VALUE } from 'features/dataReceiver/utils/rangeCounter';

const Container = styled.div`
  width: 100%;
`;

class Thresshold extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    value: PropTypes.number,
  };

  static defaultProps = {
    value: 5,
  };

  state = {
    value: this.props.value,
    thress: this.props.value,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const bars = getBars(_get(nextProps, 'points', []));

    const gatherThresshold = _filter(bars, item => item.value >= prevState.thress);

    _each(gatherThresshold, item => {
      nextProps.dispatch(showAlert(`${item.name} has ${item.value} values`, { id: item.name }));
    });

    return prevState;
  }

  shouldComponentUpdate(nextState) {
    return this.state.value !== nextState.value;
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  }

  handleClick = () => {
    const value = parseInt(this.state.value, 10);

    if (value >= MIN_VALUE && value <= MAX_VALUE) {
      this.setState({ thress: value });
    }
  };

  render() {
    const { value } = this.state;

    return (
      <Container>
        <Text>Enter thresshold value</Text>
        <FormGroup inline>
          <Input value={value} onChange={this.handleChange} />
          <Button onClick={this.handleClick}>Apply</Button>
        </FormGroup>
      </Container>
    );
  };

  static mapStateToProps({ dataReceiver }) {
    return { points: _get(dataReceiver, 'points')};
  }
}

export default compose(
  connect(Thresshold.mapStateToProps)
)(Thresshold);
