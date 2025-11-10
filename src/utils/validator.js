// Utility functions for validation

/**
 * Validate grade data
 * @param {Object} data - Grade data to validate
 * @returns {Object} - { isValid: boolean, errors: Array }
 */
const validateGradeData = (data) => {
  const errors = [];

  // Check required fields
  if (!data.studentID) {
    errors.push('studentID is required');
  }

  if (!data.courseID) {
    errors.push('courseID is required');
  }

  if (!data.teacherID) {
    errors.push('teacherID is required');
  }

  if (!data.grade) {
    errors.push('grade is required');
  }

  // Validate data types
  if (data.studentID && !Number.isInteger(Number(data.studentID))) {
    errors.push('studentID must be a number');
  }

  if (data.courseID && !Number.isInteger(Number(data.courseID))) {
    errors.push('courseID must be a number');
  }

  if (data.teacherID && !Number.isInteger(Number(data.teacherID))) {
    errors.push('teacherID must be a number');
  }

  // Validate grade format (optional - adjust based on your grading system)
  if (data.grade && typeof data.grade !== 'string') {
    errors.push('grade must be a string');
  }

  // Validate grade length
  if (data.grade && data.grade.length > 255) {
    errors.push('grade must be less than 255 characters');
  }

  // Validate remarks length if provided
  if (data.remarks && data.remarks.length > 255) {
    errors.push('remarks must be less than 255 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate ID parameter
 * @param {*} id - ID to validate
 * @returns {boolean}
 */
const validateId = (id) => {
  const numId = Number(id);
  return Number.isInteger(numId) && numId > 0;
};

/**
 * Sanitize string input
 * @param {string} str - String to sanitize
 * @returns {string}
 */
const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim();
};

/**
 * Check if grade value is valid (customize based on your grading system)
 * @param {string} grade - Grade value to check
 * @returns {boolean}
 */
const isValidGradeValue = (grade) => {
  // Example: A+, A, A-, B+, B, B-, C+, C, C-, D, F
  const validGrades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];
  
  // Or numeric grades: 0-100
  const numericGrade = Number(grade);
  if (!isNaN(numericGrade) && numericGrade >= 0 && numericGrade <= 100) {
    return true;
  }

  // Check letter grades (case insensitive)
  return validGrades.includes(grade.toUpperCase());
};

module.exports = {
  validateGradeData,
  validateId,
  sanitizeString,
  isValidGradeValue
};

