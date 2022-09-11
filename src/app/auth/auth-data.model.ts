export interface AuthData {
  email: string;
  password: string; //Don't store password on frontend so use AuthData for backend only
}
