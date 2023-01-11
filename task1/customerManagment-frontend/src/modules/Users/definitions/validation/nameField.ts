export const checkNameField = () => {
  return {
    validate: {
      //  Max length after replacing start space and replace inner spaces with one space
      maxLength: (value: string) =>
        value.trimStart().replace(/  +/g, ' ').length <= 32 ||
        'User name length  should be between 3 and 32 characters.',

      //  check length after replacing start space and replace inner spaces with one space
      required: (value: string) =>
        value.trimStart().replace(/  +/g, ' ').length !== 0 || 'User name field is required.',

      //  Min length after replacing start space and replace inner spaces with one space
      minLength: (value: string) =>
        value.trimStart().replace(/  +/g, ' ').length >= 3 ||
        'User name length should be between 3 and 32 characters.',

      // error on two characters with final space
      endSpace: (value: string) =>
        value.trim().length >= 3 || 'User name length should be between 3 and 32 characters.',

      // error on two characters with final space
      hasInvalidCharacter: (value: string) =>
        !value.includes('\\') || 'User name contains invalid character!',
    },
  };
};
