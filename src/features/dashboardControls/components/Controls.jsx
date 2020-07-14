import React from 'react';
import styled from 'styled-components';
import DataReceiverButton from 'features/dataReceiver';
import Card from 'controls/Card';
import CardTitle from 'controls/CardTitle';
import Thresshold from 'features/dashboardControls/components/Thresshold';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrap = styled.div`
  padding: 20px 30px;
`;

const Controls = () => (
  <Container>
    <Card>
      <CardTitle>Controls</CardTitle>
      <Wrap><DataReceiverButton /></Wrap>
      <Wrap><Thresshold /></Wrap>
    </Card>
  </Container>
);

export default Controls;
