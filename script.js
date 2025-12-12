// 簡單互動：響應式選單、平滑滾動、表單處理、導覽高亮
document.addEventListener('DOMContentLoaded', function () {
  // Menu toggle for mobile
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  menuToggle && menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        nav.classList.remove('show'); // close mobile menu if open
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Update year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Simple nav active link on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav a');
  function onScroll() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
        const id = section.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Contact form handling: use mailto fallback and inline validation
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      formMessage.textContent = '';
      const fd = new FormData(form);
      const name = fd.get('name') || '';
      const email = fd.get('email') || '';
      const subject = fd.get('subject') || '聯絡';
      const message = fd.get('message') || '';
      if (!name || !email || !message) {
        formMessage.textContent = '請填寫必填欄位（名稱、Email、內容）';
        return;
      }
      // Try to open mail client as a simple default experience.
      const body = encodeURIComponent(`名稱: ${name}\nEmail: ${email}\n\n${message}`);
      const mailto = `mailto:email@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = mailto;
      formMessage.textContent = '已嘗試以預設郵件程式開啟。若未成功，請直接使用 email@example.com 聯絡。';
      form.reset();
    });
  }
});