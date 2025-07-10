import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MatchCard from './MatchCard';
import { Match } from '../types/Match';

describe('MatchCard', () => {
  const mockMatch: Match = {
    id: 1,
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeScore: 2,
    awayScore: 1,
    matchDate: '2024-01-10T18:00:00',
  };

  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  test('renders match information correctly', () => {
    render(<MatchCard match={mockMatch} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Real Madrid vs Barcelona')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<MatchCard match={mockMatch} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByLabelText('Delete match');
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(1);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  test('handles match without id gracefully', () => {
    const matchWithoutId = { ...mockMatch, id: undefined };
    render(<MatchCard match={matchWithoutId} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByLabelText('Delete match');
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  test('formats date correctly', () => {
    render(<MatchCard match={mockMatch} onDelete={mockOnDelete} />);
    
    // The date should be formatted (exact format depends on locale)
    const dateElement = screen.getByText(/\d{1,2}\/\d{1,2}\/\d{4}/);
    expect(dateElement).toBeInTheDocument();
  });

  test('handles missing date', () => {
    const matchWithoutDate = { ...mockMatch, matchDate: undefined };
    render(<MatchCard match={matchWithoutDate} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});