# 🚀 Setup Instructions - EduConnect API

Panduan lengkap untuk setup dan menjalankan EduConnect API di local environment.

## 📋 Prerequisites

Pastikan sudah terinstall:

1. **Node.js** (v14 atau lebih baru)
   - Download: https://nodejs.org/
   - Check version: `node --version`

2. **MySQL** (v5.7 atau lebih baru)
   - Download: https://www.mysql.com/downloads/
   - Atau gunakan XAMPP/WAMP
   - Check version: `mysql --version`

3. **npm** (biasanya sudah include dengan Node.js)
   - Check version: `npm --version`

4. **Git** (optional, untuk version control)
   - Download: https://git-scm.com/

## 📦 Step 1: Install Dependencies

Buka terminal/command prompt di folder project, kemudian jalankan:

```bash
npm install
```

Ini akan menginstall semua package yang dibutuhkan:
- express
- mysql2
- dotenv
- cors
- body-parser
- jsonwebtoken
- nodemon (dev dependency)

## 🗄️ Step 2: Setup Database

### Opsi A: Menggunakan MySQL Command Line

1. Buka MySQL Command Line atau terminal
2. Login ke MySQL:
   ```bash
   mysql -u root -p
   ```
3. Jalankan file SQL:
   ```bash
   source database.sql
   ```
   Atau copy-paste isi file `database.sql` ke MySQL console

### Opsi B: Menggunakan phpMyAdmin (XAMPP/WAMP)

1. Buka phpMyAdmin di browser: http://localhost/phpmyadmin
2. Buat database baru bernama `educonnect`
3. Pilih database `educonnect`
4. Klik tab "SQL"
5. Copy-paste isi file `database.sql`
6. Klik "Go"

### Opsi C: Menggunakan MySQL Workbench

1. Buka MySQL Workbench
2. Connect ke MySQL server
3. File → Open SQL Script → Pilih `database.sql`
4. Execute (Ctrl+Shift+Enter)

## ⚙️ Step 3: Configure Environment Variables

1. Buat file `.env` di root folder project
2. Copy isi dari template berikut atau sesuaikan dengan environment Anda:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=educonnect

# JWT Configuration
JWT_SECRET=educonnect_secret_key_2024
JWT_EXPIRES_IN=24h
```

**Sesuaikan nilai berikut:**
- `DB_USER`: Username MySQL Anda (default: root)
- `DB_PASSWORD`: Password MySQL Anda (kosongkan jika tidak ada password)
- `DB_NAME`: Nama database (default: educonnect)
- `DB_HOST`: Host MySQL (default: 127.0.0.1 atau localhost)
- `DB_PORT`: Port MySQL (default: 3306)

## ✅ Step 4: Test Database Connection

Jalankan server untuk test koneksi:

```bash
npm start
```

Jika berhasil, Anda akan melihat:
```
Server is running on port 3000
Environment: development
Database connected successfully
```

Jika ada error:
- **"ECONNREFUSED"**: MySQL service belum running
- **"Access denied"**: Username/password salah
- **"Unknown database"**: Database belum dibuat

## 🚀 Step 5: Run the Server

### Development Mode (dengan auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server akan running di: **http://localhost:3000**

## 🧪 Step 6: Test API

### Opsi A: Menggunakan Browser

Buka browser dan akses:
```
http://localhost:3000
```

Anda akan melihat welcome message dengan daftar endpoints.

### Opsi B: Menggunakan cURL (Terminal)

Test get all grades:
```bash
curl http://localhost:3000/api/grades
```

Test create grade:
```bash
curl -X POST http://localhost:3000/api/grades ^
  -H "Content-Type: application/json" ^
  -d "{\"studentID\": 1, \"courseID\": 2, \"teacherID\": 3, \"grade\": \"A\", \"remarks\": \"Excellent\"}"
```

*Note: Untuk Windows PowerShell, ganti `^` dengan `` ` ``*

### Opsi C: Menggunakan VS Code Extension

1. Install extension **REST Client** di VS Code
2. Buka file `test-api.rest`
3. Klik "Send Request" di atas setiap request

### Opsi D: Menggunakan Postman

1. Download Postman: https://www.postman.com/downloads/
2. Import collection atau buat request manual
3. Base URL: `http://localhost:3000/api/grades`
4. Test semua endpoints sesuai dokumentasi

### Opsi E: Menggunakan Thunder Client (VS Code)

1. Install extension **Thunder Client** di VS Code
2. Create new request
3. Base URL: `http://localhost:3000/api/grades`
4. Test endpoints

## 📝 Sample Test Requests

### 1. Get All Grades
```
GET http://localhost:3000/api/grades
```

### 2. Get Grade by ID
```
GET http://localhost:3000/api/grades/1
```

### 3. Create New Grade
```
POST http://localhost:3000/api/grades
Content-Type: application/json

{
  "studentID": 1,
  "courseID": 2,
  "teacherID": 3,
  "grade": "A",
  "remarks": "Excellent work"
}
```

### 4. Update Grade
```
PUT http://localhost:3000/api/grades/1
Content-Type: application/json

{
  "studentID": 1,
  "courseID": 2,
  "teacherID": 3,
  "grade": "A+",
  "remarks": "Outstanding"
}
```

### 5. Delete Grade
```
DELETE http://localhost:3000/api/grades/1
```

## 🔧 Troubleshooting

### Port Already in Use

Jika port 3000 sudah digunakan:
1. Ubah `PORT` di file `.env` menjadi port lain (misal: 3001)
2. Restart server

Atau kill process di port 3000:

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -i :3000
kill -9 <PID>
```

### Database Connection Failed

1. Cek apakah MySQL service running:
   - **Windows**: Services → MySQL → Start
   - **XAMPP**: Start MySQL dari control panel
   - **Mac**: System Preferences → MySQL → Start

2. Cek kredensial di `.env` sudah benar

3. Test koneksi manual:
   ```bash
   mysql -u root -p -h 127.0.0.1
   ```

### Module Not Found

Jika ada error "Cannot find module":
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules
npm install
```

Atau di Windows:
```bash
rmdir /s node_modules
npm install
```

### nodemon not found

Jika `npm run dev` error:
```bash
# Install nodemon globally
npm install -g nodemon

# Atau gunakan npm start
npm start
```

## 📂 Struktur Project

```
educonnect/
├── src/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── controllers/
│   │   └── gradeController.js   # Business logic
│   ├── models/
│   │   └── gradeModel.js        # Database queries
│   ├── routes/
│   │   └── gradeRoutes.js       # API routes
│   ├── middlewares/
│   │   └── authMiddleware.js    # Authentication (commented)
│   ├── utils/
│   │   ├── validator.js         # Validation helpers
│   │   └── responseHandler.js   # Response helpers
│   └── app.js                   # Express app
├── .env                         # Environment variables (create this)
├── .gitignore
├── database.sql                 # Database setup script
├── package.json
├── server.js                    # Entry point
├── test-api.rest               # REST Client tests
├── README.md
├── API_DOCUMENTATION.md
└── SETUP_INSTRUCTIONS.md (this file)
```

## 🔐 Mengaktifkan Authentication (Nanti)

Saat ini authentication di-comment. Untuk mengaktifkan:

### 1. Uncomment di `src/routes/gradeRoutes.js`

```javascript
router.get('/', 
  verifyToken, // UNCOMMENT ini
  gradeController.getAllGrades
);
```

### 2. Uncomment di `src/middlewares/authMiddleware.js`

Uncomment block kode di dalam fungsi `verifyToken` dan `checkRole`.

### 3. Test dengan Token

Kirim token di header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📚 Next Steps

1. ✅ Setup dan running server
2. ✅ Test semua endpoints
3. 🔄 Integrasi dengan frontend
4. 🔄 Implementasi login/authentication
5. 🔄 Uncomment authentication middleware
6. 🔄 Deploy ke production

## 📞 Support

Jika ada masalah:
1. Cek error message di console
2. Baca dokumentasi di `README.md`
3. Baca API docs di `API_DOCUMENTATION.md`
4. Search error di Google/Stack Overflow

## ✨ Tips

1. Gunakan Postman atau Thunder Client untuk testing yang lebih mudah
2. Baca response error dengan teliti untuk debugging
3. Cek console log untuk melihat error detail
4. Gunakan `console.log()` untuk debugging
5. Test di development environment dulu sebelum production

## 🎉 Selamat!

Jika sudah sampai sini, API Anda sudah siap digunakan! 🚀

Happy Coding! 👨‍💻👩‍💻

