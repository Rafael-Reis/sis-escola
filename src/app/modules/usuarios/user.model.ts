export interface User {
  id: number;
  name: string;
  email?: string;
  username: string;
  nivel: string;
  token?: AccessToken;
}

export interface AccessToken {
  access_token: string;
  token_type: string;
  expires_at: string;
}
