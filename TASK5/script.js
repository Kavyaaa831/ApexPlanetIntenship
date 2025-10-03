// =============================
// Blog Application Functionality
// =============================
const STORAGE_KEY = "capstone_blog_posts_v1";

const postsListEl = document.getElementById("postsList");
const emptyStateEl = document.getElementById("emptyState");
const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("title");
const imgInput = document.getElementById("img");
const tagsInput = document.getElementById("tags");
const contentInput = document.getElementById("content");
const editingId = document.getElementById("editingId");
const searchInput = document.getElementById("search");
const tagListEl = document.getElementById("tagList");
const clearAllBtn = document.getElementById("clearAll");

let posts = loadPosts();
let filter = { query: "", tag: null };

// Utility
function uid() {
  return "p_" + Math.random().toString(36).slice(2, 9);
}

// Load & Save
function loadPosts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}
function savePosts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// Render Posts
function render() {
  const filtered = applyFilter(posts);
  postsListEl.innerHTML = "";
  if (filtered.length === 0) {
    emptyStateEl.style.display = "block";
  } else {
    emptyStateEl.style.display = "none";
  }
  filtered.forEach((p) => postsListEl.appendChild(renderPost(p)));
  renderTags();
}

function applyFilter(list) {
  const q = filter.query.toLowerCase();
  return list.filter((p) => {
    if (filter.tag && !p.tags.includes(filter.tag)) return false;
    return (
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.tags.join(" ").toLowerCase().includes(q)
    );
  }).sort((a, b) => b.date - a.date);
}

// Create Post Card
function renderPost(p) {
  const wrap = document.createElement("article");
  wrap.className = "post card";

  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = p.img || "https://picsum.photos/seed/" + p.id + "/400/300";
  img.alt = p.title;

  const body = document.createElement("div");
  const h = document.createElement("h3");
  h.textContent = p.title;

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = new Date(p.date).toLocaleString();

  const excerpt = document.createElement("p");
  excerpt.className = "muted";
  excerpt.textContent =
    p.content.length > 140 ? p.content.slice(0, 140) + "…" : p.content;

  // Actions
  const edit = document.createElement("button");
  edit.className = "btn ghost";
  edit.textContent = "Edit";
  edit.onclick = () => openEdit(p.id);

  const del = document.createElement("button");
  del.className = "btn ghost";
  del.textContent = "Delete";
  del.onclick = () => {
    if (confirm("Delete this post?")) {
      posts = posts.filter((x) => x.id !== p.id);
      savePosts();
      render();
    }
  };

  const actions = document.createElement("div");
  actions.className = "row-inline";
  actions.append(edit, del);

  body.append(h, meta, excerpt, actions);
  wrap.append(img, body);
  return wrap;
}

// Tags
function renderTags() {
  const tagSet = new Set();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));

  tagListEl.innerHTML = "";
  const allBtn = document.createElement("button");
  allBtn.className = "tag";
  allBtn.textContent = "All";
  allBtn.onclick = () => {
    filter.tag = null;
    render();
  };
  tagListEl.appendChild(allBtn);

  Array.from(tagSet).forEach((t) => {
    const b = document.createElement("button");
    b.className = "tag";
    b.textContent = t;
    b.onclick = () => {
      filter.tag = t;
      render();
    };
    tagListEl.appendChild(b);
  });
}

// Edit
function openEdit(id) {
  const p = posts.find((x) => x.id === id);
  if (!p) return;
  titleInput.value = p.title;
  imgInput.value = p.img || "";
  tagsInput.value = p.tags.join(", ");
  contentInput.value = p.content;
  editingId.value = p.id;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Form Submit
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = editingId.value || uid();
  const obj = {
    id,
    title: titleInput.value.trim() || "Untitled",
    img: imgInput.value.trim(),
    tags: tagsInput.value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    content: contentInput.value.trim(),
    date: Date.now(),
  };
  const exists = posts.find((p) => p.id === id);
  if (exists) {
    posts = posts.map((p) => (p.id === id ? obj : p));
  } else {
    posts.push(obj);
  }
  savePosts();
  render();
  postForm.reset();
  editingId.value = "";
});

// Search
searchInput.addEventListener("input", (e) => {
  filter.query = e.target.value;
  render();
});

// Clear all
clearAllBtn.onclick = () => {
  if (confirm("Clear all posts?")) {
    posts = [];
    savePosts();
    render();
  }
};

// Initial render
render();
