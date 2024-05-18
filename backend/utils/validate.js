const validatePassword = (password) => {
  const minLength = 8;
  const maxLength = 128;
  const uppercasePattern = /[A-Z]/;
  const lowercasePattern = /[a-z]/;
  const digitPattern = /\d/;
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    return { valid: false, message: `Password must be at least ${minLength} characters long.` };
  }

  if (password.length > maxLength) {
    return { valid: false, message: `Password must be no more than ${maxLength} characters long.` };
  }

  if (!uppercasePattern.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter.' };
  }

  if (!lowercasePattern.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter.' };
  }

  if (!digitPattern.test(password)) {
    return { valid: false, message: 'Password must contain at least one digit.' };
  }

  if (!specialCharPattern.test(password)) {
    return { valid: false, message: 'Password must contain at least one special character.' };
  }

  return { valid: true, message: 'Password is valid.' };
}

module.exports = {
  validatePassword
}