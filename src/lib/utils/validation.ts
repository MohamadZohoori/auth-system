/**
 * Validates Iranian phone numbers in the following formats:
 * - 09xxxxxxxxx
 * - +989xxxxxxxxx
 * - 00989xxxxxxxxx
 */
export const validateIranianPhoneNumber = (phoneNumber: string): boolean => {
  // Remove any whitespace
  const cleanedNumber = phoneNumber.trim().replace(/\s+/g, '');
  
  // Check for standard format: 09xxxxxxxxx (11 digits)
  if (/^09\d{9}$/.test(cleanedNumber)) {
    return true;
  }
  
  // Check for international format with +: +989xxxxxxxxx
  if (/^\+989\d{9}$/.test(cleanedNumber)) {
    return true;
  }
  
  // Check for international format with 00: 00989xxxxxxxxx
  if (/^00989\d{9}$/.test(cleanedNumber)) {
    return true;
  }
  
  return false;
};