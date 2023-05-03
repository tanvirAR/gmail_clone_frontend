export default interface AuthSliceInterface {
  user: ({ name: string; email: string; id: string } | undefined);
}
