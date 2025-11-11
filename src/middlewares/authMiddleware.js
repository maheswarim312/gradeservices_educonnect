const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const AUTH_SERVICE_URL = process.env.USER_SERVICE_URL;

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "Akses ditolak: Token tidak ada." });

    // 3. Telepon API-mu!
    const authResponse = await axios.get(`${AUTH_SERVICE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (authResponse.status === 200 && authResponse.data.status === "success") {
      req.user = authResponse.data.data;
      next();
    } else {
      res
        .status(401)
        .json({
          success: false,
          message: authResponse.data.message || "Token tidak valid.",
        });
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return res
        .status(401)
        .json({ message: "Token tidak valid atau kadaluwarsa." });
    }
    console.error("Auth Middleware Error:", error.message);
    res.status(500).json({ message: "Gagal menghubungi service otentikasi." });
  }
};

const isTeacherOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "pengajar")) {
    next(); // Lolos, dia admin ATAU pengajar
  } else {
    res
      .status(403)
      .json({ message: "Akses ditolak: Hanya untuk Admin atau Pengajar." });
  }
};

const isMurid = (req, res, next) => {
  if (req.user && req.user.role === "murid") {
    next();
  } else {
    res.status(403).json({ message: "Akses ditolak: Hanya untuk Murid." });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Akses ditolak: Hanya untuk Admin." });
  }
};

module.exports = {
  checkAuth,
  isTeacherOrAdmin,
  isMurid,
  isAdmin,
};
