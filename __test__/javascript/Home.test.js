import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Home from '../../app/javascript/common/Home';
import rootReducer from '../../app/javascript/reducers/rootReducer';

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

test('renders Home component', () => {
  renderWithRedux(<Home />, { initialState: { mobiles: { mobiles: [], filterLists: [], searchResult: false } } });
  expect(screen.getByText(/Mobile List:/i)).toBeInTheDocument();
});