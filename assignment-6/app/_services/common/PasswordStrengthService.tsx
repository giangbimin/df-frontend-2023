export const passwordStrengthColor = {
  Weak: 'red',
  Moderate: 'yellow',
  Strong: 'green',
};

export const checkPasswordStrength = (password: string) => {
  const minLength = 8;
  if (password.length < minLength) return 'Weak';
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  // eslint-disable-next-line no-useless-escape
  const hasSymbols = /[!@#$%^&*()_+|~\-=\[\]{};':"\\<>,./?]+/.test(password);
  if (hasUpperCase && hasLowerCase && hasNumbers && hasSymbols) return 'Strong';
  return 'Moderate';
};
