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
            body { background-color: #f0f2f5; }
            .container { max-width: 850px; }
            .form-header { background: linear-gradient(135deg, #6f42c1, #9a6aff); color: white; padding: 2rem; border-radius: 0.5rem 0.5rem 0 0; text-align: center; }
            .card { border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-radius: 0 0 0.5rem 0.5rem; }
            #department_email_section, #group_email_section { display: none; }
            .member-row { animation: fadeIn 0.5s; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
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
                        <label class="form-label">ประเภทอีเมลที่ต้องการ <span class="text-danger">*</span></label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="email_type" id="type_department" value="อีเมลส่วนงาน" required>
                            <label class="form-check-label" for="type_department">อีเมลส่วนงาน</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="email_type" id="type_group" value="อีเมลกลุ่ม">
                            <label class="form-check-label" for="type_group">อีเมลกลุ่ม</label>
                        </div>
                    </div>

                    <!-- Section for Department Email -->
                    <div id="department_email_section">
                        <div class="mb-3">
                            <label for="desired_email" class="form-label">ชื่ออีเมลที่ต้องการ (ภาษาอังกฤษ) <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="desired_email" name="desired_email" pattern="[a-zA-Z0-9._%+-]+">
                                <span class="input-group-text">@yourdomain.com</span>
                            </div>
                        </div>
                    </div>

                    <!-- Section for Group Email -->
                    <div id="group_email_section">
                        <label class="form-label">รายชื่อสมาชิกในกลุ่ม (สูงสุด 8 คน)</label>
                        <div id="member_list">
                            <!-- Member rows will be added here -->
                        </div>
                        <button type="button" id="add_member_btn" class="btn btn-outline-primary btn-sm mt-2"><i class="bi bi-plus-circle-fill me-1"></i>เพิ่มสมาชิก</button>
                    </div>

                    <div class="d-grid gap-2 mt-4">
                        <button type="submit" class="btn btn-primary btn-lg">ส่งคำขอ</button>
                        <a href="/" class="btn btn-outline-secondary">กลับหน้าหลัก</a>
                    </div>
                </form>
            </div></div>
        </div>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const typeDepartmentRadio = document.getElementById('type_department');
                const typeGroupRadio = document.getElementById('type_group');
                const departmentSection = document.getElementById('department_email_section');
                const groupSection = document.getElementById('group_email_section');
                const desiredEmailInput = document.getElementById('desired_email');
                const memberList = document.getElementById('member_list');
                const addMemberBtn = document.getElementById('add_member_btn');
                const maxMembers = 8;

                function toggleSections() {
                    if (typeDepartmentRadio.checked) {
                        departmentSection.style.display = 'block';
                        desiredEmailInput.required = true;
                        groupSection.style.display = 'none';
                        clearMembers();
                    } else if (typeGroupRadio.checked) {
                        departmentSection.style.display = 'block'; // Also show desired email for group
                        desiredEmailInput.required = true;
                        groupSection.style.display = 'block';
                        if (memberList.children.length === 0) {
                           addMemberRow(); // Add the first member row automatically
                        }
                    } else {
                        departmentSection.style.display = 'none';
                        groupSection.style.display = 'none';
                        desiredEmailInput.required = false;
                        clearMembers();
                    }
                }

                function clearMembers() {
                    memberList.innerHTML = '';
                    updateAddButtonState();
                }

                function updateAddButtonState() {
                    const memberCount = memberList.children.length;
                    addMemberBtn.disabled = memberCount >= maxMembers;
                    addMemberBtn.textContent = memberCount >= maxMembers ? 'จำกัดสมาชิกสูงสุด 8 คน' : 'เพิ่มสมาชิก';
                }

                function addMemberRow() {
                    if (memberList.children.length >= maxMembers) return;

                    const memberIndex = memberList.children.length;
                    const newRow = document.createElement('div');
                    newRow.className = 'row g-2 mb-2 member-row';

                    // Create name column
                    const nameCol = document.createElement('div');
                    nameCol.className = 'col-md';
                    const nameInput = document.createElement('input');
                    nameInput.type = 'text';
                    nameInput.name = 'members[' + memberIndex + '][name]';
                    nameInput.className = 'form-control';
                    nameInput.placeholder = 'ชื่อ-นามสกุล';
                    nameInput.required = true;
                    nameCol.appendChild(nameInput);

                    // Create email column
                    const emailCol = document.createElement('div');
                    emailCol.className = 'col-md';
                    const emailInput = document.createElement('input');
                    emailInput.type = 'email';
                    emailInput.name = 'members[' + memberIndex + '][email]';
                    emailInput.className = 'form-control';
                    emailInput.placeholder = 'อีเมล';
                    emailInput.required = true;
                    emailCol.appendChild(emailInput);

                    // Create remove button column
                    const removeCol = document.createElement('div');
                    removeCol.className = 'col-auto d-flex align-items-center';
                    const removeBtn = document.createElement('button');
                    removeBtn.type = 'button';
                    removeBtn.className = 'btn btn-danger btn-sm remove-member-btn';
                    removeBtn.innerHTML = '<i class="bi bi-trash-fill"></i>';
                    removeCol.appendChild(removeBtn);

                    newRow.appendChild(nameCol);
                    newRow.appendChild(emailCol);
                    newRow.appendChild(removeCol);
                    
                    memberList.appendChild(newRow);
                    updateAddButtonState();
                }

                typeDepartmentRadio.addEventListener('change', toggleSections);
                typeGroupRadio.addEventListener('change', toggleSections);
                addMemberBtn.addEventListener('click', addMemberRow);

                memberList.addEventListener('click', function(e) {
                    if (e.target.closest('.remove-member-btn')) {
                        e.target.closest('.member-row').remove();
                        updateAddButtonState();
                    }
                });

                // Initial state
                toggleSections();
            });
        </script>
    </body>
    </html>
`;

const getEmailSuccessHtml = (data) => {
    let membersHtml = '';
    if (data.email_type === 'อีเมลกลุ่ม' && data.members) {
        const membersList = Object.values(data.members).map(m => `<li>${m.name} (${m.email})</li>`).join('');
        membersHtml = `<h6>สมาชิกในกลุ่ม:</h6><ul>${membersList}</ul>`;
    }

    return `
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
                        <li><strong>วัตถุประสงค์:</strong> ${data.purpose}</li>
                    </ul>
                    ${membersHtml}
                </div>
                <a href="/request-email" class="btn btn-primary mt-4">กรอกฟอร์มอีกครั้ง</a>
                <a href="/" class="btn btn-secondary mt-2">กลับไปหน้าเมนู</a>
            </div>
        </div>
    </body>
    </html>
`;
};

module.exports = { getEmailFormHtml, getEmailSuccessHtml };
