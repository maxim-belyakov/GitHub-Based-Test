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

  it('should clear inputs after successful submission', () => {
    renderWithStore();

    const homeInput = screen.getByLabelText('Home Team') as HTMLInputElement;
    const awayInput = screen.getByLabelText('Away Team') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'Start Match' });

    fireEvent.change(homeInput, { target: { value: 'Spain' } });
    fireEvent.change(awayInput, { target: { value: 'Brazil' } });
    fireEvent.click(submitButton);

    expect(homeInput.value).toBe('');
    expect(awayInput.value).toBe('');
  });

  it('should show alert when submitting empty team names', () => {
    renderWithStore();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const submitButton = screen.getByRole('button', { name: 'Start Match' });
    fireEvent.click(submitButton);

    expect(alertSpy).toHaveBeenCalledWith('Please enter both team names');
    alertSpy.mockRestore();
  });

  it('should show alert when home and away teams are the same', () => {
    renderWithStore();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const homeInput = screen.getByLabelText('Home Team');
    const awayInput = screen.getByLabelText('Away Team');
    const submitButton = screen.getByRole('button', { name: 'Start Match' });

    fireEvent.change(homeInput, { target: { value: 'Spain' } });
    fireEvent.change(awayInput, { target: { value: 'Spain' } });
    fireEvent.click(submitButton);

    expect(alertSpy).toHaveBeenCalledWith('Home and away teams must be different');
    alertSpy.mockRestore();
  });
});