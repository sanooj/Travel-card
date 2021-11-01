import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from './App';


describe('App', () => {
  it('should render my component', () => {
    const component = shallow(<App/>);
  
    expect(component).toMatchSnapshot();
  });
})
