/* 모듈 페이지 공용 — 프롬프트·코드 블록 복사 버튼(+토스트) · 긴 블록 접기 */
(function(){
  /* Part는 큰 단위: 기존 텍스트를 보존하면서 PART / 숫자를 두 줄로 나눈다. */
  document.querySelectorAll('.part-n').forEach(label=>{
    const match=label.textContent.trim().match(/^PART\s+(\S+)$/i);
    if(!match)return;
    const word=document.createElement('span'), number=document.createElement('span');
    word.className='part-word'; word.textContent='PART';
    number.className='part-value'; number.textContent=match[1];
    label.replaceChildren(word,document.createTextNode(' '),number);
  });
  document.querySelectorAll('img[loading="lazy"]').forEach(i=>{i.loading='eager'});  /* 지연 로딩이 본문을 밀어 스크롤 목표가 흔들리는 것을 방지 */
  let toastEl, toastT;
  function toast(msg){ if(!toastEl){toastEl=document.createElement('div');toastEl.className='toast';document.body.appendChild(toastEl);} toastEl.textContent=msg; toastEl.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>toastEl.classList.remove('show'),1600); }
  function copyText(t,b){ const done=()=>{ b.textContent='복사됨 ✓'; b.classList.add('done'); toast('복사했습니다. 클로드에 붙여넣으세요.'); setTimeout(()=>{b.textContent='복사';b.classList.remove('done')},1800)};
    if(navigator.clipboard&&window.isSecureContext){ navigator.clipboard.writeText(t).then(done,()=>fallback(t,done)); } else fallback(t,done); }
  function fallback(t,done){ const ta=document.createElement('textarea'); ta.value=t; ta.setAttribute('readonly',''); ta.style.position='fixed'; ta.style.left='-9999px'; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy')}catch(e){} ta.remove(); done(); }
  function add(block,getText){ if(block.querySelector(':scope > .copybtn'))return; const b=document.createElement('button'); b.type='button'; b.className='copybtn'; b.textContent='복사'; b.setAttribute('aria-label','내용 복사');
    b.addEventListener('click',e=>{e.stopPropagation(); copyText(getText().replace(/\n{3,}/g,'\n\n').replace(/[ \t]+$/gm,'').trim(),b)}); block.appendChild(b); }
  const clean=el=>{ const c=el.cloneNode(true); c.querySelectorAll('.copybtn,.pl,.cm,.lbl,.expander').forEach(x=>x.remove()); return c.innerText; };
  document.querySelectorAll('.prompt').forEach(p=>add(p,()=>{ const t=p.querySelector('.ptext')||p.querySelector('pre'); return t?t.innerText:clean(p); }));
  document.querySelectorAll('.code, .cmd2, pre').forEach(p=>{ if(p.closest('.prompt'))return; if(p.tagName==='PRE'&&p.closest('.code,.cmd2'))return; if(p.innerText.trim().length<8)return; add(p,()=>clean(p)); });
  /* 긴 블록 접기 — 벤치마크의 collapsible 패턴 */
  function collapsible(block, inner){ if(!inner) return; if(inner.scrollHeight<=380) return; block.classList.add('collapsible');
    const x=document.createElement('button'); x.type='button'; x.className='expander'; x.textContent='전체 펼치기 ▾';
    x.addEventListener('click',()=>{ block.classList.toggle('open'); x.textContent=block.classList.contains('open')?'접기 ▴':'전체 펼치기 ▾'; }); block.appendChild(x); }
  document.querySelectorAll('.prompt').forEach(p=>collapsible(p, p.querySelector('.ptext')||p.querySelector('pre')));
})();
