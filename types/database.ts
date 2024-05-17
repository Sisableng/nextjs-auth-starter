interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  name?: string | null;
  avatar?: string | null;
  avatarId?: string | null;
}
