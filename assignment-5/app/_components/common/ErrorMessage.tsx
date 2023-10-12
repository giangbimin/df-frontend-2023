import { FieldError } from 'react-hook-form';

export const ErrorMessage = ({ error }: { error: FieldError | undefined }) =>
  error && (
    <span className="block my-2 text-sm font-medium text-red-800">
      {error.message}
    </span>
  );
