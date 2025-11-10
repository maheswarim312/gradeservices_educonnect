# 📘 Swagger Documentation Guide

Panduan lengkap untuk menggunakan Swagger API Documentation di EduConnect API.

## 🌟 Apa itu Swagger?

Swagger adalah tool untuk membuat dokumentasi API yang interaktif. Dengan Swagger UI, Anda bisa:
- Melihat semua endpoint yang tersedia
- Melihat detail request dan response
- **Mencoba API langsung dari browser** (Try it out!)
- Melihat contoh request body dan response
- Export dokumentasi dalam format OpenAPI/JSON

## 🚀 Mengakses Swagger Documentation

### 1. Jalankan Server

```bash
npm install
npm start
```

### 2. Buka Swagger UI

Akses di browser:
```
http://localhost:3000/api-docs
```

### 3. Swagger JSON

Untuk mendapatkan OpenAPI specification dalam format JSON:
```
http://localhost:3000/api-docs.json
```

## 📚 Struktur Swagger

### File-file Swagger:

1. **`src/config/swagger.js`**
   - Konfigurasi utama Swagger
   - Schema definitions
   - Server configuration
   - Security schemes

2. **`src/routes/gradeRoutes.js`**
   - Swagger annotations untuk setiap endpoint
   - Dokumentasi parameter dan response

3. **`src/app.js`**
   - Setup Swagger UI
   - Swagger middleware

## 🎯 Fitur Swagger UI

### 1. Explore Endpoints

- Semua endpoint dikelompokkan berdasarkan tags
- Klik untuk melihat detail endpoint
- Expand/collapse untuk navigasi mudah

### 2. Try It Out!

**Cara menggunakan:**

1. Klik pada endpoint yang ingin dicoba
2. Klik tombol **"Try it out"**
3. Isi parameter atau request body (jika diperlukan)
4. Klik **"Execute"**
5. Lihat response di bawah

**Contoh - Create Grade:**

1. Expand `POST /api/grades`
2. Klik "Try it out"
3. Edit request body:
   ```json
   {
     "studentID": 1,
     "courseID": 2,
     "teacherID": 3,
     "grade": "A",
     "remarks": "Excellent work"
   }
   ```
4. Klik "Execute"
5. Lihat response code dan body

### 3. Schemas

Di bagian bawah, ada section **Schemas** yang menampilkan:
- **Grade** - Structure data grade lengkap
- **GradeInput** - Structure untuk create/update
- **SuccessResponse** - Format response sukses
- **ErrorResponse** - Format response error

### 4. Copy as cURL

Setelah execute, Anda bisa copy request sebagai:
- cURL command
- Request URL
- Server response

## 📖 Endpoint Documentation

### Tags

Endpoints dikelompokkan dalam tags:

1. **Server** - Server status dan info
2. **Grades** - Semua endpoint untuk grades management

### Grades Endpoints

#### GET Endpoints

1. **GET /api/grades**
   - Get all grades
   - Supports filtering via query params
   - Example: `?studentID=1&courseID=2`

2. **GET /api/grades/{id}**
   - Get specific grade by ID

3. **GET /api/grades/student/{studentId}**
   - Get all grades for a student

4. **GET /api/grades/course/{courseId}**
   - Get all grades for a course

5. **GET /api/grades/teacher/{teacherId}**
   - Get all grades by a teacher

#### POST Endpoint

**POST /api/grades**
- Create new grade
- Requires request body

**Request Body Schema:**
```json
{
  "studentID": 1,        // Required
  "courseID": 2,         // Required
  "teacherID": 3,        // Required
  "grade": "A",          // Required
  "remarks": "Optional"  // Optional
}
```

#### PUT Endpoint

**PUT /api/grades/{id}**
- Update existing grade
- Requires request body (same as POST)

#### DELETE Endpoint

**DELETE /api/grades/{id}**
- Delete grade by ID

## 🔐 Authentication (Coming Soon)

Saat ini authentication di-comment. Setelah diaktifkan:

### 1. Klik tombol "Authorize" di Swagger UI

Di pojok kanan atas, ada icon gembok dan tombol **"Authorize"**.

### 2. Masukkan Token

Format:
```
Bearer YOUR_JWT_TOKEN_HERE
```

atau cukup:
```
YOUR_JWT_TOKEN_HERE
```

### 3. Klik Authorize

Semua request selanjutnya akan include Authorization header.

### 4. Logout

Klik "Authorize" lagi dan klik "Logout".

## 💡 Tips Menggunakan Swagger

### 1. Test Flow Lengkap

**Create → Read → Update → Delete:**

1. **Create:**
   ```
   POST /api/grades
   Body: { studentID: 1, courseID: 2, teacherID: 3, grade: "A" }
   ```
   Note the returned `id`

2. **Read:**
   ```
   GET /api/grades/1
   ```

3. **Update:**
   ```
   PUT /api/grades/1
   Body: { studentID: 1, courseID: 2, teacherID: 3, grade: "A+" }
   ```

4. **Delete:**
   ```
   DELETE /api/grades/1
   ```

### 2. Test Filtering

```
GET /api/grades?studentID=1
GET /api/grades?courseID=2
GET /api/grades?studentID=1&courseID=2
```

### 3. Test Error Cases

- Try GET with non-existent ID (404)
- Try POST with missing fields (400)
- Try UPDATE with non-existent ID (404)

### 4. Copy Responses

Gunakan "Copy to clipboard" untuk:
- Share API responses
- Debug issues
- Documentation purposes

## 🎨 Customization

### Custom CSS

Swagger UI sudah dikustomisasi di `src/app.js`:
```javascript
customCss: '.swagger-ui .topbar { display: none }'
```

Ini menyembunyikan topbar Swagger default.

### Custom Title

```javascript
customSiteTitle: 'EduConnect API Documentation'
```

Ini mengubah title di browser tab.

### Tambah Custom CSS

Edit di `src/app.js`:
```javascript
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #3b82f6; }
  `,
  customSiteTitle: 'EduConnect API Documentation'
}));
```

## 📝 Menambah Endpoint Baru

Jika Anda menambah endpoint baru, ikuti format ini:

```javascript
/**
 * @swagger
 * /api/your-endpoint:
 *   get:
 *     summary: Brief description
 *     description: Detailed description
 *     tags: [YourTag]
 *     parameters:
 *       - in: path/query
 *         name: paramName
 *         required: true
 *         schema:
 *           type: string
 *         description: Parameter description
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 */
router.get('/your-endpoint', yourController.yourMethod);
```

## 🔄 Update Documentation

Setelah menambah/mengubah annotations:

1. **Restart server** - Swagger akan auto-reload
2. **Refresh browser** - Clear cache jika perlu (Ctrl+Shift+R)

## 📦 Export Documentation

### Export as OpenAPI JSON

Visit: `http://localhost:3000/api-docs.json`

Save atau copy JSON untuk:
- Import ke tools lain (Postman, Insomnia)
- Generate client SDKs
- Share dengan team

### Generate Postman Collection

1. Copy JSON dari `/api-docs.json`
2. Buka Postman
3. Import → Raw text
4. Paste JSON
5. Postman akan auto-convert OpenAPI ke Collection

## 🐛 Troubleshooting

### Swagger UI tidak muncul

1. Pastikan server running
2. Check console untuk errors
3. Pastikan dependencies terinstall:
   ```bash
   npm install swagger-ui-express swagger-jsdoc
   ```

### Endpoint tidak muncul

1. Check syntax annotations
2. Pastikan file ada di `apis` array di `swagger.js`
3. Restart server

### Schema tidak muncul

Check `components.schemas` di `src/config/swagger.js`

### Try it out tidak berfungsi

1. Check CORS settings
2. Pastikan server URL benar di swagger config
3. Check browser console untuk errors

## 🌐 Production Setup

### Update Server URL

Edit `src/config/swagger.js`:
```javascript
servers: [
  {
    url: 'https://your-production-url.com',
    description: 'Production server'
  },
  {
    url: 'http://localhost:3000',
    description: 'Development server'
  }
]
```

### Security

Untuk production, pertimbangkan:
- Disable Swagger UI di production
- Atau protect dengan authentication
- Atau buat endpoint terpisah

Example - Disable di production:
```javascript
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
```

## 📚 Resources

- **OpenAPI Specification:** https://swagger.io/specification/
- **Swagger UI:** https://swagger.io/tools/swagger-ui/
- **swagger-jsdoc:** https://github.com/Surnet/swagger-jsdoc
- **swagger-ui-express:** https://github.com/scottie1984/swagger-ui-express

## 🎓 Best Practices

1. **Detailed Descriptions** - Buat description yang jelas
2. **Examples** - Sertakan contoh untuk setiap field
3. **Error Cases** - Dokumentasikan semua possible errors
4. **Keep Updated** - Update swagger saat API berubah
5. **Test Regularly** - Test via Swagger UI secara rutin

## ✨ Kesimpulan

Swagger UI adalah tool yang powerful untuk:
- ✅ Dokumentasi API yang selalu up-to-date
- ✅ Testing API langsung dari browser
- ✅ Sharing API specs dengan team
- ✅ Generating client code
- ✅ API exploration yang mudah

Selamat menggunakan Swagger! 🚀

