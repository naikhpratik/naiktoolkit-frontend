

// Regular expression for email validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;
// Password criteria
const MIN_PASSWORD_LENGTH = 8;
const REQUIRE_UPPERCASE = true;
const REQUIRE_LOWERCASE = true;
const REQUIRE_NUMBER = true;
const REQUIRE_SPECIAL_CHAR = true;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const isValidPassword = (password: string): boolean => {
  if (password.length < MIN_PASSWORD_LENGTH) return false;
  if (REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) return false;
  if (REQUIRE_LOWERCASE && !/[a-z]/.test(password)) return false;
  if (REQUIRE_NUMBER && !/\d/.test(password)) return false;
  if (REQUIRE_SPECIAL_CHAR && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) return false;
  return true;
};

export const getPasswordRequirements = (): string => {
  return `Password must:
    - Be at least ${MIN_PASSWORD_LENGTH} characters long
    ${REQUIRE_UPPERCASE ? '- Contain at least one uppercase letter' : ''}
    ${REQUIRE_LOWERCASE ? '- Contain at least one lowercase letter' : ''}
    ${REQUIRE_NUMBER ? '- Contain at least one number' : ''}
    ${REQUIRE_SPECIAL_CHAR ? '- Contain at least one special character' : ''}
  `;
};