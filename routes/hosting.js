// routes/hosting.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { N8N_HOSTING_WEBHOOK_URL } = require('../config');
const { getHostingFormHtml, getHostingSuccessHtml } = require('../views/hostingTemplates');

const sanitize = (str) => (str || '').replace(/</g, "&lt;").replace(/>/g, "&gt;");

// แสดงฟอร์มขอ Hosting
router.get('/request-hosting', (req, res) => {
    res.send(getHostingFormHtml());
});

// รับข้อมูลจากฟอร์มขอ Hosting
router.post('/request-hosting', async (req, res) => {
    const body = req.body;
    const data = {
        organization_name:  sanitize(body.organization_name),
        responsible_person: sanitize(body.responsible_person),
        contact_phone:      sanitize(body.contact_phone),
        email:              sanitize(body.email),
        purpose:            sanitize(body.purpose),
        domain_name:        sanitize(body.domain_name),
        database_needed:    sanitize(body.database_needed),
        php_framework:      sanitize(body.php_framework),
        php_framework_other:sanitize(body.php_framework_other),
        usage_duration:     sanitize(body.usage_duration),
        usage_duration_other:sanitize(body.usage_duration_other),
    };

    // จัดการข้อมูล "อื่นๆ"
    const finalData = {
        ...data,
        php_framework: data.php_framework === 'อื่นๆ' ? sanitize(data.php_framework_other) : data.php_framework,
        usage_duration: data.usage_duration === 'อื่นๆ' ? sanitize(data.usage_duration_other) : data.usage_duration,
    };
    // ลบ key ที่ไม่ต้องส่งไป webhook
    delete finalData.php_framework_other;
    delete finalData.usage_duration_other;

    if (N8N_HOSTING_WEBHOOK_URL && N8N_HOSTING_WEBHOOK_URL.includes('http')) {
        try {
            await axios.post(N8N_HOSTING_WEBHOOK_URL, finalData);
            console.log('Hosting webhook sent successfully.');
        } catch (error) {
            console.error('Error sending Hosting webhook:', error.message);
        }
    } else {
        console.warn('Hosting Webhook URL is not set in config.js.');
    }

    res.send(getHostingSuccessHtml(data)); // ส่ง data เดิมไปที่ template เพื่อให้แสดงผล "อื่นๆ" ได้
});

module.exports = router;
