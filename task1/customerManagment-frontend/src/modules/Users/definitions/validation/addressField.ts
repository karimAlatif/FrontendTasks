export const checkAddressField = () => {
  return {
    validate: {
      required: (value: string) =>
        value.trimStart().replace(/  +/g, ' ').length !== 0 || 'Phone number field is required.',
    },
    pattern: {
      value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      message: 'Invalid phone number',
    },
  };
};
