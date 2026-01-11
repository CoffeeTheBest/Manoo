export enum AppStage {
  WELCOME = 'WELCOME',
  MEMORY = 'MEMORY',
  ORACLE = 'ORACLE',
  CAKE = 'CAKE',
  LETTER = 'LETTER',
}

export interface OracleResponse {
  prediction: string;
}
