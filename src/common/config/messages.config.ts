export const successMessages = {
  DATA_CREATED: '## created successfully',
  DATA_FETCHED: '## fetched successfully',
};
export const errorMessages = {
  UNEXPECTED_ERROR: 'Unexpected Error',
};
export const validationMessages = {
  INVALID_STRING: '## should be string',
  INVALID_DATA: 'Invalid ##',
};

export const replaceMessage = (message: string, data: string): string => {
  return message.replace('##', data);
};
