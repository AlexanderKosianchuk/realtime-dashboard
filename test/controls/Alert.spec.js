import React from 'react';

import Alert from 'controls/Alert';

function setup(children = 'alert', variant) {
  return mount(<Alert variant={variant}>{children}</Alert>);
}

describe('Controls Alert', () => {
  let wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a success alert', () => {
    wrapper = setup('This is a success message', 'success');

    expect(wrapper).toMatchSnapshot();
  });

  it('should render a error alert with markup', () => {
    wrapper = setup(<p>This is an error message</p>, 'danger');

    expect(wrapper).toMatchSnapshot();
  });

  it('should render a warning alert', () => {
    wrapper = setup('This is a warning message', 'warning');

    expect(wrapper).toMatchSnapshot();
  });

  it('should render a info alert', () => {
    wrapper = setup('This is an info message', 'info');

    expect(wrapper).toMatchSnapshot();
  });
});
