import React from 'react';
import { App } from 'App';

function setup(ownProps = {}) {
  return shallow(<App {...ownProps} />, { attachTo: document.getElementById('react') });
}

describe('App', () => {
  const wrapper = setup();

  it('should render properly ', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
