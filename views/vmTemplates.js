// views/vmTemplates.js
const getVmFormHtml = () => `
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ฟอร์มขอใช้งานเครื่องแม่ข่ายเสมือน (VM)</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <style>
            body { background-color: #f0f2f5; } .container { max-width: 850px; }
            .form-header { background: linear-gradient(135deg, #0d6efd, #0dcaf0); color: white; padding: 2rem; border-radius: 0.5rem 0.5rem 0 0; text-align: center; }
            .card { border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-radius: 0 0 0.5rem 0.5rem; }
        </style>
    </head>
    <body>
        <div class="container my-5">
            <div class="form-header">
                <i class="bi bi-hdd-stack" style="font-size: 3rem;"></i>
                <h1 class="mt-2">ฟอร์มขอใช้งานเครื่องแม่ข่ายเสมือน</h1>
            </div>
            <div class="card"><div class="card-body p-4">
                <form action="/request-vm" method="POST">
                    <h5 class="mb-4 text-primary"><i class="bi bi-person-badge-fill me-2"></i>ส่วนที่ 1: ข้อมูลผู้รับบริการ</h5>
                    <div class="row">
                        <div class="col-md-6 mb-3"><label for="organization_name" class="form-label">ชื่อหน่วยงาน <span class="text-danger">*</span></label><input type="text" class="form-control" name="organization_name" required></div>
                        <div class="col-md-6 mb-3"><label for="responsible_person" class="form-label">ชื่อผู้รับผิดชอบ <span class="text-danger">*</span></label><input type="text" class="form-control" name="responsible_person" required></div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3"><label for="contact_phone" class="form-label">เบอร์โทรศัพท์ติดต่อ <span class="text-danger">*</span></label><input type="tel" class="form-control" name="contact_phone" required></div>
                        <div class="col-md-6 mb-3"><label for="email" class="form-label">อีเมล <span class="text-danger">*</span></label><input type="email" class="form-control" name="email" required></div>
                    </div>
                    <hr class="my-4">
                    <h5 class="mb-4 text-primary"><i class="bi bi-card-checklist me-2"></i>ส่วนที่ 2: วัตถุประสงค์ในการนำไปใช้</h5>
                    <div class="mb-3"><label for="purpose" class="form-label">วัตถุประสงค์ <span class="text-danger">*</span></label><textarea class="form-control" name="purpose" rows="4" required></textarea></div>
                    <hr class="my-4">
                    <h5 class="mb-4 text-primary"><i class="bi bi-sliders me-2"></i>ส่วนที่ 3: รายละเอียดเครื่อง</h5>
                    <div class="mb-3"><label for="vm_name" class="form-label">ชื่อของแม่ข่ายเสมือน (ภาษาอังกฤษ) <span class="text-danger">*</span></label><input type="text" class="form-control" name="vm_name" required pattern="[a-zA-Z0-9-]+" title="ต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น"></div>
                    <div class="mb-3"><label for="os" class="form-label">ระบบปฏิบัติการ (OS) <span class="text-danger">*</span></label>
                        <select class="form-select" name="os" required>
                            <option value="" selected disabled>-- เลือก --</option>
                            <optgroup label="Ubuntu Server">
                                <option>Ubuntu 24.04 LTS</option>
                                <option>Ubuntu 22.04 LTS</option>
                                <option>Ubuntu 20.04 LTS</option>
                            </optgroup>
                            <optgroup label="AlmaLinux">
                                <option>AlmaLinux 9</option>
                                <option>AlmaLinux 8</option>
                            </optgroup>
                            <optgroup label="Windows Server">
                                <option>Windows Server 2022</option>
                                <option>Windows Server 2019</option>
                            </optgroup>
                        </select>
                    </div>
                    <div class="row">
                        <div class="col-md-4 mb-3"><label class="form-label"><i class="bi bi-cpu me-1"></i> CPU</label><input type="number" class="form-control" name="cpu" value="2" min="1" required></div>
                        <div class="col-md-4 mb-3"><label class="form-label"><i class="bi bi-memory me-1"></i> RAM (GB)</label><input type="number" class="form-control" name="ram" value="4" min="1" required></div>
                        <div class="col-md-4 mb-3"><label class="form-label"><i class="bi bi-device-hdd me-1"></i> Disk (GB)</label><input type="number" class="form-control" name="disk" value="50" min="20" required></div>
                    </div>
                    <div class="d-grid gap-2 mt-4">
                        <button type="submit" class="btn btn-primary btn-lg">ส่งคำขอ</button>
                        <a href="/" class="btn btn-outline-secondary">กลับหน้าหลัก</a>
                    </div>
                </form>
            </div></div>
        </div>
    </body>
    </html>
`;

const getVmSuccessHtml = (data) => `
    <!DOCTYPE html>
    <html lang="th">
    <head><title>ส่งข้อมูลสำเร็จ</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></head>
    <body>
        <div class="container" style="max-width: 800px; margin-top: 3rem;">
            <div class="card text-center p-5">
                <h2 class="text-success">ส่งข้อมูลสำเร็จ!</h2>
                <p>เราได้รับข้อมูลคำขอ VM ของคุณแล้ว</p><hr>
                <div class="text-start">
                    <h5>รายละเอียด:</h5>
                    <ul>
                        <li><strong>หน่วยงาน:</strong> ${data.organization_name}</li>
                        <li><strong>ผู้รับผิดชอบ:</strong> ${data.responsible_person}</li>
                        <li><strong>ชื่อ VM:</strong> ${data.vm_name}</li>
                        <li><strong>OS:</strong> ${data.os}</li>
                        <li><strong>Spec:</strong> ${data.cpu} Cores / ${data.ram} GB / ${data.disk} GB</li>
                    </ul>
                </div>
                <a href="/request-vm" class="btn btn-primary mt-4">กรอกฟอร์มอีกครั้ง</a>
                <a href="/" class="btn btn-secondary mt-2">กลับไปหน้าเมนู</a>
            </div>
        </div>
    </body>
    </html>
`;

module.exports = { getVmFormHtml, getVmSuccessHtml };
