export const required: (
  description: string
) => (value: string) => string | undefined = (description) => (
  value
) => (!value || value.trim() === '' ? description : undefined);

export const match = (re: string, description: string) => (
  value: string
) => (!value.match(re) ? description : undefined);

export const list = (
  ...validators: ((description: string) => string | undefined)[]
) => (value: string) =>
  validators.reduce<string | undefined>(
    (result, validator) => result || validator(value),
    undefined
  );

export const validateMany = (
  validators: { [key: string]: (description: string) => string },
  fields: { [key: string]: string }
): object =>
  Object.entries(fields).reduce(
    (result, [name, value]) => ({
      ...result,
      [name]: validators[name](value),
    }),
    {}
  );

export const hasError = (
  validationErrors: { [key: string]: string },
  // validationErrors: [string][],
  // Error will occur:
  // Element implicitly has an 'any' type because index expression is not of type 'number'.ts(7015)
  // Ref: https://stackoverflow.com/questions/40358434/typescript-ts7015-element-implicitly-has-an-any-type-because-index-expression?rq=1
  fieldName: string
) => validationErrors[fieldName] !== undefined;

export const anyErrors = (errors: { [key: string]: string }) =>
  Object.values(errors).some((error) => error !== undefined);
