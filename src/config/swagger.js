const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EduConnect API - Grading System',
      version: '1.0.0',
      description: 'API untuk sistem penilaian (grading) EduConnect menggunakan Node.js, Express, dan MySQL',
      contact: {
        name: 'EduConnect Team',
        email: 'support@educonnect.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://api.educonnect.com',
        description: 'Production server'
      }
    ],
    tags: [
      {
        name: 'Grades',
        description: 'Endpoints untuk manajemen nilai/grade'
      },
      {
        name: 'Server',
        description: 'Server status dan informasi'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme (akan diaktifkan setelah integrasi login)'
        }
      },
      schemas: {
        Grade: {
          type: 'object',
          required: ['studentID', 'courseID', 'teacherID', 'grade'],
          properties: {
            id: {
              type: 'integer',
              description: 'Auto-generated ID',
              example: 1
            },
            studentID: {
              type: 'integer',
              description: 'ID siswa',
              example: 1
            },
            courseID: {
              type: 'integer',
              description: 'ID mata kuliah/pelajaran',
              example: 2
            },
            teacherID: {
              type: 'integer',
              description: 'ID guru/pengajar',
              example: 3
            },
            grade: {
              type: 'string',
              description: 'Nilai (A, B, C, dll atau numerik)',
              example: 'A'
            },
            remarks: {
              type: 'string',
              description: 'Catatan atau komentar (optional)',
              example: 'Excellent work',
              nullable: true
            },
            createAt: {
              type: 'string',
              format: 'date-time',
              description: 'Tanggal pembuatan',
              example: '2024-01-15T10:30:00.000Z'
            }
          }
        },
        GradeInput: {
          type: 'object',
          required: ['studentID', 'courseID', 'teacherID', 'grade'],
          properties: {
            studentID: {
              type: 'integer',
              description: 'ID siswa',
              example: 1
            },
            courseID: {
              type: 'integer',
              description: 'ID mata kuliah/pelajaran',
              example: 2
            },
            teacherID: {
              type: 'integer',
              description: 'ID guru/pengajar',
              example: 3
            },
            grade: {
              type: 'string',
              description: 'Nilai (A, B, C, dll atau numerik)',
              example: 'A'
            },
            remarks: {
              type: 'string',
              description: 'Catatan atau komentar (optional)',
              example: 'Excellent work'
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Operation successful'
            },
            data: {
              type: 'object'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error message'
            },
            error: {
              type: 'string',
              description: 'Error details (hanya di development mode)'
            }
          }
        }
      },
      responses: {
        NotFound: {
          description: 'Resource tidak ditemukan',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                message: 'Grade not found'
              }
            }
          }
        },
        ValidationError: {
          description: 'Validasi gagal',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                message: 'Please provide all required fields: studentID, courseID, teacherID, grade'
              }
            }
          }
        },
        Unauthorized: {
          description: 'Authentication diperlukan',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                message: 'Access denied. No token provided.'
              }
            }
          }
        },
        Forbidden: {
          description: 'Akses ditolak',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                message: 'Access denied. Insufficient permissions.'
              }
            }
          }
        },
        ServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                message: 'Something went wrong!'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/app.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

