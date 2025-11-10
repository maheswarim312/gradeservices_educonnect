const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

// Public routes (untuk testing tanpa auth)
// Nanti uncomment verifyToken ketika sudah integrasi dengan login

/**
 * @swagger
 * /api/grades:
 *   get:
 *     summary: Get all grades
 *     description: Mengambil semua data nilai dengan opsi filtering menggunakan query parameters
 *     tags: [Grades]
 *     parameters:
 *       - in: query
 *         name: studentID
 *         schema:
 *           type: integer
 *         description: Filter berdasarkan ID siswa
 *       - in: query
 *         name: courseID
 *         schema:
 *           type: integer
 *         description: Filter berdasarkan ID mata kuliah
 *       - in: query
 *         name: teacherID
 *         schema:
 *           type: integer
 *         description: Filter berdasarkan ID guru
 *       - in: query
 *         name: grade
 *         schema:
 *           type: string
 *         description: Filter berdasarkan nilai
 *     responses:
 *       200:
 *         description: Berhasil mengambil data grades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Grade'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/', 
  // verifyToken, // UNCOMMENT ini ketika sudah integrasi
  gradeController.getAllGrades
);

/**
 * @swagger
 * /api/grades/{id}:
 *   get:
 *     summary: Get grade by ID
 *     description: Mengambil data nilai berdasarkan ID
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari grade
 *     responses:
 *       200:
 *         description: Berhasil mengambil data grade
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Grade'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/:id', 
  // verifyToken, // UNCOMMENT ini ketika sudah integrasi
  gradeController.getGradeById
);

/**
 * @swagger
 * /api/grades/student/{studentId}:
 *   get:
 *     summary: Get grades by student ID
 *     description: Mengambil semua nilai dari seorang siswa
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari siswa
 *     responses:
 *       200:
 *         description: Berhasil mengambil data grades siswa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Grade'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/student/:studentId', 
  // verifyToken, // UNCOMMENT ini ketika sudah integrasi
  gradeController.getGradesByStudent
);

/**
 * @swagger
 * /api/grades/course/{courseId}:
 *   get:
 *     summary: Get grades by course ID
 *     description: Mengambil semua nilai dari suatu mata kuliah
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari course
 *     responses:
 *       200:
 *         description: Berhasil mengambil data grades course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Grade'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/course/:courseId', 
  // verifyToken, // UNCOMMENT ini ketika sudah integrasi
  gradeController.getGradesByCourse
);

/**
 * @swagger
 * /api/grades/teacher/{teacherId}:
 *   get:
 *     summary: Get grades by teacher ID
 *     description: Mengambil semua nilai yang diberikan oleh seorang guru
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari teacher
 *     responses:
 *       200:
 *         description: Berhasil mengambil data grades teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 4
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Grade'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/teacher/:teacherId', 
  // verifyToken, // UNCOMMENT ini ketika sudah integrasi
  gradeController.getGradesByTeacher
);

/**
 * @swagger
 * /api/grades:
 *   post:
 *     summary: Create new grade
 *     description: Membuat data nilai baru (biasanya hanya teacher/admin yang bisa)
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GradeInput'
 *     responses:
 *       201:
 *         description: Grade berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Grade created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Grade'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/', 
  // verifyToken, // UNCOMMENT ini ketika sudah integrasi
  // checkRole('teacher', 'admin'), // UNCOMMENT ini untuk role-based access
  gradeController.createGrade
);

/**
 * @swagger
 * /api/grades/{id}:
 *   put:
 *     summary: Update grade
 *     description: Mengupdate data nilai yang sudah ada (biasanya hanya teacher/admin yang bisa)
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari grade yang akan diupdate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GradeInput'
 *     responses:
 *       200:
 *         description: Grade berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Grade updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Grade'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put('/:id', 
  // verifyToken, // UNCOMMENT ini ketika sudah integrasi
  // checkRole('teacher', 'admin'), // UNCOMMENT ini untuk role-based access
  gradeController.updateGrade
);

/**
 * @swagger
 * /api/grades/{id}:
 *   delete:
 *     summary: Delete grade
 *     description: Menghapus data nilai (biasanya hanya admin yang bisa)
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari grade yang akan dihapus
 *     responses:
 *       200:
 *         description: Grade berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Grade deleted successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete('/:id', 
  // verifyToken, // UNCOMMENT ini ketika sudah integrasi
  // checkRole('admin'), // UNCOMMENT ini untuk role-based access
  gradeController.deleteGrade
);

module.exports = router;

