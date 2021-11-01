import { render, screen } from '@testing-library/react';
import App from './App';


test('should render my component', () => {
		const component = render(<App />);
		// then
		expect(component).toMatchSnapshot();
});
