-- EduConnect Database Setup
-- Run this SQL to create database and table structure

-- Create database
CREATE DATABASE IF NOT EXISTS educonnect;

-- Use database
USE educonnect;

-- Create grades table
CREATE TABLE IF NOT EXISTS grades (
  id INT(11) NOT NULL AUTO_INCREMENT,
  studentID INT(11) NOT NULL,
  courseID INT(11) NOT NULL,
  teacherID INT(11) NOT NULL,
  grade VARCHAR(255) NOT NULL,
  remarks VARCHAR(255) DEFAULT NULL,
  createAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_studentID (studentID),
  KEY idx_courseID (courseID),
  KEY idx_teacherID (teacherID),
  KEY idx_createAt (createAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data for testing (optional)
INSERT INTO grades (studentID, courseID, teacherID, grade, remarks, createAt) VALUES
(1, 1, 1, 'A', 'Excellent work in Mathematics', NOW()),
(1, 2, 2, 'B+', 'Good performance in Physics', NOW()),
(1, 3, 3, 'A-', 'Very good in Chemistry', NOW()),
(2, 1, 1, 'B', 'Good understanding of concepts', NOW()),
(2, 2, 2, 'B-', 'Needs more practice', NOW()),
(3, 1, 1, 'C+', 'Satisfactory, needs improvement', NOW()),
(3, 3, 3, 'B+', 'Good progress in Chemistry', NOW()),
(4, 2, 2, 'A', 'Outstanding performance', NOW()),
(4, 3, 3, 'A+', 'Exceptional understanding', NOW()),
(5, 1, 1, 'B', 'Solid work', NOW());

-- Display all grades
SELECT * FROM grades;

-- Display grade count
SELECT COUNT(*) as total_grades FROM grades;

