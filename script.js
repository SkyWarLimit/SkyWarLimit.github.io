document.addEventListener("DOMContentLoaded", () => {
    // 1. Logika Animasi Scroll (Fade Up)
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fade-up').forEach(el => observer.observe(el));

    // 2. Logika Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));

    // 3. Efek Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'bg-opacity-95', 'backdrop-blur-sm');
            navbar.classList.remove('shadow-md');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-opacity-95', 'backdrop-blur-sm');
            navbar.classList.add('shadow-md');
        }
    });
});

/* =========================================================================
   BAGIAN 1: LOGIKA MODAL EXPERIENCE (SISTEM TAB PERAN)
   ========================================================================= */

const experienceData = {
    'hmti': {
        mainTitle: 'Himpunan Mahasiswa Teknologi Informasi (HMTI)',
        subtitle: 'Berperan aktif dalam Organizing Committee dengan beberapa tanggung jawab utama:',
        roles: [
            {
                title: 'Ketua Pelaksana Prastudi',
                desc: '<p class="text-gray-700 font-medium">Ketua Pelaksana Prastudi 2025</p><p class="text-gray-600 mt-2">Memimpin jalannya orientasi jurusan, memastikan seluruh rangkaian acara berjalan sesuai rencana, dan mengkoordinasikan seluruh panitia yang bertugas.</p>',
                images: ['assets/dokumentasi_prastud.jpg', 'assets/dokumentasi_prastud2.jpg', 'assets/dokumentasi_prastud3.jpg', 'assets/dokumentasi_prastud4.jpg'] 
            },
            {
                title: 'Koorlap Diklat HMTI',
                desc: '<p class="text-gray-700 font-medium">Koordinator Lapangan Diklat Lapang Open Recruitment HMTI 2025</p><p class="text-gray-600 mt-2">Mengatur formasi, ketertiban peserta, dan menjaga alur mobilisasi selama proses diklat berlangsung.</p>',
                images: ['assets/dokumentasi_oprec.jpg', 'assets/dokumentasi_oprec2.jpg', 'assets/dokumentasi_oprec3.jpg', 'assets/dokumentasi_oprec4.jpg'] 
            },
            {
                title: 'Koorlap Sportif JTI',
                desc: '<p class="text-gray-700 font-medium">Koordinator Lapangan Sportif JTI 2025</p><p class="text-gray-600 mt-2">Mengelola jalannya kompetisi olahraga tingkat jurusan dan memastikan keamanan di lapangan.</p>',
                images: ['assets/test_sportif (1).jpg', 'assets/test_sportif (4).jpg', 'assets/test_sportif (5).jpg', 'assets/test_sportif (2).jpg']
            },
            {
                title: 'Sekretaris Pemilihan Ketum',
                desc: '<p class="text-gray-700 font-medium">Sekretaris Pemilihan Ketua Umum 2026/2027</p><p class="text-gray-600 mt-2">Mengurus seluruh administrasi, pencatatan hasil, dan legalitas surat menyurat selama proses pemilihan.</p>',
                images: ['assets/dokumentasi_pilketum (1).jpg', 'assets/dokumentasi_pilketum (2).jpg', 'assets/dokumentasi_pilketum (3).jpg', 'assets/dokumentasi_pilketum (4).jpg'] 
            }
        ]
    },
    'osis': {
        mainTitle: 'OSIS/MPK SMA Negeri 9 Malang',
        subtitle: 'Terlibat aktif dalam kepengurusan OSIS SMA Negeri 9 Malang selama dua periode.',
        roles: [
            {
                title: 'Koor Kewirausahaan',
                desc: '<p class="text-gray-700 font-medium">Koordinator Kewirausahaan HEXA 2022 </p><p class="text-gray-600 mt-2">Bertugas menggalang dana operasional OSIS melalui program kewirausahaan dengan mengelola usaha mandiri berupa penjualan makanan dan minuman secara langsung di tenant.</p>',
                images: ['assets/dokumentasi_hexa (1).png', 'assets/dokumentasi_hexa (2).png', 'assets/dokumentasi_hexa (3).png', 'assets/dokumentasi_hexa (4).png']
            },
            {
                title: 'Waka Pelaksana Classmeet',
                desc: '<p class="text-gray-700 font-medium">Wakil Ketua Pelaksana Class Meeting 2021</p><p class="text-gray-600 mt-2">Membantu ketua pelaksana dalam operasional kegiatan perlombaan antar kelas pasca-ujian semester.</p>',
                images: ['assets/dokumentasi_cm (1).jpg', 'assets/dokumentasi_cm (2).jpg', 'assets/dokumentasi_cm (3).jpg', 'assets/dokumentasi_cm (4).jpg']
            }
        ]
    }
};

const expModal = document.getElementById('experience-modal');
const expModalTitle = document.getElementById('exp-modal-title');
const expModalSubtitle = document.getElementById('exp-modal-subtitle');
const expRoleTabsContainer = document.getElementById('exp-role-tabs');
const expRoleContentArea = document.getElementById('exp-role-content-area');
const expModalDesc = document.getElementById('exp-modal-desc');
const expModalImages = document.getElementById('exp-modal-images');

let currentOrganizationData = null;

function openExperienceModal(id) {
    const data = experienceData[id];
    if (!data) return;

    currentOrganizationData = data;
    expModalTitle.innerHTML = data.mainTitle;
    
    if (data.subtitle) {
        expModalSubtitle.innerHTML = data.subtitle;
        expModalSubtitle.classList.remove('hidden');
    } else {
        expModalSubtitle.classList.add('hidden');
    }

    renderRoleTabs(data.roles);

    if (data.roles && data.roles.length > 0) {
        selectRole(0);
        expRoleContentArea.classList.remove('hidden');
    } else {
        expRoleContentArea.classList.add('hidden');
    }

    expModal.classList.remove('hidden');
    setTimeout(() => { expModal.classList.add('is-open'); }, 10);
    document.body.style.overflow = 'hidden';
}

function renderRoleTabs(roles) {
    expRoleTabsContainer.innerHTML = '';
    roles.forEach((role, index) => {
        const btn = document.createElement('button');
        btn.className = 'role-tab-btn px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 text-gray-500 border-gray-300 hover:border-brand hover:text-brand bg-white';
        btn.innerHTML = role.title;
        btn.onclick = () => selectRole(index);
        expRoleTabsContainer.appendChild(btn);
    });
}

function selectRole(roleIndex) {
    const roleData = currentOrganizationData.roles[roleIndex];
    if (!roleData) return;

    const allBtns = document.querySelectorAll('.role-tab-btn');
    allBtns.forEach((btn, idx) => {
        if (idx === roleIndex) {
            btn.classList.remove('text-gray-500', 'border-gray-300', 'bg-white');
            btn.classList.add('bg-brandLight', 'text-brand', 'border-brand');
        } else {
            btn.classList.remove('bg-brandLight', 'text-brand', 'border-brand');
            btn.classList.add('text-gray-500', 'border-gray-300', 'bg-white');
        }
    });

    expModalDesc.innerHTML = roleData.desc;
    expModalImages.innerHTML = '';
    
    for (let i = 0; i < 4; i++) {
        if (roleData.images && roleData.images[i]) {
            const imgElement = document.createElement('img');
            imgElement.src = roleData.images[i];
            imgElement.className = 'w-full h-48 md:h-64 object-cover rounded-xl shadow-sm border border-gray-200 hover:scale-[1.02] transition-transform';
            expModalImages.appendChild(imgElement);
        } else {
            const placeholderBox = document.createElement('div');
            placeholderBox.className = 'w-full h-48 md:h-64 bg-gray-100 rounded-xl shadow-inner flex items-center justify-center text-gray-400 text-xl font-light border border-dashed border-gray-300';
            placeholderBox.innerHTML = `Dokumentasi ${i + 1}`;
            expModalImages.appendChild(placeholderBox);
        }
    }
}

function closeExperienceModal() {
    expModal.classList.remove('is-open');
    setTimeout(() => {
        expModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

expModal.addEventListener('click', function(event) {
    if (event.target === expModal) closeExperienceModal();
});


/* =========================================================================
   BAGIAN 2: LOGIKA MODAL SKILL (ENHANCED: LEVEL & PROJECTS)
   ========================================================================= */

// Struktur Data Baru untuk Skill (Menambahkan level, GitHub repo, dan gambar spesifik proyek)
const skillData = {
    'webdev': {
        title: 'Web Development',
        icon: '<i class="fa-solid fa-code"></i>',
        level: 'Intermediate', // Pilihan: Beginner, Intermediate, Advanced, Pro
        desc: '<p class="text-gray-600">Teknologi utama: <b>PHP, Laravel, HTML, CSS, JavaScript, Tailwind CSS</b>. Pengembangan mencakup perancangan antarmuka sisi Front-End yang responsif serta pembuatan arsitektur Back-End terintegrasi untuk pengelolaan data. Contoh proyek nyata yang dibangun adalah platform Informasi Lomba dan Beasiswa <b>PELUANGKU</b>.</p>',
        githubUrl: 'https://github.com/SkyWarLimit/PBL_NamelessGroup', 
        images: ['assets/dokumentasi_projek_web (1).png', 'assets/dokumentasi_projek_web (2).png', 'assets/dokumentasi_projek_web (3).png'] 
    },
    'mobiledev': {
        title: 'Mobile Development',
        icon: '<i class="fa-solid fa-mobile-screen-button"></i>',
        level: 'Beginner', // Pilihan: Beginner, Intermediate, Advanced, Pro
        desc: '<p class="text-gray-600">Teknologi utama: <b>Flutter, Dart</b>. Berfokus pada perancangan aplikasi lintas platform yang memiliki performa tinggi dan UI mulus. Salah satu pencapaian utama adalah pengembangan aplikasi edukasi bahasa isyarat terjemahan real-time <b>Sign L</b> berbasis mobile.</p>',
        githubUrl: 'https://github.com/furalmiqbadi/PBL-S5-Sign.L', 
        images: ['assets/dokumentasi_projek_mobile (1).jpeg', 'assets/dokumentasi_projek_mobile (2).jpeg', 'assets/dokumentasi_projek_mobile (3).jpeg']
    },
    'database': {
        title: 'Database & Tools', 
        icon: '<i class="fa-solid fa-database"></i>',
        level: 'Intermediate', // Pilihan: Beginner, Intermediate, Advanced, Pro
        desc: '<p class="text-gray-600">Alat Utama: <b>MySQL, PostgreSQL, Git, Figma, VS Code</b>. Mahir merancang skema ERD relasional yang efisien untuk menunjang aplikasi berskala besar, serta terbiasa bekerja dalam tim menggunakan alur kerja (workflow) kontrol versi Git.</p>',
        githubUrl: 'https://github.com/SkyWarLimit', 
        images: ['assets/dokumentasi_tools (1).png', 'assets/dokumentasi_tools (2).png', 'assets/dokumentasi_tools (3).png'] 
    },
    'general': {
        title: 'General Programming',
        icon: '<i class="fa-solid fa-terminal"></i>',
        level: 'Beginner', // Pilihan: Beginner, Intermediate, Advanced, Pro
        desc: '<p class="text-gray-600">Bahasa: <b>Python, Java</b>. Memiliki spesialisasi akademis dalam pemrosesan data, pengenalan citra digital (Computer Vision), serta pemrograman GUI Desktop tradisional.</p>',
        githubUrl: 'https://github.com/SkyWarLimit/PemMes_17', 
        images: ['assets/dokumentasi_projek_python (1).png', 'assets/dokumentasi_projek_python (2).png', 'assets/dokumentasi_projek_python (3).png']
    }
    // TEMPAT MENAMBAH SKILL BARU (Contoh):
    // 'cloud': { title: 'Cloud Computing', icon: '<i class="fa-solid fa-cloud"></i>', level: 'Beginner', desc: '...', githubUrl: '...', images: [] }
};

const skillModal = document.getElementById('skill-modal');
const skillModalTitle = document.getElementById('skill-modal-title');
const skillModalIcon = document.getElementById('skill-modal-icon');
const skillModalLevel = document.getElementById('skill-modal-level');
const skillModalDesc = document.getElementById('skill-modal-desc');
const skillGithubBtn = document.getElementById('skill-github-btn');
const skillModalImages = document.getElementById('skill-modal-images');

function openSkillModal(id) {
    const data = skillData[id];
    if (!data) return;

    // Isi konten teks dasar
    skillModalTitle.innerHTML = data.title;
    skillModalIcon.innerHTML = data.icon;
    skillModalDesc.innerHTML = data.desc;
    
    // Set Level dengan warna Badge yang berbeda (opsional)
    // Set Level dengan gradasi warna Badge yang berbeda-beda
    skillModalLevel.innerHTML = data.level;
    
    let badgeColor = 'bg-gray-800'; // Warna default (gelap)
    const currentLevel = data.level.toLowerCase();

    if (currentLevel === 'beginner') {
        badgeColor = 'bg-emerald-500'; // Hijau
    } else if (currentLevel === 'intermediate') {
        badgeColor = 'bg-blue-500'; // Biru
    } else if (currentLevel === 'advanced') {
        badgeColor = 'bg-brand'; // Ungu (Warna Tema Portofoliomu)
    } else if (currentLevel === 'pro') {
        badgeColor = 'bg-rose-500'; // Merah muda kemerahan
    }

    skillModalLevel.className = `inline-block px-4 py-1.5 ${badgeColor} text-white rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-sm`;

    // Set Tautan GitHub
    if(data.githubUrl) {
        skillGithubBtn.href = data.githubUrl;
        skillGithubBtn.style.display = 'inline-flex';
    } else {
        skillGithubBtn.style.display = 'none';
    }

    // Render Gambar (Dibatasi maks 3 agar pas di grid)
    skillModalImages.innerHTML = '';
    const maxSkillImages = Math.min(data.images.length, 3);
    
    for (let i = 0; i < maxSkillImages; i++) {
        // Buat bungkus kontainer (wrapper) agar rapi
        const imgContainer = document.createElement('div');
        imgContainer.className = 'w-full flex justify-center items-center overflow-hidden rounded-xl shadow-sm border border-gray-200 hover:scale-[1.03] transition-transform duration-300 bg-white';
        
        const imgElement = document.createElement('img');
        imgElement.src = data.images[i];
        
        // Memaksa gambar mengisi penuh lebar tanpa terpotong
        imgElement.className = 'w-full h-auto max-h-[300px] object-cover md:object-contain object-top'; 
        
        imgElement.onerror = function() {
            this.src = `https://via.placeholder.com/400x300.png?text=Proyek+${i+1}`;
        };
        
        imgContainer.appendChild(imgElement);
        skillModalImages.appendChild(imgContainer);
    }

    // Buka Modal
    skillModal.classList.remove('hidden');
    setTimeout(() => { skillModal.classList.add('is-open'); }, 10);
    document.body.style.overflow = 'hidden';
}

function closeSkillModal() {
    skillModal.classList.remove('is-open');
    setTimeout(() => {
        skillModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

skillModal.addEventListener('click', function(event) {
    if (event.target === skillModal) closeSkillModal();
});