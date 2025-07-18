// config.js
// ไฟล์สำหรับเก็บค่าคอนฟิกต่างๆ ของโปรเจกต์

// --- Webhook สำหรับฟอร์มขอ VM ---
// <<<< ใส่ URL ของ n8n Webhook สำหรับ VM ที่นี่ >>>>
const N8N_VM_WEBHOOK_URL = "https://buccauto.buu.ac.th/webhook/3eacc1ff-1d98-4fd8-a50b-97ffaeec79c2";
// ตัวอย่าง: "https://your-instance.n8n.cloud/webhook/your-vm-id"

// --- Webhook สำหรับฟอร์มขอ Web Hosting ---
// <<<< ใส่ URL ของ n8n Webhook สำหรับ Hosting ที่นี่ >>>>
const N8N_HOSTING_WEBHOOK_URL = "https://buccauto.buu.ac.th/webhook/ecfbbfbc-ed7f-4f08-834b-496b20199b6e";
// ตัวอย่าง: "https://your-instance.n8n.cloud/webhook/your-hosting-id"

// --- Webhook สำหรับฟอร์มขอ Email ---
// <<<< ใส่ URL ของ n8n Webhook สำหรับ Email ที่นี่ >>>>
const N8N_EMAIL_WEBHOOK_URL = "https://buccauto.buu.ac.th/webhook-test/0ebce933-73f2-4b9e-8554-7af0d4573b74";
// ตัวอย่าง: "https://your-instance.n8n.cloud/webhook/your-email-id"


// ส่งออกค่าเพื่อให้ไฟล์อื่นสามารถนำไปใช้ได้
module.exports = {
    N8N_VM_WEBHOOK_URL,
    N8N_HOSTING_WEBHOOK_URL,
    N8N_EMAIL_WEBHOOK_URL,
};