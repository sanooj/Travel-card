import React from 'react';
import { shallow } from 'enzyme';

import CommmonLayout from '.';
const title = 'Oyester card';
let wrapped = shallow(<CommmonLayout>{title}</CommmonLayout>);
describe('Layout', () => {
  it('should render the Title Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });
  it('renders the Header', () => { 
    expect(wrapped.find('h1').text()).toEqual('Oyester card');
  });
});