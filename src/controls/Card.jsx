import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  background: #14333e;
  padding: 10px;
  height: 100%;
  overflow: auto;
`;

const Card = ({ children }) => <Container>{children}</Container>;

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Card;
