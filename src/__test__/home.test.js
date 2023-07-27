import React from 'react';
import renderer from 'react-test-renderer'; // Import react-test-renderer
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
import store from '../redux/store';

test('Home component renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
