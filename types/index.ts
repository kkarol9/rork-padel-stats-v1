export type Player = {
  id: string;
  name: string;
};

export type Team = {
  id: string;
  players: Player[];
};

export type EventType = 'unforced_error' | 'winner' | 'forced_error';
export type ShotType = 'smash' | 'volley' | 'groundstroke' | 'lob' | 'return' | 'bajada' | 'other';
export type ShotSpecification = 'vibora' | 'bandeja' | 'rulo' | 'standard' | 'other_smash' | 'forehand' | 'backhand' | 'smash';

export type MatchEvent = {
  id: string;
  playerId: string;
  eventType: EventType;
  shotType: ShotType;
  shotSpecification: ShotSpecification;
  timestamp: number;
};

export type Score = {
  sets: [number, number];
  games: [number, number];
  points: [string, string];
  tiebreak?: {
    points: [number, number];
    isFinalTiebreak: boolean;
  };
  currentServer?: string;
};

export type Match = {
  id: string;
  date: number;
  location: string;
  round: string;
  teams: [Team, Team];
  events: MatchEvent[];
  score: Score;
  isCompleted: boolean;
  winner?: 0 | 1; // Index of winning team
};