export function authError(error: string) {
  return { message: error, error: '', status: 401 };
}
