import React from 'react';
import renderer from 'react-test-renderer'; // Import react-test-renderer
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Nav from '../components/Nav'; // Import the Nav component
import store from '../redux/store';

test('Nav component renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    </Provider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
