const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { S3Client, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require("multer");
const multerS3 = require("multer-s3");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Parser } = require('json2csv');

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. AWS CONFIGURATION (HARDCODED) ---
const AWS_CONFIG = {
    region: "us-east-1",
    accessKeyId: "AKIAY4LCES4IWUEEHC7E",        
    secretAccessKey: "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", 
    bucketName: "yaseen-internee-storage-2026", 
    jwtSecret: "Legend4407" 
};

// --- 2. AWS S3 CLIENT SETUP ---
const s3 = new S3Client({
    region: AWS_CONFIG.region,
    credentials: {
        accessKeyId: AWS_CONFIG.accessKeyId,
        secretAccessKey: AWS_CONFIG.secretAccessKey,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_CONFIG.bucketName,
        metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
        key: (req, file, cb) => {
            const folder = req.params.folder || 'misc'; 
            cb(null, `${folder}/${Date.now()}_${file.originalname}`);
        }
    })
});

// --- 3. AWS RDS DATABASE CONNECTION ---
const db = mysql.createConnection({
    host: 'internee-db.cwh68e6qy01n.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Legend4407', 
    database: 'internee_management'
});

db.connect((err) => {
    if (err) {
        console.error('❌ RDS Connection Failed:', err.stack);
        return;
    }
    console.log('✅ Connected to AWS RDS MySQL.');
});

// --- 4. AUTHENTICATION ROUTES ---

app.post('/api/auth/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        db.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: "Email already exists" });
                return res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({ message: "User registered!" });
        });
    } catch (error) { res.status(500).json({ error: "Error" }); }
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `
        SELECT u.*, a.id as applicantId 
        FROM users u 
        LEFT JOIN applications a ON u.email = a.email 
        WHERE u.email = ?`;

    db.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: "User not found" });
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid password" });
        const token = jwt.sign({ id: user.id, role: user.role }, AWS_CONFIG.jwtSecret, { expiresIn: '24h' });
        res.json({ token, role: user.role, username: user.username, userId: user.applicantId });
    });
});

// --- 5. INTERNSHIP PORTAL ROUTES ---

app.post('/api/submissions', async (req, res) => {
    const { applicant_id, project_title, submission_link, project_image_key } = req.body;
    const sql = `INSERT INTO submissions (applicant_id, project_title, submission_link, project_image_key) 
                 VALUES (?, ?, ?, ?)`;
    db.query(sql, [applicant_id, project_title, submission_link, project_image_key], (err, result) => {
        if (err) return res.status(500).json({ error: "Submission failed" });
        res.json({ message: "Project submitted successfully!", submissionId: result.insertId });
    });
});

app.get('/api/performance/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT a.name, a.track, p.attendance_rate, p.technical_score, p.soft_skills_score, p.overall_grade
        FROM applications a
        LEFT JOIN performance p ON a.id = p.applicant_id
        WHERE a.id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Fetch failed" });
        res.json(result[0]); 
    });
});

// --- 6. ADMIN DASHBOARD ROUTES ---

// UPDATE Application Status
app.put('/api/applications/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const sql = "UPDATE applications SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error("Status Update Error:", err);
            return res.status(500).json({ error: "Update failed" });
        }
        res.json({ message: "Status updated successfully!" });
    });
});

app.get('/api/admin/submissions', (req, res) => {
    const sql = `
        SELECT s.*, a.name, a.track, a.email
        FROM submissions s
        JOIN applications a ON s.applicant_id = a.id
        ORDER BY s.id DESC`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to fetch submissions" });
        res.json(results);
    });
});

app.post('/api/apply', (req, res) => {
    const { fullName, email, phone, city, university, track, linkedin, github, resume_key } = req.body;
    const sql = "INSERT INTO applications (name, email, phone, city, university, track, linkedin, github, resume_key) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [fullName, email, phone, city, university, track, linkedin, github, resume_key], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to save application" });
        res.status(200).json({ message: "Application submitted successfully!", id: result.insertId });
    });
});

app.get('/api/applications', (req, res) => {
    const sql = "SELECT * FROM applications ORDER BY id DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Error" });
        res.json(results);
    });
});

app.get('/api/applications/export', (req, res) => {
    const sql = "SELECT id, name, email, phone, track, status, city, university FROM applications ORDER BY id DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Export failed" });
        try {
            const fields = ['id', 'name', 'email', 'phone', 'track', 'status', 'city', 'university'];
            const parser = new Parser({ fields });
            const csv = parser.parse(results);
            res.header('Content-Type', 'text/csv');
            res.attachment('internee_applicants.csv');
            return res.send(csv);
        } catch (e) { res.status(500).json({ error: "CSV error" }); }
    });
});

// DELETE Application
app.delete('/api/applications/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM applications WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Delete failed" });
        res.json({ message: "Deleted successfully" });
    });
});

// --- 7. S3 FILE MANAGEMENT ---

app.post("/api/files/upload/:folder", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    res.json({ message: "File uploaded!", fileLocation: req.file.location, fileName: req.file.key });
});

app.get("/api/files/list", async (req, res) => {
    const prefix = req.query.path || ""; 
    const command = new ListObjectsV2Command({ Bucket: AWS_CONFIG.bucketName, Prefix: prefix, Delimiter: "/" });
    try {
        const data = await s3.send(command);
        const folders = data.CommonPrefixes?.map(p => ({ name: p.Prefix.replace(prefix, "").replace("/", ""), fullPath: p.Prefix, type: 'folder' })) || [];
        const files = data.Contents?.filter(f => f.Key !== prefix).map(file => ({ name: file.Key.replace(prefix, ""), key: file.Key, size: (file.Size / 1024).toFixed(2) + " KB", lastModified: file.LastModified, type: 'file' })) || [];
        res.json({ folders, files });
    } catch (err) { res.status(500).json({ error: "S3 List error" }); }
});

app.get("/api/files/share/:folder/:filename", async (req, res) => {
    const { folder, filename } = req.params;
    const fullKey = `${folder}/${filename}`;
    const command = new GetObjectCommand({ Bucket: AWS_CONFIG.bucketName, Key: fullKey });
    try {
        const url = await getSignedUrl(s3, command, { expiresIn: 900 });
        res.json({ secureUrl: url });
    } catch (err) { res.status(500).json({ error: "S3 Link error" }); }
});

app.delete("/api/files/delete/:folder/:filename", async (req, res) => {
    const { folder, filename } = req.params;
    const fullKey = `${folder}/${filename}`;
    const command = new DeleteObjectCommand({ Bucket: AWS_CONFIG.bucketName, Key: fullKey });
    try {
        await s3.send(command);
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: "S3 Delete error" }); }
});

// --- 8. START SERVER ---
const PORT = 5000;
app.listen(PORT, () => { console.log(`🚀 Server running on port ${PORT}`); });