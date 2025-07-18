const express = require('express');
const app = express();
const port = 3000;

// Middleware สำหรับอ่านข้อมูลจากฟอร์ม
app.use(express.urlencoded({ extended: true }));

// นำเข้า Routes ทั้งหมด
const mainRoutes = require('./routes/main');
const vmRoutes = require('./routes/vm');
const hostingRoutes = require('./routes/hosting');
const emailRoutes = require('./routes/email');

// ใช้งาน Routes
app.use('/', mainRoutes);
app.use('/', vmRoutes);
app.use('/', hostingRoutes);
app.use('/', emailRoutes);

// เริ่ม Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Structure has been refactored. Code is now in /routes and /views.');
    console.log('Press Ctrl+C to stop the server.');
});
