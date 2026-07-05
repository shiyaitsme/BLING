const audio = document.getElementById('audio');
audio.src = 'audio/track.mp3';
document.getElementById('kenji-img').src = 'images/kenji-img.jpg';
document.getElementById('kenji-art').src = 'images/kenji-art.jpg';
document.getElementById('img-screen').src = 'images/img-screen.jpg';
document.getElementById('img-emma').src = 'images/img-emma.jpg';
document.getElementById('img-seimei').src = 'images/img-seimei.jpg';
document.getElementById('img-yuzuru').src = 'images/img-yuzuru.jpg';
document.getElementById('img-note').src = 'images/img-note.jpg';
document.getElementById('img-tragic').src = 'images/img-tragic.jpg';
document.getElementById('img-poem').src = 'images/img-poem.jpg';
document.getElementById('img-alysa2').src = 'images/img-alysa2.jpg';
document.getElementById('img-alysa').src = 'images/img-alysa.jpg';
document.getElementById('img-alysa-thumb').src = 'images/img-alysa-thumb.jpg';document.getElementById('kenji-img').src = 'images/kenji-img.jpg';
document.getElementById('kenji-art').src = 'images/kenji-art.jpg';


document.getElementById('comm-img1').src = 'images/comm-img1.jpg';
document.getElementById('comm-img2').src = 'images/comm-img2.jpg';
document.getElementById('comm-img3').src = 'images/comm-img3.jpg';
document.getElementById('disc-hero-img').src = 'images/disc-hero-img.jpg';
document.getElementById('disc-ed1').src = 'images/disc-ed1.jpg';
document.getElementById('disc-g1').src = 'images/disc-g1.jpg';
document.getElementById('disc-g2').src = 'images/disc-g2.jpg';
document.getElementById('disc-ed2').src = 'images/disc-ed2.jpg';
document.getElementById('trend-1').src = 'images/trend-1.jpg';
document.getElementById('trend-2').src = 'images/trend-2.jpg';
document.getElementById('trend-3').src = 'images/trend-3.jpg';
document.getElementById('trend-4').src = 'images/trend-4.jpg';
let isPlaying = false;
let pageHistory = [];

function fmt(s){const m=Math.floor(s/60);const sec=Math.floor(s%60);return m+':'+(sec<10?'0':'')+sec;}

function togglePlay(e){
  e&&e.stopPropagation();
  if(isPlaying){audio.pause();isPlaying=false;}
  else{audio.play();isPlaying=true;}
  updateIcons();
}

const pauseIcon='<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
const playIcon='<polygon points="5 3 19 12 5 21 5 3"/>';

function updateIcons(){
  const icon=isPlaying?pauseIcon:playIcon;
  document.getElementById('mini-icon').innerHTML=icon;
  document.getElementById('big-icon').innerHTML=icon;
}

function skipBack(){audio.currentTime=Math.max(0,audio.currentTime-10);}
function skipFwd(){audio.currentTime=Math.min(audio.duration||0,audio.currentTime+10);}

function seekAudio(e){
  if(!audio.duration)return;
  const rect=e.currentTarget.getBoundingClientRect();
  const pct=(e.clientX-rect.left)/rect.width;
  audio.currentTime=pct*audio.duration;
}

audio.addEventListener('timeupdate',()=>{
  if(!audio.duration)return;
  const pct=(audio.currentTime/audio.duration)*100;
  document.getElementById('mini-bar').style.width=pct+'%';
  document.getElementById('big-bar').style.width=pct+'%';
  document.getElementById('cur-time').textContent=fmt(audio.currentTime);
});
audio.addEventListener('loadedmetadata',()=>{document.getElementById('dur-time').textContent=fmt(audio.duration);});
audio.addEventListener('ended',()=>{isPlaying=false;updateIcons();});

function goPage(id){
  const cur=document.querySelector('.page.active');
  if(cur)pageHistory.push(cur.id);
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target=document.getElementById(id);
  if(target){target.classList.add('active');target.querySelector('.scroll-area')&&(target.querySelector('.scroll-area').scrollTop=0);}
}

function goBack(){
  if(pageHistory.length===0)return;
  const prev=pageHistory.pop();
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target=document.getElementById(prev);
  if(target)target.classList.add('active');
}

function setNav(el){
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  el.classList.add('active');
}

/* ── CAROUSEL ── */
let carouselIdx=0;
const totalSlides=3;
function carouselGo(idx){
  carouselIdx=(idx+totalSlides)%totalSlides;
  document.getElementById('carousel').style.transform=`translateX(-${carouselIdx*100}%)`;
  document.querySelectorAll('.c-dot').forEach((d,i)=>{d.classList.toggle('active',i===carouselIdx);});
}
setInterval(()=>carouselGo(carouselIdx+1),3800);

/* ── FAVOURITES ── */
const favItems=[];
function toggleFav(e,btn,cat,title){
  e.stopPropagation();
  const saved=btn.classList.toggle('saved');
  if(saved){
    const idx=Math.floor(Math.random()*6)+1;
    favItems.push({cat,title,fi:'fi'+idx,id:Date.now()});
  } else {
    const i=favItems.findIndex(f=>f.title===title);
    if(i>-1)favItems.splice(i,1);
  }
  renderFavs();
}
function renderFavs(){
  const grid=document.getElementById('fav-grid');
  const empty=document.getElementById('fav-empty');
  const countEl=document.getElementById('fav-count');
  const profCount=document.getElementById('prof-fav-count');
  countEl.textContent=favItems.length+' 件内容';
  if(profCount)profCount.textContent=favItems.length;
  if(favItems.length===0){grid.innerHTML='';empty.style.display='flex';return;}
  empty.style.display='none';
  grid.innerHTML=favItems.map(f=>`
    <div class="fav-card">
      <div class="fav-card-img ${f.fi}"><div class="fav-card-ghost">${f.cat.charAt(0)}</div></div>
      <div class="fav-card-body"><div class="fav-card-cat">${f.cat}</div><div class="fav-card-ttl">${f.title}</div></div>
      <div class="fav-remove" onclick="removeFav(${f.id})"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
    </div>`).join('');
}
function removeFav(id){
  const i=favItems.findIndex(f=>f.id===id);
  if(i>-1)favItems.splice(i,1);
  renderFavs();
}
renderFavs();

/* ── SHOP CATEGORY FILTER ── */
document.querySelectorAll('.shop-cat').forEach(cat=>{
  cat.addEventListener('click',()=>{
    document.querySelectorAll('.shop-cat').forEach(c=>c.classList.remove('active'));
    cat.classList.add('active');
  });
});

/* ── COPY IMAGES TO NEW ELEMENTS ── */
window.addEventListener('load',()=>{
  const yuz=document.getElementById('img-yuzuru');
  const yuz2=document.getElementById('img-yuzuru2');
  if(yuz&&yuz2)yuz2.src=yuz.src;
  const sei=document.getElementById('img-seimei');
  const sei2=document.getElementById('img-seimei2');
  if(sei&&sei2)sei2.src=sei.src;
});

/* ── NEW IMAGES FROM UPLOADS ── */
function applyUploadedImages(){
  const I=window.__resources||{};
  const set=(id,key,pos)=>{
    const el=document.getElementById(id);
    if(el&&I[key]){el.src=I[key];if(pos)el.style.objectPosition=pos;}
  };
  set('img-delulu-cover','delulu');
  set('img-sakamoto-home','sakamoto','top');
  set('img-yuna-home','yuna','top');
  set('img-yuzu-home','yuzu','top');
  set('img-yuzuru2','yuzu','top');
  set('img-shop-banner','banner','center');
  set('img-shop-hoodie','hoodie','center');
  set('img-shop-tote','tote','center');
  set('img-shop-phone','phone','center');
  set('img-shop-notebook','notebook','center');
  set('img-shop-mug','mug','center');
  set('img-shop-scarf','scarf','center');
  set('img-my-avatar','avatar','center');
  // history thumbnails
  set('img-hist1','yuzu','top');
  set('img-hist2','yuna','top');
  set('img-hist3','delulu','center');
  set('img-hist4','yuzu','top');
  set('img-hist5','sakamoto','top');
}
if(window.__resources) applyUploadedImages();
else window.addEventListener('load', applyUploadedImages);

/* ── PRE-POPULATE FAVOURITES ── */
const preloadedFavs=[
  {cat:'弧线美学',title:'冰刃划过的几何诗学',fi:'fi1',id:1},
  {cat:'运动员',title:'Alysa Liu：自由是她最大的武器',fi:'fi2',id:2},
  {cat:'配乐',title:'Delulu · kiiikiii 完整解析',fi:'fi3',id:3},
  {cat:'编舞',title:'空间中的悲剧浪漫',fi:'fi4',id:4},
];
preloadedFavs.forEach(f=>favItems.push(f));
renderFavs();

/* ════════════════════════════════════════════════════════════
   POSTS / COMMUNITY / COMMENTS
   ════════════════════════════════════════════════════════════ */

const POSTS = {
  1: {
    id:1, user:'luna_on_ice', avatar:'L', avatarBg:'linear-gradient(135deg,#a8bcd4,#7898b8)',
    time:'2小时前', tag:'弧线美学', imgId:'comm-img1',
    title:'为什么羽生结弦的旋转让我无法呼吸',
    content:[
      '今天反复看了《天と地と》的旋转片段，发现他在加速时身体的收紧方式和普通选手完全不同——不是单纯的向心，而是一种从胸腔向外扩张又内收的呼吸式张力。',
      '其他选手做Biellmann或者贝尔曼时，是把身体"塑造"成一个形状；而羽生是把整个空间"压缩"进自己的身体里。这种感觉很难形容，但你看他的肩胛骨、颈部和下颌的关系——每一寸都在参与，没有一处是闲置的。',
      '他的旋转不只是技术动作，更像是一段独立的乐句。开始的延音、中段的渐强、结尾时那种几乎要停滞却又延展开来的余韵——他在用身体演奏音乐。',
      '所以当镜头终于停下来，我才发现自己也屏住了呼吸。'
    ].join('\n\n'),
    likes:284, liked:true,
  },
  2: {
    id:2, user:'mirror_edge_', avatar:'M', avatarBg:'linear-gradient(135deg,#c0a8d8,#a088c0)',
    time:'5小时前', tag:'考斯滕', imgId:'comm-img2',
    title:'坂本花织的考斯滕为什么总是「对」的',
    content:[
      '她的考斯滕从不喧宾夺主，永远在配合节目情绪而不是展示自己。这次世界赛的蓝黑渐变裙，配上那首曲子，真的是我看过最准确的一次视觉叙事。',
      '设计师选用的不是最闪亮的水钻，而是有哑光质感的珠片，光打上去之后是慢慢洇出来的，不是一下子刺人眼。这种克制感很难得。',
      '她的身高比例本来不算最有视觉优势的，但是考斯滕的腰线、袖口处理把她推到了一个最佳的视觉重心。穿在她身上，整个节目的"重量"是均匀的。',
      '一件好的考斯滕，是让你看不见它，只看见这个人在冰上想说的话。坂本花织和她的造型团队，理解了这一点。'
    ].join('\n\n'),
    likes:196, liked:false,
  },
  3: {
    id:3, user:'snowdrift.s', avatar:'S', avatarBg:'linear-gradient(135deg,#a0c8d8,#80a8b8)',
    time:'昨天', tag:'摄影', imgId:'comm-img3',
    title:'用胶片相机拍了一场训练课，意外拍出了我心里花滑的样子',
    content:[
      '一直想用胶片记录冰上的运动，昨天终于拍了。慢门+高速运动，出来的效果比我预想的还要好——那种模糊不是缺陷，是时间留下的痕迹。',
      '数码相机太清楚了，反而拍不出冰场的那种"瞬间感"。胶片自己有一种迟疑，它跟不上人，但正因为跟不上，它把"无法被定格的东西"留了下来。',
      '一卷36张，我留下了11张能看的，其中3张让我哭了。',
      '冰刃划出的弧线在胶片上变成了一条柔软的光带，运动员的脸是糊的，但你能感觉到她在笑。那种"感觉"才是花滑真正的样子吧。'
    ].join('\n\n'),
    likes:521, liked:false,
  },
};

// post id → array of comments
const COMMENTS = {
  1: [
    {id:101, user:'silent_skater', avatar:'S', bg:'linear-gradient(135deg,#d8a8c0,#a87898)', text:'天と地と的那段4分钟简直把我钉在椅子上，旋转的最后一圈他眼神是放空的，那种状态太可怕了。', time:'1小时前', likes:42, liked:false},
    {id:102, user:'haru_winter', avatar:'H', bg:'linear-gradient(135deg,#a8bcd4,#5878a0)', text:'同感！而且他的旋转从不"炫技"，永远在为情绪服务。这一点很多技术更花哨的选手反而做不到。', time:'1小时前', likes:28, liked:false},
    {id:103, user:'icefield_42', avatar:'I', bg:'linear-gradient(135deg,#b0a8d8,#7060a0)', text:'楼主能不能写一篇专门分析他的旋转编排逻辑？我一直觉得他的旋转和别人是两个范式。', time:'45分钟前', likes:17, liked:false},
    {id:104, user:'paper_moon_', avatar:'P', bg:'linear-gradient(135deg,#c8b8a0,#988068)', text:'看完这段我去重新看了一遍SEIMEI，更明白你说的"压缩空间"是什么意思了。', time:'32分钟前', likes:9, liked:false},
    {id:105, user:'kenji_obs', avatar:'K', bg:'linear-gradient(135deg,#8ca8c0,#506880)', text:'技术细节上还可以补充一点——他的换足旋转在加速阶段髋部下沉幅度比绝大多数选手更大，这是为什么旋转看起来更"扎实"。', time:'28分钟前', likes:35, liked:false},
    {id:106, user:'wisteria.x', avatar:'W', bg:'linear-gradient(135deg,#c8a8c8,#886888)', text:'感谢分享，正在写论文，这段观察对我特别有用。', time:'15分钟前', likes:6, liked:false},
    {id:107, user:'midwinter_', avatar:'M', bg:'linear-gradient(135deg,#a0b8c8,#607888)', text:'屏住呼吸这个描述太准确了，每次看他的Hydroblading我也是这样。', time:'8分钟前', likes:12, liked:false},
  ],
  2: [
    {id:201, user:'tulle_studio', avatar:'T', bg:'linear-gradient(135deg,#d8b8c0,#a87890)', text:'作为做服装的，太认同！哑光珠片的处理需要的工时比亮片高三倍以上，但是效果天差地别。', time:'3小时前', likes:38, liked:false},
    {id:202, user:'lavender_lin', avatar:'L', bg:'linear-gradient(135deg,#b0a0c8,#807090)', text:'她的造型师太懂她了。其实坂本本人的肢体张力已经很强，考斯滕做得"安静"反而更能凸显她。', time:'2小时前', likes:24, liked:false},
    {id:203, user:'kyoto_grey', avatar:'K', bg:'linear-gradient(135deg,#a8b8a8,#688068)', text:'渐变色裙在冰场灯光下不容易翻车，但她那条裙摆的剪裁是真的精准，旋转时裙摆的弧线和身体的弧线是平行的。', time:'2小时前', likes:31, liked:false},
    {id:204, user:'minor_seventh', avatar:'M', bg:'linear-gradient(135deg,#c0a8a8,#907878)', text:'对比某些选手亮片堆砌的考斯滕，简直天壤之别。少即是多在花滑里太适用了。', time:'1小时前', likes:19, liked:false},
    {id:205, user:'snow_petal', avatar:'S', bg:'linear-gradient(135deg,#a8c8c8,#688888)', text:'她每个赛季的考斯滕都在进步，从早期的"漂亮"到现在的"克制有力"，是看着她在成长。', time:'45分钟前', likes:14, liked:false},
    {id:206, user:'cyan_fold', avatar:'C', bg:'linear-gradient(135deg,#a0c0d0,#6080a0)', text:'你最后那句"让你看不见它，只看见这个人在冰上想说的话"，可以印在所有运动服装设计课的第一页。', time:'30分钟前', likes:27, liked:false},
  ],
  3: [
    {id:301, user:'film_grain_', avatar:'F', bg:'linear-gradient(135deg,#b0c0a8,#708070)', text:'胶片+花滑这个组合真的绝配。数码太忠实，反而少了"记忆感"。', time:'昨天', likes:52, liked:false},
    {id:302, user:'kodak_lens', avatar:'K', bg:'linear-gradient(135deg,#c0a880,#907060)', text:'用什么相机+什么胶卷拍的呀？想试试。', time:'昨天', likes:18, liked:false},
    {id:303, user:'snowdrift.s', avatar:'S', bg:'linear-gradient(135deg,#a0c8d8,#80a8b8)', text:'回楼上：Canon AE-1+Portra 400，光圈f2.8，慢门1/30。', time:'昨天', likes:34, liked:true},
    {id:304, user:'shadow_blade', avatar:'S', bg:'linear-gradient(135deg,#888aa8,#585878)', text:'能不能发出来看看完整的11张啊！', time:'昨天', likes:23, liked:false},
    {id:305, user:'rink_diary', avatar:'R', bg:'linear-gradient(135deg,#c8b0a8,#988078)', text:'"它跟不上人，但正因为跟不上，它把无法被定格的东西留了下来。" 这句话我要抄下来。', time:'12小时前', likes:46, liked:false},
    {id:306, user:'twilight_tea', avatar:'T', bg:'linear-gradient(135deg,#b8a8c8,#887898)', text:'这就是模糊摄影的浪漫，照片不再是记录，而是情绪的容器。', time:'8小时前', likes:21, liked:false},
    {id:307, user:'after_eight', avatar:'A', bg:'linear-gradient(135deg,#a8c8b8,#688878)', text:'让她哭的那三张是哪一张能再分享一下吗？想看。', time:'5小时前', likes:11, liked:false},
    {id:308, user:'velvet_arc', avatar:'V', bg:'linear-gradient(135deg,#c8a8b0,#988088)', text:'胶片拍运动其实是非常反直觉的选择，但确实能拍出"心理时间"而不是物理时间。👏', time:'3小时前', likes:17, liked:false},
  ],
};

// User-created posts (also goes into POSTS but listed separately at top)
const USER_POSTS = []; // {id, user, avatar, ...}

let currentPostId = null;

function openPost(id){
  currentPostId = id;
  const p = POSTS[id];
  if(!p) return;
  
  // Build content
  const imgSrc = p.imgSrc || (document.getElementById(p.imgId) ? document.getElementById(p.imgId).src : '');
  const heroImg = imgSrc ? `<img src="${imgSrc}" alt="">` : `<div style="position:absolute;inset:0;background:linear-gradient(135deg,#1a2d45,#0d1520);"></div>`;
  const avatarStyle = p.avatarBg ? `background:${p.avatarBg};` : '';
  const comments = COMMENTS[id] || [];
  const commentsHTML = comments.map(c => renderComment(c, id)).join('');
  
  document.getElementById('pd-content').innerHTML = `
    <div class="pd-hero">${heroImg}<div class="pd-hero-overlay"></div></div>
    <div class="pd-body">
      <div class="pd-meta">
        <div class="pd-avatar" style="${avatarStyle}">${p.avatar}</div>
        <div class="pd-user-wrap">
          <div class="pd-user-name">${p.user}</div>
          <div class="pd-user-time">${p.time}</div>
        </div>
        <div class="pd-follow" id="pd-follow" onclick="toggleFollow(this)">关注</div>
      </div>
      <div class="pd-title">${p.title}</div>
      <div class="pd-content">${p.content.split('\n\n').map(t=>`<p>${escapeHtml(t)}</p>`).join('')}</div>
      <div class="pd-tag-row"><div class="pd-tag">${p.tag}</div></div>
      <div class="pd-stats">
        <div class="pd-stat ${p.liked?'liked':''}" id="pd-like" onclick="togglePostLike()">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span id="pd-like-count">${p.likes}</span>
        </div>
        <div class="pd-stat">
          <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span id="pd-cmt-count">${comments.length}</span>
        </div>
        <div class="pd-stat">
          <svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          <span>分享</span>
        </div>
      </div>
      <div class="pd-comments-hdr">评论 <span class="pd-comments-hdr-count">(${comments.length})</span></div>
      <div id="pd-comments">${commentsHTML}</div>
    </div>
  `;
  
  goPage('p-post-detail');
  document.getElementById('pd-input').value = '';
  updateSendBtn();
}

function renderComment(c, postId){
  return `<div class="pd-comment" data-cid="${c.id}">
    <div class="pd-c-avatar" style="background:${c.bg};">${c.avatar}</div>
    <div class="pd-c-body">
      <div class="pd-c-name">${c.user}</div>
      <div class="pd-c-text">${escapeHtml(c.text)}</div>
      <div class="pd-c-meta">
        <div class="pd-c-time">${c.time}</div>
        <div class="pd-c-like ${c.liked?'liked':''}" onclick="toggleCommentLike(${postId},${c.id},this)">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span>${c.likes}</span>
        </div>
      </div>
    </div>
  </div>`;
}

function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

function togglePostLike(){
  const p = POSTS[currentPostId]; if(!p) return;
  p.liked = !p.liked;
  p.likes += p.liked?1:-1;
  const el = document.getElementById('pd-like');
  el.classList.toggle('liked', p.liked);
  document.getElementById('pd-like-count').textContent = p.likes;
}

function toggleCommentLike(postId, cid, el){
  const list = COMMENTS[postId]; if(!list) return;
  const c = list.find(x=>x.id===cid); if(!c) return;
  c.liked = !c.liked;
  c.likes += c.liked?1:-1;
  el.classList.toggle('liked', c.liked);
  el.querySelector('span').textContent = c.likes;
}

function toggleFollow(el){
  const following = el.classList.toggle('following');
  el.textContent = following ? '已关注' : '关注';
}

function updateSendBtn(){
  const v = document.getElementById('pd-input').value.trim();
  document.getElementById('pd-send-btn').classList.toggle('disabled', v.length===0);
}

function sendComment(){
  const v = document.getElementById('pd-input').value.trim();
  if(!v || currentPostId==null) return;
  const list = COMMENTS[currentPostId] = COMMENTS[currentPostId]||[];
  const c = {id:Date.now(), user:'abcdefghi_lmn', avatar:'A', bg:'linear-gradient(135deg,#a8bcd4,#b0a8d8)', text:v, time:'刚刚', likes:0, liked:false};
  list.push(c);
  document.getElementById('pd-comments').insertAdjacentHTML('beforeend', renderComment(c, currentPostId));
  document.getElementById('pd-input').value = '';
  document.getElementById('pd-cmt-count').textContent = list.length;
  document.querySelector('.pd-comments-hdr-count').textContent = `(${list.length})`;
  updateSendBtn();
  // Scroll to bottom
  const sc = document.getElementById('pd-scroll');
  sc.scrollTop = sc.scrollHeight;
  showToast('评论已发送');
}

/* ════════════════════════════════════════════════════════════
   NEW SHEET / COMPOSER
   ════════════════════════════════════════════════════════════ */

function openNewSheet(){
  const phone = document.querySelector('.phone');
  const mask = document.createElement('div');
  mask.className = 'sheet-mask';
  mask.id = 'new-sheet-mask';
  mask.onclick = (e)=>{ if(e.target===mask) closeSheet('new-sheet-mask'); };
  mask.innerHTML = `
    <div class="sheet">
      <div class="sheet-handle"></div>
      <div class="sheet-title">创建</div>
      <div class="sheet-sub">你想分享什么？</div>
      <div class="sheet-opt" onclick="startCompose('article')">
        <div class="sheet-opt-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg></div>
        <div class="sheet-opt-text">
          <div class="sheet-opt-ttl">写文章</div>
          <div class="sheet-opt-sub">发布到社区，与同好者分享你的观察</div>
        </div>
        <div class="sheet-opt-arr"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </div>
      <div class="sheet-opt" onclick="startCompose('note')">
        <div class="sheet-opt-icon"><svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></div>
        <div class="sheet-opt-text">
          <div class="sheet-opt-ttl">写笔记</div>
          <div class="sheet-opt-sub">仅自己可见，保存到「我的」页面</div>
        </div>
        <div class="sheet-opt-arr"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </div>
      <div class="sheet-cancel" onclick="closeSheet('new-sheet-mask')">取消</div>
    </div>
  `;
  phone.appendChild(mask);
}

function closeSheet(id){
  const el = document.getElementById(id);
  if(el) el.remove();
}

function startCompose(kind){
  closeSheet('new-sheet-mask');
  if(kind==='article'){
    document.getElementById('article-title').value='';
    document.getElementById('article-body').value='';
    document.getElementById('article-count').textContent='0 字';
    document.querySelectorAll('#article-tag-row .composer-tag').forEach(t=>t.classList.remove('active'));
    checkArticleReady();
    goPage('p-compose-article');
    setTimeout(()=>document.getElementById('article-title').focus(),200);
  } else {
    document.getElementById('note-title').value='';
    document.getElementById('note-body').value='';
    document.getElementById('note-count').textContent='0 字';
    checkNoteReady();
    goPage('p-compose-note');
    setTimeout(()=>document.getElementById('note-title').focus(),200);
  }
}

function cancelCompose(){
  goBack();
}

function selectTag(el){
  document.querySelectorAll('#article-tag-row .composer-tag').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  checkArticleReady();
}

function checkArticleReady(){
  const t = document.getElementById('article-title').value.trim();
  const b = document.getElementById('article-body').value.trim();
  const hasTag = !!document.querySelector('#article-tag-row .composer-tag.active');
  const ready = t && b && hasTag;
  document.getElementById('article-publish-btn').classList.toggle('disabled', !ready);
  document.getElementById('article-count').textContent = (t.length+b.length)+' 字';
}

function checkNoteReady(){
  const t = document.getElementById('note-title').value.trim();
  const b = document.getElementById('note-body').value.trim();
  const ready = t || b;
  document.getElementById('note-publish-btn').classList.toggle('disabled', !ready);
  document.getElementById('note-count').textContent = (t.length+b.length)+' 字';
}

function publishArticle(){
  if(document.getElementById('article-publish-btn').classList.contains('disabled'))return;
  const title = document.getElementById('article-title').value.trim();
  const body = document.getElementById('article-body').value.trim();
  const tagEl = document.querySelector('#article-tag-row .composer-tag.active');
  const tag = tagEl ? tagEl.textContent : '其他';
  const id = Date.now();
  const post = {
    id, user:'abcdefghi_lmn', avatar:'A', avatarBg:'linear-gradient(135deg,#a8bcd4,#b0a8d8)',
    time:'刚刚', tag, title, content:body, likes:0, liked:false,
    imgId:null, imgSrc:null, isUser:true,
  };
  POSTS[id] = post;
  COMMENTS[id] = [];
  USER_POSTS.unshift(post);
  renderUserPosts();
  
  // Pop both compose page and any history
  pageHistory = pageHistory.filter(p=>p!=='p-compose-article');
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('p-community').classList.add('active');
  document.querySelector('#p-community .scroll-area').scrollTop = 0;
  setNavById('p-community');
  showToast('文章已发布到社区 ✓');
}

function setNavById(pageId){
  const map = {'p-home':0,'p-community':1,'p-discover':2,'p-shop':3,'p-favorites':4,'p-profile':5};
  const idx = map[pageId];
  if(idx==null)return;
  document.querySelectorAll('.bottom-nav .nav-item').forEach((n,i)=>n.classList.toggle('active', i===idx));
}

function renderUserPosts(){
  const wrap = document.getElementById('user-posts-container');
  if(!wrap) return;
  wrap.innerHTML = USER_POSTS.map(p => `
    <div class="post-card" onclick="openPost(${p.id})">
      <div class="post-body" style="padding:16px 16px 14px;">
        <div class="post-top">
          <div class="post-avatar" style="background:${p.avatarBg};">${p.avatar}</div>
          <div class="post-user">${p.user}</div>
          <div class="post-time">${p.time}</div>
          <div style="margin-left:auto;font-size:9px;color:var(--holo1);background:rgba(168,188,212,0.1);padding:3px 8px;border-radius:8px;letter-spacing:0.04em;">我的</div>
        </div>
        <div class="post-title">${escapeHtml(p.title)}</div>
        <div class="post-excerpt">${escapeHtml(p.content.slice(0,90))}${p.content.length>90?'…':''}</div>
        <div class="post-footer">
          <div class="post-tag">${p.tag}</div>
          <div class="post-actions">
            <div class="post-action"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg><span>${p.likes}</span></div>
            <div class="post-action"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><span>${(COMMENTS[p.id]||[]).length}</span></div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ════════════════════════════════════════════════════════════
   NOTES (private — saved to profile)
   ════════════════════════════════════════════════════════════ */

const MY_NOTES = [
  {id:1001, title:'看 SEIMEI 的笔记', body:'今天又看了一遍SEIMEI，记下几个一直没注意的细节：\n\n1. 第38秒袖摆的处理，他刻意让袖子在转身时拖了一拍，像水墨晕开\n2. 步法中段那个长滑出，膝盖的微弯角度其实和能剧的"摺"是同一个语言\n3. 4回转跳的预备步比一般选手长两步，给自己制造心理空间', date:'2026·05·12'},
  {id:1002, title:'考斯滕收藏清单', body:'想做一份历年最爱考斯滕的清单：\n\n· 羽生 SEIMEI（2015）—— 阴阳师袍\n· 坂本花织 蓝黑渐变（2024世锦赛）\n· 金妍儿 红裙（2010温哥华）\n· 浅田真央 黑色 SP（2014）\n\n共同点：色彩克制，刺绣不抢戏。', date:'2026·05·08'},
];

function publishNote(){
  if(document.getElementById('note-publish-btn').classList.contains('disabled'))return;
  const title = document.getElementById('note-title').value.trim();
  const body = document.getElementById('note-body').value.trim();
  const now = new Date();
  const datestr = `${now.getFullYear()}·${String(now.getMonth()+1).padStart(2,'0')}·${String(now.getDate()).padStart(2,'0')}`;
  MY_NOTES.unshift({id:Date.now(), title: title||'无标题', body: body||'(无内容)', date:datestr});
  renderNotes();
  
  pageHistory = pageHistory.filter(p=>p!=='p-compose-note');
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('p-profile').classList.add('active');
  document.querySelector('#p-profile .scroll-area').scrollTop = 0;
  setNavById('p-profile');
  showToast('笔记已保存到「我的」 ✓');
}

function renderNotes(){
  const list = document.getElementById('prof-notes-list');
  const countEl = document.getElementById('prof-notes-count');
  if(!list) return;
  countEl.textContent = MY_NOTES.length + ' 篇';
  if(MY_NOTES.length===0){
    list.innerHTML = `<div class="note-empty-mini">还没有私人笔记<br>从社区页右下角「+」开始</div>`;
    return;
  }
  list.innerHTML = MY_NOTES.map(n => `
    <div class="note-card" onclick="openNote(${n.id})">
      <div class="note-delete" onclick="deleteNote(event,${n.id})"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"></path></svg></div>
      <div class="note-ttl">${escapeHtml(n.title)}</div>
      <div class="note-excerpt">${escapeHtml(n.body.replace(/\n/g,' '))}</div>
      <div class="note-date">${n.date}</div>
    </div>
  `).join('');
}

function openNote(id){
  const n = MY_NOTES.find(x=>x.id===id); if(!n) return;
  document.getElementById('note-detail-body').innerHTML = `
    <div style="font-size:9px;letter-spacing:0.1em;color:var(--dim);text-transform:uppercase;margin-bottom:10px;">私人笔记 · ${n.date}</div>
    <div class="pd-title" style="margin-bottom:18px;">${escapeHtml(n.title)}</div>
    <div class="pd-content">${n.body.split('\n').map(l=>l?`<p>${escapeHtml(l)}</p>`:'<p>&nbsp;</p>').join('')}</div>
  `;
  goPage('p-note-detail');
}

function deleteNote(e, id){
  e.stopPropagation();
  const i = MY_NOTES.findIndex(n=>n.id===id);
  if(i>-1) MY_NOTES.splice(i,1);
  renderNotes();
  showToast('已删除');
}

/* ════════════════════════════════════════════════════════════
   SHOP / CART / CHECKOUT
   ════════════════════════════════════════════════════════════ */

const PRODUCTS = {
  hoodie: {name:'迷幻紫雾考斯滕纹样卫衣', cat:'印花卫衣', price:358, imgId:'img-shop-hoodie'},
  tote: {name:'冰湖倒影刺绣托特包', cat:'帆布袋', price:228, imgId:'img-shop-tote'},
  phone: {name:'粉尘浪漫磨砂保护壳', cat:'手机壳', price:128, imgId:'img-shop-phone'},
  notebook: {name:'暗夜独白皮质手账本', cat:'笔记本', price:168, imgId:'img-shop-notebook'},
  mug: {name:'冰晶折射陶瓷马克杯', cat:'马克杯', price:98, imgId:'img-shop-mug'},
  scarf: {name:'米兰冬奥印花方巾', cat:'丝巾', price:288, imgId:'img-shop-scarf'},
};

let CART = []; // {key, qty}
let selectedPayMethod = 'wechat';

function addToCart(e, key){
  e.stopPropagation();
  const existing = CART.find(c=>c.key===key);
  if(existing) existing.qty++;
  else CART.push({key, qty:1});
  
  // Animate
  e.currentTarget.classList.remove('added');
  void e.currentTarget.offsetWidth;
  e.currentTarget.classList.add('added');
  
  const fab = document.getElementById('shop-cart-fab');
  fab.classList.remove('bump');
  void fab.offsetWidth;
  fab.classList.add('bump');
  
  updateCartBadge();
  showToast(`已加入购物车 · ¥${PRODUCTS[key].price}`);
}

function cartCount(){ return CART.reduce((s,c)=>s+c.qty,0); }
function cartTotal(){ return CART.reduce((s,c)=>s+c.qty*PRODUCTS[c.key].price,0); }

function updateCartBadge(){
  const n = cartCount();
  const badge = document.getElementById('cart-fab-badge');
  const hBadge = document.getElementById('shop-header-badge');
  if(badge){
    badge.textContent = n;
    badge.style.display = n>0?'flex':'none';
  }
  if(hBadge){
    hBadge.textContent = n;
    hBadge.style.display = n>0?'flex':'none';
  }
}

function renderCart(){
  const wrap = document.getElementById('cart-list-wrap');
  const countEl = document.getElementById('cart-count');
  const summary = document.getElementById('cart-summary');
  countEl.textContent = cartCount()+' 件';
  
  if(CART.length===0){
    wrap.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon"><svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg></div>
        <div class="cart-empty-ttl">购物车还是空的</div>
        <div class="cart-empty-sub">回到周边页，逛一逛<br>米兰冬奥纪念款限定系列</div>
      </div>
    `;
    summary.style.display = 'none';
    return;
  }
  
  wrap.innerHTML = `<div class="cart-list">${CART.map((c,i)=>{
    const p = PRODUCTS[c.key];
    let imgInner;
    if(p.isCustom && p.customSvg){
      imgInner = p.customSvg;
    } else {
      const imgEl = p.imgId ? document.getElementById(p.imgId) : null;
      const imgSrc = imgEl && imgEl.src ? imgEl.src : '';
      imgInner = imgSrc?`<img src="${imgSrc}" alt="">`:'';
    }
    return `
      <div class="cart-item">
        <div class="cart-item-img">${imgInner}</div>
        <div class="cart-item-info">
          <div class="cart-item-cat">${p.cat}</div>
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-bot">
            <div class="cart-item-price">¥${p.price}</div>
            <div class="cart-qty">
              <div class="cart-qty-btn" onclick="changeQty(${i},-1)">−</div>
              <div class="cart-qty-num">${c.qty}</div>
              <div class="cart-qty-btn" onclick="changeQty(${i},1)">+</div>
            </div>
          </div>
        </div>
        <div class="cart-item-del" onclick="removeFromCart(${i})"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
      </div>
    `;
  }).join('')}</div>`;
  
  document.getElementById('cart-total-num').textContent = cartTotal();
  summary.style.display = 'block';
}

function changeQty(i, delta){
  if(!CART[i]) return;
  CART[i].qty += delta;
  if(CART[i].qty<1) CART.splice(i,1);
  updateCartBadge();
  renderCart();
}

function removeFromCart(i){
  CART.splice(i,1);
  updateCartBadge();
  renderCart();
}

function openCheckout(){
  if(CART.length===0)return;
  const phone = document.querySelector('.phone');
  const mask = document.createElement('div');
  mask.className='sheet-mask';
  mask.id='checkout-mask';
  mask.onclick=(e)=>{if(e.target===mask) closeSheet('checkout-mask');};
  mask.innerHTML = `
    <div class="sheet">
      <div class="sheet-handle"></div>
      <div class="pay-sheet-title">确认支付</div>
      <div class="pay-sheet-sub">共 ${cartCount()} 件商品</div>
      <div class="pay-total"><span>¥</span>${cartTotal()}</div>
      <div class="pay-method ${selectedPayMethod==='wechat'?'selected':''}" onclick="selectPay('wechat',this)">
        <div class="pay-method-icon wechat">微</div>
        <div class="pay-method-text">
          <div class="pay-method-name">微信支付</div>
          <div class="pay-method-sub">推荐使用</div>
        </div>
        <div class="pay-radio"></div>
      </div>
      <div class="pay-method ${selectedPayMethod==='alipay'?'selected':''}" onclick="selectPay('alipay',this)">
        <div class="pay-method-icon alipay">支</div>
        <div class="pay-method-text">
          <div class="pay-method-name">支付宝</div>
          <div class="pay-method-sub">花呗 / 余额</div>
        </div>
        <div class="pay-radio"></div>
      </div>
      <div class="pay-method ${selectedPayMethod==='bank'?'selected':''}" onclick="selectPay('bank',this)">
        <div class="pay-method-icon bank">卡</div>
        <div class="pay-method-text">
          <div class="pay-method-name">银行卡支付</div>
          <div class="pay-method-sub">招行 · 尾号 **** 4823</div>
        </div>
        <div class="pay-radio"></div>
      </div>
      <button class="pay-confirm-btn" onclick="processPayment()">立即支付 ¥${cartTotal()}</button>
      <div class="sheet-cancel" onclick="closeSheet('checkout-mask')">取消</div>
    </div>
  `;
  phone.appendChild(mask);
}

function selectPay(method, el){
  selectedPayMethod = method;
  el.parentElement.querySelectorAll('.pay-method').forEach(m=>m.classList.remove('selected'));
  el.classList.add('selected');
}

function processPayment(){
  closeSheet('checkout-mask');
  const phone = document.querySelector('.phone');
  const methodNames = {wechat:'微信支付', alipay:'支付宝', bank:'银行卡支付'};
  const mask = document.createElement('div');
  mask.className='sheet-mask center';
  mask.id='processing-mask';
  mask.innerHTML = `
    <div class="sheet center">
      <div class="pay-processing">
        <div class="pay-spinner"></div>
        <div class="pay-processing-ttl">正在使用${methodNames[selectedPayMethod]}付款</div>
        <div class="pay-processing-sub">请稍候…</div>
      </div>
    </div>
  `;
  phone.appendChild(mask);
  
  const total = cartTotal();
  const method = methodNames[selectedPayMethod];
  setTimeout(()=>{
    closeSheet('processing-mask');
    CART = [];
    updateCartBadge();
    renderCart();
    showSuccess(total, method);
  }, 1600);
}

function showSuccess(total, method){
  const phone = document.querySelector('.phone');
  const mask = document.createElement('div');
  mask.className='sheet-mask center';
  mask.id='success-mask';
  mask.innerHTML = `
    <div class="sheet center">
      <div class="pay-success">
        <div class="pay-success-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
        <div class="pay-success-ttl">支付成功</div>
        <div class="pay-success-amt">¥${total}</div>
        <div class="pay-success-method">${method} · 订单已确认</div>
        <div>
          <button class="pay-success-btn" onclick="closeSheet('success-mask')">完成</button>
          <button class="pay-success-btn primary" onclick="closeSheet('success-mask');goPage('p-shop')">继续购物</button>
        </div>
      </div>
    </div>
  `;
  phone.appendChild(mask);
}

/* ════════════════════════════════════════════════════════════
   TOAST
   ════════════════════════════════════════════════════════════ */
let toastTimeout = null;
function showToast(msg){
  const phone = document.querySelector('.phone');
  const existing = document.querySelector('.toast');
  if(existing) existing.remove();
  if(toastTimeout) clearTimeout(toastTimeout);
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  phone.appendChild(t);
  toastTimeout = setTimeout(()=>t.remove(), 1800);
}

/* ════════════════════════════════════════════════════════════
   PATCH: render cart when entering page
   ════════════════════════════════════════════════════════════ */
const _origGoPage = goPage;
goPage = function(id){
  _origGoPage(id);
  if(id==='p-cart') renderCart();
};

// Initial renders
renderNotes();
updateCartBadge();
renderUserPosts();

/* ════════════════════════════════════════════════════════════
   缪斯 — MUSE 预设问答（暂未接入 API，问题与回答均为预设内容）
   ════════════════════════════════════════════════════════════ */

const MUSE_PRESETS = [
  {q:'什么是花滑里的「物哀」？', a:'物哀是对易逝之物的凝视。冰面本身就是它的载体——刀痕转瞬即被抹去，姿态定格只在你看见的那一秒。真正的物哀感，往往藏在动作收束时那一点犹豫里，仿佛在说，别急，让这一秒再长一点。'},
  {q:'羽生的旋转和别人有什么不一样？', a:'大多数人的旋转追求速度与稳定，他的旋转更像一次呼吸的延长。轴心几乎不晃动，节奏里却带着停顿感，像是给音乐留白，而不是被音乐推着走。这种从容，才是最难模仿的部分。'},
  {q:'推荐一段适合悲剧浪漫风格的配乐', a:'试试拉赫玛尼诺夫的第二钢琴协奏曲，或是改编版的《月光奏鸣曲》。悲剧浪漫需要的不是悲伤本身，而是明知结局仍要往前滑的那种坚持，配乐要托得住这份重量。'},
  {q:'考斯滕的颜色为什么这么重要？', a:'颜色先于动作抵达观众。冷色调让人先感到疏离与孤独，暖色调则替选手把情绪提前说出口。好的考斯滕颜色不是好看，而是替编舞多讲一句话，在灯光扫过的瞬间。'},
  {q:'编舞里最容易被忽略的细节是什么？', a:'手指的收尾。多数人只看跳跃和旋转，但指尖延伸的角度决定了整套节目的呼吸感。收得太急情绪就断了，放得太松又显得漫不经心。真正的高手，连指尖都在讲故事。'},
  {q:'为什么有些节目让人一看就想哭？', a:'因为它诚实。技术可以练出来，但那种让人鼻酸的瞬间，往往来自选手把私人的记忆悄悄放进了动作里。你看到的不是完美，而是一个人愿意在冰上暴露自己的脆弱。'}
];

const MUSE_FALLBACK = '这个问题我还没准备好答案，先聊聊下面这些吧——等我准备得再充分一些，就能接住更多话题了。';

const museAskedQuestions = new Set();
let museSending = false;

function museInputChange(){
  const inp = document.getElementById('muse-input');
  inp.style.height = 'auto';
  inp.style.height = Math.min(90, inp.scrollHeight) + 'px';
  document.getElementById('muse-send-btn').classList.toggle('disabled', !inp.value.trim() || museSending);
}

function museKey(e){
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    museSend();
  }
}

function museSendChip(el){
  museAsk(el.textContent.trim());
}

function museSend(){
  const inp = document.getElementById('muse-input');
  const text = inp.value.trim();
  if(!text || museSending) return;
  inp.value = '';
  inp.style.height = 'auto';
  museInputChange();
  museAsk(text);
}

function museAsk(text){
  if(museSending || !text) return;
  museSending = true;

  // Hide intro after first message
  const intro = document.getElementById('muse-intro');
  if(intro) intro.style.display = 'none';

  // Remove any dangling chip prompt from a previous turn
  const oldChips = document.getElementById('muse-followup');
  if(oldChips) oldChips.remove();

  museAskedQuestions.add(text);

  const msgs = document.getElementById('muse-msgs');
  msgs.insertAdjacentHTML('beforeend', `
    <div class="muse-msg muse-msg-user">
      <div class="muse-msg-user-bubble">${escapeHtml(text)}</div>
    </div>
  `);

  const typingId = 'muse-typing-' + Date.now();
  msgs.insertAdjacentHTML('beforeend', `
    <div class="muse-msg muse-msg-ai" id="${typingId}">
      <div class="muse-msg-ai-prefix">
        <div class="muse-msg-ai-orb"></div>
        <div class="muse-msg-ai-name">缪 斯</div>
      </div>
      <div class="muse-typing"><div class="muse-typing-dot"></div><div class="muse-typing-dot"></div><div class="muse-typing-dot"></div></div>
    </div>
  `);
  museInputChange();
  scrollMuseToBottom();

  const preset = MUSE_PRESETS.find(p => p.q === text);
  const answer = preset ? preset.a : MUSE_FALLBACK;

  setTimeout(() => {
    const typingEl = document.getElementById(typingId);
    if(typingEl){
      typingEl.querySelector('.muse-typing').outerHTML = `<div class="muse-msg-ai-text"><p>${escapeHtml(answer)}</p></div>`;
    }
    museSending = false;
    museInputChange();
    museRenderFollowups();
    scrollMuseToBottom();
  }, 900);
}

function museRenderFollowups(){
  const remaining = MUSE_PRESETS.filter(p => !museAskedQuestions.has(p.q));
  if(!remaining.length) return;

  const msgs = document.getElementById('muse-msgs');
  const chips = remaining.slice(0, 4).map(p =>
    `<div class="muse-chip" onclick="museSendChip(this)">${escapeHtml(p.q)}</div>`
  ).join('');
  msgs.insertAdjacentHTML('beforeend', `
    <div class="muse-chip-row" id="muse-followup">${chips}</div>
  `);
  scrollMuseToBottom();
}

function scrollMuseToBottom(){
  const sc = document.getElementById('muse-scroll');
  if(sc) sc.scrollTop = sc.scrollHeight;
}

/* ════════════════════════════════════════════════════════════
   BLING ARC — YEAR IN REVIEW
   ════════════════════════════════════════════════════════════ */

const ARC_SLIDES = [
  {img:'arc8', html:`
    <div class="arc-eyebrow">BLING ARC · 2026</div>
    <div class="arc-hero">你的<br><em>冰封档案</em></div>
    <div class="arc-meta" style="margin-top:18px;">从一月的第一片雪，到十一月的最后一次落冰——这是属于你的一年弧线。</div>
  `},
  {img:'arc10', html:`
    <div class="arc-eyebrow">在 BLING 停留</div>
    <div class="arc-num"><em>47</em></div>
    <div class="arc-cap">小时<br>陪你一起看冰</div>
    <div class="arc-meta">大约相当于 47 个节目长度。或者，11 场完整的世锦赛。</div>
  `},
  {img:'arc9', html:`
    <div class="arc-eyebrow">最常翻阅的美学</div>
    <div class="arc-hero arc-hero-sm"><em>弧线美学</em></div>
    <div class="arc-cap" style="margin-top:14px;">你看了 18 篇相关文章</div>
    <div class="arc-meta">你似乎更被几何吸引——冰刃在空间里画出的句子，比技术分数更让你着迷。</div>
  `},
  {img:'arc4', html:`
    <div class="arc-eyebrow">你陪伴最久的运动员</div>
    <div class="arc-hero arc-hero-sm"><em>羽生</em>结弦</div>
    <div class="arc-cap" style="margin-top:14px;">23 次回访 · 9 个节目</div>
    <div class="arc-list">
      <div class="arc-list-row"><div class="arc-list-rank">01</div><div class="arc-list-name">羽生结弦</div><div class="arc-list-val">23 次</div></div>
      <div class="arc-list-row"><div class="arc-list-rank">02</div><div class="arc-list-name">坂本花织</div><div class="arc-list-val">14 次</div></div>
      <div class="arc-list-row"><div class="arc-list-rank">03</div><div class="arc-list-name">金妍儿</div><div class="arc-list-val">9 次</div></div>
      <div class="arc-list-row"><div class="arc-list-rank">04</div><div class="arc-list-name">Alysa Liu</div><div class="arc-list-val">6 次</div></div>
    </div>
  `},
  {img:'arc1', html:`
    <div class="arc-eyebrow">你重读最多的节目</div>
    <div class="arc-cap" style="font-size:14px;color:rgba(255,255,255,0.7);margin-bottom:10px;letter-spacing:0.1em;text-transform:uppercase;">2015–2016 · 羽生结弦</div>
    <div class="arc-hero"><em>SEIMEI</em></div>
    <div class="arc-meta" style="margin-top:18px;">你看了 7 次，每一次停留 4 分以上。这个节目可能比你想得更接近你。</div>
  `},
  {img:'arc3', html:`
    <div class="arc-eyebrow">收藏 · 笔记 · 文章</div>
    <div style="display:flex;align-items:baseline;gap:24px;margin:14px 0 18px;flex-wrap:wrap;">
      <div><div class="arc-num arc-num-sm" style="margin:0;">34</div><div class="arc-meta">收藏</div></div>
      <div><div class="arc-num arc-num-sm" style="margin:0;color:var(--holo2);"><em>12</em></div><div class="arc-meta">笔记</div></div>
      <div><div class="arc-num arc-num-sm" style="margin:0;">3</div><div class="arc-meta">发布</div></div>
    </div>
    <div class="arc-cap" style="font-size:16px;">"你在沉默里写下了 12 篇笔记。"</div>
  `},
  {img:'arc2', html:`
    <div class="arc-eyebrow">配乐 · 你最常按播放</div>
    <div class="arc-hero arc-hero-sm"><em>Delulu</em></div>
    <div class="arc-cap" style="font-size:14px;color:rgba(255,255,255,0.75);">kiiikiii · 47 次播放</div>
    <div class="arc-list">
      <div class="arc-list-row"><div class="arc-list-rank">01</div><div class="arc-list-name">Delulu</div><div class="arc-list-val">47×</div></div>
      <div class="arc-list-row"><div class="arc-list-rank">02</div><div class="arc-list-name">SEIMEI Theme</div><div class="arc-list-val">29×</div></div>
      <div class="arc-list-row"><div class="arc-list-rank">03</div><div class="arc-list-name">天と地と Suite</div><div class="arc-list-val">22×</div></div>
      <div class="arc-list-row"><div class="arc-list-rank">04</div><div class="arc-list-name">Otoñal</div><div class="arc-list-val">18×</div></div>
    </div>
  `},
  {img:'arc6', html:`
    <div class="arc-eyebrow">深夜读得最多的标签</div>
    <div class="arc-hero arc-hero-sm">悲剧<em>浪漫</em><br>主义</div>
    <div class="arc-meta" style="margin-top:18px;">凌晨 1 点到 3 点之间，你读完了 8 篇与这个标签相关的文章。冰上的故事，总在夜里最清楚。</div>
  `},
  {img:'arc5', html:`
    <div class="arc-eyebrow">你支持的限定款</div>
    <div class="arc-hero arc-hero-sm">米兰冬奥<br><em>纪念系列</em></div>
    <div class="arc-cap" style="font-size:14px;color:rgba(255,255,255,0.75);margin-top:14px;">3 件周边 · ¥814 总消费</div>
    <div class="arc-meta">你穿着它走出门、记在本子上、放在桌面——美学不再只在屏幕里。</div>
  `},
  {img:'arc7', html:`
    <div class="arc-eyebrow">2026 · 你是</div>
    <div class="arc-tag-card">
      <div class="arc-tag-label">YOUR AESTHETIC</div>
      <div class="arc-tag-name">悲剧浪漫<br>主义者</div>
    </div>
    <div class="arc-cap" style="font-size:15px;text-align:center;margin-bottom:6px;">"你听得见冰刃说话。"</div>
    <div class="arc-meta" style="text-align:center;max-width:none;">下个赛季，我们再见。</div>
    <button class="arc-final-btn" onclick="closeArc()">完 成</button>
  `},
];

let arcIdx = 0;
let arcAdvanceTimer = null;
let arcProgressTimer = null;
const ARC_DURATION = 5500;

function openArc(){
  arcIdx = 0;
  const phone = document.querySelector('.phone');
  const ov = document.createElement('div');
  ov.className = 'arc-overlay';
  ov.id = 'arc-overlay';
  ov.innerHTML = `
    <div class="arc-progress-row" id="arc-progress-row">
      ${ARC_SLIDES.map((_,i)=>`<div class="arc-progress" data-i="${i}"><div class="arc-progress-fill"></div></div>`).join('')}
    </div>
    <div class="arc-close" onclick="closeArc()"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
    <div class="arc-touch-left" onclick="arcPrev()"></div>
    <div class="arc-touch-right" onclick="arcNext()"></div>
    <div class="arc-slide" id="arc-slide">
      <div class="arc-slide-bg"></div>
    </div>
  `;
  phone.appendChild(ov);
  renderArcSlide();
}

function renderArcSlide(){
  const s = ARC_SLIDES[arcIdx];
  if(!s){ closeArc(); return; }
  const slide = document.getElementById('arc-slide');
  slide.className = 'arc-slide';
  // Trigger reflow for animation
  void slide.offsetWidth;
  const imgUrl = (window.__resources||{})[s.img];
  const bgHtml = imgUrl
    ? `<div class="arc-slide-img" style="background-image:url('${imgUrl}');"></div>`
    : `<div class="arc-slide-bg arc-bg-cover"></div>`;
  slide.innerHTML = `${bgHtml}${s.html}`;
  // Restart animation
  slide.style.animation = 'none';
  void slide.offsetWidth;
  slide.style.animation = '';
  
  // Update progress bars
  const bars = document.querySelectorAll('#arc-progress-row .arc-progress');
  bars.forEach((b,i)=>{
    const fill = b.querySelector('.arc-progress-fill');
    if(i < arcIdx){ fill.style.transition='none'; fill.style.width='100%'; }
    else if(i > arcIdx){ fill.style.transition='none'; fill.style.width='0%'; }
    else { fill.style.transition='none'; fill.style.width='0%'; void fill.offsetWidth; fill.style.transition=`width ${ARC_DURATION}ms linear`; fill.style.width='100%'; }
  });
  
  if(arcAdvanceTimer) clearTimeout(arcAdvanceTimer);
  if(arcIdx < ARC_SLIDES.length-1){
    arcAdvanceTimer = setTimeout(arcNext, ARC_DURATION);
  }
}

function arcNext(){
  if(arcIdx >= ARC_SLIDES.length-1) return;
  arcIdx++;
  renderArcSlide();
}
function arcPrev(){
  if(arcIdx <= 0) return;
  arcIdx--;
  renderArcSlide();
}
function closeArc(){
  if(arcAdvanceTimer) clearTimeout(arcAdvanceTimer);
  const el = document.getElementById('arc-overlay');
  if(el) el.remove();
}

/* ════════════════════════════════════════════════════════════
   MUSIC PRINT CUSTOM (5-step flow)
   ════════════════════════════════════════════════════════════ */

// Programs catalog
const PRINT_PROGRAMS = [
  {id:'seimei', name:'SEIMEI', athlete:'羽生结弦', year:'2015–2016', moods:[{name:'仪式',color:'#a83048'},{name:'阴阳',color:'#3a2858'},{name:'暗金',color:'#d4a448'}], palette:['#3a1830','#a83048','#d4a448','#0d0a18'], summary:'阴阳师袍袖划过冰面，仪式与战斗的边界变得模糊。深红与暗金在沉默的黑里燃烧。'},
  {id:'ten-chi', name:'天と地と', athlete:'羽生结弦', year:'2021–2022', moods:[{name:'孤高',color:'#7898b8'},{name:'冷蓝',color:'#3868a0'},{name:'静谧',color:'#e0e8f0'}], palette:['#0d1828','#3868a0','#7898b8','#e0e8f0'], summary:'一个人站在天与地之间。冷蓝是体温在冰上的颜色，静谧是没有听众的回声。'},
  {id:'otonal', name:'OTOÑAL', athlete:'羽生结弦', year:'2019–2020', moods:[{name:'秋日',color:'#d48848'},{name:'琥珀',color:'#a86838'},{name:'暮紫',color:'#684078'}], palette:['#2a1828','#684078','#a86838','#d48848'], summary:'秋日的忧郁被拉到极致。琥珀色的光与暮紫的影，每一次旋转都像最后一次道别。'},
  {id:'origin', name:'Origin', athlete:'羽生结弦', year:'2018–2019', moods:[{name:'史诗',color:'#384878'},{name:'星银',color:'#c0c8d8'},{name:'永恒',color:'#202840'}], palette:['#101828','#384878','#c0c8d8','#202840'], summary:'回到一切开始的地方。星银的轨迹在靛青的天里展开，宇宙在他脚下旋转。'},
  {id:'delulu', name:'Delulu', athlete:'kiiikiii', year:'2024', moods:[{name:'梦境',color:'#e8a8c8'},{name:'樱粉',color:'#f0c0d8'},{name:'浮光',color:'#f0e0e8'}], palette:['#583858','#e8a8c8','#f0c0d8','#f0e0e8'], summary:'梦境与现实之间的那一层雾。樱粉与浮光，是少女在冰面上画出的圆。'},
  {id:'butter', name:'Butterfly Lovers', athlete:'金博洋', year:'2017–2018', moods:[{name:'东方',color:'#88a888'},{name:'柳绿',color:'#a8c898'},{name:'胭脂',color:'#c84858'}], palette:['#1a2818','#88a888','#a8c898','#c84858'], summary:'梁祝的弧线在冰上展开。柳绿与胭脂，是一段东方爱情的色谱。'},
];

// Products catalog
const PRINT_PRODUCTS = [
  {id:'tshirt', name:'印花 T 恤', price:268, icon:'tshirt'},
  {id:'hoodie', name:'印花卫衣', price:398, icon:'hoodie'},
  {id:'pants', name:'印花直筒裤', price:328, icon:'pants'},
  {id:'shoes', name:'印花帆布鞋', price:498, icon:'shoes'},
  {id:'bag', name:'印花托特包', price:248, icon:'bag'},
  {id:'phonecase', name:'印花手机壳', price:148, icon:'phonecase'},
];

let ppStep = 0;
let ppState = {
  program: null,
  pattern: null, // {svg, name, seed}
  product: null,
};

function openPrintCustom(){
  ppStep = 0;
  ppState = {program:null, pattern:null, product:null};
  goPage('p-print-custom');
  renderPrintStep();
}

function renderPrintStep(){
  document.getElementById('pp-step-ind').textContent = (ppStep+1)+' / 5';
  const segs = document.querySelectorAll('#pp-progress .pp-progress-seg');
  segs.forEach((s,i)=>s.classList.toggle('active', i<=ppStep));
  const body = document.getElementById('pp-body');
  const ctaNext = document.getElementById('pp-cta-next');
  const ctaBack = document.getElementById('pp-cta-back');
  ctaBack.style.display = ppStep===0 ? 'none' : 'block';
  body.scrollTop = 0;
  
  if(ppStep===0){
    document.getElementById('pp-title').textContent = '选择节目';
    body.innerHTML = `
      <div class="pp-step-ttl">从哪一段<em>音乐</em>开始？</div>
      <div class="pp-step-sub">选一个最让你心动的节目配乐。我会从中提取氛围、色彩与节奏。</div>
      ${PRINT_PROGRAMS.map(p=>`
        <div class="pp-prog-card ${ppState.program?.id===p.id?'selected':''}" onclick="ppSelectProgram('${p.id}')">
          <div class="pp-prog-swatch" style="background:linear-gradient(135deg,${p.palette[0]},${p.palette[1]} 40%,${p.palette[2]} 70%,${p.palette[3]||p.palette[2]});"></div>
          <div class="pp-prog-info">
            <div class="pp-prog-name">${p.name}</div>
            <div class="pp-prog-meta">${p.athlete} · ${p.year}</div>
            <div class="pp-prog-mood">${p.moods.map(m=>m.name).join(' · ')}</div>
          </div>
        </div>
      `).join('')}
    `;
    ctaNext.textContent = '下一步';
    ctaNext.classList.toggle('disabled', !ppState.program);
  } else if(ppStep===1){
    document.getElementById('pp-title').textContent = '氛围解析';
    const p = ppState.program;
    body.innerHTML = `
      <div class="pp-step-ttl">这是<em>${p.name}</em><br>在我耳中的样子</div>
      <div class="pp-step-sub">${p.athlete} · ${p.year}</div>
      <div class="pp-mood-vis">${generateMoodVis(p)}
        <div class="pp-mood-vis-prog">
          <div class="pp-mood-vis-prog-name">${p.name}</div>
          <div class="pp-mood-vis-prog-meta">${p.athlete} · ${p.year}</div>
        </div>
      </div>
      <div class="pp-step-sub" style="margin-bottom:10px;">提取的氛围标签</div>
      <div class="pp-mood-tag-row">
        ${p.moods.map(m=>`<div class="pp-mood-tag"><span class="pp-mood-tag-emo">${m.name}</span> · <span style="color:${m.color};">${m.color.toUpperCase()}</span></div>`).join('')}
      </div>
      <div class="pp-mood-summary">${p.summary}</div>
    `;
    ctaNext.textContent = '生成印花';
    ctaNext.classList.remove('disabled');
  } else if(ppStep===2){
    document.getElementById('pp-title').textContent = '生成印花';
    if(!ppState.pattern){
      body.innerHTML = `
        <div class="pp-loading">
          <div class="pp-loading-orb"></div>
          <div class="pp-loading-text">正在编织你的印花…</div>
          <div class="pp-loading-sub">从配乐的色彩中</div>
        </div>
      `;
      ctaNext.classList.add('disabled');
      // Generate after delay
      setTimeout(()=>{
        ppState.pattern = generatePattern(ppState.program);
        renderPrintStep();
      }, 1400);
      return;
    }
    body.innerHTML = `
      <div class="pp-pattern-frame">${ppState.pattern.svg}</div>
      <div class="pp-pattern-name">"${ppState.pattern.name}"</div>
      <div class="pp-pattern-caption">${ppState.pattern.caption}</div>
      <div class="pp-refresh-btn" onclick="ppRefreshPattern()">
        <svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
        <span>再来一张</span>
      </div>
    `;
    ctaNext.textContent = '用这张印花';
    ctaNext.classList.remove('disabled');
  } else if(ppStep===3){
    document.getElementById('pp-title').textContent = '选择单品';
    body.innerHTML = `
      <div class="pp-step-ttl">穿在<em>哪里</em>？</div>
      <div class="pp-step-sub">选择一件单品，把这张印花穿/带在身上。</div>
      <div class="pp-prod-grid">
        ${PRINT_PRODUCTS.map(p=>`
          <div class="pp-prod-card ${ppState.product?.id===p.id?'selected':''}" onclick="ppSelectProduct('${p.id}')">
            <div class="pp-prod-icon">${renderProductIcon(p.icon, ppState.pattern)}</div>
            <div class="pp-prod-name">${p.name}</div>
            <div class="pp-prod-price">¥${p.price}</div>
          </div>
        `).join('')}
      </div>
    `;
    ctaNext.textContent = '下一步';
    ctaNext.classList.toggle('disabled', !ppState.product);
  } else if(ppStep===4){
    document.getElementById('pp-title').textContent = '预览确认';
    body.innerHTML = `
      <div class="pp-step-ttl">最终<em>预览</em></div>
      <div class="pp-step-sub">这是你的定制单品。满意的话，加入购物车。</div>
      <div class="pp-preview-frame">${renderProductPreview(ppState.product.icon, ppState.pattern)}</div>
      <div class="pp-preview-meta">
        <div class="pp-preview-row"><div class="pp-preview-lbl">单品</div><div class="pp-preview-val">${ppState.product.name}</div></div>
        <div class="pp-preview-row"><div class="pp-preview-lbl">印花</div><div class="pp-preview-val">${ppState.pattern.name}</div></div>
        <div class="pp-preview-row"><div class="pp-preview-lbl">灵感来源</div><div class="pp-preview-val">${ppState.program.name}</div></div>
        <div class="pp-preview-row"><div class="pp-preview-lbl">价格</div><div class="pp-preview-val price">¥${ppState.product.price}</div></div>
      </div>
    `;
    ctaNext.textContent = '加入购物车';
    ctaNext.classList.remove('disabled');
  }
}

function ppSelectProgram(id){
  ppState.program = PRINT_PROGRAMS.find(p=>p.id===id);
  ppState.pattern = null; // reset if reselecting
  renderPrintStep();
}

function ppSelectProduct(id){
  ppState.product = PRINT_PRODUCTS.find(p=>p.id===id);
  renderPrintStep();
}

function ppRefreshPattern(){
  ppState.pattern = null;
  renderPrintStep();
}

function ppNext(){
  if(document.getElementById('pp-cta-next').classList.contains('disabled')) return;
  if(ppStep===4){
    // Add to cart with custom flag
    const customKey = 'custom_'+Date.now();
    PRODUCTS[customKey] = {
      name:`${ppState.product.name} · ${ppState.pattern.name}`,
      cat:'定制印花',
      price:ppState.product.price,
      imgId:null,
      customSvg:renderProductPreview(ppState.product.icon, ppState.pattern, 80),
      isCustom:true,
    };
    CART.push({key:customKey, qty:1});
    updateCartBadge();
    showToast('已加入购物车 ✓ ¥'+ppState.product.price);
    // Reset and go to cart
    ppStep = 0;
    ppState = {program:null, pattern:null, product:null};
    goPage('p-cart');
    return;
  }
  ppStep++;
  renderPrintStep();
}

function ppPrev(){
  if(ppStep===0){
    goBack();
    return;
  }
  ppStep--;
  renderPrintStep();
}

/* ═══ Pattern generator ═══ */
function rand(seed){
  // Simple seeded random
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateMoodVis(prog){
  // A small SVG visualization of the program's mood
  const colors = prog.palette;
  return `<svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;">
    <defs>
      <radialGradient id="mv-${prog.id}-1" cx="0.25" cy="0.4">
        <stop offset="0%" stop-color="${colors[1]}" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="${colors[1]}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="mv-${prog.id}-2" cx="0.7" cy="0.6">
        <stop offset="0%" stop-color="${colors[2]}" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="${colors[2]}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="mv-${prog.id}-3" cx="0.5" cy="0.8">
        <stop offset="0%" stop-color="${colors[3]||colors[0]}" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="${colors[3]||colors[0]}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="200" fill="${colors[0]}"/>
    <ellipse cx="100" cy="80" rx="140" ry="110" fill="url(#mv-${prog.id}-1)"/>
    <ellipse cx="280" cy="120" rx="120" ry="100" fill="url(#mv-${prog.id}-2)"/>
    <ellipse cx="200" cy="160" rx="160" ry="80" fill="url(#mv-${prog.id}-3)"/>
  </svg>`;
}

const PATTERN_NAMES = [
  ['冰刃·之歌','冰上低吟','弧线·序曲','无声的呼吸'],
  ['天空·与你','极北·之蓝','静止的雪','一个人的冬'],
  ['秋日·暮色','琥珀·之夜','落叶·告别','黄昏散步'],
  ['银河·边缘','起点·之星','无垠','寒夜·宇宙'],
  ['樱·与梦','少女·浮云','轻盈','薄雾·糖霜'],
  ['江南·之春','梁祝·余响','柳与胭脂','水中·倒影'],
];

const PATTERN_CAPTIONS = [
  '深红与暗金，在沉默里交错。这是仪式的颜色。',
  '冷蓝在静谧里展开。一个人也是完整的风景。',
  '秋天最后一抹光，被你留下来了。',
  '永恒不是静止，是一直往前去的弧线。',
  '梦的边界没有那么硬，温柔可以穿过去。',
  '东方的色彩不需要解释，它自己会说话。',
];

function generatePattern(prog){
  const seed = Date.now() + Math.floor(Math.random()*1000);
  
  // ── DELULU: use uploaded artwork instead of procedural pattern ──
  if(prog.id === 'delulu'){
    const R = window.__resources || {};
    const pool = [R.delulu_p1, R.delulu_p2].filter(Boolean);
    // Alternate between the two on refresh
    if(!window._deluluPatIdx) window._deluluPatIdx = 0;
    const idx = window._deluluPatIdx % pool.length;
    window._deluluPatIdx++;
    const names = ['樱·与梦','少女·浮云'];
    const captions = [
      '梦的边界没有那么硬，温柔可以穿过去。',
      '樱粉与浮光，是少女在冰面上画出的圆。',
    ];
    return {
      svg: `<img src="${pool[idx]}" style="width:100%;height:100%;object-fit:cover;display:block;" alt="">`,
      name: names[idx],
      caption: captions[idx],
      seed,
      programId: prog.id,
      imageMode: true,
    };
  }
  
  const r = rand(seed);
  const colors = prog.palette;
  const progIdx = PRINT_PROGRAMS.indexOf(prog);
  
  // Compose 8-15 abstract shapes
  const nShapes = 8 + Math.floor(r()*8);
  let shapes = '';
  const defs = [];
  
  for(let i=0; i<nShapes; i++){
    const color = colors[1 + Math.floor(r()*(colors.length-1))];
    const cx = 50 + r()*400;
    const cy = 50 + r()*400;
    const size = 40 + r()*200;
    const opacity = 0.4 + r()*0.5;
    const gradId = `pg-${seed}-${i}`;
    defs.push(`<radialGradient id="${gradId}" cx="0.4" cy="0.4">
      <stop offset="0%" stop-color="${color}" stop-opacity="${opacity}"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>`);
    
    const kind = r();
    if(kind < 0.55){
      // Blurry blob
      shapes += `<circle cx="${cx}" cy="${cy}" r="${size}" fill="url(#${gradId})"/>`;
    } else if(kind < 0.8){
      // Elongated ellipse
      const rx = size, ry = size * (0.4+r()*0.5);
      const rot = r()*180;
      shapes += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${gradId})" transform="rotate(${rot} ${cx} ${cy})"/>`;
    } else {
      // Arc / curve
      const x1=cx-size*0.7, x2=cx+size*0.7;
      const ctrlY = cy - size*0.6;
      shapes += `<path d="M ${x1} ${cy} Q ${cx} ${ctrlY}, ${x2} ${cy}" stroke="${color}" stroke-width="${1+r()*3}" fill="none" opacity="${opacity}" stroke-linecap="round"/>`;
    }
  }
  
  // A few light sparkles
  for(let i=0;i<3+Math.floor(r()*4);i++){
    const cx = 30 + r()*440, cy = 30 + r()*440;
    const s = 1 + r()*2;
    shapes += `<circle cx="${cx}" cy="${cy}" r="${s}" fill="${colors[colors.length-1]}" opacity="${0.6+r()*0.3}"/>`;
  }
  
  const svg = `<svg viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
    <defs>${defs.join('')}</defs>
    <rect width="500" height="500" fill="${colors[0]}"/>
    ${shapes}
  </svg>`;
  
  const nameOptions = PATTERN_NAMES[progIdx] || PATTERN_NAMES[0];
  const name = nameOptions[Math.floor(r()*nameOptions.length)];
  const caption = PATTERN_CAPTIONS[progIdx] || PATTERN_CAPTIONS[0];
  
  return {svg, name, caption, seed, programId: prog.id};
}

/* ═══ Product preview rendering ═══ */
function renderProductIcon(kind, pattern){
  // Small preview ~64×64
  const patternId = `pp-icon-${kind}`;
  const pat = pattern ? `<defs><pattern id="${patternId}" patternUnits="userSpaceOnUse" width="100" height="100"><foreignObject width="100" height="100"><div xmlns="http://www.w3.org/1999/xhtml" style="width:100px;height:100px;overflow:hidden;">${pattern.svg.replace(/viewBox="[^"]*"/, 'viewBox="0 0 500 500" width="100" height="100"')}</div></foreignObject></pattern></defs>` : '';
  // Simpler: embed pattern into product shape via clipPath
  return _renderProductSvg(kind, pattern, 64);
}

function renderProductPreview(kind, pattern, size){
  return _renderProductSvg(kind, pattern, size||280);
}

function _renderProductSvg(kind, pattern, size){
  // ── DELULU: use uploaded product mockup images ──
  if(pattern && pattern.programId === 'delulu'){
    const R = window.__resources || {};
    const map = {
      tshirt: R.delulu_tshirt,
      hoodie: R.delulu_hoodie,
      pants: R.delulu_pants,
      shoes: R.delulu_shoes,
      bag: R.delulu_bag,
      phonecase: R.delulu_phonecase,
    };
    const src = map[kind];
    if(src){
      return `<img src="${src}" style="width:${size}px;height:${size}px;object-fit:contain;display:block;" alt="">`;
    }
  }
  
  // Use a pattern-fill approach with a clip
  const uid = 'prod-'+Math.floor(Math.random()*1000000);
  const fill = pattern ? `url(#${uid}-pat)` : '#3a4868';
  const patDef = pattern ? `
    <pattern id="${uid}-pat" patternUnits="userSpaceOnUse" width="200" height="200" x="0" y="0">
      <g transform="scale(0.4)">${pattern.svg.replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</g>
    </pattern>
  ` : '';
  
  let shape = '';
  if(kind==='tshirt'){
    shape = `<path d="M 40 50 L 70 40 L 80 30 Q 100 35, 120 30 L 130 40 L 160 50 L 150 80 L 130 75 L 130 170 L 70 170 L 70 75 L 50 80 Z" fill="${fill}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`;
  } else if(kind==='hoodie'){
    shape = `<path d="M 38 60 L 60 50 L 75 30 Q 100 25, 125 30 L 140 50 L 162 60 L 152 92 L 132 88 L 132 175 L 68 175 L 68 88 L 48 92 Z" fill="${fill}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
    <path d="M 75 30 Q 100 70, 125 30 Q 100 50, 75 30 Z" fill="rgba(0,0,0,0.3)"/>`;
  } else if(kind==='pants'){
    shape = `<path d="M 65 30 L 135 30 L 138 90 L 130 175 L 110 175 L 105 100 L 100 100 L 95 175 L 75 175 L 67 90 Z" fill="${fill}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`;
  } else if(kind==='shoes'){
    shape = `<path d="M 30 130 Q 30 105, 55 100 L 100 95 Q 130 95, 145 110 L 170 130 Q 175 145, 165 152 L 40 152 Q 28 148, 30 130 Z" fill="${fill}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
    <path d="M 30 145 L 170 145" stroke="rgba(255,255,255,0.2)" stroke-width="0.6"/>`;
  } else if(kind==='bag'){
    shape = `<path d="M 60 70 L 60 60 Q 75 35, 100 35 Q 125 35, 140 60 L 140 70" stroke="${fill}" stroke-width="3" fill="none"/>
    <rect x="50" y="68" width="100" height="105" rx="6" fill="${fill}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`;
  } else if(kind==='phonecase'){
    shape = `<rect x="65" y="25" width="70" height="150" rx="14" fill="${fill}" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>
    <circle cx="100" cy="42" r="4" fill="rgba(0,0,0,0.4)"/>`;
  }
  
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet">
    <defs>${patDef}</defs>
    ${shape}
  </svg>`;
}
