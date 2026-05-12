import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ES Module __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer configuration for resume uploads (using memory storage for Vercel compatibility)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed."));
    }
  },
});

// =================== DATABASE CONNECTION ===================
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Jodtech:qiCWwKRsFzRwRSFE@cluster0.q2m6cfj.mongodb.net/jodtechDB?retryWrites=true&w=majority";

// Re-enable buffering with a short timeout to handle connection latency gracefully
mongoose.set("bufferCommands", true);
mongoose.set("bufferTimeoutMS", 5000); 

let cachedConnection = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (cachedConnection) return cachedConnection;

  console.log("📡 Attempting connection to: cluster0.q2m6cfj.mongodb.net");
  
  cachedConnection = mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    family: 4, // Force IPv4 for better compatibility with certain serverless environments
  }).then((conn) => {
    console.log("✅ MongoDB Connected Successfully");
    return conn;
  }).catch((err) => {
    cachedConnection = null;
    console.error("❌ MongoDB connection error:", err.message);
    // Provide the specific "whitelist" hint to the user if it's a timeout/connection error
    throw new Error(`Database Connection Blocked. Your MongoDB cluster is rejecting the connection from Vercel. FIX: Go to Atlas -> Network Access -> Add IP -> 'Allow Access From Anywhere (0.0.0.0/0)'. (Technical Reason: ${err.message})`);
  });

  return cachedConnection;
};

// =================== MODELS ===================
const QuoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Quote = mongoose.models.Quote || mongoose.model("Quote", QuoteSchema);

const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, required: true },
  role: { type: String },
  message: { type: String },
  resumeData: { type: Buffer }, 
  resumeContentType: { type: String }, 
  resumeOriginalName: { type: String },
  createdAt: { type: Date, default: Date.now }
});
const Application = mongoose.models.Application || mongoose.model("Application", ApplicationSchema);

const TemplateOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  templateCategory: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});
const TemplateOrder = mongoose.models.TemplateOrder || mongoose.model("TemplateOrder", TemplateOrderSchema);

// =================== EMAIL TRANSPORTER ===================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "jodtech11@gmail.com",
    pass: process.env.EMAIL_PASS, // Removed hardcoded 'YOUR_APP_PASSWORD_HERE' to avoid confusion
  },
});

// Verify transporter connection on startup
if (!process.env.EMAIL_PASS) {
  console.warn("⚠️ Email credentials missing. Emails will not be sent.");
} else if (process.env.NODE_ENV !== "production") {
  transporter.verify((error, success) => {
    if (error) {
      console.warn("⚠️ Email transporter configuration is incomplete. Emails will not be sent.");
    } else {
      console.log("✉️ Email server is ready to take messages");
    }
  });
}

const sendEmailNotification = async (subject, htmlContent, attachment = null) => {
  try {
    const mailOptions = {
      from: '"JodTech Systems" <jodtech11@gmail.com>',
      to: "jodtech11@gmail.com",
      subject: subject,
      html: htmlContent,
    };
    if (attachment) {
      mailOptions.attachments = [attachment];
    }
    await transporter.sendMail(mailOptions);
    console.log("✉️ Email notification sent successfully.");
  } catch (error) {
    console.error("❌ Error sending email notification:", error);
  }
};

// =================== API ROUTES ===================

// Health Check
app.get("/api/health", async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({ status: "ok", message: "JodTech Backend is connected to MongoDB." });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Diagnostic Debug Route
app.get("/api/admin/debug", async (req, res) => {
  try {
    await connectDB();
    const uri_masked = MONGODB_URI.replace(/:([^@]+)@/, ":****@");
    res.json({
      status: "connected",
      database: mongoose.connection.name,
      uri_masked,
      node_version: process.version,
      env: process.env.NODE_ENV
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      hint: "Check your MongoDB Atlas IP Whitelist (0.0.0.0/0) and credentials."
    });
  }
});

// Route: Submit a Quote Request
app.post("/api/quote", async (req, res) => {
  try {
    await connectDB();
    const { name, email, phone, message } = req.body;
    
    // Save to Database
    const newQuote = new Quote({ name, email, phone, message });
    await newQuote.save();

    // Send Email
    const emailHtml = `
      <h2>New Quote Request via JodTech Website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Project Details:</strong></p>
      <blockquote style="border-left: 4px solid #0056b3; padding-left: 10px; color: #555;">
        ${message}
      </blockquote>
    `;
    await sendEmailNotification(`🚀 New Quote Request from ${name}`, emailHtml);

    res.status(201).json({ success: true, message: "Quote submitted successfully!" });
  } catch (error) {
    console.error("Quote Submission Error:", error);
    res.status(500).json({ success: false, message: "Database Error: " + error.message });
  }
});

// Route: Submit a Job/Internship Application (with resume upload)
app.post("/api/apply", upload.single("resume"), async (req, res) => {
  try {
    await connectDB();
    const { name, email, phone, type, role, message } = req.body;
    
    // Resume processing (storing as buffer for Vercel/statelessness)
    let resumeData = null;
    let resumeContentType = null;
    let resumeOriginalName = null;
    let emailAttachment = null;

    if (req.file) {
      resumeData = req.file.buffer;
      resumeContentType = req.file.mimetype;
      resumeOriginalName = req.file.originalname;
      emailAttachment = {
        filename: resumeOriginalName,
        content: req.file.buffer
      };
    }

    // Save to Database
    const newApplication = new Application({ 
      name, email, phone, type, role, message, 
      resumeData, resumeContentType, resumeOriginalName 
    });
    const savedApp = await newApplication.save();

    // Send Email with attachment
    const emailHtml = `
      <h2>New Career Application via JodTech Website</h2>
      <p><strong>Applicant Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Application Type:</strong> ${type}</p>
      <p><strong>Role of Interest:</strong> ${role || "N/A"}</p>
      <p><strong>Resume:</strong> ${resumeOriginalName || "Not uploaded"}</p>
      <p><strong>Why JodTech?:</strong></p>
      <blockquote style="border-left: 4px solid #28a745; padding-left: 10px; color: #555;">
        ${message || "No message provided."}
      </blockquote>
    `;
    await sendEmailNotification(`💼 New ${type} Application from ${name}`, emailHtml, emailAttachment);

    // Build resume download URL pointing to our new GET endpoint
    const resumeUrl = req.file ? `/api/admin/resume/${savedApp._id}` : null;

    res.status(201).json({ success: true, message: "Application submitted successfully!", resumeUrl });
  } catch (error) {
    console.error("Application Submission Error:", error);
    res.status(500).json({ success: false, message: "Database Error: " + error.message });
  }
});

// Route: Submit a Template Selection
app.post("/api/templates/select", async (req, res) => {
  try {
    await connectDB();
    const { name, email, phone, templateCategory, message } = req.body;
    
    // Save to Database
    const newOrder = new TemplateOrder({ name, email, phone, templateCategory, message });
    await newOrder.save();

    // Send Email notification
    const emailHtml = `
      <h2>✨ New Template Selection Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Selected Category:</strong> ${templateCategory}</p>
      <p><strong>Message/Requirements:</strong></p>
      <blockquote style="border-left: 4px solid #f39c12; padding-left: 10px; color: #555;">
        ${message || "No specific requirements provided."}
      </blockquote>
    `;
    await sendEmailNotification(`✨ Template Selection: ${templateCategory} from ${name}`, emailHtml);

    res.status(201).json({ success: true, message: "Selection submitted successfully!" });
  } catch (error) {
    console.error("Template Selection Error:", error);
    res.status(500).json({ success: false, message: "Database Error: " + error.message });
  }
});

// =================== ADMIN ROUTES ===================

// Admin credentials (secure them with env variables)
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "jodtech@2025";

// Admin Login
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.status(200).json({ success: true, token: "jodtech-admin-session" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// GET Endpoint to serve resume content from MongoDB
app.get("/api/admin/resume/:id", async (req, res) => {
  try {
    await connectDB();
    const app = await Application.findById(req.params.id);
    if (!app || !app.resumeData) {
      return res.status(404).send("Resume not found");
    }
    res.set({
      "Content-Type": app.resumeContentType || "application/octet-stream",
      "Content-Disposition": `inline; filename="${app.resumeOriginalName}"`,
    });
    res.send(app.resumeData);
  } catch (err) {
    res.status(500).send("Error retrieving resume");
  }
});

// Get All Applications (with resume links)
app.get("/api/admin/applications", async (req, res) => {
  try {
    await connectDB();
    const token = req.headers.authorization;
    if (token !== "jodtech-admin-session") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const apps = await Application.find().sort({ createdAt: -1 }).select("-resumeData");
    const formatted = apps.map((app) => ({
      _id: app._id,
      name: app.name,
      email: app.email,
      phone: app.phone,
      type: app.type,
      role: app.role,
      message: app.message,
      resumeUrl: app.resumeOriginalName ? `/api/admin/resume/${app._id}` : null,
      resumeName: app.resumeOriginalName || null,
      createdAt: app.createdAt,
    }));
    res.json({ success: true, data: formatted });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database Error: " + err.message });
  }
});

// Get All Quotes
app.get("/api/admin/quotes", async (req, res) => {
  try {
    await connectDB();
    const token = req.headers.authorization;
    if (token !== "jodtech-admin-session") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json({ success: true, data: quotes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database Error: " + err.message });
  }
});

// Delete Application
app.delete("/api/admin/applications/:id", async (req, res) => {
  try {
    await connectDB();
    const token = req.headers.authorization;
    if (token !== "jodtech-admin-session") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    await Application.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Application deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database Error: " + err.message });
  }
});

// Delete Quote
app.delete("/api/admin/quotes/:id", async (req, res) => {
  try {
    await connectDB();
    const token = req.headers.authorization;
    if (token !== "jodtech-admin-session") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Quote deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database Error: " + err.message });
  }
});

// Export the app for Vercel serverless functions
export default app;

// Conditional start for local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
  });
}
