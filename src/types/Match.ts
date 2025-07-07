export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startTime: number; // timestamp
}

export interface MatchFormData {
  homeTeam: string;
  awayTeam: string;
}

export interface ScoreUpdateData {
  matchId: string;
  homeScore: number;
  awayScore: number;
}