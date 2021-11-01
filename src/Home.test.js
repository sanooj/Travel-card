import { render, screen } from '@testing-library/react';
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

test('should render my component', () => {
	const component = render(<Home fareCharges={MockFareCharges} />);
	expect(component).toMatchSnapshot();
});
