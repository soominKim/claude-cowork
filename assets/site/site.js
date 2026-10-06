/* Claude Cowork 핵심 익히기 · 공통 셸: 상단 탭 · 좌측 목차(현재 위치 표시) · 이전/다음 · 이미지 크게 보기 */
(function(){
  'use strict';
  var PAGES=[
    {id:'home',     href:'index.html',     tab:'홈',      n:'HOME',  title:'Claude Cowork 핵심 익히기', sub:'과정 안내 · 준비'},
    {id:'intro',    href:'intro.html',     tab:'Intro',   n:'INTRO', title:'AI로 만든 화면, 선을 넘은 걸까?', sub:'생각해 볼 이야기'},
    {id:'guide',    href:'guide.html',     tab:'안내',    n:'안내',  title:'워크샵 안내', sub:'자료 받기 · 실습 규칙'},
    {id:'module1',  href:'module1.html',   tab:'1 기능',  n:'01',    title:'Cowork 기능 살펴보기', sub:'폴더 · 파일 · 승인 · 프로젝트'},
    {id:'module2',  href:'module2.html',   tab:'2 스킬',  n:'02',    title:'스킬 다루기', sub:'공개 스킬 · 팀 공유문 · 브랜드'},
    {id:'module3',  href:'module3.html',   tab:'3 업무',  n:'03',    title:'업무 실습', sub:'워크샵 공유자료 만들기'},
    {id:'module4',  href:'module4.html',   tab:'4 나의 Skill', n:'04', title:'나의 Skill 만들기', sub:'반복 업무를 스킬로'},
    {id:'module5',  href:'module5.html',   tab:'5 MCP',   n:'05',    title:'MCP로 외부 도구 연결하기', sub:'개념 · Skill과 차이 · Higgsfield'},
    {id:'wrapup',   href:'wrapup.html',    tab:'마무리',  n:'06',    title:'마무리', sub:'Key Takeaways'},
    {id:'selfstudy',href:'selfstudy.html', tab:'자습',    n:'자습',  title:'Claude Cowork 실습', sub:'Basic 9개 · Advanced 6개'}
  ];
  var ZIP='data/cowork_sample_data.zip';
  var body=document.body, cur=body.getAttribute('data-page')||'home';
  var idx=PAGES.findIndex(function(p){return p.id===cur});
  var el=function(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;};
  var txt=function(n){return n?(n.textContent||'').replace(/\s+/g,' ').trim():'';};
  var esc=function(s){return s.replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]});};

  /* 기존 본문을 .cw-main 으로 감싼다 (svg 스프라이트·스크립트 제외) */
  var main=el('div','cw-main'); main.id='cw-main';
  Array.prototype.slice.call(body.childNodes).forEach(function(n){
    if(n.nodeType===1&&(n.tagName==='SCRIPT'||(n.tagName==='svg'&&n.style.display==='none')))return;
    main.appendChild(n);
  });
  body.appendChild(main);
  body.classList.add('cw-site');

  /* 상단 내비 */
  var top=el('header','cw-top');
  top.innerHTML='<button class="cw-menu" type="button" aria-label="목차 열기" aria-controls="cw-side" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>'+
    '<a class="cw-brand" href="index.html"><span class="dot"></span><span class="bt"><b>Claude Cowork 핵심 익히기</b><span>AIX102 · 실습 가이드</span></span></a>'+
    '<nav class="cw-tabs" aria-label="모듈">'+PAGES.slice(1).map(function(p){return '<a class="cw-tab'+(p.id===cur?' on':'')+'" href="'+p.href+'"'+(p.id===cur?' aria-current="page"':'')+'>'+p.tab+'</a>';}).join('')+'</nav>'+
    '<a class="cw-dl" href="'+ZIP+'" download title="실습 자료 ZIP 다운로드"><svg viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg><span class="lbl">실습 자료</span></a>';
  body.insertBefore(top,body.firstChild);

  /* 좌측 목차 */
  var side=el('aside','cw-side'); side.id='cw-side'; side.setAttribute('aria-label','과정 목차');
  var list=el('ul','cw-mods');
  var tocLinks=[];
  PAGES.forEach(function(p){
    var li=el('li','cw-mod'+(p.id===cur?' on':''));
    li.innerHTML='<a href="'+p.href+'"><span class="n">'+p.n+'</span><span class="t">'+esc(p.title)+'<small>'+esc(p.sub)+'</small></span></a>';
    if(p.id===cur&&cur!=='home'){
      var toc=el('ul','cw-toc');
      var nodes=document.querySelectorAll('.part, main.sheet > section');
      Array.prototype.forEach.call(nodes,function(n){
        if(n.classList.contains('part')){
          var pn=txt(n.querySelector('.part-n')), pt=txt(n.querySelector('.part-t'));
          toc.appendChild(el('li','pt',esc((pn?pn+' · ':'')+pt)));
          return;
        }
        if(!n.id)return;
        var h=n.querySelector('h2')||n.querySelector('.step-head .st');
        var hc=h?h.cloneNode(true):null; if(hc)Array.prototype.forEach.call(hc.querySelectorAll('.badge'),function(b){b.remove()});
        var t=txt(hc), sn=txt(n.querySelector('.sec-num'));
        if(!t)return;
        var a=el('a',null,'<span class="sn">'+esc(sn)+'</span><span>'+esc(t)+'</span>'); a.href='#'+n.id; a.dataset.target=n.id;
        var item=el('li'); item.appendChild(a); toc.appendChild(item); tocLinks.push(a);
      });
      li.appendChild(toc);
    }
    list.appendChild(li);
  });
  side.appendChild(el('p','cap','과정 구성'));
  side.appendChild(list);
  side.appendChild(el('div','side-foot','실습 자료: <a href="'+ZIP+'" download>cowork_sample_data.zip</a> · <a href="index.html#data-map">폴더별 사용처</a><br>프롬프트 카드의 <b>복사</b> 버튼을 눌러 Cowork 입력창에 붙여넣으세요.'));
  body.insertBefore(side,main);
  var scrim=el('div','cw-scrim'); body.insertBefore(scrim,main);

  var menuBtn=top.querySelector('.cw-menu');
  function setOpen(v){body.classList.toggle('cw-open',v);menuBtn.setAttribute('aria-expanded',v?'true':'false');}
  menuBtn.addEventListener('click',function(){setOpen(!body.classList.contains('cw-open'))});
  scrim.addEventListener('click',function(){setOpen(false)});
  side.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setOpen(false)});

  /* 현재 위치 표시 */
  if(tocLinks.length&&'IntersectionObserver' in window){
    var targets=tocLinks.map(function(a){return document.getElementById(a.dataset.target)}).filter(Boolean);
    var active=null;
    var mark=function(id){
      if(active===id)return; active=id;
      tocLinks.forEach(function(a){
        var on=a.dataset.target===id; a.classList.toggle('on',on);
        if(on&&window.innerWidth>1023){var r=a.getBoundingClientRect(),s=side.getBoundingClientRect();if(r.top<s.top+40||r.bottom>s.bottom-40)a.scrollIntoView({block:'center'});}
      });
    };
    var onScroll=function(){
      var y=window.innerHeight*0.3, pick=null;
      for(var i=0;i<targets.length;i++){ if(targets[i].getBoundingClientRect().top<=y)pick=targets[i].id; else break; }
      mark(pick||targets[0].id);
    };
    var tick=false;
    window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(function(){tick=false;onScroll()})}},{passive:true});
    onScroll();
  }

  /* 이전 / 다음 */
  if(idx>0){
    var pager=el('nav','cw-pager'); pager.setAttribute('aria-label','이전 다음 모듈');
    var prev=PAGES[idx-1], next=PAGES[idx+1];
    if(prev&&prev.id!=='home')pager.appendChild(el('a','prev','<small>← 이전</small><b>'+prev.tab+' · '+esc(prev.title)+'</b>'));
    else pager.appendChild(el('a','prev','<small>← 처음으로</small><b>과정 안내</b>'));
    pager.lastChild.href=prev?prev.href:'index.html';
    if(next){var na=el('a','next','<small>다음 →</small><b>'+next.tab+' · '+esc(next.title)+'</b>');na.href=next.href;pager.appendChild(na);}
    main.appendChild(pager);
  }
  var foot=el('footer','cw-foot','<span>Claude Cowork 핵심 익히기 · AIX102</span><span>모든 실습 자료와 수치는 실습용 가상 데이터입니다.</span>');
  main.appendChild(foot);

  /* 이미지가 늦게 로드되며 밀린 위치를 해시 대상으로 다시 맞춘다 */
  var fixHash=function(){ if(!location.hash)return; var t=document.getElementById(decodeURIComponent(location.hash.slice(1))); if(t)t.scrollIntoView(); };
  window.addEventListener('load',function(){ fixHash(); setTimeout(fixHash,300); });

  /* 이미지 크게 보기 */
  var lb=el('div','cw-lightbox','<button class="x" type="button" aria-label="닫기">×</button><img alt="">');
  body.appendChild(lb);
  var lbImg=lb.querySelector('img');
  var close=function(){lb.classList.remove('open');lbImg.removeAttribute('src');};
  lb.addEventListener('click',close);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  Array.prototype.forEach.call(main.querySelectorAll('main img, figure img'),function(img){
    if(img.closest('a'))return;
    img.classList.add('cw-zoomable'); img.title=img.title||'클릭해서 크게 보기';
    img.addEventListener('click',function(){lbImg.src=img.currentSrc||img.src;lbImg.alt=img.alt||'';lb.classList.add('open');});
  });
})();
