import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 5px 15px 10px;
  margin: 0 0 20px;
  font-size: 1em;
  font-weight: bold;
  border-bottom: 2px solid rgba(30, 30, 30, 0.5);
  text-transform: uppercase;

  @media (min-width: 769px) {
    padding: 10px 25px 15px;
    font-size: 1.6em;
  }
`;

const CardTitle = ({ children }) => <Container>{children}</Container>;

CardTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CardTitle;
