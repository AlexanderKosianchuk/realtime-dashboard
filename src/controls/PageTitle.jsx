import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 15px 20px 5px;
  font-size: 2em;
  font-weight: bold;

  @media (min-width: 769px) {
    padding: 35px 25px 25px;
    font-size: 3em;
  }
`;

const PageTitle = ({ children }) => <Container>{children}</Container>;

PageTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PageTitle;
