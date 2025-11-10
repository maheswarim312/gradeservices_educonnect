# EduConnect API - Grading System

API untuk sistem penilaian (grading) menggunakan Node.js, Express, dan MySQL.

## 📁 Struktur Folder

```
educonnect/
├── src/
│   ├── config/
│   │   ├── database.js          # Konfigurasi database MySQL
│   │   └── swagger.js           # Konfigurasi Swagger documentation
│   ├── controllers/
│   │   └── gradeController.js   # Logic untuk handle request
│   ├── models/
│   │   └── gradeModel.js        # Model untuk tabel grades
│   ├── routes/
│   │   └── gradeRoutes.js       # Route definitions + Swagger annotations
│   ├── middlewares/
│   │   └── authMiddleware.js    # Middleware untuk authentication (commented)
│   ├── utils/
│   │   ├── validator.js         # Validation helper functions
│   │   └── responseHandler.js   # Response helper functions
│   └── app.js                   # Express app configuration
├── .env.example                 # Template environment variables
├── .gitignore
├── package.json
├── server.js                    # Entry point aplikasi
├── database.sql                 # SQL script untuk setup database
├── README.md                    # Dokumentasi utama
├── API_DOCUMENTATION.md         # Dokumentasi API lengkap
├── SWAGGER_GUIDE.md             # Panduan Swagger documentation
├── SETUP_INSTRUCTIONS.md        # Panduan setup step-by-step
└── test-api.rest                # REST Client test file
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Edit file `.env` dengan konfigurasi database Anda:

```env
PORT=3000
NODE_ENV=development

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=educonnect

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h
```

### 3. Setup Database

Pastikan tabel `grades` sudah ada di database Anda dengan struktur:

```sql
CREATE TABLE grades (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  studentID INT(11) NOT NULL,
  courseID INT(11) NOT NULL,
  teacherID INT(11) NOT NULL,
  grade VARCHAR(255) NOT NULL,
  remarks VARCHAR(255) DEFAULT NULL,
  createAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Run Server

Development mode (dengan auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## 📖 API Documentation

### Swagger UI (Interactive Documentation)

Akses dokumentasi API interaktif di browser:

```
http://localhost:3000/api-docs
```

**Fitur Swagger UI:**
- 📋 Lihat semua endpoint yang tersedia
- 🎯 Try it out - Test API langsung dari browser
- 📝 Lihat detail request & response
- 💡 Contoh request body dan response
- 📦 Export OpenAPI specification

Untuk panduan lengkap Swagger, lihat [SWAGGER_GUIDE.md](SWAGGER_GUIDE.md)

### Manual Documentation

Dokumentasi lengkap juga tersedia di:
- **API_DOCUMENTATION.md** - Dokumentasi API lengkap dengan examples
- **SETUP_INSTRUCTIONS.md** - Panduan setup step-by-step

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api/grades
```

### Endpoints

#### 1. Get All Grades
```http
GET /api/grades
```

**Query Parameters (optional):**
- `studentID` - Filter by student ID
- `courseID` - Filter by course ID
- `teacherID` - Filter by teacher ID
- `grade` - Filter by grade value

**Example:**
```http
GET /api/grades?studentID=1&courseID=2
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "studentID": 1,
      "courseID": 2,
      "teacherID": 3,
      "grade": "A",
      "remarks": "Excellent work",
      "createAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### 2. Get Grade by ID
```http
GET /api/grades/:id
```

**Example:**
```http
GET /api/grades/1
```

#### 3. Get Grades by Student ID
```http
GET /api/grades/student/:studentId
```

**Example:**
```http
GET /api/grades/student/1
```

#### 4. Get Grades by Course ID
```http
GET /api/grades/course/:courseId
```

**Example:**
```http
GET /api/grades/course/2
```

#### 5. Get Grades by Teacher ID
```http
GET /api/grades/teacher/:teacherId
```

**Example:**
```http
GET /api/grades/teacher/3
```

#### 6. Create New Grade
```http
POST /api/grades
```

**Request Body:**
```json
{
  "studentID": 1,
  "courseID": 2,
  "teacherID": 3,
  "grade": "A",
  "remarks": "Excellent work"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Grade created successfully",
  "data": {
    "id": 1,
    "studentID": 1,
    "courseID": 2,
    "teacherID": 3,
    "grade": "A",
    "remarks": "Excellent work",
    "createAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 7. Update Grade
```http
PUT /api/grades/:id
```

**Request Body:**
```json
{
  "studentID": 1,
  "courseID": 2,
  "teacherID": 3,
  "grade": "A+",
  "remarks": "Outstanding performance"
}
```

#### 8. Delete Grade
```http
DELETE /api/grades/:id
```

**Example:**
```http
DELETE /api/grades/1
```

**Response:**
```json
{
  "success": true,
  "message": "Grade deleted successfully"
}
```

## 🔐 Authentication (Coming Soon)

Saat ini authentication di-comment untuk memudahkan testing. Untuk mengaktifkan:

### 1. Di file `src/routes/gradeRoutes.js`

Uncomment baris-baris berikut:

```javascript
// Contoh:
router.get('/', 
  verifyToken, // UNCOMMENT ini
  gradeController.getAllGrades
);

router.post('/', 
  verifyToken, // UNCOMMENT ini
  checkRole('teacher', 'admin'), // UNCOMMENT ini untuk role-based access
  gradeController.createGrade
);
```

### 2. Di file `src/middlewares/authMiddleware.js`

Uncomment block kode authentication di dalam fungsi `verifyToken` dan `checkRole`.

### 3. Menggunakan Token

Setelah authentication diaktifkan, kirim token di header request:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🧪 Testing API

Anda bisa test API menggunakan:

### Postman
1. Import collection atau buat request manual
2. Set base URL: `http://localhost:3000/api/grades`
3. Test semua endpoints

### cURL Examples

**Get all grades:**
```bash
curl http://localhost:3000/api/grades
```

**Create grade:**
```bash
curl -X POST http://localhost:3000/api/grades \
  -H "Content-Type: application/json" \
  -d '{
    "studentID": 1,
    "courseID": 2,
    "teacherID": 3,
    "grade": "A",
    "remarks": "Excellent"
  }'
```

**Update grade:**
```bash
curl -X PUT http://localhost:3000/api/grades/1 \
  -H "Content-Type: application/json" \
  -d '{
    "studentID": 1,
    "courseID": 2,
    "teacherID": 3,
    "grade": "A+",
    "remarks": "Outstanding"
  }'
```

**Delete grade:**
```bash
curl -X DELETE http://localhost:3000/api/grades/1
```

## 📦 Dependencies

- **express** - Web framework
- **mysql2** - MySQL client
- **dotenv** - Environment variables management
- **cors** - Cross-Origin Resource Sharing
- **body-parser** - Request body parsing
- **jsonwebtoken** - JWT authentication
- **swagger-ui-express** - Swagger UI integration
- **swagger-jsdoc** - JSDoc to Swagger converter
- **nodemon** - Development auto-reload (dev dependency)

## 🔧 Troubleshooting

### Database Connection Error

Pastikan:
1. MySQL service sudah running
2. Kredensial database di `.env` sudah benar
3. Database `educonnect` sudah dibuat
4. Tabel `grades` sudah ada

### Port Already in Use

Jika port 3000 sudah digunakan, ubah di file `.env`:
```env
PORT=3001
```

## 📝 Notes

- Authentication saat ini di-comment untuk memudahkan development dan testing
- Uncomment authentication middleware ketika sudah siap integrasi dengan sistem login
- Role-based access control sudah disiapkan untuk teacher dan admin
- API menggunakan connection pooling untuk performa yang lebih baik

## 🔜 Next Steps

1. Integrasi dengan sistem login/authentication
2. Uncomment authentication middleware
3. Implementasi rate limiting
4. Tambahkan logging system
5. Implementasi validation middleware
6. Setup unit testing

## 📄 License

ISC

