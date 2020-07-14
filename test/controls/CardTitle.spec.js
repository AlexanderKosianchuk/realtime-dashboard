import React from 'react';

import CardTitle from 'controls/CardTitle';

function setup(children = 'title') {
  return mount(<CardTitle>{children}</CardTitle>);
}

describe('Controls Alert', () => {
  let wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render text', () => {
    wrapper = setup('Text');

    expect(wrapper).toMatchSnapshot();
  });
});
