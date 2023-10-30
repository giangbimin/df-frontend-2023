import {
  checkPasswordStrength,
  passwordStrengthColor,
} from '../../_services/utils/PasswordStrengthUtils';

export const PasswordStrength = ({ password }: { password: string }) => {
  const level = checkPasswordStrength(password);
  const color = passwordStrengthColor[level];
  return (
    password !== '' &&
    level &&
    level && (
      <span className={`inline my-2 text-sm font-medium text-${color}-800`}>
        {level}
      </span>
    )
  );
};
