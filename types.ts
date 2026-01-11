export enum AppStage {
  WELCOME = 'WELCOME',
  BALLOONS = 'BALLOONS',
  ORACLE = 'ORACLE',
  CAKE = 'CAKE',
  LETTER = 'LETTER',
}

export interface OracleResponse {
  prediction: string;
}

export interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  popped: boolean;
  message?: string;
}