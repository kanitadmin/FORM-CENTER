// views/hostingTemplates.js
const getHostingFormHtml = () => `
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ฟอร์มขอใช้งานเว็บโฮสติ้ง</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <style>
            body { background-color: #f0f2f5; } .container { max-width: 850px; }
            .form-header { background: linear-gradient(135deg, #198754, #20c997); color: white; padding: 2rem; border-radius: 0.5rem 0.5rem 0 0; text-align: center; }
            .card { border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-radius: 0 0 0.5rem 0.5rem; }
            .other-input { display: none; }
        </style>
    </head>
    <body>
        <div class="container my-5">
            <div class="form-header">
                <i class="bi bi-globe2" style="font-size: 3rem;"></i>
                <h1 class="mt-2">ฟอร์มขอใช้งานเว็บโฮสติ้ง</h1>
            </div>
            <div class="card"><div class="card-body p-4">
                <form action="/request-hosting" method="POST">
                    <h5 class="mb-4 text-success"><i class="bi bi-person-badge-fill me-2"></i>ส่วนที่ 1: ข้อมูลผู้รับบริการ</h5>
                    <div class="row">
                        <div class="col-md-6 mb-3"><label for="organization_name" class="form-label">ชื่อหน่วยงาน <span class="text-danger">*</span></label><input type="text" class="form-control" name="organization_name" required></div>
                        <div class="col-md-6 mb-3"><label for="responsible_person" class="form-label">ชื่อผู้รับผิดชอบ <span class="text-danger">*</span></label><input type="text" class="form-control" name="responsible_person" required></div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3"><label for="contact_phone" class="form-label">เบอร์โทรศัพท์ติดต่อ <span class="text-danger">*</span></label><input type="tel" class="form-control" name="contact_phone" required></div>
                        <div class="col-md-6 mb-3"><label for="email" class="form-label">อีเมล <span class="text-danger">*</span></label><input type="email" class="form-control" name="email" required></div>
                    </div>
                    <hr class="my-4">
                    <h5 class="mb-4 text-success"><i class="bi bi-card-checklist me-2"></i>ส่วนที่ 2: วัตถุประสงค์ในการนำไปใช้</h5>
                    <div class="mb-3"><label for="purpose" class="form-label">วัตถุประสงค์ <span class="text-danger">*</span></label><textarea class="form-control" name="purpose" rows="4" required></textarea></div>
                    <hr class="my-4">
                    <h5 class="mb-4 text-success"><i class="bi bi-file-earmark-code-fill me-2"></i>ส่วนที่ 3: รายละเอียดคำขอโฮสติ้ง</h5>
                    <div class="mb-3"><label for="domain_name" class="form-label">1. ชื่อโดเมนที่ต้องการ <span class="text-danger">*</span></label><input type="text" class="form-control" name="domain_name" required></div>
                    <div class="mb-3"><label class="form-label">2. ความต้องการฐานข้อมูล <span class="text-danger">*</span></label>
                        <select class="form-select" name="database_needed" required>
                            <option value="" selected disabled>-- เลือก --</option>
                            <option value="ต้องการ">ต้องการ</option>
                            <option value="ไม่ต้องการ">ไม่ต้องการ</option>
                        </select>
                    </div>
                    <div class="mb-3"><label for="php_framework" class="form-label">3. PHP Framework ที่ใช้ <span class="text-danger">*</span></label>
                        <select class="form-select" name="php_framework" required onchange="toggleOtherInput(this, 'php_framework_other_div')">
                            <option value="" selected disabled>-- เลือก --</option>
                            <option value="ไม่มี">ไม่มี</option>
                            <option value="Yii">Yii</option>
                            <option value="Laravel">Laravel</option>
                            <option value="CodeIgniter">CodeIgniter</option>
                            <option value="อื่นๆ">อื่นๆ (โปรดระบุ)</option>
                        </select>
                    </div>
                    <div id="php_framework_other_div" class="mb-3 other-input">
                        <label for="php_framework_other" class="form-label">ระบุ PHP Framework อื่นๆ</label>
                        <input type="text" class="form-control" name="php_framework_other">
                    </div>
                    <div class="mb-3"><label for="usage_duration" class="form-label">4. ระยะเวลาที่ต้องการใช้งาน <span class="text-danger">*</span></label>
                        <select class="form-select" name="usage_duration" required onchange="toggleOtherInput(this, 'usage_duration_other_div')">
                            <option value="" selected disabled>-- เลือก --</option>
                            <option value="3 เดือน">3 เดือน</option>
                            <option value="1 ปี">1 ปี</option>
                            <option value="3 ปี">3 ปี</option>
                            <option value="อื่นๆ">อื่นๆ (โปรดระบุ)</option>
                        </select>
                    </div>
                    <div id="usage_duration_other_div" class="mb-3 other-input">
                        <label for="usage_duration_other" class="form-label">ระบุระยะเวลาอื่นๆ</label>
                        <input type="text" class="form-control" name="usage_duration_other">
                    </div>

                    <div class="d-grid gap-2 mt-4">
                        <button type="submit" class="btn btn-success btn-lg">ส่งคำขอ</button>
                        <a href="/" class="btn btn-outline-secondary">กลับหน้าหลัก</a>
                    </div>
                </form>
            </div></div>
        </div>
        <script>
            function toggleOtherInput(selectElement, otherDivId) {
                const otherDiv = document.getElementById(otherDivId);
                const otherInput = otherDiv.querySelector('input');
                if (selectElement.value === 'อื่นๆ') {
                    otherDiv.style.display = 'block';
                    otherInput.required = true;
                } else {
                    otherDiv.style.display = 'none';
                    otherInput.required = false;
                    otherInput.value = '';
                }
            }
        </script>
    </body>
    </html>
`;

const getHostingSuccessHtml = (data) => {
    const framework = data.php_framework === 'อื่นๆ' ? data.php_framework_other : data.php_framework;
    const duration = data.usage_duration === 'อื่นๆ' ? data.usage_duration_other : data.usage_duration;

    return `
    <!DOCTYPE html>
    <html lang="th">
    <head><title>ส่งข้อมูลสำเร็จ</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></head>
    <body>
        <div class="container" style="max-width: 800px; margin-top: 3rem;">
            <div class="card text-center p-5">
                <h2 class="text-success">ส่งข้อมูลสำเร็จ!</h2>
                <p>เราได้รับข้อมูลคำขอ Hosting ของคุณแล้ว</p><hr>
                <div class="text-start">
                    <h5>รายละเอียดผู้ขอ:</h5>
                    <ul>
                        <li><strong>หน่วยงาน:</strong> ${data.organization_name}</li>
                        <li><strong>ผู้รับผิดชอบ:</strong> ${data.responsible_person}</li>
                        <li><strong>ติดต่อ:</strong> ${data.contact_phone}, ${data.email}</li>
                    </ul>
                    <h5 class="mt-3">รายละเอียดคำขอ:</h5>
                     <ul>
                        <li><strong>โดเมน:</strong> ${data.domain_name}</li>
                        <li><strong>ฐานข้อมูล:</strong> ${data.database_needed}</li>
                        <li><strong>PHP Framework:</strong> ${framework}</li>
                        <li><strong>ระยะเวลาใช้งาน:</strong> ${duration}</li>
                        <li><strong>วัตถุประสงค์:</strong> ${data.purpose}</li>
                    </ul>
                </div>
                <a href="/request-hosting" class="btn btn-success mt-4">กรอกฟอร์มอีกครั้ง</a>
                <a href="/" class="btn btn-secondary mt-2">กลับไปหน้าเมนู</a>
            </div>
        </div>
    </body>
    </html>
`};

module.exports = { getHostingFormHtml, getHostingSuccessHtml };