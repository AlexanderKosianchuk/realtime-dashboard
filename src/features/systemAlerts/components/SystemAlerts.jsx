import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _get from 'lodash/get';
import styled from 'styled-components';
import { utils } from 'styled-minimal';
import { hideAlert } from 'features/systemAlerts/actions/systemAlertsActions';
import Transition from 'controls/Transition';
import Alert from 'controls/Alert';

const Base = styled.div`
  position: fixed;
  z-index: 1000;

  > div {
    > * + * {
      margin-top: ${utils.spacer(3)};
    }
  }
`;

const TopLeft = styled(Base)`
  left: ${utils.spacer(3)};
  top: ${utils.spacer(3)};
  width: 26rem;

  ${/* sc-custom '@media-query' */ utils.responsive({
    md: `
      width: 32rem;
    `,
  })};
`;

const TopRight = styled(Base)`
  right: ${utils.spacer(3)};
  top: ${utils.spacer(3)};
  width: 26rem;

  ${/* sc-custom '@media-query' */ utils.responsive({
    md: `
      width: 32rem;
    `,
  })};
`;

const BottomLeft = styled(Base)`
  bottom: ${utils.spacer(3)};
  left: ${utils.spacer(3)};
  width: 26rem;

  ${/* sc-custom '@media-query' */ utils.responsive({
    md: `
      width: 32rem;
    `,
  })};
`;

const BottomRight = styled(Base)`
  bottom: ${utils.spacer(3)};
  right: ${utils.spacer(3)};
  width: 26rem;

  ${/* sc-custom '@media-query' */ utils.responsive({
    md: `
      width: 32rem;
    `,
  })};
`;

const SystemAlertsWrapper = styled.div`
  pointer-events: none;
  position: fixed;
  z-index: 1000;
`;

export class SystemAlerts extends React.PureComponent {
  constructor(props) {
    super(props);

    this.timeouts = {};
  }

  static propTypes = {
    alerts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        icon: PropTypes.string,
        message: PropTypes.string,
        position: PropTypes.string,
        variant: PropTypes.string,
        timeout: PropTypes.number,
      }),
    ).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    const { alerts, dispatch } = this.props;

    /* istanbul ignore else */
    if (alerts.length) {
      alerts.forEach(d => {
        if (d.timeout && !this.timeouts[d.id]) {
          this.timeouts[d.id] = setTimeout(() => {
            dispatch(hideAlert(d.id));
          }, d.timeout * 1000);
        }
      });
    }
  }

  componentWillUnmount() {
    Object.keys(this.timeouts).forEach(d => {
      clearTimeout(this.timeouts[d]);
    });
  }

  handleClick = e => {
    e.preventDefault();
    const { dataset } = e.currentTarget;
    const { dispatch } = this.props;

    dispatch(hideAlert(dataset.id));
  };

  renderAlerts(position) {
    const { alerts } = this.props;
    const items = alerts.filter(d => d.position === position);

    if (!items.length) {
      return null;
    }

    return items.map(d => (
      <Alert
        key={d.id}
        id={d.id}
        icon={d.icon}
        handleClickClose={this.handleClick}
        variant={d.variant}
      >
        {d.message}
      </Alert>
    ));
  }

  render() {
    return (
      <SystemAlertsWrapper key="SystemAlerts">
        <TopLeft>
          <Transition transition="slideDown">{this.renderAlerts('top-left')}</Transition>
        </TopLeft>
        <TopRight>
          <Transition transition="slideDown">{this.renderAlerts('top-right')}</Transition>
        </TopRight>
        <BottomLeft>
          <Transition transition="slideUp">{this.renderAlerts('bottom-left')}</Transition>
        </BottomLeft>
        <BottomRight>
          <Transition transition="slideUp">{this.renderAlerts('bottom-right')}</Transition>
        </BottomRight>
      </SystemAlertsWrapper>
    );
  }

  static mapStateToProps({ systemAlerts }) {
    return { alerts: _get(systemAlerts, 'alerts', []) };
  }
}

export default compose(
  connect(SystemAlerts.mapStateToProps),
)(SystemAlerts);
