import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Home } from 'routes/Home';

const mockDispatch = jest.fn();
const defaultStore = {
  location: {},
  systemAlerts: {},
  dataReceiver: {},
};

const props = {
  dispatch: mockDispatch,
};

const mockedStore = configureMockStore()(defaultStore);

export const mountWithProvider = children => (store = mockedStore) =>
  mount(<Provider store={store}>{children}</Provider>, { disableLifecycleMethods: true });

function setup(ownProps = props) {
  return mountWithProvider(<Home {...ownProps} />);
}

describe('Home', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
