document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.querySelector('.hamburger');
  const nav=document.getElementById('mainNav');
  const closeNav=()=>{ if(nav) nav.classList.remove('open'); if(btn){btn.setAttribute('aria-expanded','false');btn.textContent='☰';} };
  const openNav=()=>{ if(nav) nav.classList.add('open'); if(btn){btn.setAttribute('aria-expanded','true');btn.textContent='✕';} };
  if(btn&&nav){
    btn.setAttribute('aria-expanded','false');
    btn.addEventListener('click',(e)=>{ e.stopPropagation(); nav.classList.contains('open')?closeNav():openNav(); });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
    document.addEventListener('click',(e)=>{ if(nav.classList.contains('open')&&!nav.contains(e.target)&&e.target!==btn) closeNav(); });
    document.addEventListener('keydown',(e)=>{ if(e.key==='Escape'){closeNav(); const lb=document.getElementById('lightbox'); if(lb) lb.classList.remove('open');} });
  }
  // Active link (works for file:// and hosted)
  const path=(location.pathname.split('/').pop()||'index.html').split('?')[0].toLowerCase()||'index.html';
  document.querySelectorAll('.nav a').forEach(a=>{
    const h=(a.getAttribute('href')||'').toLowerCase();
    if(h===path||(path===''&&h==='index.html')) a.classList.add('active');
    else a.classList.remove('active');
  });
  // Reveal on scroll (with reduced-motion respect)
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els=document.querySelectorAll('.reveal');
  if(reduced||!('IntersectionObserver' in window)){ els.forEach(el=>el.classList.add('visible')); }
  else{
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
    els.forEach(el=>io.observe(el));
  }
  // Year
  document.querySelectorAll('#year').forEach(y=>{y.textContent=new Date().getFullYear();});
  // Lightbox
  const lb=document.getElementById('lightbox');
  if(lb){
    const img=lb.querySelector('img');
    document.querySelectorAll('.gallery a').forEach(a=>a.addEventListener('click',e=>{
      e.preventDefault(); if(img){img.src=a.href; img.alt=a.title||'Project photo enlarged';} lb.classList.add('open');
    }));
    lb.addEventListener('click',()=>lb.classList.remove('open'));
  }
  // Contact form -> mailto fallback + success message
  const form=document.getElementById('quoteForm');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const fd=new FormData(form);
      const name=(fd.get('name')||'').toString().trim(),phone=(fd.get('phone')||'').toString().trim(),email=(fd.get('email')||'').toString().trim(),service=(fd.get('service')||'').toString(),msg=(fd.get('message')||'').toString().trim();
      if(!name||!phone||!msg){alert('Please fill name, phone and message.');return;}
      const subject=encodeURIComponent('New enquiry - '+service+' - '+name);
      const body=encodeURIComponent('Name: '+name+'\nPhone: '+phone+'\nEmail: '+email+'\nService: '+service+'\n\n'+msg);
      window.location.href='mailto:manchesterroofing@freeolamail.com?subject='+subject+'&body='+body;
      const ok=document.getElementById('formOk'); if(ok) ok.style.display='block';
      form.reset();
    });
  }
});
