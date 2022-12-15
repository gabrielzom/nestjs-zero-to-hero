export function emailIsValid(email: string): boolean {
  return !!email.match(/^\S+@\S+\.\S+$/);
}
