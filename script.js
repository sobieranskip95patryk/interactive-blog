const feed = document.getElementById('feed');
const addPost = document.getElementById('addPost');

function load() {
    feed.innerHTML = '';
    (JSON.parse(localStorage.posts || '[]')).forEach((p, idx) => render(p, idx));
}

function save(p) {
    const a = JSON.parse(localStorage.posts || '[]');
    a.unshift(p);
    localStorage.posts = JSON.stringify(a);
}

function like(idx) {
    const posts = JSON.parse(localStorage.posts || '[]');
    posts[idx].likes = (posts[idx].likes || 0) + 1;
    localStorage.posts = JSON.stringify(posts);
    load();
}

function render(p, idx) {
    const d = document.createElement('div');
    d.className = 'post';
    d.innerHTML = `<p>${p.text}</p>`;
    if (p.media) {
        if (p.type === 'image') d.innerHTML += `<img src="${p.media}">`;
        if (p.type === 'video') d.innerHTML += `<video controls src="${p.media}"></video>`;
    }
    // Like button + counter
    const likeBtn = document.createElement('button');
    likeBtn.innerHTML = `👍 <span>${p.likes || 0}</span>`;
    likeBtn.style.marginTop = '10px';
    likeBtn.onclick = () => like(idx);
    d.appendChild(likeBtn);
    feed.appendChild(d);
}

addPost.onclick = () => {
    const text = prompt("Treść posta");
    if (!text) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        const f = e.target.files[0];
        if (!f) {
            save({ text, likes: 0 });
            load();
            return;
        }
        const r = new FileReader();
        r.onload = () => {
            save({ text, media: r.result, type: f.type.startsWith('video') ? 'video' : 'image', likes: 0 });
            load();
        };
        r.readAsDataURL(f);
    };
    input.click();
};

load();
