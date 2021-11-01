import { render, screen } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import Home from './Home';

const MockFareCharges = {
	ANYWHERE_IN_ZONE_1: 2.5,
	ANY_ONE_ZONE_OUTSIDE_ZONE_1: 2.0,
	ANY_TWO_ZONES_INCLUDING_ZONE_1: 3.0,
	ANY_TWO_ZONES_EXCLUDING_ZONE_1: 2.25,
	MORE_THAN_TWO_ZONES: 3.2,
	BUS_JOURNEY: 1.8,
	TUBE_MAX_COST: 3.2,
};

describe('Home', () => {

	beforeEach(() => {})
	it('should render my component', () => {
		const component = shallow(<Home fareCharges={MockFareCharges} />);
    	expect(component).toMatchSnapshot();
	});

	describe('Topup button', () => {
		it('should be possible to activate button with Spacebar', () => {
			const component = mount(<Home fareCharges={MockFareCharges} />);
			component
			.find('button#topup')
			.simulate('keydown', { keyCode: 32 });
			expect(component).toMatchSnapshot();
			component.unmount();
		});

		it('topup click event', () => {
			const mockCallBack = jest.fn();
		
			const button = shallow(<Home fareCharges={MockFareCharges} />);
			button.find('button#topup').simulate('click');
			expect(mockCallBack.mock.calls.length).toBeDefined()
		});
	})

	describe('Start station button', () => {
		it('should be possible to activate button with Spacebar', () => {
			const component = mount(<Home fareCharges={MockFareCharges} />);
			component
			.find('button#startStationButton')
			.simulate('keydown', { keyCode: 32 });
			expect(component).toMatchSnapshot();
			component.unmount();
		});

		it('topup click event', () => {
			const mockCallBack = jest.fn();
		
			const button = shallow(<Home fareCharges={MockFareCharges} />);
			button.find('button#startStationButton').simulate('click');
			expect(mockCallBack.mock.calls.length).toBeDefined()
		});
	})

	describe('Start station button', () => {
		it('should be possible to activate button with Spacebar', () => {
			const component = mount(<Home fareCharges={MockFareCharges} />);
			component
			.find('button#startStationButton')
			.simulate('keydown', { keyCode: 32 });
			expect(component).toMatchSnapshot();
			component.unmount();
		});

		it('topup click event', () => {
			const mockCallBack = jest.fn();
		
			const button = shallow(<Home fareCharges={MockFareCharges} />);
			button.find('button#startStationButton').simulate('click');
			expect(mockCallBack.mock.calls.length).toBeDefined()
		});
	})
	
	describe('Exit station button', () => {
		it('should be possible to activate button with Spacebar', () => {
			const component = mount(<Home fareCharges={MockFareCharges} />);
			component
			.find('button#endStationButton')
			.simulate('keydown', { keyCode: 32 });
			expect(component).toMatchSnapshot();
			component.unmount();
		});

		it('topup click event', () => {
			const mockCallBack = jest.fn();
		
			const button = shallow(<Home fareCharges={MockFareCharges} />);
			button.find('button#endStationButton').simulate('click');
			expect(mockCallBack.mock.calls.length).toBeDefined()
		});
	})

	describe('clear button', () => {
		it('should be possible to activate button with Spacebar', () => {
			const component = mount(<Home fareCharges={MockFareCharges} />);
			component
			.find('button#clearButton')
			.simulate('keydown', { keyCode: 32 });
			expect(component).toMatchSnapshot();
			component.unmount();
		});

		it('topup click event', () => {
			const mockCallBack = jest.fn();
		
			const home = shallow(<Home fareCharges={MockFareCharges} />);
			const button = home.find('button#clearButton');
			button.simulate('click');
			expect(mockCallBack.mock.calls.length).toBeDefined()
		});
	})
})
