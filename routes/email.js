// routes/email.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { N8N_EMAIL_WEBHOOK_URL } = require('../config'); // สมมติว่ามี URL นี้ใน config
const { getEmailFormHtml, getEmailSuccessHtml } = require('../views/emailTemplates');

const sanitize = (str) => (str || '').replace(/</g, "&lt;").replace(/>/g, "&gt;");

// แสดงฟอร์มขอ Email
router.get('/request-email', (req, res) => {
    res.send(getEmailFormHtml());
});

// รับข้อมูลจากฟอร์มขอ Email
router.post('/request-email', async (req, res) => {
    const body = req.body;
    const data = {
        organization_name:  sanitize(body.organization_name),
        responsible_person: sanitize(body.responsible_person),
        contact_phone:      sanitize(body.contact_phone),
        email:              sanitize(body.email),
        purpose:            sanitize(body.purpose),
        email_type:         sanitize(body.email_type),
        desired_email:      sanitize(body.desired_email),
        group_members:      sanitize(body.group_members),
    };

    // ตรวจสอบว่ามี Webhook URL หรือไม่
    if (N8N_EMAIL_WEBHOOK_URL && N8N_EMAIL_WEBHOOK_URL.includes('http')) {
        try {
            await axios.post(N8N_EMAIL_WEBHOOK_URL, data);
            console.log('Email webhook sent successfully.');
        } catch (error) {
            console.error('Error sending Email webhook:', error.message);
        }
    } else {
        console.warn('Email Webhook URL is not set in config.js.');
    }

    res.send(getEmailSuccessHtml(data));
});

module.exports = router;
