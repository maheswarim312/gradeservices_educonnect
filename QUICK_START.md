# ⚡ Quick Start Guide - EduConnect API

Panduan cepat untuk langsung memulai menggunakan EduConnect API.

## 🚀 3 Langkah Cepat

### 1️⃣ Install & Setup

```bash
# Clone atau extract project
cd educonnect

# Install dependencies
npm install

# Setup database (import database.sql ke MySQL)
# Bisa via phpMyAdmin, MySQL Workbench, atau command line
```

### 2️⃣ Configure

Buat file `.env`:

```env
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=educonnect
```

### 3️⃣ Run

```bash
# Development mode (recommended)
npm run dev

# atau Production mode
npm start
```

✅ **Done!** Server running di `http://localhost:3000`

---

## 🎯 Test API

### Opsi 1: Swagger UI (Recommended) 🌟

Buka browser:
```
http://localhost:3000/api-docs
```

- Klik endpoint yang ingin dicoba
- Klik "Try it out"
- Isi data (jika perlu)
- Klik "Execute"
- Lihat hasilnya!

### Opsi 2: Browser

Buka:
```
http://localhost:3000/api/grades
```

### Opsi 3: cURL

```bash
# Get all grades
curl http://localhost:3000/api/grades

# Create grade
curl -X POST http://localhost:3000/api/grades ^
  -H "Content-Type: application/json" ^
  -d "{\"studentID\":1,\"courseID\":2,\"teacherID\":3,\"grade\":\"A\"}"
```

### Opsi 4: VS Code REST Client

1. Install extension "REST Client"
2. Buka file `test-api.rest`
3. Klik "Send Request"

### Opsi 5: Postman/Thunder Client

Import `EduConnect-API.postman_collection.json`

---

## 📚 Endpoints

### Base URL
```
http://localhost:3000/api/grades
```

### Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/grades` | Get all grades |
| GET | `/api/grades/:id` | Get grade by ID |
| GET | `/api/grades/student/:id` | Get by student |
| GET | `/api/grades/course/:id` | Get by course |
| GET | `/api/grades/teacher/:id` | Get by teacher |
| POST | `/api/grades` | Create grade |
| PUT | `/api/grades/:id` | Update grade |
| DELETE | `/api/grades/:id` | Delete grade |

---

## 💡 Quick Examples

### Create a Grade

**Request:**
```json
POST /api/grades
Content-Type: application/json

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

### Get All Grades

**Request:**
```
GET /api/grades
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### Filter Grades

```
GET /api/grades?studentID=1
GET /api/grades?courseID=2
GET /api/grades?studentID=1&courseID=2
```

---

## 🔧 Troubleshooting

### Port sudah digunakan?

Ubah `PORT` di `.env` menjadi port lain (misal: 3001)

### Database error?

1. Pastikan MySQL running
2. Check kredensial di `.env`
3. Pastikan database `educonnect` sudah dibuat

### Module not found?

```bash
rm -rf node_modules
npm install
```

---

## 📖 Documentation

Dokumentasi lengkap:

- 📘 **README.md** - Overview & features
- 📗 **SETUP_INSTRUCTIONS.md** - Setup lengkap
- 📙 **API_DOCUMENTATION.md** - API reference
- 📕 **SWAGGER_GUIDE.md** - Swagger guide
- 🌐 **Swagger UI** - http://localhost:3000/api-docs

---

## ✅ Checklist

- [x] Install Node.js & MySQL
- [x] Install dependencies (`npm install`)
- [x] Setup database (import `database.sql`)
- [x] Create `.env` file
- [x] Run server (`npm run dev`)
- [x] Test di Swagger UI (`/api-docs`)
- [ ] Integrasi dengan frontend
- [ ] Deploy to production

---

## 🎉 Next Steps

1. ✅ Explore Swagger UI
2. ✅ Test semua endpoints
3. ✅ Baca dokumentasi lengkap
4. 🔄 Integrasi dengan login/auth
5. 🔄 Deploy!

---

## 💬 Need Help?

Baca dokumentasi lengkap di:
- `README.md`
- `SETUP_INSTRUCTIONS.md`
- `API_DOCUMENTATION.md`
- `SWAGGER_GUIDE.md`

**Happy Coding! 🚀**

