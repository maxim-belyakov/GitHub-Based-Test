import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddMatchForm from './AddMatchForm';

describe('AddMatchForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders all form fields', () => {
    render(<AddMatchForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText('Home Team')).toBeInTheDocument();
    expect(screen.getByLabelText('Away Team')).toBeInTheDocument();
    expect(screen.getByLabelText('Home Score')).toBeInTheDocument();
    expect(screen.getByLabelText('Away Score')).toBeInTheDocument();
    expect(screen.getByText('Add Match')).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    render(<AddMatchForm onSubmit={mockOnSubmit} />);
    
    await userEvent.type(screen.getByLabelText('Home Team'), 'Team A');
    await userEvent.type(screen.getByLabelText('Away Team'), 'Team B');
    await userEvent.clear(screen.getByLabelText('Home Score'));
    await userEvent.type(screen.getByLabelText('Home Score'), '3');
    await userEvent.clear(screen.getByLabelText('Away Score'));
    await userEvent.type(screen.getByLabelText('Away Score'), '2');
    
    fireEvent.click(screen.getByText('Add Match'));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        homeScore: 3,
        awayScore: 2,
        matchDate: expect.any(String),
      });
    });
  });

  test('shows validation errors for empty team names', async () => {
    render(<AddMatchForm onSubmit={mockOnSubmit} />);
    
    fireEvent.click(screen.getByText('Add Match'));
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid home team name')).toBeInTheDocument();
      expect(screen.getByText('Please enter a valid away team name')).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('shows validation error for invalid team names', async () => {
    render(<AddMatchForm onSubmit={mockOnSubmit} />);
    
    await userEvent.type(screen.getByLabelText('Home Team'), '<script>alert("xss")</script>');
    await userEvent.type(screen.getByLabelText('Away Team'), 'Team B');
    
    fireEvent.click(screen.getByText('Add Match'));
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid home team name')).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('sanitizes input before submission', async () => {
    render(<AddMatchForm onSubmit={mockOnSubmit} />);
    
    await userEvent.type(screen.getByLabelText('Home Team'), 'Team A<script>');
    await userEvent.type(screen.getByLabelText('Away Team'), 'Team B');
    
    fireEvent.click(screen.getByText('Add Match'));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          homeTeam: 'Team A',
          awayTeam: 'Team B',
        })
      );
    });
  });

  test('resets form after successful submission', async () => {
    render(<AddMatchForm onSubmit={mockOnSubmit} />);
    
    const homeTeamInput = screen.getByLabelText('Home Team') as HTMLInputElement;
    const awayTeamInput = screen.getByLabelText('Away Team') as HTMLInputElement;
    
    await userEvent.type(homeTeamInput, 'Team A');
    await userEvent.type(awayTeamInput, 'Team B');
    
    fireEvent.click(screen.getByText('Add Match'));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(homeTeamInput.value).toBe('');
      expect(awayTeamInput.value).toBe('');
    });
  });

  test('clears error when user starts typing', async () => {
    render(<AddMatchForm onSubmit={mockOnSubmit} />);
    
    fireEvent.click(screen.getByText('Add Match'));
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid home team name')).toBeInTheDocument();
    });
    
    await userEvent.type(screen.getByLabelText('Home Team'), 'T');
    
    await waitFor(() => {
      expect(screen.queryByText('Please enter a valid home team name')).not.toBeInTheDocument();
    });
  });
});