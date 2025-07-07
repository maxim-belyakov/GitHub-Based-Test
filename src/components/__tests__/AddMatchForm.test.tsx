import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import matchReducer from '../../store/matchSlice';
import { AddMatchForm } from '../AddMatchForm';

describe('AddMatchForm1', () => {
  const renderWithStore = () => {
    const store = configureStore({
      reducer: {
        matches: matchReducer,
      },
    });

    return render(
      <Provider store={store}>
        <AddMatchForm />
      </Provider>
    );
  };

  it('should render form inputs and buton', () => {
    renderWithStore();

    expect(screen.getByLabelText('Home Team')).toBeInTheDocument();
    expect(screen.getByLabelText('Away Team')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start Match' })).toBeInTheDocument();
  });
});