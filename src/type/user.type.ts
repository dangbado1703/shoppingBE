export interface userType {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  user_id?: number | string;
  is_active?: number;
  birthday?: string | null;
}
