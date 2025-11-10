# API Documentation - EduConnect Grading System

## 📋 Daftar Isi
- [Base Information](#base-information)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Examples](#examples)

## Base Information

**Base URL:** `http://localhost:3000/api`

**Content-Type:** `application/json`

**Current Version:** `1.0.0`

## Authentication

> ⚠️ **Note:** Authentication saat ini di-comment untuk development. Untuk production, uncomment authentication middleware.

Ketika sudah diaktifkan, semua request memerlukan JWT token di header:

```http
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 1. GET All Grades

**Endpoint:** `GET /grades`

**Description:** Mengambil semua data nilai atau dengan filter tertentu

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| studentID | integer | No | Filter berdasarkan ID siswa |
| courseID | integer | No | Filter berdasarkan ID mata kuliah |
| teacherID | integer | No | Filter berdasarkan ID guru |
| grade | string | No | Filter berdasarkan nilai |

**Example Request:**
```bash
GET /api/grades
GET /api/grades?studentID=1
GET /api/grades?courseID=2&teacherID=3
```

**Success Response (200):**
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
    },
    {
      "id": 2,
      "studentID": 1,
      "courseID": 3,
      "teacherID": 2,
      "grade": "B+",
      "remarks": "Good performance",
      "createAt": "2024-01-14T09:20:00.000Z"
    }
  ]
}
```

---

### 2. GET Grade by ID

**Endpoint:** `GET /grades/:id`

**Description:** Mengambil data nilai berdasarkan ID

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | Yes | ID dari grade |

**Example Request:**
```bash
GET /api/grades/1
```

**Success Response (200):**
```json
{
  "success": true,
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

**Error Response (404):**
```json
{
  "success": false,
  "message": "Grade not found"
}
```

---

### 3. GET Grades by Student

**Endpoint:** `GET /grades/student/:studentId`

**Description:** Mengambil semua nilai dari seorang siswa

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| studentId | integer | Yes | ID dari siswa |

**Example Request:**
```bash
GET /api/grades/student/1
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "studentID": 1,
      "courseID": 2,
      "teacherID": 3,
      "grade": "A",
      "remarks": "Excellent",
      "createAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 4. GET Grades by Course

**Endpoint:** `GET /grades/course/:courseId`

**Description:** Mengambil semua nilai dari suatu mata kuliah

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| courseId | integer | Yes | ID dari course |

**Example Request:**
```bash
GET /api/grades/course/2
```

---

### 5. GET Grades by Teacher

**Endpoint:** `GET /grades/teacher/:teacherId`

**Description:** Mengambil semua nilai yang diberikan oleh seorang guru

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| teacherId | integer | Yes | ID dari teacher |

**Example Request:**
```bash
GET /api/grades/teacher/3
```

---

### 6. POST Create Grade

**Endpoint:** `POST /grades`

**Description:** Membuat data nilai baru

**Required Role:** Teacher, Admin (ketika auth diaktifkan)

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

**Field Validation:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| studentID | integer | Yes | ID siswa |
| courseID | integer | Yes | ID mata kuliah |
| teacherID | integer | Yes | ID guru |
| grade | string | Yes | Nilai (A, B, C, dll) |
| remarks | string | No | Catatan/komentar |

**Example Request:**
```bash
POST /api/grades
Content-Type: application/json

{
  "studentID": 1,
  "courseID": 2,
  "teacherID": 3,
  "grade": "A",
  "remarks": "Outstanding performance"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Grade created successfully",
  "data": {
    "id": 5,
    "studentID": 1,
    "courseID": 2,
    "teacherID": 3,
    "grade": "A",
    "remarks": "Outstanding performance",
    "createAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Please provide all required fields: studentID, courseID, teacherID, grade"
}
```

---

### 7. PUT Update Grade

**Endpoint:** `PUT /grades/:id`

**Description:** Mengupdate data nilai yang sudah ada

**Required Role:** Teacher, Admin (ketika auth diaktifkan)

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | Yes | ID dari grade yang akan diupdate |

**Request Body:**
```json
{
  "studentID": 1,
  "courseID": 2,
  "teacherID": 3,
  "grade": "A+",
  "remarks": "Exceptional work"
}
```

**Example Request:**
```bash
PUT /api/grades/1
Content-Type: application/json

{
  "studentID": 1,
  "courseID": 2,
  "teacherID": 3,
  "grade": "A+",
  "remarks": "Exceptional work"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Grade updated successfully",
  "data": {
    "id": 1,
    "studentID": 1,
    "courseID": 2,
    "teacherID": 3,
    "grade": "A+",
    "remarks": "Exceptional work",
    "createAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Grade not found"
}
```

---

### 8. DELETE Grade

**Endpoint:** `DELETE /grades/:id`

**Description:** Menghapus data nilai

**Required Role:** Admin (ketika auth diaktifkan)

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | integer | Yes | ID dari grade yang akan dihapus |

**Example Request:**
```bash
DELETE /api/grades/1
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Grade deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Grade not found"
}
```

---

## Response Format

### Success Response Structure
```json
{
  "success": true,
  "message": "Operation message",
  "data": { /* response data */ }
}
```

### Error Response Structure
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (only in development)"
}
```

## Error Handling

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request berhasil |
| 201 | Created - Resource berhasil dibuat |
| 400 | Bad Request - Request tidak valid |
| 401 | Unauthorized - Token tidak ada atau tidak valid |
| 403 | Forbidden - Tidak memiliki akses |
| 404 | Not Found - Resource tidak ditemukan |
| 500 | Internal Server Error - Error di server |

### Common Error Messages

**Validation Error:**
```json
{
  "success": false,
  "message": "Please provide all required fields: studentID, courseID, teacherID, grade"
}
```

**Not Found:**
```json
{
  "success": false,
  "message": "Grade not found"
}
```

**Authentication Error (ketika diaktifkan):**
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

**Authorization Error (ketika diaktifkan):**
```json
{
  "success": false,
  "message": "Access denied. Insufficient permissions."
}
```

## Examples

### Complete CRUD Operations

#### 1. Create a Grade
```bash
curl -X POST http://localhost:3000/api/grades \
  -H "Content-Type: application/json" \
  -d '{
    "studentID": 1,
    "courseID": 2,
    "teacherID": 3,
    "grade": "A",
    "remarks": "Excellent work"
  }'
```

#### 2. Get All Grades
```bash
curl http://localhost:3000/api/grades
```

#### 3. Get Specific Grade
```bash
curl http://localhost:3000/api/grades/1
```

#### 4. Update Grade
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

#### 5. Delete Grade
```bash
curl -X DELETE http://localhost:3000/api/grades/1
```

### With Authentication (when enabled)

```bash
# Set your token
TOKEN="your_jwt_token_here"

# Make request with authentication
curl http://localhost:3000/api/grades \
  -H "Authorization: Bearer $TOKEN"

# Create with authentication
curl -X POST http://localhost:3000/api/grades \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "studentID": 1,
    "courseID": 2,
    "teacherID": 3,
    "grade": "A",
    "remarks": "Excellent"
  }'
```

### Filtering Examples

```bash
# Get grades for specific student
curl http://localhost:3000/api/grades?studentID=1

# Get grades for specific course
curl http://localhost:3000/api/grades?courseID=2

# Get grades by teacher
curl http://localhost:3000/api/grades?teacherID=3

# Multiple filters
curl http://localhost:3000/api/grades?studentID=1&courseID=2

# Get all A grades
curl http://localhost:3000/api/grades?grade=A
```

---

## Testing Tips

1. **Use Postman or Thunder Client** untuk testing yang lebih mudah
2. **Test tanpa authentication dulu** untuk memastikan semua endpoint berfungsi
3. **Gunakan environment variables** di Postman untuk base URL
4. **Save requests** dalam collection untuk reusability
5. **Test error cases** juga (404, 400, dll)

## Development Notes

- Saat ini authentication **di-comment** untuk memudahkan development
- Untuk production, **uncomment** semua baris yang ada comment `// UNCOMMENT ini ketika sudah integrasi`
- File yang perlu dimodifikasi:
  - `src/routes/gradeRoutes.js` - Uncomment `verifyToken` dan `checkRole`
  - `src/middlewares/authMiddleware.js` - Uncomment authentication logic

## Support

Jika ada pertanyaan atau issue, silakan buat ticket atau hubungi development team.

