export const successMessages = {
  DATA_CREATED: '## created successfully',
  DATA_FETCHED: '## fetched successfully',
  DATA_DELETED: '## deleted successfully',
};
export const errorMessages = {
  UNEXPECTED_ERROR: 'Unexpected Error',
  NOT_FOUND: '## not found or already deleted',
};
export const validationMessages = {
  INVALID_STRING: '## should be string',
  INVALID_DATA: 'Invalid ##',
};

export const replaceMessage = (message: string, data: string): string => {
  return message.replace('##', data);
};
