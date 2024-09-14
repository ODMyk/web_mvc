export type ExtendedUser = DefaultSession['user'] & {
  isAdmin: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
