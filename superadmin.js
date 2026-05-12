// ── API BASE ─────────────────────────────────────────────
const API = 'api.php';

let leads       = [];
let allUsers    = [];
let editingId   = null;
let saSearch_   = '';
let activeTab   = 'all'; // 'all' | 'Hot' | 'Warm' | 'Cold' | 'users'

// ── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('auth') === 'ok') {
    const name = params.get('name') || 'Super Admin';
    history.replaceState({}, '', 'superadmin.html');
    bootDashboard(name);
  }
});

// ── FETCH HELPERS ────────────────────────────────────────
async function apiFetch(path, opts = {}) {
  const url = API + path; 
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}
const apiGet    = (path)        => apiFetch(path);
const apiPost   = (path, body)  => apiFetch(path, { method: 'POST',  body: JSON.stringify(body) });
const apiPatch  = (path, body)  => apiFetch(path, { method: 'PATCH', body: JSON.stringify(body) });
const apiDelete = (path)        => apiFetch(path, { method: 'DELETE' });

// ── HELPERS ──────────────────────────────────────────────
function fmt(v)  { return v || '—'; }
function fmtDate(v) {
  if (!v) return '—';
  return new Date(v + 'T00:00:00').toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}
function toast(msg, type = 'info') {
  const icons = { success:'✅', error:'❌', info:'ℹ️' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => el.remove(), 3500);
}
function leadBadge(s) {
  const cls = s==='Hot'?'badge-hot':s==='Warm'?'badge-warm':s==='Cold'?'badge-cold':'';
  return `<span class="badge ${cls}">${s||'—'}</span>`;
}
function rolePill(r) {
  const map = { superadmin:'pill-red', ho:'pill-yellow', marketing:'pill-green' };
  const label = { superadmin:'Super Admin', ho:'Head Office', marketing:'Marketing' };
  return `<span class="status-pill ${map[r]||'pill-gray'}">${label[r]||r}</span>`;
}

// ── AUTH ─────────────────────────────────────────────────
async function doLogin(e) {
  e.preventDefault();
  const u   = document.getElementById('sa-username').value.trim();
  const p   = document.getElementById('sa-password').value;
  const err = document.getElementById('login-error');
  
  try {
    const users = await apiGet('/users');
    const match = users.find(x => x.username === u && x.password === p && x.role === 'superadmin' && x.active);
    if (match) {
      err.style.display = 'none';
      bootDashboard(match.name);
    } else {
      err.style.display = 'flex';
    }
  } catch {
    toast('API error. Check connection.', 'error');
  }
}

async function bootDashboard(name) {
  document.getElementById('login-view').style.display  = 'none';
  document.getElementById('admin-view').style.display  = 'block';
  document.getElementById('sa-admin-name').textContent = name;
  switchTab('all');
}

function doLogout() {
  window.location.href = 'index.html';
}

function togglePassword() {
  const inp = document.getElementById('sa-password');
  inp.type = inp.type === 'password' ? 'text' : 'password';
}

// ── TAB SWITCH ───────────────────────────────────────────
async function switchTab(tab) {
  activeTab = tab;
  
  // Highlight buttons
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById('tab-' + tab);
  if (activeBtn) activeBtn.classList.add('active');

  const secLeads = document.getElementById('sec-leads');
  const secUsers = document.getElementById('sec-users');
  const controls = document.getElementById('dashboard-controls');

  if (tab === 'users') {
    secLeads.style.display = 'none';
    secUsers.style.display = 'block';
    allUsers = await apiGet('/users');
    renderUsers();
  } else {
    secLeads.style.display = 'block';
    secUsers.style.display = 'none';
    leads = await apiGet('/leads');
    renderAll();
  }
}

// ── LEADS ─────────────────────────────────────────────────
function renderAll() { 
  populateFilters();
  renderStats(); 
  renderTable(); 
}

function populateFilters() {
    const industries = [...new Set(leads.map(l => l.industryType).filter(Boolean))].sort();
    const locations  = [...new Set(leads.map(l => l.location).filter(Boolean))].sort();
    const mktPeople  = [...new Set(leads.map(l => l.mktBy).filter(Boolean))].sort();

    const indSel = document.getElementById('filter-industry');
    const locSel = document.getElementById('filter-location');
    const mktSel = document.getElementById('filter-mkt');

    if (!indSel) return;

    indSel.innerHTML = '<option value="">All Industries</option>' + industries.map(i => `<option value="${i}">${i}</option>`).join('');
    locSel.innerHTML = '<option value="">All Locations</option>' + locations.map(l => `<option value="${l}">${l}</option>`).join('');
    mktSel.innerHTML = '<option value="">All MKT BY</option>' + mktPeople.map(m => `<option value="${m}">${m}</option>`).join('');
}

function renderStats() {
  document.getElementById('s-total').textContent   = leads.length;
  document.getElementById('s-hot').textContent     = leads.filter(l=>l.leadStatus==='Hot').length;
  document.getElementById('s-warm').textContent    = leads.filter(l=>l.leadStatus==='Warm').length;
  document.getElementById('s-cold').textContent    = leads.filter(l=>l.leadStatus==='Cold').length;
  document.getElementById('s-shared').textContent  = leads.filter(l=>l.iaplProfileStatus==='Shared').length;
  document.getElementById('s-proposal').textContent= leads.filter(l=>l.proposalStatus==='Submitted').length;

  const byIndustry = {};
  leads.forEach(l => { byIndustry[l.industryType] = (byIndustry[l.industryType]||0)+1; });
  const top = Object.entries(byIndustry).sort((a,b)=>b[1]-a[1]).slice(0,4);
  document.getElementById('s-top-industries').innerHTML = top.length
    ? top.map(([k,v])=>`<span class="ind-tag">${k} <b>${v}</b></span>`).join('')
    : '<span style="color:var(--text-muted)">No data</span>';
}

function getFiltered() {
  const fInd = document.getElementById('filter-industry').value;
  const fLoc = document.getElementById('filter-location').value;
  const fMkt = document.getElementById('filter-mkt').value;

  return leads.filter(l => {
    const matchTab = activeTab === 'all' || l.leadStatus === activeTab;
    const matchInd = !fInd || l.industryType === fInd;
    const matchLoc = !fLoc || l.location === fLoc;
    const matchMkt = !fMkt || l.mktBy === fMkt;

    const q = saSearch_.toLowerCase();
    const matchSearch = !q ||
      (l.customerName||'').toLowerCase().includes(q) ||
      (l.mktBy||'').toLowerCase().includes(q) ||
      (l.location||'').toLowerCase().includes(q) ||
      (l.industryType||'').toLowerCase().includes(q) ||
      (l.contactName||'').toLowerCase().includes(q);

    return matchTab && matchInd && matchLoc && matchMkt && matchSearch;
  });
}

function renderTable() {
  const data = getFiltered();
  const tbody = document.getElementById('sa-tbody');
  if (document.getElementById('result-count')) document.getElementById('result-count').textContent = `${data.length} records`;
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="13">No leads found.</td></tr>`;
    return;
  }
  tbody.innerHTML = data.map(l => `
    <tr>
      <td style="font-weight:700;color:var(--accent-light)">${String(l.slNo).padStart(3,'0')}</td>
      <td>${fmtDate(l.date)}</td>
      <td>${fmt(l.mktBy)}</td>
      <td><strong>${fmt(l.customerName)}</strong><br><span style="color:var(--text-muted);font-size:0.76rem">${fmt(l.industryType)}</span></td>
      <td>${fmt(l.location)}</td>
      <td>${fmt(l.contactName)}<br><span style="color:var(--text-muted);font-size:0.76rem">${fmt(l.contactNumber)}</span></td>
      <td>${fmt(l.existingProduct)}</td>
      <td>${fmt(l.requireNewProduct)}</td>
      <td><span class="status-pill ${l.iaplProfileStatus==='Shared'?'pill-green':'pill-red'}">${fmt(l.iaplProfileStatus)}</span></td>
      <td><span class="status-pill ${l.proposalStatus==='Submitted'?'pill-green':'pill-gray'}">${fmt(l.proposalStatus)}</span></td>
      <td>${leadBadge(l.leadStatus)}</td>
      <td style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${fmt(l.discussionSummary)}</td>
      <td>
        <button class="btn btn-secondary" onclick="openEdit(${l.id})">✏️</button>
        <button class="btn btn-danger" onclick="deleteLead(${l.id})">🗑️</button>
      </td>
    </tr>`).join('');
}

function saSearch(val) { saSearch_ = val; renderTable(); }

async function deleteLead(id) {
  if (!confirm('Delete this lead?')) return;
  await apiDelete('/leads/' + id);
  leads = await apiGet('/leads');
  renderAll();
  toast('Lead deleted.', 'info');
}

// ── EDIT LEAD MODAL ───────────────────────────────────────
function openEdit(id) {
  const l = leads.find(x => x.id == id);
  if (!l) return;
  editingId = id;
  const f = document.getElementById('edit-form');
  f['e-date'].value            = l.date;
  f['e-mktBy'].value           = l.mktBy;
  f['e-customerName'].value    = l.customerName;
  f['e-industryType'].value    = l.industryType;
  f['e-location'].value        = l.location;
  f['e-contactName'].value     = l.contactName;
  f['e-contactNumber'].value   = l.contactNumber;
  f['e-emailId'].value         = l.emailId;
  f['e-existingProduct'].value = l.existingProduct;
  f['e-existingVendor'].value  = l.existingVendor;
  f['e-requireNewProduct'].value = l.requireNewProduct;
  f['e-requireCapacity'].value = l.requireCapacity;
  f['e-iaplProfileStatus'].value = l.iaplProfileStatus;
  f['e-proposalStatus'].value  = l.proposalStatus;
  f['e-leadStatus'].value      = l.leadStatus;
  f['e-nextActionPlan'].value  = l.nextActionPlan;
  f['e-nextActionDate'].value  = l.nextActionDate;
  f['e-discussionSummary'].value = l.discussionSummary;
  
  const curSvc = (l.currentServices||'').split(', ');
  document.querySelectorAll('input[name="e-currentServices"]').forEach(cb => cb.checked = curSvc.includes(cb.value));
  const reqSvc = (l.requireServices||'').split(', ');
  document.querySelectorAll('input[name="e-requireServices"]').forEach(cb => cb.checked = reqSvc.includes(cb.value));
  
  document.getElementById('edit-modal').classList.add('open');
}
function closeEdit() { document.getElementById('edit-modal').classList.remove('open'); editingId = null; }

async function saveEdit(e) {
  e.preventDefault();
  const f = document.getElementById('edit-form');
  const curSvc = Array.from(document.querySelectorAll('input[name="e-currentServices"]:checked')).map(c=>c.value);
  const reqSvc = Array.from(document.querySelectorAll('input[name="e-requireServices"]:checked')).map(c=>c.value);
  
  const data = {
    date:f['e-date'].value, mktBy:f['e-mktBy'].value.trim(),
    customerName:f['e-customerName'].value.trim(), industryType:f['e-industryType'].value,
    location:f['e-location'].value.trim(), contactName:f['e-contactName'].value.trim(),
    contactNumber:f['e-contactNumber'].value.trim(), emailId:f['e-emailId'].value.trim(),
    existingProduct:f['e-existingProduct'].value.trim(), existingVendor:f['e-existingVendor'].value.trim(),
    currentServices:curSvc.join(', ')||'None',
    requireNewProduct:f['e-requireNewProduct'].value.trim(), requireCapacity:f['e-requireCapacity'].value.trim(),
    requireServices:reqSvc.join(', ')||'None',
    iaplProfileStatus:f['e-iaplProfileStatus'].value, proposalStatus:f['e-proposalStatus'].value,
    leadStatus:f['e-leadStatus'].value, nextActionPlan:f['e-nextActionPlan'].value,
    nextActionDate:f['e-nextActionDate'].value, discussionSummary:f['e-discussionSummary'].value.trim()
  };
  
  await apiPatch('/leads/' + editingId, data);
  closeEdit();
  leads = await apiGet('/leads');
  renderAll();
  toast('Lead updated.', 'success');
}

// ── USER MANAGEMENT ───────────────────────────────────────
function renderUsers() {
  const tbody = document.getElementById('users-tbody');
  if (!allUsers.length) {
    tbody.innerHTML = `<tr><td colspan="5">No users found.</td></tr>`;
    return;
  }
  tbody.innerHTML = allUsers.map((u) => `
    <tr>
      <td><strong>${fmt(u.name)}</strong></td>
      <td><code>${fmt(u.username)}</code></td>
      <td>${rolePill(u.role)}</td>
      <td>
        <span class="status-pill ${u.active == 1 ? 'pill-green' : 'pill-red'}">
          ${u.active == 1 ? '✅ Active' : '❌ Inactive'}
        </span>
      </td>
      <td>
        ${u.username !== 'superadmin' ? `
          <button class="btn btn-secondary" style="padding:0.3rem 0.65rem;font-size:0.76rem" onclick="toggleUserActive(${u.id}, ${u.active == 1 ? 0 : 1})">
            ${u.active == 1 ? 'Deactivate' : 'Activate'}
          </button>
          <button class="btn btn-danger" style="padding:0.3rem 0.65rem;font-size:0.76rem;margin-left:0.3rem" onclick="deleteUser(${u.id})">
            Delete
          </button>
        ` : '<span style="color:var(--text-muted);font-size:0.75rem">System Admin</span>'}
      </td>
    </tr>`).join('');
}

function toggleAddUserPanel() {
  const p = document.getElementById('add-user-panel');
  p.style.display = p.style.display === 'none' ? 'block' : 'none';
}

async function toggleUserActive(id, newState) {
  try {
    await apiPatch('/users', { id: id, active: newState });
    allUsers = await apiGet('/users');
    renderUsers();
    toast(`User status updated to ${newState ? 'Active' : 'Inactive'}.`, 'info');
  } catch {
    toast('Failed to update status.', 'error');
  }
}

async function deleteUser(id) {
  if (!confirm('Are you sure you want to delete this user?')) return;
  try {
    await apiDelete('/users?id=' + id);
    allUsers = await apiGet('/users');
    renderUsers();
    toast('User deleted successfully.', 'info');
  } catch {
    toast('Failed to delete user.', 'error');
  }
}

async function addUser(e) {
  e.preventDefault();
  const f = document.getElementById('add-user-form');
  const data = {
    username: f['au-username'].value.trim(),
    password: f['au-password'].value.trim(),
    role:     f['au-role'].value,
    name:     f['au-name'].value.trim(),
    active: 1
  };
  
  try {
    await apiPost('/users', data);
    allUsers = await apiGet('/users');
    f.reset();
    toggleAddUserPanel();
    renderUsers();
    toast('User added successfully.', 'success');
  } catch (err) {
    toast('Failed to add user. Username might already exist.', 'error');
  }
}
