export function notFoundError(error: string) {
    return { message: error, error: '', status: 404 };
  }
  