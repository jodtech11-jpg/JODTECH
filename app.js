// ── API BASE ─────────────────────────────────────────────
// Pointing to the new PHP API
const API = 'api.php'; 

// ── STATE ────────────────────────────────────────────────
const STATE = { user: null, leads: [] };

// ── FETCH HELPERS ────────────────────────────────────────
async function apiFetch(path, opts = {}) {
  // Path translation for PHP: /leads -> api.php/leads
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
function fmt(v) { return v || '—'; }
function fmtDate(v) {
  if (!v) return '—';
  return new Date(v + 'T00:00:00').toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}
function nextSlNo() {
  if (!STATE.leads.length) return 1;
  return Math.max(...STATE.leads.map(l => l.slNo || 0)) + 1;
}
function leadBadgeClass(s) {
  return s === 'Hot' ? 'badge-hot' : s === 'Warm' ? 'badge-warm' : s === 'Cold' ? 'badge-cold' : '';
}

// ── TOAST ────────────────────────────────────────────────
function toast(msg, type = 'info') {
  const icons = { success:'✅', error:'❌', info:'ℹ️' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ── VIEWS ────────────────────────────────────────────────
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// ── LOGIN ────────────────────────────────────────────────
function togglePwd() {
  const inp = document.getElementById('inp-password');
  const btn = document.getElementById('btn-toggle-pwd');
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? '👁️' : '🙈';
}

async function doLogin(e) {
  e.preventDefault();
  const uname = document.getElementById('inp-username').value.trim();
  const pwd   = document.getElementById('inp-password').value;
  const errEl = document.getElementById('login-error');
  const btn   = e.submitter;

  btn.disabled = true;
  btn.textContent = 'Signing in…';

  try {
    const users = await apiGet('/users');
    const match = users.find(u => u.username === uname && u.password === pwd && u.active);

    if (!match) {
      errEl.style.display = 'flex';
      document.getElementById('inp-password').value = '';
      document.getElementById('inp-password').focus();
      return;
    }

    errEl.style.display = 'none';
    STATE.user = match;

    if (match.role === 'superadmin') {
      window.location.href = 'superadmin.html?auth=ok&name=' + encodeURIComponent(match.name);
      return;
    }

    document.getElementById('nav-role-badge').textContent = match.role === 'ho' ? '🏢 Head Office' : '📊 Marketing';
    document.getElementById('nav-user-name').textContent  = match.name;

    STATE.leads = await apiGet('/leads');
    if (match.role === 'marketing') {
      showView('form-view');
      resetForm();
    } else {
      showView('dashboard-view');
      renderDashboard();
    }
  } catch (err) {
    console.error(err);
    toast('Cannot connect to database. Make sure Apache/MySQL is running in XAMPP.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Sign In →';
  }
}

function logout() {
  STATE.user = null;
  STATE.leads = [];
  document.getElementById('inp-username').value = '';
  document.getElementById('inp-password').value = '';
  showView('login-view');
}

// ── FORM HELPERS ─────────────────────────────────────────
function setTodayDate() {
  const f = document.getElementById('f-date');
  if (f && !f.value) f.value = new Date().toISOString().slice(0, 10);
}
function updateSlNo() {
  const el = document.getElementById('display-slno');
  if (el) el.textContent = '#' + String(nextSlNo()).padStart(3, '0');
}
function resetForm() {
  document.getElementById('mkt-form').reset();
  document.querySelectorAll('#mkt-form .form-control').forEach(el => el.classList.remove('error'));
  const leadPills = document.querySelector('.lead-pills');
  if (leadPills) leadPills.style.outline = 'none';
  setTodayDate();
  updateSlNo();
  const mktBy = document.getElementById('f-mktBy');
  if (mktBy && STATE.user) mktBy.value = STATE.user.name;
}
function validateForm() {
  let valid = true;
  document.querySelectorAll('#mkt-form input[required]:not([type=radio]), #mkt-form select[required], #mkt-form textarea[required]').forEach(el => {
    el.classList.remove('error');
    if (!el.value.trim()) { el.classList.add('error'); valid = false; }
  });
  const leadVal   = document.querySelector('input[name="f-leadStatus"]:checked');
  const leadPills = document.querySelector('.lead-pills');
  if (!leadVal) {
    if (leadPills) leadPills.style.outline = '2px solid var(--danger)';
    valid = false;
  } else {
    if (leadPills) leadPills.style.outline = 'none';
  }
  return valid;
}

// ── SUBMIT ───────────────────────────────────────────────
async function submitForm(e) {
  e.preventDefault();
  if (!validateForm()) { toast('Please fill all required fields.', 'error'); return; }

  const f = document.getElementById('mkt-form');
  const btn = document.querySelector('#mkt-form button[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Submitting…';

  const currentServices = Array.from(document.querySelectorAll('input[name="currentServices"]:checked')).map(c => c.value);
  const requireServices = Array.from(document.querySelectorAll('input[name="requireServices"]:checked')).map(c => c.value);

  const entry = {
    slNo:              nextSlNo(),
    date:              f['f-date'].value,
    mktBy:             f['f-mktBy'].value.trim(),
    customerName:      f['f-customerName'].value.trim(),
    industryType:      f['f-industryType'].value,
    location:          f['f-location'].value.trim(),
    contactName:       f['f-contactName'].value.trim(),
    contactNumber:     f['f-contactNumber'].value.trim(),
    emailId:           f['f-emailId'].value.trim(),
    existingProduct:   f['f-existingProduct'].value.trim(),
    existingVendor:    f['f-existingVendor'].value.trim(),
    currentServices:   currentServices.join(', ') || 'None',
    requireNewProduct: f['f-requireNewProduct'].value.trim(),
    requireCapacity:   f['f-requireCapacity'].value.trim(),
    requireServices:   requireServices.join(', ') || 'None',
    iaplProfileStatus: f['f-iaplProfileStatus'].value,
    proposalStatus:    f['f-proposalStatus'].value,
    leadStatus:        f['f-leadStatus'].value,
    discussionSummary: f['f-discussionSummary'].value.trim(),
    nextActionPlan:    f['f-nextActionPlan'].value,
    nextActionDate:    f['f-nextActionDate'].value,
    submittedByUser:   STATE.user ? STATE.user.username : '',
  };

  try {
    const saved = await apiPost('/leads', entry);
    STATE.leads.unshift(saved);
    toast(`Lead #${String(entry.slNo).padStart(3,'0')} submitted!`, 'success');
    resetForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch {
    toast('Failed to save lead. Check MySQL connection.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Submit Lead →';
  }
}

// ── DASHBOARD ────────────────────────────────────────────
let activeTab = 'all', currentSearch = '';

async function renderDashboard() {
  try {
    STATE.leads = await apiGet('/leads');
  } catch {
    toast('Cannot load leads from database.', 'error');
  }
  populateFilters();
  updateStats();
  renderTable();
}

function populateFilters() {
    const industries = [...new Set(STATE.leads.map(l => l.industryType).filter(Boolean))].sort();
    const locations  = [...new Set(STATE.leads.map(l => l.location).filter(Boolean))].sort();
    const mktPeople  = [...new Set(STATE.leads.map(l => l.mktBy).filter(Boolean))].sort();

    const indSel = document.getElementById('filter-industry');
    const locSel = document.getElementById('filter-location');
    const mktSel = document.getElementById('filter-mkt');

    if (!indSel) return;

    indSel.innerHTML = '<option value="">All Industries</option>' + industries.map(i => `<option value="${i}">${i}</option>`).join('');
    locSel.innerHTML = '<option value="">All Locations</option>' + locations.map(l => `<option value="${l}">${l}</option>`).join('');
    mktSel.innerHTML = '<option value="">All MKT BY</option>' + mktPeople.map(m => `<option value="${m}">${m}</option>`).join('');
}

function updateStats() {
  const s = STATE.leads;
  document.getElementById('stat-total').textContent = s.length;
  document.getElementById('stat-hot').textContent   = s.filter(x => x.leadStatus === 'Hot').length;
  document.getElementById('stat-warm').textContent  = s.filter(x => x.leadStatus === 'Warm').length;
  document.getElementById('stat-cold').textContent  = s.filter(x => x.leadStatus === 'Cold').length;
}

function getFiltered() {
  const fInd = document.getElementById('filter-industry').value;
  const fLoc = document.getElementById('filter-location').value;
  const fMkt = document.getElementById('filter-mkt').value;

  return [...STATE.leads].filter(s => {
    const matchTab = activeTab === 'all' || s.leadStatus === activeTab;
    const matchInd = !fInd || s.industryType === fInd;
    const matchLoc = !fLoc || s.location === fLoc;
    const matchMkt = !fMkt || s.mktBy === fMkt;
    
    const q = currentSearch.toLowerCase();
    const matchSearch = !q ||
      (s.customerName||'').toLowerCase().includes(q) ||
      (s.mktBy||'').toLowerCase().includes(q) ||
      (s.location||'').toLowerCase().includes(q) ||
      (s.industryType||'').toLowerCase().includes(q) ||
      (s.contactName||'').toLowerCase().includes(q);

    return matchTab && matchInd && matchLoc && matchMkt && matchSearch;
  });
}

function renderTable() {
  const data = getFiltered();
  const tbody = document.getElementById('submissions-tbody');
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="12"><div class="empty-state"><div class="empty-icon">📭</div><p>No leads found.</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = data.map(s => `
    <tr>
      <td style="font-weight:700;color:var(--accent-light)">${String(s.slNo).padStart(3,'0')}</td>
      <td>${fmtDate(s.date)}</td>
      <td>${fmt(s.mktBy)}</td>
      <td><strong>${fmt(s.customerName)}</strong><br><span style="color:var(--text-muted);font-size:0.76rem">${fmt(s.industryType)}</span></td>
      <td>${fmt(s.location)}</td>
      <td>${fmt(s.contactName)}<br><span style="color:var(--text-muted);font-size:0.76rem">${fmt(s.contactNumber)}</span></td>
      <td><span class="badge ${leadBadgeClass(s.leadStatus)}">${fmt(s.leadStatus)}</span></td>
      <td>${fmt(s.iaplProfileStatus)}</td>
      <td>${fmt(s.proposalStatus)}</td>
      <td style="max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${s.discussionSummary||''}">${fmt(s.discussionSummary)}</td>
      <td>${fmt(s.nextActionPlan)}${s.nextActionDate?'<br><span style="color:var(--text-muted);font-size:0.76rem">'+fmtDate(s.nextActionDate)+'</span>':''}</td>
      <td><button class="btn btn-secondary" style="padding:0.3rem 0.65rem;font-size:0.78rem" onclick="openDetail(${s.id})">View</button></td>
    </tr>`).join('');
}

function switchTab(tab) {
  activeTab = tab;
  
  // Highlight active tab button
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById('tab-' + tab);
  if (activeBtn) activeBtn.classList.add('active');
  
  const leadsTable = document.getElementById('leads-table-container');
  const usersSec   = document.getElementById('users-section-container');
  const controls   = document.getElementById('dashboard-controls');

  if (!leadsTable || !usersSec || !controls) return;

  if (tab === 'users') {
    leadsTable.style.display = 'none';
    controls.style.display = 'none';
    usersSec.style.display = 'block';
    renderHoUsers();
  } else {
    leadsTable.style.display = 'block';
    controls.style.display = 'flex';
    usersSec.style.display = 'none';
    renderTable();
  }
}

// ── HO USER MANAGEMENT ─────────────────────────────────────
let hoUsers = [];

async function renderHoUsers() {
  try {
    const all = await apiGet('/users');
    // HO can only see marketing members
    hoUsers = all.filter(u => u.role === 'marketing');
    const tbody = document.getElementById('ho-users-tbody');
    if (!hoUsers.length) {
      tbody.innerHTML = `<tr><td colspan="4">No marketing members found.</td></tr>`;
      return;
    }
    tbody.innerHTML = hoUsers.map(u => `
      <tr>
        <td><strong>${u.name}</strong></td>
        <td><code>${u.username}</code></td>
        <td>
            <span class="status-pill ${u.active == 1 ? 'pill-green' : 'pill-red'}">
                ${u.active == 1 ? '✅ Active' : '❌ Inactive'}
            </span>
        </td>
        <td>
          <button class="btn btn-secondary" style="padding:0.25rem 0.5rem;font-size:0.75rem" onclick="toggleHoUser(${u.id}, ${u.active == 1 ? 0 : 1})">
            ${u.active == 1 ? 'Deactivate' : 'Activate'}
          </button>
        </td>
      </tr>`).join('');
  } catch {
    toast('Error loading users.', 'error');
  }
}

function toggleAddUser() {
  const box = document.getElementById('add-user-box');
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

async function hoAddUser(e) {
  e.preventDefault();
  const f = document.getElementById('ho-add-user-form');
  const data = {
    name: f['h-name'].value.trim(),
    username: f['h-username'].value.trim(),
    password: f['h-password'].value.trim(),
    role: 'marketing',
    active: 1
  };
  try {
    await apiPost('/users', data);
    toast('Marketing member added!', 'success');
    f.reset();
    toggleAddUser();
    renderHoUsers();
  } catch {
    toast('Error adding user. Username might exist.', 'error');
  }
}

async function toggleHoUser(id, newState) {
  try {
    await apiPatch('/users', { id, active: newState });
    renderHoUsers();
    toast('Status updated.', 'info');
  } catch {
    toast('Error updating status.', 'error');
  }
}
function searchTable(val) { currentSearch = val; renderTable(); }

function exportCSV() {
  const data = getFiltered();
  if (!data.length) { toast('No data to export.', 'error'); return; }
  const headers = ['Sl No.','Date','MKT BY','Customer Name','Industry Type','Location','Contact Name','Contact Number','Email Id','Existing Product & Capacity','Existing Vendor','Current Services','Require New Product','Require Capacity','Require Services','IAPL Profile Status','Proposal Status','Lead Status','Discussion Summary','Next Action Plan','Next Action Date'];
  const rows = data.map(s => [s.slNo,s.date,s.mktBy,s.customerName,s.industryType,s.location,s.contactName,s.contactNumber,s.emailId,s.existingProduct,s.existingVendor,s.currentServices,s.requireNewProduct,s.requireCapacity,s.requireServices,s.iaplProfileStatus,s.proposalStatus,s.leadStatus,s.discussionSummary,s.nextActionPlan,s.nextActionDate].map(v=>`"${String(v||'').replace(/"/g,'""')}"`).join(','));
  const csv = [headers.join(','),...rows].join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,\uFEFF'+encodeURIComponent(csv);
  a.download = 'IAPL_Leads_'+new Date().toISOString().slice(0,10)+'.csv';
  a.click();
  toast('Export ready!','success');
}

// ── MODAL ────────────────────────────────────────────────
function openDetail(id) {
  const s = STATE.leads.find(x => x.id == id);
  if (!s) return;
  document.getElementById('modal-body').innerHTML = `
    <div class="detail-grid">
      <div class="detail-item"><label>Sl No.</label><span style="color:var(--accent-light);font-weight:700">#${String(s.slNo).padStart(3,'0')}</span></div>
      <div class="detail-item"><label>Date</label><span>${fmtDate(s.date)}</span></div>
      <div class="detail-item"><label>MKT BY</label><span>${fmt(s.mktBy)}</span></div>
      <div class="detail-item"><label>Lead Status</label><span class="badge ${leadBadgeClass(s.leadStatus)}">${fmt(s.leadStatus)}</span></div>
      <div class="detail-item"><label>Customer Name</label><span>${fmt(s.customerName)}</span></div>
      <div class="detail-item"><label>Industry Type</label><span>${fmt(s.industryType)}</span></div>
      <div class="detail-item"><label>Location</label><span>${fmt(s.location)}</span></div>
      <div class="detail-item"><label>Contact Name</label><span>${fmt(s.contactName)}</span></div>
      <div class="detail-item"><label>Contact Number</label><span>${fmt(s.contactNumber)}</span></div>
      <div class="detail-item"><label>Email Id</label><span>${fmt(s.emailId)}</span></div>
      <div class="detail-item"><label>Existing Product & Capacity</label><span>${fmt(s.existingProduct)}</span></div>
      <div class="detail-item"><label>Existing Vendor</label><span>${fmt(s.existingVendor)}</span></div>
      <div class="detail-item"><label>Current Services</label><span>${fmt(s.currentServices)}</span></div>
      <div class="detail-item"><label>Require New Product</label><span>${fmt(s.requireNewProduct)}</span></div>
      <div class="detail-item"><label>Require Capacity</label><span>${fmt(s.requireCapacity)}</span></div>
      <div class="detail-item"><label>Require Services</label><span>${fmt(s.requireServices)}</span></div>
      <div class="detail-item"><label>IAPL Profile Status</label><span>${fmt(s.iaplProfileStatus)}</span></div>
      <div class="detail-item"><label>Proposal Status</label><span>${fmt(s.proposalStatus)}</span></div>
      <div class="detail-item full"><label>Discussion Summary</label><span style="white-space:pre-wrap">${fmt(s.discussionSummary)}</span></div>
      <div class="detail-item"><label>Next Action Plan</label><span>${fmt(s.nextActionPlan)}</span></div>
      <div class="detail-item"><label>Next Action Date</label><span>${fmtDate(s.nextActionDate)}</span></div>
    </div>`;
  document.getElementById('detail-modal').classList.add('open');
}
function closeModal() { document.getElementById('detail-modal').classList.remove('open'); }

// ── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => showView('login-view'));
