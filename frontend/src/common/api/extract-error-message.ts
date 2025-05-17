export const extractErrorMessage = (error: any): string => {
  return error.response ? error.response.data.message : error.message;
};
