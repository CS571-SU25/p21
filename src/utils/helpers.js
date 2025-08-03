// Utility functions for the Summit Sports Club app

/**
 * Safely parse JSON from session storage with fallback
 * @param {string} key - Session storage key
 * @param {any} fallback - Fallback value if parsing fails
 * @returns {any} Parsed data or fallback
 */
export const safeSessionStorageGet = (key, fallback = []) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`Failed to parse session storage item "${key}":`, error);
    // Clear corrupted data
    sessionStorage.removeItem(key);
    return fallback;
  }
};

/**
 * Safely set data to session storage
 * @param {string} key - Session storage key
 * @param {any} data - Data to store
 */
export const safeSessionStorageSet = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to set session storage item "${key}":`, error);
  }
};

/**
 * Generate a unique ID with better collision resistance
 * @returns {string} Unique ID
 */
export const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} content - Content to sanitize
 * @returns {string} Sanitized content
 */
export const sanitizeHtml = (content) => {
  const div = document.createElement('div');
  div.textContent = content;
  return div.innerHTML;
};

/**
 * Safely format date with validation
 * @param {string} dateString - Date string to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date or fallback
 */
export const safeFormatDate = (dateString, options = {}) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    const defaultOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      ...options
    };
    
    return date.toLocaleDateString('en-US', defaultOptions);
  } catch (error) {
    console.warn('Failed to format date:', dateString, error);
    return 'Invalid Date';
  }
};

/**
 * Create a cancellable timeout
 * @param {Function} callback - Function to call
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Cancel function
 */
export const createCancellableTimeout = (callback, delay) => {
  const timeoutId = setTimeout(callback, delay);
  return () => clearTimeout(timeoutId);
};

/**
 * Hash password (simple implementation for demo purposes)
 * @param {string} password - Plain text password
 * @returns {string} Hashed password
 */
export const hashPassword = (password) => {
  // Simple hash for demo purposes - in production use bcrypt or similar
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
};

/**
 * Verify password against hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {boolean} Whether password matches
 */
export const verifyPassword = (password, hash) => {
  return hashPassword(password) === hash;
};