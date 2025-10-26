/* BRK GARAGE - script.js
   Handles: splash, WhatsApp links, lightbox for videos/images, form submission to WhatsApp, mobile nav
*/
const PHONE = '+905441723633';

function waLink(msg){
  return 'https://wa.me/' + PHONE.replace(/[^0-9]/g,'') + '?text=' + encodeURIComponent(msg);
}

document.addEventListener('DOMContentLoaded', ()=> {
  // Splash hide after short animation (2s)
  const splash = document.getElementById('splash');
  setTimeout(()=>{ if(splash){ splash.style.opacity='0'; setTimeout(()=>splash.remove(),600); } },2000);

  // Set whatsapp links
  const waBtns = document.querySelectorAll('#wa-top, #promo-wa, #hero-book, #wa-footer, #wa-contact');
  waBtns.forEach(b => { if(!b) return; b.href = waLink('Merhaba, BRK GARAGE üzerinden rezervasyon yapmak istiyorum. (BRK-33 kodu)'); b.target='_blank'; });

  // Per-card whatsapp buttons with custom messages
  document.querySelectorAll('a.whatsapp[data-msg]').forEach(a=>{
    const msg = a.dataset.msg || 'Rezervasyon yapmak istiyorum.';
    a.href = waLink(msg);
    a.target = '_blank';
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxMedia = document.querySelector('.lightbox-media');
  const closeBtn = document.querySelector('.lightbox-close');
  function openLightbox(src){
    lightboxMedia.innerHTML = '';
    if(/\.(mp4|webm|ogg)$/i.test(src)){
      const v = document.createElement('video');
      v.controls = true; v.autoplay = true; v.playsInline = true; v.src = src;
      lightboxMedia.appendChild(v);
    } else {
      const im = document.createElement('img'); im.src = src; lightboxMedia.appendChild(im);
    }
    lightbox.classList.add('show'); lightbox.setAttribute('aria-hidden','false');
  }
  document.querySelectorAll('.play-video').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const src = btn.dataset.video;
      if(src) openLightbox(src);
    });
  });
  closeBtn.addEventListener('click', ()=>{ lightbox.classList.remove('show'); lightbox.setAttribute('aria-hidden','true'); lightboxMedia.innerHTML=''; });
  lightbox.addEventListener('click',(e)=>{ if(e.target===lightbox) closeBtn.click(); });

  // Contact form -> WhatsApp message
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const fd = new FormData(form);
      const nm = fd.get('name')||''; const ph = fd.get('phone')||''; const svc = fd.get('service')||''; const note = fd.get('note')||'';
      const msg = `Rezervasyon talebi:\nİsim: ${nm}\nTelefon: ${ph}\nHizmet: ${svc}\nNot: ${note}\n(Kod: BRK-33)`;
      window.open(waLink(msg),'_blank');
    });
  }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle'); const mainNav = document.querySelector('.main-nav');
  navToggle && navToggle.addEventListener('click', ()=>{ if(mainNav.style.display==='flex' || mainNav.style.display==='') mainNav.style.display='none'; else mainNav.style.display='flex'; });

  // set year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // ensure muted videos
  document.querySelectorAll('video').forEach(v=>{ v.muted=true; v.playsInline=true; });
});
