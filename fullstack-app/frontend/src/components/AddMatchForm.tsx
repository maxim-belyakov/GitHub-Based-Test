import React, { useState } from 'react';
import { Match } from '../types/Match';
import { sanitizeInput, validateTeamName, validateScore } from '../utils/sanitizer';
import './AddMatchForm.css';

interface AddMatchFormProps {
  onSubmit: (match: Match) => void;
}

const AddMatchForm: React.FC<AddMatchFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Match>({
    homeTeam: '',
    awayTeam: '',
    homeScore: 0,
    awayScore: 0,
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'homeScore' || name === 'awayScore') {
      const numValue = parseInt(value) || 0;
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!validateTeamName(formData.homeTeam)) {
      newErrors.homeTeam = 'Please enter a valid home team name';
    }

    if (!validateTeamName(formData.awayTeam)) {
      newErrors.awayTeam = 'Please enter a valid away team name';
    }

    if (!validateScore(formData.homeScore)) {
      newErrors.homeScore = 'Score must be a positive number';
    }

    if (!validateScore(formData.awayScore)) {
      newErrors.awayScore = 'Score must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      const sanitizedMatch: Match = {
        homeTeam: sanitizeInput(formData.homeTeam),
        awayTeam: sanitizeInput(formData.awayTeam),
        homeScore: formData.homeScore,
        awayScore: formData.awayScore,
        matchDate: new Date().toISOString(),
      };
      
      onSubmit(sanitizedMatch);
      
      // Reset form
      setFormData({
        homeTeam: '',
        awayTeam: '',
        homeScore: 0,
        awayScore: 0,
      });
    }
  };

  return (
    <form className="add-match-form" onSubmit={handleSubmit}>
      <h2>Add New Match</h2>
      
      <div className="form-group">
        <label htmlFor="homeTeam">Home Team</label>
        <input
          type="text"
          id="homeTeam"
          name="homeTeam"
          value={formData.homeTeam}
          onChange={handleChange}
          placeholder="Enter home team name"
          maxLength={100}
        />
        {errors.homeTeam && <span className="error">{errors.homeTeam}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="awayTeam">Away Team</label>
        <input
          type="text"
          id="awayTeam"
          name="awayTeam"
          value={formData.awayTeam}
          onChange={handleChange}
          placeholder="Enter away team name"
          maxLength={100}
        />
        {errors.awayTeam && <span className="error">{errors.awayTeam}</span>}
      </div>

      <div className="score-inputs">
        <div className="form-group">
          <label htmlFor="homeScore">Home Score</label>
          <input
            type="number"
            id="homeScore"
            name="homeScore"
            value={formData.homeScore}
            onChange={handleChange}
            min="0"
            max="999"
          />
          {errors.homeScore && <span className="error">{errors.homeScore}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="awayScore">Away Score</label>
          <input
            type="number"
            id="awayScore"
            name="awayScore"
            value={formData.awayScore}
            onChange={handleChange}
            min="0"
            max="999"
          />
          {errors.awayScore && <span className="error">{errors.awayScore}</span>}
        </div>
      </div>

      <button type="submit" className="submit-button">Add Match</button>
    </form>
  );
};

export default AddMatchForm;