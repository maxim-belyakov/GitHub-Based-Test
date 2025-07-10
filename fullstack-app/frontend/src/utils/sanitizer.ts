import DOMPurify from 'dompurify';

export const sanitizeInput = (input: string): string => {
  // Remove any HTML tags and scripts
  const cleaned = DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  
  // Additional sanitization
  return cleaned
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

export const validateTeamName = (name: string): boolean => {
  // Allow letters, numbers, spaces, and common punctuation
  const pattern = /^[a-zA-Z0-9\s\-\.]+$/;
  return pattern.test(name) && name.length > 0 && name.length <= 100;
};

export const validateScore = (score: number): boolean => {
  return Number.isInteger(score) && score >= 0 && score <= 999;
};