const feed=document.getElementById('feed');
const addPost=document.getElementById('addPost');

function load(){feed.innerHTML='';(JSON.parse(localStorage.posts||'[]')).forEach(p=>render(p))}
function save(p){const a=JSON.parse(localStorage.posts||'[]');a.unshift(p);localStorage.posts=JSON.stringify(a)}
function render(p){
 const d=document.createElement('div');d.className='post';
 d.innerHTML='<p>'+p.text+'</p>';
 if(p.media){
  if(p.type==='image')d.innerHTML+=`<img src="${p.media}">`;
  if(p.type==='video')d.innerHTML+=`<video controls src="${p.media}"></video>`;
 }
 feed.appendChild(d)
}

addPost.onclick=()=>{
 const text=prompt("Treść posta");
 if(!text)return;
 const input=document.createElement('input');input.type='file';
 input.onchange=e=>{
  const f=e.target.files[0];
  if(!f){save({text});load();return}
  const r=new FileReader();
  r.onload=()=>{save({text,media:r.result,type:f.type.startsWith('video')?'video':'image'});load()}
  r.readAsDataURL(f)
 };
 input.click();
}

load();
