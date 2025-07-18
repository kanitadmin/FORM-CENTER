// views/emailTemplates.js
const getEmailFormHtml = () => `
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ฟอร์มขอใช้งานอีเมลกลุ่ม/ส่วนงาน</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <style>
            body { background-color: #f0f2f5; } .container { max-width: 850px; }
            .form-header { background: linear-gradient(135deg, #6f42c1, #9a6aff); color: white; padding: 2rem; border-radius: 0.5rem 0.5rem 0 0; text-align: center; }
            .card { border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-radius: 0 0 0.5rem 0.5rem; }
            #group_members_div { display: none; }
        </style>
    </head>
    <body>
        <div class="container my-5">
            <div class="form-header">
                <i class="bi bi-envelope-at-fill" style="font-size: 3rem;"></i>
                <h1 class="mt-2">ฟอร์มขอใช้งานอีเมลกลุ่ม/ส่วนงาน</h1>
            </div>
            <div class="card"><div class="card-body p-4">
                <form action="/request-email" method="POST">
                    <h5 class="mb-4 text-primary"><i class="bi bi-person-badge-fill me-2"></i>ส่วนที่ 1: ข้อมูลผู้รับบริการ</h5>
                    <div class="row">
                        <div class="col-md-6 mb-3"><label for="organization_name" class="form-label">ชื่อหน่วยงาน <span class="text-danger">*</span></label><input type="text" class="form-control" name="organization_name" required></div>
                        <div class="col-md-6 mb-3"><label for="responsible_person" class="form-label">ชื่อผู้รับผิดชอบ <span class="text-danger">*</span></label><input type="text" class="form-control" name="responsible_person" required></div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3"><label for="contact_phone" class="form-label">เบอร์โทรศัพท์ติดต่อ <span class="text-danger">*</span></label><input type="tel" class="form-control" name="contact_phone" required></div>
                        <div class="col-md-6 mb-3"><label for="email" class="form-label">อีเมลผู้ติดต่อ <span class="text-danger">*</span></label><input type="email" class="form-control" name="email" required></div>
                    </div>
                    <hr class="my-4">
                    <h5 class="mb-4 text-primary"><i class="bi bi-card-checklist me-2"></i>ส่วนที่ 2: วัตถุประสงค์ในการนำไปใช้</h5>
                    <div class="mb-3"><label for="purpose" class="form-label">วัตถุประสงค์ <span class="text-danger">*</span></label><textarea class="form-control" name="purpose" rows="4" required></textarea></div>
                    <hr class="my-4">
                    <h5 class="mb-4 text-primary"><i class="bi bi-envelope-plus-fill me-2"></i>ส่วนที่ 3: รายละเอียดคำขออีเมล</h5>
                    <div class="mb-3">
                        <label for="email_type" class="form-label">ประเภทอีเมลที่ต้องการ <span class="text-danger">*</span></label>
                        <select class="form-select" name="email_type" id="email_type" required onchange="toggleGroupMembers()">
                            <option value="" selected disabled>-- เลือก --</option>
                            <option value="อีเมลส่วนงาน">อีเมลส่วนงาน</option>
                            <option value="อีเมลกลุ่ม">อีเมลกลุ่ม</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="desired_email" class="form-label">ชื่ออีเมลที่ต้องการ (ภาษาอังกฤษ) <span class="text-danger">*</span></label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="desired_email" required pattern="[a-zA-Z0-9._%+-]+">
                            <span class="input-group-text">@yourdomain.com</span>
                        </div>
                    </div>
                    <div class="mb-3" id="group_members_div">
                        <label for="group_members" class="form-label">รายชื่ออีเมลสมาชิกในกลุ่ม (คั่นด้วยจุลภาค ,)</label>
                        <textarea class="form-control" name="group_members" id="group_members" rows="3"></textarea>
                    </div>
                    <div class="d-grid gap-2 mt-4">
                        <button type="submit" class="btn btn-primary btn-lg">ส่งคำขอ</button>
                        <a href="/" class="btn btn-outline-secondary">กลับหน้าหลัก</a>
                    </div>
                </form>
            </div></div>
        </div>
        <script>
            function toggleGroupMembers() {
                const emailType = document.getElementById('email_type').value;
                const groupMembersDiv = document.getElementById('group_members_div');
                const groupMembersInput = document.getElementById('group_members');
                if (emailType === 'อีเมลกลุ่ม') {
                    groupMembersDiv.style.display = 'block';
                    groupMembersInput.required = true;
                } else {
                    groupMembersDiv.style.display = 'none';
                    groupMembersInput.required = false;
                }
            }
        </script>
    </body>
    </html>
`;

const getEmailSuccessHtml = (data) => `
    <!DOCTYPE html>
    <html lang="th">
    <head><title>ส่งข้อมูลสำเร็จ</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></head>
    <body>
        <div class="container" style="max-width: 800px; margin-top: 3rem;">
            <div class="card text-center p-5">
                <h2 class="text-success">ส่งข้อมูลสำเร็จ!</h2>
                <p>เราได้รับข้อมูลคำขออีเมลของคุณแล้ว</p><hr>
                <div class="text-start">
                    <h5>รายละเอียด:</h5>
                    <ul>
                        <li><strong>ผู้รับผิดชอบ:</strong> ${data.responsible_person} (${data.organization_name})</li>
                        <li><strong>อีเมลที่ขอ:</strong> ${data.desired_email}@yourdomain.com</li>
                        <li><strong>ประเภท:</strong> ${data.email_type}</li>
                        ${data.email_type === 'อีเมลกลุ่ม' ? `<li><strong>สมาชิก:</strong> ${data.group_members}</li>` : ''}
                        <li><strong>วัตถุประสงค์:</strong> ${data.purpose}</li>
                    </ul>
                </div>
                <a href="/request-email" class="btn btn-primary mt-4">กรอกฟอร์มอีกครั้ง</a>
                <a href="/" class="btn btn-secondary mt-2">กลับไปหน้าเมนู</a>
            </div>
        </div>
    </body>
    </html>
`;

module.exports = { getEmailFormHtml, getEmailSuccessHtml };
