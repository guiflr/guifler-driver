export const getZodErrors = (error: string) => {
  const errors = JSON.parse(error);

  const { issues } = errors;

  const messagesError = issues.map((issue: any) => issue.message);

  return messagesError;
};
