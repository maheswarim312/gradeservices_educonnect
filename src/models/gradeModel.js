const db = require('../config/database');

class Grade {
  // Get all grades
  static async findAll() {
    try {
      const [rows] = await db.query(
        'SELECT * FROM grades ORDER BY createAt DESC'
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get grade by ID
  static async findById(id) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM grades WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get grades by student ID
  static async findByStudentId(studentID) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM grades WHERE studentID = ? ORDER BY createAt DESC',
        [studentID]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get grades by course ID
  static async findByCourseId(courseID) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM grades WHERE courseID = ? ORDER BY createAt DESC',
        [courseID]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get grades by teacher ID
  static async findByTeacherId(teacherID) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM grades WHERE teacherID = ? ORDER BY createAt DESC',
        [teacherID]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Create new grade
  static async create(gradeData) {
    try {
      const { studentID, courseID, teacherID, grade, remarks } = gradeData;
      const [result] = await db.query(
        'INSERT INTO grades (studentID, courseID, teacherID, grade, remarks, createAt) VALUES (?, ?, ?, ?, ?, NOW())',
        [studentID, courseID, teacherID, grade, remarks]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Update grade
  static async update(id, gradeData) {
    try {
      const { studentID, courseID, teacherID, grade, remarks } = gradeData;
      const [result] = await db.query(
        'UPDATE grades SET studentID = ?, courseID = ?, teacherID = ?, grade = ?, remarks = ? WHERE id = ?',
        [studentID, courseID, teacherID, grade, remarks, id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Delete grade
  static async delete(id) {
    try {
      const [result] = await db.query(
        'DELETE FROM grades WHERE id = ?',
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Get grades with filters
  static async findWithFilters(filters) {
    try {
      let query = 'SELECT * FROM grades WHERE 1=1';
      const params = [];

      if (filters.studentID) {
        query += ' AND studentID = ?';
        params.push(filters.studentID);
      }

      if (filters.courseID) {
        query += ' AND courseID = ?';
        params.push(filters.courseID);
      }

      if (filters.teacherID) {
        query += ' AND teacherID = ?';
        params.push(filters.teacherID);
      }

      if (filters.grade) {
        query += ' AND grade = ?';
        params.push(filters.grade);
      }

      query += ' ORDER BY createAt DESC';

      const [rows] = await db.query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Grade;

