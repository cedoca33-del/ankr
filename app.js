// ─── Ankr App ───────────────────────────────────────────────
const STATE = {
  currentScreen: 'splash',
  onboardStep: 1,
  user: { name: '', type: '', cities: ['Ciudad de México', 'Medellín'], lookingFor: [] },
  activeFilter: 'todos',
  activeTab: 'all',
  chatMessages: [
    { who: 'them', text: '¡Hola! Vi tu perfil, también estoy en Medellín esta semana 😊', time: '10:14' },
    { who: 'me', text: '¡Qué bueno! ¿Ya fuiste a la Comuna 13?', time: '10:16' },
    { who: 'them', text: 'Todavía no, iba a ir mañana. ¿Te apuntas?', time: '10:17' },
  ],
};

const PROFILES = [
  { id: 1, initials: 'SR', bg: '#3730a3', name: 'Sofia R.', meta: '28 · Barcelona · Diseñadora UX 🇪🇸', bio: '"Buscando gente para explorar la 13, hacer senderismo o simplemente tomar un buen café."', cities: ['Medellín', 'Lisboa', 'Oaxaca'], hereCity: 'Medellín', tags: ['Café', 'Senderismo', 'Diseño'], type: 'travel', online: true },
  { id: 2, initials: 'AM', bg: '#0f6e56', name: 'Axel M.', meta: '31 · Berlín · Dev Full-stack 🇩🇪', bio: '"Buscando coworking space + gente con quien hacer networking. Aquí hasta fin de mes."', cities: ['Medellín', 'Bogotá'], hereCity: 'Medellín', tags: ['Tech', 'Startups', 'Música'], type: 'work', online: true },
  { id: 3, initials: 'KL', bg: '#6b21a8', name: 'Kai L.', meta: '26 · Tokio · Fotógrafo 🇯🇵', bio: '"Buscando roomie en CDMX para mayo. Tranquilo, ordenado, cocino bien."', cities: ['Medellín', 'CDMX', 'Buenos Aires'], hereCity: 'CDMX', tags: ['Fotografía', 'Arte', 'Gastronomía'], type: 'room', online: false },
  { id: 4, initials: 'ML', bg: '#9a3412', name: 'Mara L.', meta: '33 · Lagos · Consultora 🇳🇬', bio: '"Siempre lista para descubrir lugares locales lejos del turismo."', cities: ['CDMX', 'Cartagena'], hereCity: 'CDMX', tags: ['Negocios', 'Foodie', 'Jazz'], type: 'travel', online: true },
];

const CONNECTIONS = [
  { initials: 'SR', bg: '#3730a3', name: 'Sofia R.', meta: 'Diseñadora UX', city: 'Medellín', online: true },
  { initials: 'ML', bg: '#9a3412', name: 'Mara L.', meta: 'Consultora · CDMX', city: 'CDMX', online: true },
  { initials: 'AM', bg: '#0f6e56', name: 'Axel M.', meta: 'Dev · Medellín · hace 1h', city: 'Medellín', online: false },
  { initials: 'KL', bg: '#6b21a8', name: 'Kai L.', meta: 'Fotógrafo · CDMX · ayer', city: 'CDMX', online: false },
  { initials: 'JP', bg: '#1e3a5f', name: 'Jules P.', meta: 'Escritora · Lisboa · hace 3d', city: 'Lisboa', online: false },
];

// ─── Navigation ──────────────────────────────────────────────
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(`screen-${name}`).classList.add('active');
  STATE.currentScreen = name;
}

// ─── Splash ───────────────────────────────────────────────────
function renderSplash() {
  document.getElementById('screen-splash').innerHTML = `
    <div class="splash-logo">
      <div class="splash-icon">⚓</div>
      <div class="splash-name">Ankr</div>
      <div class="splash-tagline">Drop your anchor anywhere</div>
      <div class="splash-dots">
        <div class="splash-dot"></div>
        <div class="splash-dot"></div>
        <div class="splash-dot"></div>
      </div>
    </div>
  `;
  setTimeout(() => showScreen('onboarding'), 2200);
}

// ─── Onboarding ───────────────────────────────────────────────
function renderOnboarding() {
  const steps = [
    {
      emoji: '⚓', title: 'Conecta con <span>viajeros reales</span>', sub: 'Amigos de viaje, compañeros de coworking, roomies — en cualquier ciudad del mundo.',
      content: `
        <div class="step-dots">
          <div class="step-dot active"></div><div class="step-dot"></div><div class="step-dot"></div>
        </div>
        <button class="btn-primary" onclick="nextOnboard()">Comenzar →</button>
      `
    },
    {
      emoji: '🌍', title: 'Aparece en <span>3 ciudades</span> a la vez', sub: 'Tu perfil circula simultáneamente en todas tus ciudades activas.',
      content: `
        <div class="step-dots">
          <div class="step-dot"></div><div class="step-dot active"></div><div class="step-dot"></div>
        </div>
        <label class="form-label">Tu nombre</label>
        <input class="form-input" id="input-name" placeholder="¿Cómo te llaman?" />
        <label class="form-label">Email</label>
        <input class="form-input" id="input-email" type="email" placeholder="tu@email.com" />
        <button class="btn-primary" onclick="nextOnboard()">Continuar →</button>
      `
    },
    {
      emoji: '✨', title: '¿Qué <span>buscas?</span>', sub: 'Cuéntales a los demás qué tipo de conexión buscas.',
      content: `
        <div class="step-dots">
          <div class="step-dot"></div><div class="step-dot"></div><div class="step-dot active"></div>
        </div>
        <label class="form-label">Soy...</label>
        <div class="chip-grid" id="chips-type">
          <div class="chip" onclick="toggleChip(this,'type')">Nómada digital</div>
          <div class="chip" onclick="toggleChip(this,'type')">Mochilero</div>
          <div class="chip" onclick="toggleChip(this,'type')">Expat</div>
          <div class="chip" onclick="toggleChip(this,'type')">Business traveler</div>
        </div>
        <label class="form-label">Busco...</label>
        <div class="chip-grid" id="chips-looking">
          <div class="chip" onclick="toggleChip(this,'looking')">Amigos de viaje</div>
          <div class="chip" onclick="toggleChip(this,'looking')">Coworking</div>
          <div class="chip" onclick="toggleChip(this,'looking')">Roomie</div>
          <div class="chip" onclick="toggleChip(this,'looking')">Lo que surja</div>
        </div>
        <button class="btn-primary" onclick="finishOnboard()">Entrar a Ankr →</button>
        <button class="btn-ghost" onclick="finishOnboard()">Saltar por ahora</button>
      `
    }
  ];

  const step = steps[STATE.onboardStep - 1];
  document.getElementById('screen-onboarding').innerHTML = `
    <div class="onboard-hero">
      <div class="onboard-bg-circle"></div>
      <div class="onboard-emoji">${step.emoji}</div>
      <h1 class="onboard-title">${step.title}</h1>
      <p class="onboard-sub">${step.sub}</p>
    </div>
    <div class="onboard-card">
      ${step.content}
    </div>
  `;
}

function nextOnboard() {
  if (STATE.onboardStep < 3) {
    STATE.onboardStep++;
    renderOnboarding();
  }
}

function finishOnboard() {
  const nameEl = document.getElementById('input-name');
  if (nameEl) STATE.user.name = nameEl.value || 'Viajero';
  renderFeed();
  showScreen('feed');
}

function toggleChip(el) { el.classList.toggle('selected'); }

// ─── Feed ─────────────────────────────────────────────────────
function renderFeed() {
  const filtered = STATE.activeFilter === 'todos'
    ? PROFILES
    : PROFILES.filter(p => p.type === STATE.activeFilter);

  document.getElementById('screen-feed').innerHTML = `
    <div class="feed-header">
      <div class="feed-brand">
        <div class="feed-brand-name">Ankr</div>
        <div class="badge">2 ciudades</div>
      </div>
      <div class="feed-location">
        <div class="location-dot"></div>
        Medellín · CDMX
      </div>
      <div class="filter-bar">
        <div class="filter-chip ${STATE.activeFilter==='todos'?'active':''}" onclick="setFilter('todos')">Todos</div>
        <div class="filter-chip ${STATE.activeFilter==='travel'?'active':''}" onclick="setFilter('travel')">Amigos de viaje</div>
        <div class="filter-chip ${STATE.activeFilter==='work'?'active':''}" onclick="setFilter('work')">Coworking</div>
        <div class="filter-chip ${STATE.activeFilter==='room'?'active':''}" onclick="setFilter('room')">Roomie</div>
      </div>
    </div>
    <div class="feed-list">
      <div class="section-label">En tus ciudades ahora</div>
      ${filtered.map(p => profileCardHTML(p)).join('')}
    </div>
    ${bottomNavHTML('feed')}
  `;
}

function setFilter(f) { STATE.activeFilter = f; renderFeed(); }

function profileCardHTML(p) {
  const typeClass = { travel: 'conn-travel', work: 'conn-work', room: 'conn-room' }[p.type];
  const typeLabel = { travel: 'Amigos de viaje', work: 'Coworking', room: 'Roomie' }[p.type];
  return `
    <div class="profile-card" onclick="openProfile(${p.id})">
      <div class="card-head">
        <div class="avatar ${p.online?'avatar-online':''}" style="background:${p.bg}">${p.initials}</div>
        <div class="card-info">
          <div class="card-name">${p.name}</div>
          <div class="card-meta">${p.meta}</div>
        </div>
      </div>
      <div class="card-bio">${p.bio}</div>
      <div class="card-cities">
        ${p.cities.map(c => `<div class="city-pill ${c===p.hereCity?'here':''}">📍 ${c}</div>`).join('')}
      </div>
      <div class="card-tags">${p.tags.map(t=>`<div class="tag">${t}</div>`).join('')}</div>
      <div class="card-foot">
        <div class="conn-type ${typeClass}">${typeLabel}</div>
        <button class="btn-connect" onclick="event.stopPropagation();connect(this)">Conectar</button>
      </div>
    </div>
  `;
}

function connect(btn) {
  btn.classList.add('sent');
  btn.textContent = 'Enviado ✓';
}

// ─── Profile Detail ───────────────────────────────────────────
function openProfile(id) {
  const p = PROFILES.find(x => x.id === id);
  if (!p) return;
  document.getElementById('screen-profile').innerHTML = `
    <div class="profile-hero">
      <div class="profile-back" onclick="showScreen('feed')">←</div>
      <div class="profile-avatar-lg" style="background:${p.bg}">${p.initials}</div>
      <div class="profile-name-lg">${p.name}</div>
      <div class="profile-sub">${p.meta}</div>
      <div class="verified">✓ Perfil verificado</div>
      ${p.online ? `<div class="online-status"><div class="online-dot-sm"></div><div class="online-txt">Activa ahora en ${p.hereCity}</div></div>` : ''}
    </div>
    <div class="profile-body" style="padding-bottom:100px">
      <div class="profile-section-title">Sobre mí</div>
      <p class="profile-bio">${p.bio}</p>
      <div class="profile-section-title">Ciudades activas</div>
      <div class="card-cities" style="margin-bottom:20px">
        ${p.cities.map(c=>`<div class="city-pill ${c===p.hereCity?'here':''}">📍 ${c}</div>`).join('')}
      </div>
      <div class="profile-section-title">Intereses</div>
      <div class="card-tags" style="margin-bottom:20px">
        ${p.tags.map(t=>`<div class="tag">${t}</div>`).join('')}
      </div>
      <div class="profile-section-title">Estadísticas</div>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-val">14</div><div class="stat-lbl">Países visitados</div></div>
        <div class="stat-card"><div class="stat-val">3</div><div class="stat-lbl">Conexiones Ankr</div></div>
        <div class="stat-card"><div class="stat-val">Nómada</div><div class="stat-lbl">Estilo de viaje</div></div>
        <div class="stat-card"><div class="stat-val">${{travel:'Amigos',work:'Coworking',room:'Roomie'}[p.type]}</div><div class="stat-lbl">Busca</div></div>
      </div>
      <button class="btn-primary" onclick="openChat()">Enviar mensaje</button>
      <button class="btn-ghost" style="margin-top:10px">Guardar perfil</button>
    </div>
  `;
  showScreen('profile');
}

// ─── Chat ─────────────────────────────────────────────────────
function openChat() {
  renderChat();
  showScreen('chat');
}

function renderChat() {
  const msgs = STATE.chatMessages.map(m => `
    <div class="msg-row ${m.who}">
      <div>
        <div class="bubble ${m.who}">${m.text}</div>
        <div class="msg-time" style="${m.who==='me'?'text-align:right':''}">${m.time}</div>
      </div>
    </div>
  `).join('');

  document.getElementById('screen-chat').innerHTML = `
    <div class="chat-topbar">
      <div class="topbar-back" onclick="showScreen('profile')">←</div>
      <div class="chat-avatar-sm" style="background:#3730a3">SR</div>
      <div class="chat-info">
        <div class="chat-name">Sofia R.</div>
        <div class="chat-status">Activa ahora · Medellín</div>
      </div>
    </div>
    <div class="chat-body" id="chat-body">${msgs}</div>
    <div class="suggestions" id="suggestions">
      <div class="sugg-chip" onclick="sendSugg(this)">¡Sí, me apunto!</div>
      <div class="sugg-chip" onclick="sendSugg(this)">¿A qué hora?</div>
      <div class="sugg-chip" onclick="sendSugg(this)">Mejor pasado 🙌</div>
    </div>
    <div class="chat-input-row">
      <input class="chat-input" id="chat-input" placeholder="Escribe un mensaje..." onkeydown="if(event.key==='Enter')sendMsg()" />
      <button class="send-btn" onclick="sendMsg()">➤</button>
    </div>
  `;
  scrollChat();
}

function sendSugg(chip) {
  addMsg(chip.textContent, 'me');
  chip.remove();
  setTimeout(() => addMsg('¡Perfecto! Te mando la ubicación del punto de encuentro 📍', 'them'), 900);
}

function sendMsg() {
  const inp = document.getElementById('chat-input');
  const txt = inp?.value.trim();
  if (!txt) return;
  addMsg(txt, 'me');
  inp.value = '';
  setTimeout(() => addMsg('Genial, nos vemos allá 🙌', 'them'), 800);
}

function addMsg(text, who) {
  const now = new Date();
  const t = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
  STATE.chatMessages.push({ who, text, time: t });
  const body = document.getElementById('chat-body');
  if (!body) return;
  const div = document.createElement('div');
  div.className = `msg-row ${who}`;
  div.innerHTML = `<div><div class="bubble ${who}">${text}</div><div class="msg-time" style="${who==='me'?'text-align:right':''}">${t}</div></div>`;
  body.appendChild(div);
  scrollChat();
}

function scrollChat() {
  const body = document.getElementById('chat-body');
  if (body) body.scrollTop = body.scrollHeight;
}

// ─── Notifications ────────────────────────────────────────────
function renderNotifications() {
  document.getElementById('screen-notifications').innerHTML = `
    <div class="topbar">
      <div class="topbar-title">Notificaciones</div>
      <div class="badge">3 nuevas</div>
    </div>
    <div class="notif-list">
      <div class="section-label">Nuevas</div>
      <div class="notif-row unread">
        <div class="notif-avatar-sm" style="background:#3730a3">SR</div>
        <div class="notif-content">
          <div class="notif-text"><strong>Sofia R.</strong> quiere conectar contigo en Medellín</div>
          <div class="notif-time">hace 2 min · Medellín</div>
          <div class="notif-actions">
            <button class="btn-sm primary" onclick="acceptNotif(this)">Aceptar</button>
            <button class="btn-sm" onclick="dismissNotif(this)">Ignorar</button>
          </div>
        </div>
        <div class="unread-dot"></div>
      </div>
      <div class="notif-row unread">
        <div class="notif-avatar-sm" style="background:#0f6e56">AM</div>
        <div class="notif-content">
          <div class="notif-text"><strong>Axel M.</strong> te envió un mensaje</div>
          <div class="notif-time">hace 18 min · Medellín</div>
          <div class="notif-actions">
            <button class="btn-sm primary" onclick="openChat()">Responder</button>
          </div>
        </div>
        <div class="unread-dot"></div>
      </div>
      <div class="notif-row unread">
        <div class="notif-avatar-sm" style="background:#1a1a2e;font-size:20px">🌍</div>
        <div class="notif-content">
          <div class="notif-text"><strong>12 viajeros nuevos</strong> llegaron a Medellín esta semana</div>
          <div class="notif-time">hace 1 hora</div>
          <div class="notif-actions">
            <button class="btn-sm primary" onclick="showScreen('feed')">Ver perfiles</button>
          </div>
        </div>
        <div class="unread-dot"></div>
      </div>
      <div class="section-label" style="margin-top:16px">Anteriores</div>
      <div class="notif-row">
        <div class="notif-avatar-sm" style="background:#9a3412">ML</div>
        <div class="notif-content">
          <div class="notif-text"><strong>Mara L.</strong> aceptó tu solicitud de conexión</div>
          <div class="notif-time">ayer · CDMX</div>
        </div>
      </div>
      <div class="notif-row">
        <div class="notif-avatar-sm" style="background:#1a1a2e;font-size:18px">⭐</div>
        <div class="notif-content">
          <div class="notif-text">Tu perfil fue visto por <strong>34 personas</strong> esta semana</div>
          <div class="notif-time">hace 2 días</div>
        </div>
      </div>
      <div class="notif-row">
        <div class="notif-avatar-sm" style="background:#0f6e56;font-size:18px">✓</div>
        <div class="notif-content">
          <div class="notif-text">Tu perfil fue <strong>verificado</strong> exitosamente</div>
          <div class="notif-time">hace 3 días</div>
        </div>
      </div>
    </div>
    ${bottomNavHTML('notifications')}
  `;
}

function acceptNotif(btn) {
  const row = btn.closest('.notif-row');
  row.classList.remove('unread');
  row.querySelector('.notif-actions').innerHTML = '<span style="font-size:12px;color:#2dd4bf;font-weight:500;">✓ Conexión aceptada</span>';
  const dot = row.querySelector('.unread-dot');
  if (dot) dot.remove();
}

function dismissNotif(btn) {
  btn.closest('.notif-row').style.opacity = '0.4';
}

// ─── Connections ──────────────────────────────────────────────
function renderConnections() {
  document.getElementById('screen-connections').innerHTML = `
    <div class="topbar">
      <div class="topbar-title">Mis conexiones</div>
      <div class="badge">5</div>
    </div>
    <div class="tabs">
      <div class="tab ${STATE.activeTab==='all'?'active':''}" onclick="setTab('all')">Todas</div>
      <div class="tab ${STATE.activeTab==='online'?'active':''}" onclick="setTab('online')">En línea</div>
      <div class="tab ${STATE.activeTab==='pending'?'active':''}" onclick="setTab('pending')">Pendientes</div>
    </div>
    <div class="conn-list" id="conn-list">
      ${renderConnList()}
    </div>
    ${bottomNavHTML('connections')}
  `;
}

function setTab(tab) {
  STATE.activeTab = tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('conn-list').innerHTML = renderConnList();
}

function renderConnList() {
  const list = STATE.activeTab === 'online'
    ? CONNECTIONS.filter(c => c.online)
    : STATE.activeTab === 'pending'
    ? []
    : CONNECTIONS;

  if (STATE.activeTab === 'pending') {
    return `<div style="text-align:center;padding:40px 0;color:var(--text3);font-size:14px">Sin solicitudes pendientes</div>`;
  }

  return `
    <div class="section-label">${STATE.activeTab==='online'?'En línea ahora':'Todas tus conexiones'}</div>
    ${list.map(c => `
      <div class="conn-card">
        <div class="avatar ${c.online?'avatar-online':''}" style="background:${c.bg};width:44px;height:44px;font-size:14px">${c.initials}</div>
        <div class="conn-info">
          <div class="conn-name">${c.name}</div>
          <div class="conn-meta">${c.meta}</div>
        </div>
        <div class="conn-city-badge">${c.city}</div>
        <div class="msg-icon" onclick="openChat()">💬</div>
      </div>
    `).join('')}
  `;
}

// ─── Cities ───────────────────────────────────────────────────
function renderCities() {
  document.getElementById('screen-cities').innerHTML = `
    <div class="topbar">
      <div class="topbar-title">Mis ciudades</div>
      <div style="font-size:12px;color:var(--text3)">2 de 3 usadas</div>
    </div>
    <div class="cities-body">
      <div class="section-label">Ciudades activas</div>
      <div class="city-card active-city">
        <div class="city-flag">🇲🇽</div>
        <div class="city-info"><div class="city-name">Ciudad de México</div><div class="city-count">847 viajeros activos</div></div>
        <div class="city-active-badge">Activa</div>
      </div>
      <div class="city-card active-city">
        <div class="city-flag">🇨🇴</div>
        <div class="city-info"><div class="city-name">Medellín</div><div class="city-count">412 viajeros activos</div></div>
        <div class="city-active-badge">Activa</div>
      </div>
      <div class="city-card city-add">
        <div class="city-flag">＋</div>
        <div class="city-info"><div class="city-name">Agregar tercera ciudad</div><div class="city-count">1 slot disponible</div></div>
      </div>
      <div class="section-label" style="margin-top:16px">Explorar ciudades</div>
      <input class="search-input" placeholder="Buscar ciudad..." />
      <div class="suggest-grid">
        <div class="chip">🇵🇹 Lisboa</div>
        <div class="chip">🇹🇭 Bangkok</div>
        <div class="chip">🇮🇩 Bali</div>
        <div class="chip">🇦🇷 Buenos Aires</div>
        <div class="chip">🇲🇦 Marrakech</div>
        <div class="chip">🇯🇵 Tokio</div>
      </div>
      <div class="upgrade-banner">
        <div style="font-size:24px">⚓</div>
        <div class="upgrade-text">Con Ankr Pro apareces en hasta 5 ciudades y destacas en el feed.</div>
        <button class="upgrade-btn">Ver planes</button>
      </div>
      <button class="btn-primary" style="margin-top:16px">Guardar cambios</button>
    </div>
    ${bottomNavHTML('cities')}
  `;
}

// ─── Bottom Nav ───────────────────────────────────────────────
function bottomNavHTML(active) {
  const items = [
    { id: 'feed', icon: '🗂', label: 'Feed', action: "navTo('feed')" },
    { id: 'notifications', icon: '🔔', label: 'Notifs', action: "navTo('notifications')", dot: true },
    { id: 'connections', icon: '👥', label: 'Conexiones', action: "navTo('connections')" },
    { id: 'cities', icon: '🌍', label: 'Ciudades', action: "navTo('cities')" },
  ];
  return `
    <div class="bottom-nav">
      ${items.map(i => `
        <div class="nav-item ${i.id===active?'active':''}" onclick="${i.action}">
          ${i.dot ? `<div class="nav-dot"></div>` : ''}
          <div class="nav-icon">${i.icon}</div>
          <div>${i.label}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function navTo(screen) {
  if (screen === 'feed') { renderFeed(); showScreen('feed'); }
  else if (screen === 'notifications') { renderNotifications(); showScreen('notifications'); }
  else if (screen === 'connections') { renderConnections(); showScreen('connections'); }
  else if (screen === 'cities') { renderCities(); showScreen('cities'); }
}

// ─── Init ─────────────────────────────────────────────────────
renderSplash();
renderOnboarding();
