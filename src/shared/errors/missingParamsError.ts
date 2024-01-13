export function missingParamError(error: string) {
  return { message: 'Invalid or missing param was sent', error, status: 400 };
}
