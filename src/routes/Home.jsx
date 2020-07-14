import React from 'react';
import styled from 'styled-components';
import Background from 'controls/Background';
import Controls from 'features/dashboardControls';
import PageTitle from 'controls/PageTitle';
import TimeChart from 'features/dataReceiver/components/TimeChart';
import BarChart from 'features/dataReceiver/components/BarChart';

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (min-width: 769px) {
    flex-direction: row;
  }
`;

const FlexItemOne = styled(Flex)`
  padding: 20px;
  flex: 1;
`;

const FlexItemTwo = styled(Flex)`
  padding: 20px;
  flex: 2;
`;

export class Home extends React.PureComponent {
  render() {
    return (
      <Background key="Home">
        <PageTitle>Cool dashboard</PageTitle>
        <Flex>
          <FlexItemOne>
            <Controls />
          </FlexItemOne>
          <FlexItemOne>
            <TimeChart />
          </FlexItemOne>
          <FlexItemOne>
            <BarChart />
          </FlexItemOne>
        </Flex>
        <Flex>
          <FlexItemOne>
            <BarChart lineColor="#ab27c3" />
          </FlexItemOne>
          <FlexItemTwo>
            <TimeChart lineColor="#f8e73b" />
          </FlexItemTwo>
        </Flex>
        <Flex>
          <FlexItemTwo>
            <BarChart lineColor="#68e27d" />
          </FlexItemTwo>
          <FlexItemOne>
            <TimeChart lineColor="#6d55bf" />
          </FlexItemOne>
        </Flex>
      </Background>
    );
  }
}

export default Home;
