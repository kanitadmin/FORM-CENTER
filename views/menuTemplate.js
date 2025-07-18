// views/menuTemplate.js
const getMenuHtml = () => `
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>เมนูหลัก - ระบบฟอร์มออนไลน์</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <style>
            body { background-color: #f0f2f5; }
            .card-menu { transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; }
            .card-menu:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
        </style>
    </head>
    <body>
        <div class="container my-5">
            <div class="text-center mb-5">
                <i class="bi bi-card-checklist" style="font-size: 3.5rem; color: #0d6efd;"></i>
                <h1 class="display-5 mt-2">ระบบฟอร์มออนไลน์</h1>
                <p class="lead text-muted">กรุณาเลือกแบบฟอร์มที่ท่านต้องการใช้งาน</p>
            </div>

            <!-- Search Input -->
            <div class="row justify-content-center mb-4">
                <div class="col-md-8 col-lg-7">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-search"></i></span>
                        <input type="text" id="formSearchInput" class="form-control" placeholder="ค้นหาฟอร์มที่ต้องการ...">
                    </div>
                </div>
            </div>

            <div id="form-list" class="row justify-content-center g-4">
                <div class="col-12 col-md-6 col-lg-4 form-card">
                    <div class="card card-menu text-center h-100">
                        <div class="card-body p-4 d-flex flex-column">
                            <div class="mb-3"><i class="bi bi-hdd-stack-fill" style="font-size: 3rem; color: #0d6efd;"></i></div>
                            <h5 class="card-title">ฟอร์มขอใช้งานเครื่องแม่ข่ายเสมือน (VM)</h5>
                            <p class="card-text text-muted">สำหรับยื่นคำร้องขอเปิดใช้งาน Virtual Machine</p>
                            <div class="mt-auto"><a href="/request-vm" class="btn btn-primary stretched-link">ไปที่ฟอร์ม <i class="bi bi-arrow-right-circle-fill ms-1"></i></a></div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 form-card">
                    <div class="card card-menu text-center h-100">
                        <div class="card-body p-4 d-flex flex-column">
                            <div class="mb-3"><i class="bi bi-globe2" style="font-size: 3rem; color: #198754;"></i></div>
                            <h5 class="card-title">ฟอร์มขอใช้งานเว็บโฮสติ้ง</h5>
                            <p class="card-text text-muted">สำหรับยื่นคำร้องขอพื้นที่สำหรับจัดทำเว็บไซต์</p>
                            <div class="mt-auto"><a href="/request-hosting" class="btn btn-success stretched-link">ไปที่ฟอร์ม <i class="bi bi-arrow-right-circle-fill ms-1"></i></a></div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 form-card">
                    <div class="card card-menu text-center h-100">
                        <div class="card-body p-4 d-flex flex-column">
                            <div class="mb-3"><i class="bi bi-envelope-at-fill" style="font-size: 3rem; color: #6f42c1;"></i></div>
                            <h5 class="card-title">ฟอร์มขอใช้งานอีเมลกลุ่ม/ส่วนงาน</h5>
                            <p class="card-text text-muted">สำหรับยื่นคำร้องขออีเมลสำหรับกลุ่มหรือส่วนงาน</p>
                            <div class="mt-auto"><a href="/request-email" class="btn btn-primary stretched-link" style="background-color: #6f42c1; border-color: #6f42c1;">ไปที่ฟอร์ม <i class="bi bi-arrow-right-circle-fill ms-1"></i></a></div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="my-5 pt-5 text-muted text-center text-small"><p class="mb-1">&copy; 2025 Computer Center Burapha University</p></footer>
        </div>

        <script>
            document.getElementById('formSearchInput').addEventListener('keyup', function() {
                let searchTerm = this.value.toLowerCase();
                let formCards = document.querySelectorAll('.form-card');
                
                formCards.forEach(function(card) {
                    let title = card.querySelector('.card-title').textContent.toLowerCase();
                    if (title.includes(searchTerm)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        </script>
    </body>
    </html>
`;
module.exports = { getMenuHtml };