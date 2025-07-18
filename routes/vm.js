// routes/vm.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { N8N_VM_WEBHOOK_URL } = require('../config');
const { getVmFormHtml, getVmSuccessHtml } = require('../views/vmTemplates');

const sanitize = (str) => (str || '').replace(/</g, "&lt;").replace(/>/g, "&gt;");

// แสดงฟอร์มขอ VM
router.get('/request-vm', (req, res) => {
    res.send(getVmFormHtml());
});

// รับข้อมูลจากฟอร์มขอ VM
router.post('/request-vm', async (req, res) => {
    const data = {
        organization_name:  sanitize(req.body.organization_name),
        responsible_person: sanitize(req.body.responsible_person),
        contact_phone:      sanitize(req.body.contact_phone),
        email:              sanitize(req.body.email),
        purpose:            sanitize(req.body.purpose),
        vm_name:            sanitize(req.body.vm_name),
        os:                 sanitize(req.body.os),
        cpu:                sanitize(req.body.cpu),
        ram:                sanitize(req.body.ram),
        disk:               sanitize(req.body.disk),
    };

    if (N8N_VM_WEBHOOK_URL && N8N_VM_WEBHOOK_URL.includes('http')) {
        try {
            await axios.post(N8N_VM_WEBHOOK_URL, data);
            console.log('VM webhook sent successfully.');
        } catch (error) {
            console.error('Error sending VM webhook:', error.message);
        }
    } else {
        console.warn('VM Webhook URL is not set in config.js.');
    }

    res.send(getVmSuccessHtml(data));
});

module.exports = router;
