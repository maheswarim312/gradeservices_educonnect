const Grade = require('../models/gradeModel');

class GradeController {
  // Get all grades
  async getAllGrades(req, res) {
    try {
      const { id: requesterId, role: requesterRole } = req.user;

      // Extract query parameters for filtering
      const filters = {
        studentID: req.query.studentID,
        courseID: req.query.courseID,
        teacherID: req.query.teacherID,
        grade: req.query.grade
      };

      if (requesterRole === 'murid') {
          filters.studentID = requesterId;
      }

      // If any filter is provided, use filtered query
      const hasFilters = Object.values(filters).some(value => value !== undefined);
      
      const grades = hasFilters 
        ? await Grade.findWithFilters(filters)
        : await Grade.findAll();

      res.json({
        success: true,
        count: grades.length,
        data: grades
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching grades',
        error: error.message
      });
    }
  }

  // Get grade by ID
  async getGradeById(req, res) {
    try {
      const { id: requesterId, role: requesterRole } = req.user;
      const { id } = req.params;

      const grade = await Grade.findById(id);

      if (!grade) {
        return res.status(404).json({
          success: false,
          message: 'Grade not found'
        });
      }

      if (requesterRole === 'murid' && grade.studentID !== requesterId) {
        return res.status(403).json({ success: false, message: "Akses ditolak: Murid hanya bisa melihat nilainya sendiri." });
      }

      res.json({
        success: true,
        data: grade
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching grade',
        error: error.message
      });
    }
  }

  // Get grades by student ID
  async getGradesByStudent(req, res) {
    try {
      const { id: requesterId, role: requesterRole } = req.user;
      const { studentId } = req.params;

      if (requesterRole === 'murid' && requesterId != studentId) {
        return res.status(403).json({ success: false, message: "Akses ditolak: Murid hanya bisa melihat nilainya sendiri." });
      }

      const grades = await Grade.findByStudentId(studentId);

      res.json({
        success: true,
        count: grades.length,
        data: grades
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching student grades',
        error: error.message
      });
    }
  }

  // Get grades by course ID
  async getGradesByCourse(req, res) {
    try {
      const { courseId } = req.params;
      const grades = await Grade.findByCourseId(courseId);

      res.json({
        success: true,
        count: grades.length,
        data: grades
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching course grades',
        error: error.message
      });
    }
  }

  // Get grades by teacher ID
  async getGradesByTeacher(req, res) {
    try {
      const { teacherId } = req.params;
      const grades = await Grade.findByTeacherId(teacherId);

      res.json({
        success: true,
        count: grades.length,
        data: grades
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching teacher grades',
        error: error.message
      });
    }
  }

  // Create new grade
  async createGrade(req, res) {
    try {
      const { studentID, courseID, teacherID, grade, remarks } = req.body;

      // Validation
      if (!studentID || !courseID || !teacherID || !grade) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields: studentID, courseID, teacherID, grade'
        });
      }

      const gradeData = {
        studentID,
        courseID,
        teacherID,
        grade,
        remarks: remarks || null
      };

      const insertId = await Grade.create(gradeData);
      const newGrade = await Grade.findById(insertId);

      res.status(201).json({
        success: true,
        message: 'Grade created successfully',
        data: newGrade
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating grade',
        error: error.message
      });
    }
  }

  // Update grade
  async updateGrade(req, res) {
    try {
      const { id } = req.params;
      const { studentID, courseID, teacherID, grade, remarks } = req.body;

      // Check if grade exists
      const existingGrade = await Grade.findById(id);
      if (!existingGrade) {
        return res.status(404).json({
          success: false,
          message: 'Grade not found'
        });
      }

      // Validation
      if (!studentID || !courseID || !teacherID || !grade) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields: studentID, courseID, teacherID, grade'
        });
      }

      const gradeData = {
        studentID,
        courseID,
        teacherID,
        grade,
        remarks: remarks || null
      };

      await Grade.update(id, gradeData);
      const updatedGrade = await Grade.findById(id);

      res.json({
        success: true,
        message: 'Grade updated successfully',
        data: updatedGrade
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating grade',
        error: error.message
      });
    }
  }

  // Delete grade
  async deleteGrade(req, res) {
    try {
      const { id } = req.params;

      // Check if grade exists
      const existingGrade = await Grade.findById(id);
      if (!existingGrade) {
        return res.status(404).json({
          success: false,
          message: 'Grade not found'
        });
      }

      await Grade.delete(id);

      res.json({
        success: true,
        message: 'Grade deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting grade',
        error: error.message
      });
    }
  }
}

module.exports = new GradeController();

