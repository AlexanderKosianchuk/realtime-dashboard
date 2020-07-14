import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _map from 'lodash/map';
import _get from 'lodash/get';
import { Button, Text } from 'styled-minimal';
import Icon from 'controls/Icon';
import {
  dataReceiverConnect,
  dataReceiverDisconnect
} from 'features/dataReceiver/actions/dataReceiverActions';
import { CONNECTION_STATUS } from 'constants/index';

const CONNECTION_ALLOWED_STATUSES = [
  CONNECTION_STATUS.IDLE,
  CONNECTION_STATUS.DISCONNECTED,
];

export class DataReceiverButton extends Component {
  static propTypes = {
    status: PropTypes.oneOf(_map(CONNECTION_STATUS, status => status)),
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { status, dispatch } = this.props;

    // workaround for not to start async stuff on tests
    if (process.env.JEST_WORKER_ID) {
      return;
    }

    if (CONNECTION_ALLOWED_STATUSES.includes(status)) {
      dispatch(dataReceiverConnect());
    }
  }

  handleClick = () => {
    const { status, dispatch } = this.props;

    if (CONNECTION_ALLOWED_STATUSES.includes(status)) {
      dispatch(dataReceiverConnect());
    } else if (status === CONNECTION_STATUS.CONNECTED) {
      dispatch(dataReceiverDisconnect());
    }
  };

  getLabel = () => {
    const { status } = this.props;

    if (CONNECTION_ALLOWED_STATUSES.includes(status)) {
      return 'Start';
    }

    return 'Stop';
  };

  getIcon = () => {
    const { status } = this.props;

    if (CONNECTION_ALLOWED_STATUSES.includes(status)) {
      return 'sign-in';
    }

    if (status === CONNECTION_STATUS.CONNECTED) {
      return 'sign-out';
    }

    return 'dot-circle-o';
  };

  render() {
    const { status } = this.props;

    return (
      <Button
        animate={status === CONNECTION_STATUS.CONNECTION_ATTEMPT}
        onClick={this.handleClick}
        textTransform="uppercase"
      >
        <Icon name={this.getIcon()} />
        <Text ml={2}>{this.getLabel()}</Text>
      </Button>
    );
  }

  static mapStateToProps({ dataReceiver }) {
    return { status: _get(dataReceiver, 'status')};
  }
}

export default compose(
  connect(DataReceiverButton.mapStateToProps)
)(DataReceiverButton);
