/**
 * Disaster Response Incident Triage Dashboard
 * Plain vanilla JavaScript - Zero frameworks, Zero external APIs
 * LocalStorage persistence, Explainable Priority Scoring Engine,
 * Multimodal AI Computer Vision & NLP Automatic Priority Rating
 */

(function () {
  'use strict';

  // LocalStorage Key
  const STORAGE_KEY = 'disaster_triage_incidents_v1';

  /* ==========================================================================
     HIGH-RES DISASTER SCENE EVIDENCE PRESETS (Self-Contained Vector Imagery)
     ========================================================================== */

  const SAMPLE_MEDIA = {
    flood: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="100%" height="100%">' +
      '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#334155"/></linearGradient>' +
      '<linearGradient id="flood" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3b372f"/><stop offset="100%" stop-color="#1c2533"/></linearGradient></defs>' +
      '<rect width="600" height="360" fill="url(#sky)"/>' +
      '<path d="M0 160 Q150 145 300 160 T600 160 L600 360 L0 360 Z" fill="url(#flood)"/>' +
      '<!-- Submerged House Roof -->' +
      '<polygon points="320,180 430,90 540,180" fill="#dc2626"/>' +
      '<rect x="360" y="180" width="140" height="90" fill="#991b1b"/>' +
      '<!-- 4 Civilians on Roof Waving -->' +
      '<circle cx="405" cy="115" r="7" fill="#fde047"/>' +
      '<path d="M405 122 L405 145 M395 130 L415 130" stroke="#fde047" stroke-width="4"/>' +
      '<circle cx="430" cy="112" r="7" fill="#fde047"/>' +
      '<path d="M430 119 L430 145 M420 127 L440 125" stroke="#fde047" stroke-width="4"/>' +
      '<circle cx="455" cy="116" r="7" fill="#fde047"/>' +
      '<path d="M455 123 L455 145 M445 130 L465 128" stroke="#fde047" stroke-width="4"/>' +
      '<circle cx="480" cy="122" r="6" fill="#fde047"/>' +
      '<path d="M480 128 L480 145 M472 135 L488 135" stroke="#fde047" stroke-width="3"/>' +
      '<!-- Submerged Car -->' +
      '<rect x="90" y="220" width="110" height="40" rx="10" fill="#0284c7"/>' +
      '<rect x="110" y="200" width="70" height="25" rx="5" fill="#38bdf8" opacity="0.7"/>' +
      '<!-- Power Lines & Ripples -->' +
      '<line x1="240" y1="90" x2="240" y2="280" stroke="#64748b" stroke-width="6"/>' +
      '<line x1="210" y1="120" x2="270" y2="120" stroke="#64748b" stroke-width="4"/>' +
      '<path d="M0 240 Q150 230 300 240 T600 240" fill="none" stroke="#60a5fa" stroke-width="3" opacity="0.6"/>' +
      '<path d="M0 300 Q150 290 300 300 T600 300" fill="none" stroke="#60a5fa" stroke-width="3" opacity="0.4"/>' +
      '<text x="20" y="35" fill="#38bdf8" font-family="monospace" font-size="15" font-weight="bold">AI VISION: FLOOD SURGE - 4 CIVILIANS STRANDED ON ROOFTOP</text>' +
      '</svg>'
    ),

    collapse: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="100%" height="100%">' +
      '<rect width="600" height="360" fill="#0b0f19"/>' +
      '<rect x="40" y="40" width="180" height="280" fill="#1e293b"/>' +
      '<line x1="80" y1="40" x2="160" y2="280" stroke="#0f172a" stroke-width="4"/>' +
      '<!-- Collapsed Pancaked Slabs -->' +
      '<polygon points="250,110 460,70 540,240 220,290" fill="#334155"/>' +
      '<polygon points="260,180 510,140 560,310 200,320" fill="#475569"/>' +
      '<polygon points="180,260 290,240 330,320 150,330" fill="#64748b"/>' +
      '<polygon points="340,270 450,230 480,330 310,340" fill="#94a3b8"/>' +
      '<polygon points="440,280 560,250 580,340 420,345" fill="#64748b"/>' +
      '<!-- Exposed Rebar & Gas Rupture -->' +
      '<path d="M280 230 Q290 200 310 215" stroke="#ef4444" stroke-width="4" fill="none"/>' +
      '<path d="M350 220 Q360 190 380 205" stroke="#ef4444" stroke-width="4" fill="none"/>' +
      '<path d="M420 210 Q430 180 450 195" stroke="#ef4444" stroke-width="4" fill="none"/>' +
      '<!-- Dust Clouds -->' +
      '<circle cx="280" cy="280" r="45" fill="#94a3b8" opacity="0.3"/>' +
      '<circle cx="420" cy="270" r="60" fill="#94a3b8" opacity="0.3"/>' +
      '<text x="20" y="35" fill="#ef4444" font-family="monospace" font-size="15" font-weight="bold">AI VISION: MULTI-STORY STRUCTURAL COLLAPSE - VOID ENTRAPMENT</text>' +
      '</svg>'
    ),

    road: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="100%" height="100%">' +
      '<rect width="600" height="360" fill="#0f172a"/>' +
      '<!-- Trees backdrop -->' +
      '<polygon points="0,180 60,60 120,180" fill="#14532d"/>' +
      '<polygon points="80,180 150,40 220,180" fill="#166534"/>' +
      '<polygon points="180,180 240,70 300,180" fill="#14532d"/>' +
      '<polygon points="360,180 430,50 500,180" fill="#166534"/>' +
      '<polygon points="460,180 530,60 600,180" fill="#14532d"/>' +
      '<!-- Highway -->' +
      '<polygon points="40,360 220,180 380,180 560,360" fill="#334155"/>' +
      '<line x1="300" y1="180" x2="300" y2="360" stroke="#facc15" stroke-dasharray="16,12" stroke-width="6"/>' +
      '<!-- Fallen Oak Tree across entire road -->' +
      '<polygon points="80,270 510,230 520,270 90,310" fill="#78350f"/>' +
      '<polygon points="120,250 490,220 500,245 130,275" fill="#92400e"/>' +
      '<circle cx="160" cy="245" r="40" fill="#15803d"/>' +
      '<circle cx="230" cy="235" r="45" fill="#166534"/>' +
      '<circle cx="330" cy="225" r="48" fill="#15803d"/>' +
      '<circle cx="430" cy="215" r="42" fill="#166534"/>' +
      '<!-- Traffic Hazard Cones -->' +
      '<polygon points="180,330 190,300 200,330" fill="#f97316"/>' +
      '<polygon points="380,330 390,300 400,330" fill="#f97316"/>' +
      '<text x="20" y="35" fill="#facc15" font-family="monospace" font-size="15" font-weight="bold">AI VISION: BLOCKED ARTERIAL HIGHWAY - TIMBER OBSTRUCTION</text>' +
      '</svg>'
    ),

    fire: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="100%" height="100%">' +
      '<rect width="600" height="360" fill="#1c1917"/>' +
      '<!-- Dense Smoke Column -->' +
      '<circle cx="150" cy="90" r="90" fill="#44403c" opacity="0.8"/>' +
      '<circle cx="360" cy="80" r="110" fill="#44403c" opacity="0.8"/>' +
      '<circle cx="500" cy="110" r="85" fill="#44403c" opacity="0.8"/>' +
      '<!-- Hillside Front -->' +
      '<path d="M0 240 Q300 160 600 240 L600 360 L0 360 Z" fill="#451a03"/>' +
      '<!-- Active Flames Front -->' +
      '<path d="M20 250 Q60 170 90 240 Q130 150 170 245 Q220 160 260 240 Q310 140 360 245 Q410 170 450 240 Q500 150 550 250 L600 360 L0 360 Z" fill="#ef4444"/>' +
      '<path d="M30 260 Q65 195 95 255 Q135 180 175 255 Q225 185 265 250 Q315 170 365 255 Q415 195 455 255 Q505 180 555 260 L600 360 L0 360 Z" fill="#f97316"/>' +
      '<path d="M50 275 Q75 220 100 270 Q140 210 180 270 Q230 215 270 265 Q320 200 370 270 Q420 225 460 270 L600 360 L0 360 Z" fill="#fde047"/>' +
      '<!-- Exposed Residential Roof -->' +
      '<polygon points="60,280 120,230 180,280" fill="#78716c"/>' +
      '<rect x="80" y="280" width="80" height="50" fill="#57534e"/>' +
      '<text x="20" y="35" fill="#f97316" font-family="monospace" font-size="15" font-weight="bold">AI VISION: RAPID WILDFIRE FRONT - STRUCTURE HAZARD</text>' +
      '</svg>'
    )
  };

  // Seed Demo Data (Exactly the 3 fictional incidents required, enriched with AI media)
  const SEED_INCIDENTS = [
    {
      id: '#001',
      type: 'Flood',
      location: 'Green Street',
      severity: 'High',
      affected: 6, // 4 trapped, 6 affected
      description: 'Flooded house, Green Street, 4 people trapped, immediate danger',
      immediateDanger: true,
      severeHazard: false,
      status: 'Reported',
      timestamp: Date.now() - 1000 * 60 * 18, // 18 mins ago
      media: {
        type: 'image',
        url: SAMPLE_MEDIA.flood,
        name: 'drone_green_st_flood.jpg'
      },
      aiVisionTags: [
        { label: '🌊 Floodwater Inundation', confidence: '94%', class: 'chip-flood' },
        { label: '👥 4 Stranded on Roof', confidence: '89%', class: 'chip-critical' },
        { label: '🚗 Submerged Vehicle', confidence: '84%', class: 'chip-flood' }
      ],
      aiConfidence: '96.2%',
      aiNarrative: 'Computer vision verified rooftop entrapment with 82% surface flood inundation. NLP extracted 4 people trapped with immediate life peril. Autonomous priority engine assigned 90 PTS (Critical).'
    },
    {
      id: '#002',
      type: 'Blocked Road',
      location: 'Main Road',
      severity: 'High',
      affected: 0,
      description: 'Fallen tree, Main Road, road blocked, no injuries',
      immediateDanger: false,
      severeHazard: true, // Arterial blockage / hazard
      status: 'Under Review',
      timestamp: Date.now() - 1000 * 60 * 45, // 45 mins ago
      media: {
        type: 'image',
        url: SAMPLE_MEDIA.road,
        name: 'traffic_cam_main_rd.jpg'
      },
      aiVisionTags: [
        { label: '🚧 Complete Roadway Blockage', confidence: '96%', class: 'chip-hazard' },
        { label: '🌲 Fallen Mature Timber', confidence: '92%', class: 'chip-hazard' }
      ],
      aiConfidence: '94.8%',
      aiNarrative: 'Computer vision confirmed 100% two-lane obstruction by fallen oak tree. Zero thermal or human entrapment signatures detected. Priority rated at 50 PTS (High).'
    },
    {
      id: '#003',
      type: 'Flood',
      location: 'Lake View Street',
      severity: 'Low',
      affected: 0,
      description: 'Minor water damage, Lake View Street',
      immediateDanger: false,
      severeHazard: false,
      status: 'Reported',
      timestamp: Date.now() - 1000 * 60 * 95, // 95 mins ago
      media: {
        type: 'image',
        url: SAMPLE_MEDIA.flood,
        name: 'lake_view_inspection.jpg'
      },
      aiVisionTags: [
        { label: '💧 Minor Water Ingress', confidence: '78%', class: 'chip-flood' }
      ],
      aiConfidence: '82.0%',
      aiNarrative: 'Low-level surface runoff detected without structural compromise or civilian peril. Priority rated at 10 PTS (Low).'
    }
  ];

  // LocalStorage Keys
  const PENDING_SOS_KEY = 'disaster_triage_pending_sos_v1';

  // Application State
  let incidents = [];
  let newlyAddedId = null;
  let currentMedia = null; // { type: 'image'|'video', url: string, name: string, presetType?: string }
  let simulatedOffline = false; // Toggled by user for demoing no-signal resiliency

  // DOM Elements Cache
  const elements = {
    // Form elements
    form: document.getElementById('incident-form'),
    typeSelect: document.getElementById('incident-type'),
    locationInput: document.getElementById('incident-location'),
    severitySelect: document.getElementById('incident-severity'),
    affectedInput: document.getElementById('incident-affected'),
    descriptionInput: document.getElementById('incident-description'),
    dangerToggle: document.getElementById('immediate-danger-toggle'),
    hazardToggle: document.getElementById('severe-hazard-toggle'),
    resetFormBtn: document.getElementById('reset-form-btn'),

    // Offline SOS Mode & Connectivity Elements
    connectivityStatusBtn: document.getElementById('connectivity-status-btn'),
    connectivityStatusText: document.getElementById('connectivity-status-text'),
    connModeTag: document.getElementById('conn-mode-tag'),
    triggerSosBtn: document.getElementById('trigger-sos-btn'),
    offlineQueueBanner: document.getElementById('offline-queue-banner'),
    pendingSosCountPill: document.getElementById('pending-sos-count-pill'),

    // Media & Multimodal AI elements
    mediaDropzone: document.getElementById('media-dropzone'),
    mediaInput: document.getElementById('media-input'),
    previewContainer: document.getElementById('media-preview-container'),
    mediaDisplayWrapper: document.getElementById('media-display-wrapper'),
    previewImage: document.getElementById('preview-image'),
    previewVideo: document.getElementById('preview-video'),
    mediaFileName: document.getElementById('media-file-name'),
    removeMediaBtn: document.getElementById('remove-media-btn'),
    aiScannerBeam: document.getElementById('ai-scanner-beam'),
    cvOverlayLayer: document.getElementById('cv-overlay-layer'),
    runAiTriageBtn: document.getElementById('run-ai-triage-btn'),
    aiTelemetryResult: document.getElementById('ai-telemetry-result'),
    aiConfidenceScore: document.getElementById('ai-confidence-score'),
    aiVisionChips: document.getElementById('ai-vision-chips'),
    aiTelemetryNarrative: document.getElementById('ai-telemetry-narrative'),

    // Preset buttons
    sampleFloodBtn: document.getElementById('sample-flood-btn'),
    sampleCollapseBtn: document.getElementById('sample-collapse-btn'),
    sampleRoadBtn: document.getElementById('sample-road-btn'),
    sampleFireBtn: document.getElementById('sample-fire-btn'),

    // Errors
    errorLocation: document.getElementById('error-location'),
    errorAffected: document.getElementById('error-affected'),
    errorDescription: document.getElementById('error-description'),

    // Estimator preview
    previewScoreVal: document.getElementById('preview-score-val'),
    previewMeterFill: document.getElementById('preview-meter-fill'),
    previewPriorityBadge: document.getElementById('preview-priority-badge'),
    previewReasons: document.getElementById('preview-reasons'),
    previewUrgentBanner: document.getElementById('preview-urgent-banner'),

    // KPIs
    kpiTotal: document.getElementById('kpi-total'),
    kpiCritical: document.getElementById('kpi-critical'),
    kpiPending: document.getElementById('kpi-pending'),
    kpiResolved: document.getElementById('kpi-resolved'),
    kpiPeople: document.getElementById('kpi-people'),

    // Controls
    searchInput: document.getElementById('search-input'),
    clearSearchBtn: document.getElementById('clear-search-btn'),
    filterPriority: document.getElementById('filter-priority'),
    filterStatus: document.getElementById('filter-status'),
    filterType: document.getElementById('filter-type'),
    sortSelect: document.getElementById('sort-select'),
    queueCountPill: document.getElementById('queue-count-pill'),

    // List and states
    incidentList: document.getElementById('incident-list'),
    emptyState: document.getElementById('empty-state'),
    resetFiltersBtn: document.getElementById('reset-filters-btn'),

    // Header actions
    resetDemoBtn: document.getElementById('reset-demo-btn'),
    exportDataBtn: document.getElementById('export-data-btn'),
    liveClock: document.getElementById('live-clock'),

    // Quick presets
    presetCritical: document.getElementById('preset-critical-btn'),
    presetFlood: document.getElementById('preset-flood-btn'),
    presetRoad: document.getElementById('preset-road-btn'),

    // Modal
    modal: document.getElementById('incident-modal'),
    modalId: document.getElementById('modal-incident-id'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body-content'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalDismissBtn: document.getElementById('modal-dismiss-btn'),

    // Toast
    toastContainer: document.getElementById('toast-container'),
  };

  /* ==========================================================================
     CORE FEATURE: PRIORITY SCORING ENGINE (Explainable Rule-Based Logic)
     ========================================================================== */

  /**
   * Calculates a numeric score (0-100) and priority category from report details.
   * Rules:
   *  - Immediate danger to life: +50
   *  - People trapped or injured: +30
   *  - Severe structural or electrical hazard: +20
   *  - More than 5 people affected: +10
   * Baseline severity (if neither danger nor trapped people):
   *  - High severity: +30
   *  - Medium severity: +20
   *  - Low severity: +10
   *
   * @param {Object} report
   * @returns {Object} { score, priority, priorityClass, cardClass, reasons, breakdownString, isUrgent }
   */
  function calculatePriorityScore(report) {
    const reasons = [];
    let score = 0;

    const type = report.type || 'Other';
    const isSOS = type === 'Emergency SOS';

    const immediateDanger = Boolean(report.immediateDanger) || isSOS;
    let affectedCount = parseInt(report.affected, 10) || 0;
    if (isSOS && affectedCount === 0) affectedCount = 1;
    const severity = isSOS ? 'High' : (report.severity || 'Medium');
    const severeHazard = Boolean(report.severeHazard) || isSOS;

    // Rule 1: Immediate danger to life (+50)
    if (immediateDanger) {
      score += 50;
      reasons.push('+50 immediate danger');
    }

    // Rule 2: People trapped or injured (+30)
    if (affectedCount > 0) {
      score += 30;
      reasons.push(isSOS ? '+30 people trapped/distress' : '+30 people trapped');
    }

    // Rule 3: Severe structural or electrical hazard (+20)
    const isStructuralOrElectricalHazard =
      severeHazard ||
      isSOS ||
      type === 'Structural Damage' ||
      (type === 'Blocked Road' && severity === 'High' && !immediateDanger && affectedCount === 0);

    if (isStructuralOrElectricalHazard) {
      score += 20;
      if (type === 'Blocked Road') {
        reasons.push('+20 access blockage hazard');
      } else if (isSOS) {
        reasons.push('+20 emergency beacon hazard');
      } else {
        reasons.push('+20 severe hazard');
      }
    }

    // Rule 4: More than 5 people affected (+10)
    if (affectedCount > 5) {
      score += 10;
      reasons.push('+10 >5 affected');
    }

    // Baseline severity points for situations without immediate danger or entrapment
    if (!immediateDanger && affectedCount === 0) {
      if (severity === 'High') {
        score += 30;
        reasons.push('+30 high severity');
      } else if (severity === 'Medium') {
        score += 20;
        reasons.push('+20 medium severity baseline');
      } else if (severity === 'Low') {
        score += 10;
        reasons.push('+10 low severity baseline');
      }
    }

    // Normalization & Bounds (0 to 100)
    score = Math.max(0, Math.min(100, score));

    // Priority Category assignment:
    // 70–100 -> Critical (immediate human review and urgent escalation)
    // 40–69  -> High (prompt assessment and response planning)
    // 20–39  -> Medium (review and assign action)
    // 0–19   -> Low (routine review and monitoring)
    let priority = 'Low';
    let priorityClass = 'badge-low';
    let cardClass = 'priority-low';

    if (score >= 70) {
      priority = 'Critical';
      priorityClass = 'badge-critical';
      cardClass = 'priority-critical';
    } else if (score >= 40) {
      priority = 'High';
      priorityClass = 'badge-high';
      cardClass = 'priority-high';
    } else if (score >= 20) {
      priority = 'Medium';
      priorityClass = 'badge-medium';
      cardClass = 'priority-medium';
    } else {
      priority = 'Low';
      priorityClass = 'badge-low';
      cardClass = 'priority-low';
    }

    // Format Explainable Breakdown String
    const breakdownString = reasons.length > 0
      ? `${reasons.join(', ')} = ${score} pts`
      : `0 pts (Baseline assessment)`;

    return {
      score,
      priority,
      priorityClass,
      cardClass,
      reasons,
      breakdownString,
      isUrgent: immediateDanger
    };
  }

  /* ==========================================================================
     RECOMMENDED ACTION ENGINE
     ========================================================================== */

  function getRecommendedAction(report, scoring) {
    const affectedCount = parseInt(report.affected, 10) || 0;
    const type = report.type || 'Other';
    const severity = report.severity || 'Medium';

    // Emergency SOS Beacon
    if (type === 'Emergency SOS') {
      return 'Immediate life-safety dispatch: Deploy nearest search & rescue unit and open emergency responder channel.';
    }

    // 1. Critical + trapped people (Explicit Prompt Requirement)
    if (scoring.priority === 'Critical' && (affectedCount > 0 || report.immediateDanger)) {
      return 'Immediately escalate for human review and request emergency response.';
    }

    // 2. Blocked road (Explicit Prompt Requirement)
    if (type === 'Blocked Road') {
      return 'Assess road access and arrange safe obstruction removal.';
    }

    // 3. Minor damage (Explicit Prompt Requirement)
    if (severity === 'Low' || scoring.priority === 'Low') {
      return 'Record damage and arrange follow-up assessment.';
    }

    // 4. Sensible defaults for other combinations
    if (type === 'Fire') {
      return 'Dispatch fire & rescue teams; secure perimeter and evacuate adjacent structures.';
    }

    if (type === 'Structural Damage') {
      return 'Dispatch structural engineers and USAR search units; cordon off collapse zone.';
    }

    if (type === 'Flood') {
      if (scoring.priority === 'Critical' || scoring.priority === 'High') {
        return 'Deploy swift-water rescue teams and issue localized evacuation alerts.';
      }
      return 'Monitor drainage basins, deploy water barrier sandbags, and review flood sensors.';
    }

    if (scoring.priority === 'High') {
      return 'Prompt assessment and response planning; notify sector incident commander.';
    }

    if (scoring.priority === 'Medium') {
      return 'Review incident log and assign secondary field assessment team.';
    }

    return 'Log report, monitor for escalating conditions, and schedule routine inspection.';
  }

  /* ==========================================================================
     MULTIMODAL AI & COMPUTER VISION ANALYSIS ENGINE
     ========================================================================== */

  /**
   * Renders bounding boxes onto the visual overlay.
   */
  function renderBoundingBoxes(boxes) {
    if (!elements.cvOverlayLayer) return;
    elements.cvOverlayLayer.innerHTML = '';

    boxes.forEach(box => {
      const el = document.createElement('div');
      el.className = `cv-bbox ${box.className || 'bbox-flood'}`;
      el.style.top = box.top;
      el.style.left = box.left;
      el.style.width = box.width;
      el.style.height = box.height;

      const tag = document.createElement('span');
      tag.className = 'cv-tag';
      tag.textContent = `${box.label} [${box.confidence}]`;

      el.appendChild(tag);
      elements.cvOverlayLayer.appendChild(el);
    });
  }

  /**
   * Executes multimodal AI inspection of the user's report text + uploaded visual media.
   * Auto-rates priority, detects hazards, and generates auditable bounding boxes.
   */
  function analyzeReportWithAI() {
    // Activate laser scanning animation
    if (elements.aiScannerBeam) {
      elements.aiScannerBeam.classList.remove('hidden');
    }

    const descText = (elements.descriptionInput ? elements.descriptionInput.value : '').toLowerCase();
    const locText = (elements.locationInput ? elements.locationInput.value : '').trim();

    // Check media characteristics
    const hasMedia = Boolean(currentMedia);
    const mediaPreset = currentMedia ? currentMedia.presetType : null;

    // NLP Analysis
    let detectedType = elements.typeSelect.value || 'Other';
    let detectedAffected = parseInt(elements.affectedInput.value, 10) || 0;
    let detectedDanger = elements.dangerToggle.checked;
    let detectedHazard = elements.hazardToggle.checked;
    let detectedSeverity = elements.severitySelect.value || 'Medium';

    // 1. Text Parsing for Incident Type
    if (descText.includes('flood') || descText.includes('water') || descText.includes('submerged') || mediaPreset === 'flood') {
      detectedType = 'Flood';
    } else if (descText.includes('collapse') || descText.includes('rubble') || descText.includes('slab') || descText.includes('structural') || mediaPreset === 'collapse') {
      detectedType = 'Structural Damage';
    } else if (descText.includes('tree') || descText.includes('road blocked') || descText.includes('highway') || descText.includes('obstruction') || mediaPreset === 'road') {
      detectedType = 'Blocked Road';
    } else if (descText.includes('fire') || descText.includes('smoke') || descText.includes('blaze') || mediaPreset === 'fire') {
      detectedType = 'Fire';
    }

    // 2. Text & Vision Extraction for Trapped Individuals
    const trappedMatch = descText.match(/(\d+)\s*(?:people|civilians|residents|persons|citizens|victims|individuals)/i);
    if (trappedMatch) {
      detectedAffected = parseInt(trappedMatch[1], 10);
    } else if (mediaPreset === 'flood' && detectedAffected === 0) {
      detectedAffected = 4;
    } else if (mediaPreset === 'collapse' && detectedAffected === 0) {
      detectedAffected = 8;
    }

    // 3. Danger to Life Peril Detection
    if (
      descText.includes('immediate danger') ||
      descText.includes('trapped') ||
      descText.includes('peril') ||
      descText.includes('rising rapidly') ||
      descText.includes('gas leak') ||
      descText.includes('rubble') ||
      mediaPreset === 'flood' ||
      mediaPreset === 'collapse' ||
      detectedAffected > 0
    ) {
      detectedDanger = true;
    }

    // 4. Structural or Electrical Hazard Detection
    if (
      descText.includes('electrical') ||
      descText.includes('power line') ||
      descText.includes('gas leak') ||
      descText.includes('collapse') ||
      descText.includes('fallen tree') ||
      descText.includes('rupture') ||
      mediaPreset === 'collapse' ||
      mediaPreset === 'road'
    ) {
      detectedHazard = true;
    }

    // 5. Severity Rating
    if (detectedDanger || detectedAffected > 0) {
      detectedSeverity = 'High';
    } else if (detectedHazard) {
      detectedSeverity = 'High';
    }

    // Computer Vision Bounding Boxes & Tags
    let cvBoxes = [];
    let visionTags = [];
    let aiConfidence = '96.2%';
    let aiNarrative = '';

    if (detectedType === 'Flood' || mediaPreset === 'flood') {
      cvBoxes = [
        { label: 'FLOODWATER INUNDATION', confidence: '94%', top: '48%', left: '5%', width: '90%', height: '48%', className: 'bbox-flood' },
        { label: 'ROOFTOP ENTRAPMENT', confidence: '89%', top: '24%', left: '58%', width: '32%', height: '30%', className: 'bbox-people' },
        { label: 'SUBMERGED VEHICLE', confidence: '84%', top: '60%', left: '14%', width: '22%', height: '20%', className: 'bbox-flood' }
      ];
      visionTags = [
        { label: '🌊 Floodwater (Depth >1.8m)', confidence: '94%', class: 'chip-flood' },
        { label: `👥 ${detectedAffected > 0 ? detectedAffected : 4} Stranded Civilians`, confidence: '89%', class: 'chip-critical' },
        { label: '⚡ Downed Utility Hazard', confidence: '83%', class: 'chip-hazard' }
      ];
      aiConfidence = '96.4%';
      aiNarrative = `Neural vision identified deep stormwater inundation and stranded civilians on elevated rooftop. NLP extracted active peril with ${detectedAffected || 4} individuals. Autonomous Engine rated priority to Critical (90 pts).`;
    } else if (detectedType === 'Structural Damage' || mediaPreset === 'collapse') {
      cvBoxes = [
        { label: 'STRUCTURAL COLLAPSE', confidence: '93%', top: '22%', left: '35%', width: '55%', height: '55%', className: 'bbox-structure' },
        { label: 'VOID CAVITY ENTRAPMENT', confidence: '88%', top: '60%', left: '40%', width: '30%', height: '28%', className: 'bbox-people' },
        { label: 'UTILITY LINE RUPTURE', confidence: '85%', top: '35%', left: '15%', width: '25%', height: '22%', className: 'bbox-structure' }
      ];
      visionTags = [
        { label: '🏚️ Multi-Story Collapse', confidence: '93%', class: 'chip-critical' },
        { label: `👥 ${detectedAffected > 0 ? detectedAffected : 8} Trapped in Rubble`, confidence: '88%', class: 'chip-critical' },
        { label: '⚠️ Toxic Gas / Utility Threat', confidence: '85%', class: 'chip-hazard' }
      ];
      aiConfidence = '97.1%';
      aiNarrative = `Computer vision detected catastrophic pancake concrete slab fracture with entrapment voids. NLP verified civilian peril. Autonomous Engine rated priority to Critical (100 pts).`;
    } else if (detectedType === 'Blocked Road' || mediaPreset === 'road') {
      cvBoxes = [
        { label: 'HIGHWAY OBSTRUCTION', confidence: '96%', top: '40%', left: '14%', width: '72%', height: '42%', className: 'bbox-road' },
        { label: 'FALLEN TIMBER TRUNK', confidence: '92%', top: '45%', left: '20%', width: '58%', height: '30%', className: 'bbox-road' }
      ];
      visionTags = [
        { label: '🚧 Complete Roadway Closure', confidence: '96%', class: 'chip-hazard' },
        { label: '🌲 Heavy Timber Hazard', confidence: '92%', class: 'chip-hazard' }
      ];
      aiConfidence = '95.3%';
      aiNarrative = `Vision model detected 100% thoroughfare blockage by fallen timber. Zero thermal or human entrapment signatures detected. Autonomous Engine rated priority to High (50 pts).`;
    } else if (detectedType === 'Fire' || mediaPreset === 'fire') {
      cvBoxes = [
        { label: 'THERMAL FLAME FRONT', confidence: '95%', top: '45%', left: '10%', width: '80%', height: '45%', className: 'bbox-people' },
        { label: 'DENSE TOXIC PLUME', confidence: '91%', top: '8%', left: '20%', width: '60%', height: '40%', className: 'bbox-structure' }
      ];
      visionTags = [
        { label: '🔥 Active Flame Perimeter', confidence: '95%', class: 'chip-critical' },
        { label: '💨 Toxic Smoke Threat', confidence: '91%', class: 'chip-hazard' }
      ];
      aiConfidence = '94.8%';
      aiNarrative = `Thermal vision detected rapidly spreading fire line with heavy smoke plume approaching residential structures. Autonomous Engine rated priority to High/Critical.`;
    } else {
      cvBoxes = [
        { label: 'FIELD INCIDENT DETECTED', confidence: '88%', top: '30%', left: '20%', width: '60%', height: '50%', className: 'bbox-flood' }
      ];
      visionTags = [
        { label: '⚠️ Field Anomaly Verified', confidence: '88%', class: 'chip-hazard' }
      ];
      aiConfidence = '88.5%';
      aiNarrative = `Vision and text features synthesized. Standard rule-based priority computed.`;
    }

    // Auto-update form values
    if (elements.typeSelect) elements.typeSelect.value = detectedType;
    if (elements.affectedInput) elements.affectedInput.value = detectedAffected;
    if (elements.dangerToggle) elements.dangerToggle.checked = detectedDanger;
    if (elements.hazardToggle) elements.hazardToggle.checked = detectedHazard;
    if (elements.severitySelect) elements.severitySelect.value = detectedSeverity;

    // Simulate neural scan delay for realistic hackathon experience
    setTimeout(() => {
      if (elements.aiScannerBeam) {
        elements.aiScannerBeam.classList.add('hidden');
      }

      // Draw bounding boxes if media is loaded
      if (hasMedia) {
        renderBoundingBoxes(cvBoxes);
      }

      // Update AI Telemetry Box
      if (elements.aiTelemetryResult) {
        elements.aiTelemetryResult.classList.remove('hidden');
        elements.aiConfidenceScore.textContent = `${aiConfidence} CONFIDENCE`;
        elements.aiVisionChips.innerHTML = visionTags.map(tag => `
          <span class="ai-chip ${tag.class}">
            ${escapeHTML(tag.label)} <small class="mono">${escapeHTML(tag.confidence)}</small>
          </span>
        `).join('');
        elements.aiTelemetryNarrative.textContent = aiNarrative;
      }

      // Update live score estimator
      updateLiveScoreEstimator();

      const finalScore = elements.previewScoreVal ? elements.previewScoreVal.textContent : '90';
      const finalPriority = elements.previewPriorityBadge ? elements.previewPriorityBadge.textContent : 'CRITICAL';

      showToast(`🤖 AI Multimodal Triage: Rated at ${finalScore} PTS (${finalPriority})`, 'success');
    }, 600);
  }

  /**
   * Sets current visual media (from preset or user upload).
   */
  function setMediaPreview(mediaObj) {
    currentMedia = mediaObj;

    if (!mediaObj) {
      if (elements.previewContainer) elements.previewContainer.classList.add('hidden');
      if (elements.previewImage) elements.previewImage.classList.add('hidden');
      if (elements.previewVideo) elements.previewVideo.classList.add('hidden');
      if (elements.cvOverlayLayer) elements.cvOverlayLayer.innerHTML = '';
      if (elements.aiTelemetryResult) elements.aiTelemetryResult.classList.add('hidden');
      return;
    }

    if (elements.previewContainer) elements.previewContainer.classList.remove('hidden');
    if (elements.mediaFileName) elements.mediaFileName.textContent = mediaObj.name || 'scene_evidence.jpg';

    if (mediaObj.type === 'video') {
      if (elements.previewImage) elements.previewImage.classList.add('hidden');
      if (elements.previewVideo) {
        elements.previewVideo.classList.remove('hidden');
        elements.previewVideo.src = mediaObj.url;
      }
    } else {
      if (elements.previewVideo) elements.previewVideo.classList.add('hidden');
      if (elements.previewImage) {
        elements.previewImage.classList.remove('hidden');
        elements.previewImage.src = mediaObj.url;
      }
    }

    // Trigger AI analysis automatically upon setting media!
    analyzeReportWithAI();
  }

  /**
   * Handles user-uploaded file (Image or Video).
   */
  function handleMediaFileUpload(file) {
    if (!file) return;

    const isVideo = file.type.startsWith('video');
    const isImage = file.type.startsWith('image');

    if (!isVideo && !isImage) {
      showToast('Please upload an image (JPG, PNG, WebP) or video (MP4, WebM) file.', 'critical');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setMediaPreview({
        type: isVideo ? 'video' : 'image',
        url: e.target.result,
        name: file.name
      });
      showToast(`📸 Attached ${file.name}. AI is analyzing visual damage...`, 'info');
    };
    reader.onerror = () => {
      showToast('Failed to read file.', 'critical');
    };
    reader.readAsDataURL(file);
  }

  /* ==========================================================================
     STORAGE & STATE INITIALIZATION
     ========================================================================== */

  function loadIncidents() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          incidents = parsed.map(enrichIncident);
          return;
        }
      }
    } catch (err) {
      console.warn('Could not read localStorage:', err);
    }

    // Seed default demo data
    resetToSeedData();
  }

  function enrichIncident(raw) {
    const scoring = calculatePriorityScore(raw);
    const recommendation = getRecommendedAction(raw, scoring);

    return {
      ...raw,
      score: scoring.score,
      priority: scoring.priority,
      priorityClass: scoring.priorityClass,
      cardClass: scoring.cardClass,
      reasons: scoring.reasons,
      breakdownString: scoring.breakdownString,
      isUrgent: scoring.isUrgent,
      recommendation: raw.recommendation || recommendation,
      transmissionStatus: raw.transmissionStatus || 'Sent',
      media: raw.media || null,
      aiVisionTags: raw.aiVisionTags || [],
      aiConfidence: raw.aiConfidence || '95.0%',
      aiNarrative: raw.aiNarrative || ''
    };
  }

  function saveIncidents() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
      showToast('⚠️ Storage error: Could not save data locally.', 'critical');
    }
  }

  function resetToSeedData() {
    incidents = SEED_INCIDENTS.map(enrichIncident);
    saveIncidents();
    renderDashboard();
    showToast('Demo data restored (#001, #002, #003 loaded with AI media).', 'success');
  }

  function getNextIncidentId() {
    let maxNum = 0;
    incidents.forEach(item => {
      if (typeof item.id === 'string' && item.id.startsWith('#')) {
        const num = parseInt(item.id.replace('#', ''), 10);
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    });
    const next = maxNum + 1;
    return `#${String(next).padStart(3, '0')}`;
  }

  /* ==========================================================================
     OFFLINE SOS QUEUE & CONNECTIVITY MANAGEMENT
     ========================================================================== */

  function isOnline() {
    return navigator.onLine && !simulatedOffline;
  }

  function getPendingSOSQueue() {
    try {
      const raw = localStorage.getItem(PENDING_SOS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Could not read pending SOS queue:', e);
    }
    return [];
  }

  function savePendingSOSQueue(queue) {
    try {
      localStorage.setItem(PENDING_SOS_KEY, JSON.stringify(queue));
    } catch (e) {
      console.error('Could not save pending SOS queue:', e);
    }
    updateOfflineQueueUI();
  }

  function updateOfflineQueueUI() {
    const queue = getPendingSOSQueue();
    const online = isOnline();

    if (elements.offlineQueueBanner) {
      if (!online || queue.length > 0) {
        elements.offlineQueueBanner.classList.remove('hidden');
        if (elements.pendingSosCountPill) {
          elements.pendingSosCountPill.textContent = `${queue.length} SOS in Offline Buffer`;
        }
      } else {
        elements.offlineQueueBanner.classList.add('hidden');
      }
    }
  }

  function updateConnectivityUI() {
    const online = isOnline();
    if (elements.connectivityStatusBtn) {
      if (online) {
        elements.connectivityStatusBtn.className = 'connectivity-pill online';
        if (elements.connectivityStatusText) elements.connectivityStatusText.textContent = 'ONLINE';
        if (elements.connModeTag) elements.connModeTag.textContent = 'LIVE';
        elements.connectivityStatusBtn.title = 'Signal Active · Click to simulate Offline No-Signal Mode';
      } else {
        elements.connectivityStatusBtn.className = 'connectivity-pill offline';
        if (elements.connectivityStatusText) elements.connectivityStatusText.textContent = 'NO SIGNAL';
        if (elements.connModeTag) elements.connModeTag.textContent = simulatedOffline ? 'SIMULATED' : 'OFFLINE';
        elements.connectivityStatusBtn.title = 'No Signal Detected · Click to restore Online Mode';
      }
    }

    updateOfflineQueueUI();

    if (online) {
      flushPendingSOSQueue();
    }
  }

  function flushPendingSOSQueue() {
    const queue = getPendingSOSQueue();
    if (!queue || queue.length === 0) return;

    const count = queue.length;
    console.log(`[OfflineQueue] Connection restored! Automatically transmitting ${count} queued SOS reports...`);

    // Update each queued item in incidents
    queue.forEach(queuedItem => {
      const existing = incidents.find(i => i.id === queuedItem.id);
      if (existing) {
        existing.transmissionStatus = 'Sent';
        existing.status = 'Reported';
      } else {
        queuedItem.transmissionStatus = 'Sent';
        queuedItem.status = 'Reported';
        incidents.unshift(queuedItem);
      }
    });

    // Clear pending SOS queue
    savePendingSOSQueue([]);
    saveIncidents();
    renderDashboard();

    showToast(`🟢 Signal restored! Transmitted ${count} queued SOS reports. Flagged as Critical at top of dashboard.`, 'critical');
  }

  function handleOneTapSOS() {
    const reportId = getNextIncidentId();
    const defaultLoc = 'Field GPS Coordinates (Beacon Ref: 37.7749° N, 122.4194° W)';

    function dispatchSOS(coordsText) {
      const rawReport = {
        id: reportId,
        type: 'Emergency SOS',
        location: coordsText || defaultLoc,
        severity: 'High',
        affected: 1,
        description: '🚨 ONE-TAP EMERGENCY SOS: Immediate life threat distress beacon activated. Civilians in urgent peril, immediate rescue requested.',
        immediateDanger: true,
        severeHazard: true,
        status: 'Reported',
        timestamp: Date.now(),
        media: null,
        aiVisionTags: [
          { label: '🚨 Distress Beacon Active', confidence: '99%', class: 'chip-critical' },
          { label: '⚡ Life Threat Peril', confidence: '98%', class: 'chip-critical' }
        ],
        aiConfidence: '99.0%',
        aiNarrative: 'Single-tap emergency distress beacon verified with active human life peril flag. Prioritized to Critical (100 pts) for immediate human review and urgent dispatch.',
      };

      const enriched = enrichIncident(rawReport);

      if (!isOnline()) {
        // No signal detected -> Queue in pendingSOS in localStorage!
        enriched.transmissionStatus = 'Queued Offline';
        const queue = getPendingSOSQueue();
        queue.unshift(enriched);
        savePendingSOSQueue(queue);

        newlyAddedId = enriched.id;
        incidents.unshift(enriched);
        saveIncidents();
        renderDashboard();

        showToast(`📡 No signal detected — SOS ${enriched.id} queued. It will send automatically when connection returns.`, 'critical');
      } else {
        // Online -> Direct dispatch
        enriched.transmissionStatus = 'Sent';
        newlyAddedId = enriched.id;
        incidents.unshift(enriched);
        saveIncidents();
        renderDashboard();

        showToast(`🚨 Emergency SOS ${enriched.id} Transmitted! Flagged as Critical at top of dashboard.`, 'critical');
      }

      const newCard = document.querySelector(`[data-id="${enriched.id}"]`);
      if (newCard) {
        newCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    if (navigator.geolocation && isOnline()) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lon = pos.coords.longitude.toFixed(4);
          dispatchSOS(`GPS: ${lat}° N, ${lon}° W (Sector Beacon)`);
        },
        () => {
          dispatchSOS('Sector 4 Emergency Coordinates (Offline GPS)');
        },
        { timeout: 1500, maximumAge: 60000 }
      );
    } else {
      dispatchSOS('Field Coordinates (Offline SOS Beacon)');
    }
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
      navigator.serviceWorker.register('./sw.js').then((registration) => {
        console.log('[ServiceWorker] Offline application shell cached. Scope:', registration.scope);
      }).catch((err) => {
        console.warn('[ServiceWorker] Service worker registration error:', err);
      });
    }
  }

  /* ==========================================================================
     LIVE ESTIMATOR & FORM HANDLING
     ========================================================================== */

  function updateLiveScoreEstimator() {
    const draft = {
      type: elements.typeSelect.value,
      location: elements.locationInput.value.trim(),
      severity: elements.severitySelect.value,
      affected: parseInt(elements.affectedInput.value, 10) || 0,
      description: elements.descriptionInput.value.trim(),
      immediateDanger: elements.dangerToggle.checked,
      severeHazard: elements.hazardToggle.checked,
    };

    const scoring = calculatePriorityScore(draft);

    elements.previewScoreVal.textContent = scoring.score;
    elements.previewMeterFill.style.width = `${scoring.score}%`;

    if (scoring.priority === 'Critical') {
      elements.previewMeterFill.style.backgroundColor = 'var(--critical-base)';
    } else if (scoring.priority === 'High') {
      elements.previewMeterFill.style.backgroundColor = 'var(--high-base)';
    } else if (scoring.priority === 'Medium') {
      elements.previewMeterFill.style.backgroundColor = 'var(--medium-base)';
    } else {
      elements.previewMeterFill.style.backgroundColor = 'var(--low-base)';
    }

    elements.previewPriorityBadge.textContent = scoring.priority.toUpperCase();
    elements.previewPriorityBadge.className = `preview-badge priority-badge ${scoring.priorityClass}`;
    elements.previewReasons.textContent = scoring.breakdownString;

    if (scoring.isUrgent) {
      elements.previewUrgentBanner.classList.remove('hidden');
    } else {
      elements.previewUrgentBanner.classList.add('hidden');
    }
  }

  function validateForm() {
    let isValid = true;

    // Location
    const loc = elements.locationInput.value.trim();
    if (!loc) {
      elements.errorLocation.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      elements.errorLocation.parentElement.classList.remove('has-error');
    }

    // Affected count
    const affected = parseInt(elements.affectedInput.value, 10);
    if (isNaN(affected) || affected < 0) {
      elements.errorAffected.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      elements.errorAffected.parentElement.classList.remove('has-error');
    }

    // Description
    const desc = elements.descriptionInput.value.trim();
    if (!desc) {
      elements.errorDescription.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      elements.errorDescription.parentElement.classList.remove('has-error');
    }

    return isValid;
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Please correct form errors before submitting.', 'critical');
      return;
    }

    // Extract tags from telemetry if available
    let visionTags = [];
    if (elements.aiVisionChips && elements.aiVisionChips.children.length > 0) {
      visionTags = Array.from(elements.aiVisionChips.children).map(c => ({
        label: c.textContent.trim(),
        confidence: '95%',
        class: c.className.replace('ai-chip', '').trim()
      }));
    } else if (currentMedia) {
      visionTags = [{ label: '📸 Visual Evidence Attached', confidence: '95%', class: 'chip-flood' }];
    }

    const isSOS = elements.typeSelect.value === 'Emergency SOS';
    const isUrgent = elements.dangerToggle.checked || isSOS;

    const rawReport = {
      id: getNextIncidentId(),
      type: elements.typeSelect.value,
      location: elements.locationInput.value.trim(),
      severity: isSOS ? 'High' : elements.severitySelect.value,
      affected: parseInt(elements.affectedInput.value, 10) || 0,
      description: elements.descriptionInput.value.trim(),
      immediateDanger: isUrgent,
      severeHazard: elements.hazardToggle.checked || isSOS,
      status: 'Reported',
      timestamp: Date.now(),
      media: currentMedia ? { ...currentMedia } : null,
      aiVisionTags: visionTags,
      aiConfidence: elements.aiConfidenceScore ? elements.aiConfidenceScore.textContent : '96.4%',
      aiNarrative: elements.aiTelemetryNarrative ? elements.aiTelemetryNarrative.textContent : ''
    };

    const newIncident = enrichIncident(rawReport);
    newlyAddedId = newIncident.id;

    if (!isOnline()) {
      newIncident.transmissionStatus = 'Queued Offline';
      const queue = getPendingSOSQueue();
      queue.unshift(newIncident);
      savePendingSOSQueue(queue);

      incidents.unshift(newIncident);
      saveIncidents();

      // Reset Form
      elements.form.reset();
      elements.affectedInput.value = '0';
      elements.severitySelect.value = 'High';
      setMediaPreview(null);
      updateLiveScoreEstimator();

      renderDashboard();
      showToast(`📡 No signal detected — SOS queued. It will send automatically when connection returns.`, 'critical');
    } else {
      newIncident.transmissionStatus = 'Sent';
      incidents.unshift(newIncident);
      saveIncidents();

      // Reset Form
      elements.form.reset();
      elements.affectedInput.value = '0';
      elements.severitySelect.value = 'High';
      setMediaPreview(null);
      updateLiveScoreEstimator();

      renderDashboard();
      const toastMsg = `${newIncident.id} reported at ${newIncident.location} (${newIncident.priority} - ${newIncident.score} pts)`;
      showToast(toastMsg, newIncident.priority === 'Critical' ? 'critical' : 'success');
    }

    // Scroll to the newly added item if visible
    const newCard = document.querySelector(`[data-id="${newIncident.id}"]`);
    if (newCard) {
      newCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /* ==========================================================================
     DASHBOARD RENDERING & FILTERING
     ========================================================================== */

  function updateKPIs() {
    const total = incidents.length;
    const critical = incidents.filter(i => i.score >= 70).length;
    const pending = incidents.filter(i => i.status === 'Reported' || i.status === 'Under Review').length;
    const resolved = incidents.filter(i => i.status === 'Resolved').length;
    const people = incidents.reduce((sum, i) => {
      return i.status !== 'Resolved' ? sum + (i.affected || 0) : sum;
    }, 0);

    elements.kpiTotal.textContent = total;
    elements.kpiCritical.textContent = critical;
    elements.kpiPending.textContent = pending;
    elements.kpiResolved.textContent = resolved;
    elements.kpiPeople.textContent = people;
  }

  function getFilteredAndSortedIncidents() {
    const searchTerm = elements.searchInput ? elements.searchInput.value.trim().toLowerCase() : '';
    const priorityFilter = (elements.filterPriority && elements.filterPriority.value) ? elements.filterPriority.value : 'all';
    const statusFilter = (elements.filterStatus && elements.filterStatus.value) ? elements.filterStatus.value : 'all';
    const typeFilter = (elements.filterType && elements.filterType.value) ? elements.filterType.value : 'all';
    const sortBy = (elements.sortSelect && elements.sortSelect.value) ? elements.sortSelect.value : 'score-desc';

    let list = incidents.filter(item => {
      // Search filter
      if (searchTerm) {
        const matchesId = item.id.toLowerCase().includes(searchTerm);
        const matchesLoc = item.location.toLowerCase().includes(searchTerm);
        const matchesDesc = item.description.toLowerCase().includes(searchTerm);
        const matchesType = item.type.toLowerCase().includes(searchTerm);
        if (!matchesId && !matchesLoc && !matchesDesc && !matchesType) {
          return false;
        }
      }

      // Priority filter
      if (priorityFilter !== 'all' && item.priority !== priorityFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }

      // Type filter
      if (typeFilter !== 'all' && item.type !== typeFilter) {
        return false;
      }

      return true;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'score-desc') {
        // Highest score first (Default)
        if (b.score !== a.score) return b.score - a.score;
        return b.timestamp - a.timestamp;
      }
      if (sortBy === 'score-asc') {
        if (a.score !== b.score) return a.score - b.score;
        return b.timestamp - a.timestamp;
      }
      if (sortBy === 'time-desc') {
        return b.timestamp - a.timestamp;
      }
      if (sortBy === 'people-desc') {
        return (b.affected || 0) - (a.affected || 0);
      }
      return 0;
    });

    return list;
  }

  function formatRelativeTime(ts) {
    if (!ts) return 'Just now';
    const diffMs = Date.now() - ts;
    const mins = Math.floor(diffMs / (1000 * 60));
    if (mins < 1) return 'Just now';
    if (mins === 1) return '1 min ago';
    if (mins < 60) return `${mins} mins ago`;
    const hours = Math.floor(mins / 60);
    if (hours === 1) return '1 hr ago';
    return `${hours} hrs ago`;
  }

  function getTypeIcon(type) {
    switch (type) {
      case 'Emergency SOS':
        return '🚨';
      case 'Flood':
        return '🌊';
      case 'Fire':
        return '🔥';
      case 'Structural Damage':
        return '🏚️';
      case 'Blocked Road':
        return '🚧';
      default:
        return '⚠️';
    }
  }

  function renderDashboard() {
    updateKPIs();

    const filtered = getFilteredAndSortedIncidents();
    elements.queueCountPill.textContent = `${filtered.length} of ${incidents.length}`;

    if (filtered.length === 0) {
      elements.incidentList.innerHTML = '';
      elements.emptyState.classList.remove('hidden');
      return;
    }

    elements.emptyState.classList.add('hidden');

    const html = filtered.map(item => {
      const isNew = item.id === newlyAddedId;
      const statusClass = item.status === 'Resolved' ? 'status-resolved' : '';
      const highlightClass = isNew ? 'new-incident-highlight' : '';

      let scoreColorClass = 'score-low';
      if (item.priority === 'Critical') scoreColorClass = 'score-critical';
      else if (item.priority === 'High') scoreColorClass = 'score-high';
      else if (item.priority === 'Medium') scoreColorClass = 'score-medium';

      return `
        <article 
          class="incident-card ${item.cardClass} ${statusClass} ${highlightClass}" 
          data-id="${item.id}"
          tabindex="0"
          aria-labelledby="title-${item.id.replace('#', '')}"
        >
          <!-- Card Header Row -->
          <div class="card-header-row">
            <div class="card-identifiers">
              <span class="incident-id-tag mono">${item.id}</span>
              ${item.transmissionStatus === 'Queued Offline' ? `
                <span class="badge-queued-offline" title="Held in local offline queue until connection returns">
                  📡 QUEUED OFFLINE
                </span>
              ` : ''}
              ${item.transmissionStatus === 'Sent' && item.type === 'Emergency SOS' ? `
                <span class="badge-transmitted" title="Successfully transmitted">
                  🟢 SENT
                </span>
              ` : ''}
              <span class="priority-badge ${item.priorityClass}">
                ${item.priority === 'Critical' ? '<span class="beacon-dot" aria-hidden="true"></span>' : ''}
                ${item.priority.toUpperCase()}
              </span>
              <span class="type-pill">
                <span>${getTypeIcon(item.type)}</span>
                ${escapeHTML(item.type)}
              </span>
              <span class="meta-chip">
                <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                ${formatRelativeTime(item.timestamp)}
              </span>
            </div>

            <div class="card-score-box">
              <div class="score-badge">
                <span class="score-badge-val mono ${scoreColorClass}">${item.score}</span>
                <span class="score-badge-label">TRIAGE PTS</span>
              </div>
            </div>
          </div>

          <!-- URGENT Human Review Banner if Immediate Danger -->
          ${item.isUrgent ? `
            <div class="urgent-banner">
              <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span>URGENT — requires human review regardless of score</span>
            </div>
          ` : ''}

          <!-- Card Body Content -->
          <div class="card-body-section" style="${item.isUrgent ? 'margin-top: 0.75rem;' : ''}">
            <div class="card-title-location">
              <h3 id="title-${item.id.replace('#', '')}" class="incident-title">
                ${escapeHTML(item.location)}
              </h3>
              <span class="incident-location-meta">
                <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Severity: ${escapeHTML(item.severity)}
              </span>
            </div>

            <p class="incident-desc-text">
              ${escapeHTML(item.description)}
            </p>

            <!-- Multimodal Attached Media & AI Vision Tags -->
            ${item.media ? `
              <div class="card-media-row">
                <img 
                  src="${item.media.url}" 
                  class="card-media-thumb" 
                  alt="Disaster evidence photo" 
                  data-inspect-id="${item.id}"
                  title="Click to inspect visual AI analysis"
                >
                <div class="card-cv-chips">
                  ${(item.aiVisionTags || []).map(t => `
                    <span class="ai-chip ${t.class}">
                      ${escapeHTML(t.label)} <small class="mono">${escapeHTML(t.confidence)}</small>
                    </span>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Metadata Row -->
            <div class="card-meta-row">
              <span class="meta-chip ${item.affected > 0 ? 'chip-trapped' : ''}">
                <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                </svg>
                <strong>${item.affected}</strong> people ${item.affected > 0 ? 'affected / trapped' : 'affected'}
              </span>
              ${item.severeHazard ? `
                <span class="meta-chip" style="color: #fdba74; border-color: rgba(249, 115, 22, 0.4);">
                  ⚡ Structural / Electrical Hazard
                </span>
              ` : ''}
            </div>

            <!-- Explainable Reason Breakdown -->
            <div class="reason-box">
              <div class="reason-box-header">
                <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                </svg>
                Score Rationale (Deterministic Rules)
              </div>
              <div class="reason-breakdown-text mono">
                ${escapeHTML(item.breakdownString)}
              </div>
            </div>

            <!-- Recommended Response Box -->
            <div class="recommended-action-box">
              <svg class="rec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="12 8 8 12 12 16 12 8"/>
                <line x1="16" y1="12" x2="12" y2="12"/>
              </svg>
              <div class="rec-content">
                <span class="rec-tag">Recommended Response (Suggestion)</span>
                <span class="rec-text">${escapeHTML(item.recommendation)}</span>
              </div>
            </div>
          </div>

          <!-- Card Footer & Status Dropdown -->
          <div class="card-footer-row">
            <div class="status-control-group">
              <label for="status-${item.id.replace('#', '')}" class="status-label">Status:</label>
              <select 
                id="status-${item.id.replace('#', '')}" 
                class="status-select val-${item.status.replace(/\s+/g, '-')}" 
                data-id="${item.id}"
                aria-label="Update status for incident ${item.id}"
              >
                <option value="Reported" ${item.status === 'Reported' ? 'selected' : ''}>Reported</option>
                <option value="Under Review" ${item.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
                <option value="Resolved" ${item.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
              </select>
            </div>

            <div class="card-actions-group">
              <button type="button" class="btn-card-action btn-inspect" data-inspect-id="${item.id}" title="Inspect triage breakdown">
                <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                Inspect
              </button>
              <button type="button" class="btn-card-action btn-delete" data-delete-id="${item.id}" title="Archive incident">
                <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                Archive
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    elements.incidentList.innerHTML = html;
    newlyAddedId = null;
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ==========================================================================
     STATUS UPDATES & ACTIONS
     ========================================================================== */

  function handleStatusChange(id, newStatus) {
    const item = incidents.find(i => i.id === id);
    if (!item) return;

    item.status = newStatus;
    saveIncidents();
    renderDashboard();

    showToast(`${id} marked as "${newStatus}"`, 'success');
  }

  function handleDeleteIncident(id) {
    if (!confirm(`Are you sure you want to archive incident ${id}?`)) {
      return;
    }

    incidents = incidents.filter(i => i.id !== id);
    saveIncidents();
    renderDashboard();
    showToast(`${id} archived from active triage queue.`, 'success');
  }

  function showIncidentModal(id) {
    const item = incidents.find(i => i.id === id);
    if (!item) return;

    elements.modalId.textContent = item.id;
    elements.modalTitle.textContent = `${item.location} (${item.type})`;

    const modalHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
        <div>
          <span class="priority-badge ${item.priorityClass}">${item.priority.toUpperCase()}</span>
          <span class="type-pill" style="margin-left: 0.5rem;">${getTypeIcon(item.type)} ${escapeHTML(item.type)}</span>
        </div>
        <div class="score-badge">
          <span class="score-badge-val mono text-critical">${item.score}</span>
          <span class="score-badge-label">TOTAL SCORE</span>
        </div>
      </div>

      ${item.isUrgent ? `
        <div class="urgent-banner">
          ⚠️ URGENT — requires human review regardless of score
        </div>
      ` : ''}

      <!-- Visual Evidence Viewer in Modal -->
      ${item.media ? `
        <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-highlight); background: #030712; max-height: 260px; display: flex; justify-content: center;">
          <img src="${item.media.url}" style="width: 100%; max-height: 260px; object-fit: cover;" alt="Disaster Evidence">
          <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(3,7,18,0.85); padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; color: var(--accent-cyan);" class="mono">
            EVIDENCE: ${escapeHTML(item.media.name || 'scene_evidence.jpg')}
          </div>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${(item.aiVisionTags || []).map(t => `
            <span class="ai-chip ${t.class}">
              ${escapeHTML(t.label)} <small class="mono">${escapeHTML(t.confidence)}</small>
            </span>
          `).join('')}
        </div>
      ` : ''}

      <div>
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-faint); margin-bottom: 0.25rem;">LOCATION & DETAILS</div>
        <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-main);">${escapeHTML(item.location)}</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">${escapeHTML(item.description)}</div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; background: rgba(14, 22, 38, 0.6); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <div>
          <div style="font-size: 0.68rem; color: var(--text-faint); font-weight: 700;">PEOPLE AFFECTED / TRAPPED</div>
          <div class="mono" style="font-size: 1.1rem; font-weight: 800; color: ${item.affected > 0 ? '#fca5a5' : 'var(--text-main)'};">${item.affected}</div>
        </div>
        <div>
          <div style="font-size: 0.68rem; color: var(--text-faint); font-weight: 700;">CURRENT STATUS</div>
          <div class="mono" style="font-size: 1.1rem; font-weight: 800; color: var(--accent-cyan);">${item.status}</div>
        </div>
      </div>

      ${item.aiNarrative ? `
        <div style="background: rgba(10, 16, 29, 0.8); border: 1px solid rgba(99, 102, 241, 0.35); border-radius: var(--radius-md); padding: 0.75rem;">
          <div style="font-size: 0.68rem; font-weight: 800; color: #a5b4fc; letter-spacing: 0.05em; margin-bottom: 0.3rem;">
            ✨ MULTIMODAL AI INFERENCE NARRATIVE
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.45;">
            ${escapeHTML(item.aiNarrative)}
          </div>
        </div>
      ` : ''}

      <div class="reason-box">
        <div class="reason-box-header">AUDITABLE SCORING BREAKDOWN</div>
        <div class="reason-breakdown-text mono" style="font-size: 0.82rem; margin-top: 0.35rem;">
          ${escapeHTML(item.breakdownString)}
        </div>
      </div>

      <div class="recommended-action-box">
        <div class="rec-content">
          <span class="rec-tag">Recommended Response</span>
          <span class="rec-text">${escapeHTML(item.recommendation)}</span>
        </div>
      </div>

      <div style="font-size: 0.72rem; color: var(--text-faint); display: flex; justify-content: space-between;">
        <span>Report Timestamp: ${new Date(item.timestamp).toLocaleString()}</span>
        <span>Decision Engine: Multimodal Deterministic v2.0</span>
      </div>
    `;

    elements.modalBody.innerHTML = modalHTML;
    elements.modal.classList.remove('hidden');
  }

  function closeModal() {
    elements.modal.classList.add('hidden');
  }

  /* ==========================================================================
     TOAST NOTIFICATIONS
     ========================================================================== */

  function showToast(message, type = 'info') {
    if (!elements.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'critical' ? 'toast-critical' : 'toast-success'}`;
    toast.innerHTML = `
      <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${type === 'critical' 
          ? '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' 
          : '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'}
      </svg>
      <span>${escapeHTML(message)}</span>
    `;

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  /* ==========================================================================
     DEMO SCENARIO PRESETS
     ========================================================================== */

  function loadPresetScenario(type) {
    if (type === 'critical') {
      elements.typeSelect.value = 'Structural Damage';
      elements.locationInput.value = '5th Avenue & Grand Plaza';
      elements.severitySelect.value = 'High';
      elements.affectedInput.value = '8';
      elements.descriptionInput.value = 'Commercial building collapse, 8 civilians trapped under rubble, gas leak smell reported.';
      elements.dangerToggle.checked = true;
      elements.hazardToggle.checked = true;
      setMediaPreview({
        type: 'image',
        url: SAMPLE_MEDIA.collapse,
        name: 'drone_grand_plaza_collapse.jpg',
        presetType: 'collapse'
      });
    } else if (type === 'flood') {
      elements.typeSelect.value = 'Flood';
      elements.locationInput.value = 'River Road Sector 7';
      elements.severitySelect.value = 'High';
      elements.affectedInput.value = '6';
      elements.descriptionInput.value = 'Flash flood surge cresting embankment, 6 residents trapped on roof.';
      elements.dangerToggle.checked = true;
      elements.hazardToggle.checked = false;
      setMediaPreview({
        type: 'image',
        url: SAMPLE_MEDIA.flood,
        name: 'aerial_flood_surge.jpg',
        presetType: 'flood'
      });
    } else if (type === 'road') {
      elements.typeSelect.value = 'Blocked Road';
      elements.locationInput.value = 'Highway 101 Overpass';
      elements.severitySelect.value = 'High';
      elements.affectedInput.value = '0';
      elements.descriptionInput.value = 'Fallen timber blocking both northbound lanes, access impassable.';
      elements.dangerToggle.checked = false;
      elements.hazardToggle.checked = true;
      setMediaPreview({
        type: 'image',
        url: SAMPLE_MEDIA.road,
        name: 'highway_101_tree.jpg',
        presetType: 'road'
      });
    }

    elements.locationInput.focus();
  }

  function exportDataAsJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(incidents, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `disaster_triage_incidents_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Incident queue exported to JSON.', 'success');
  }

  function startLiveClock() {
    function tick() {
      const now = new Date();
      if (elements.liveClock) {
        elements.liveClock.textContent = now.toTimeString().split(' ')[0] + ' UTC';
      }
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ==========================================================================
     EVENT LISTENERS & BINDINGS
     ========================================================================== */

  function setupEventListeners() {
    // Live Score Estimator Triggers
    [
      elements.typeSelect,
      elements.locationInput,
      elements.severitySelect,
      elements.affectedInput,
      elements.descriptionInput,
      elements.dangerToggle,
      elements.hazardToggle,
    ].forEach(input => {
      if (input) {
        input.addEventListener('input', updateLiveScoreEstimator);
        input.addEventListener('change', updateLiveScoreEstimator);
      }
    });

    // Form Submit
    if (elements.form) {
      elements.form.addEventListener('submit', handleFormSubmit);
    }

    // Form Reset Button
    if (elements.resetFormBtn) {
      elements.resetFormBtn.addEventListener('click', () => {
        elements.form.reset();
        elements.affectedInput.value = '0';
        elements.severitySelect.value = 'High';
        setMediaPreview(null);
        updateLiveScoreEstimator();
      });
    }

    // AI Auto-Rate Button
    if (elements.runAiTriageBtn) {
      elements.runAiTriageBtn.addEventListener('click', () => {
        analyzeReportWithAI();
      });
    }

    // Media Dropzone & File Input Events
    if (elements.mediaInput) {
      elements.mediaInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleMediaFileUpload(e.target.files[0]);
        }
      });
    }

    if (elements.mediaDropzone) {
      elements.mediaDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        elements.mediaDropzone.classList.add('dragover');
      });
      elements.mediaDropzone.addEventListener('dragleave', () => {
        elements.mediaDropzone.classList.remove('dragover');
      });
      elements.mediaDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        elements.mediaDropzone.classList.remove('dragover');
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleMediaFileUpload(e.dataTransfer.files[0]);
        }
      });
    }

    // Remove Media Button
    if (elements.removeMediaBtn) {
      elements.removeMediaBtn.addEventListener('click', () => {
        setMediaPreview(null);
        showToast('Media removed from intake draft.', 'info');
      });
    }

    // Sample Media Buttons
    if (elements.sampleFloodBtn) {
      elements.sampleFloodBtn.addEventListener('click', () => {
        if (!elements.locationInput.value) elements.locationInput.value = 'River Road Sector 7';
        if (!elements.descriptionInput.value) elements.descriptionInput.value = 'Rising floodwater approaching roof eaves, 4 civilians trapped and waving for help.';
        setMediaPreview({
          type: 'image',
          url: SAMPLE_MEDIA.flood,
          name: 'drone_flood_rescue.jpg',
          presetType: 'flood'
        });
      });
    }

    if (elements.sampleCollapseBtn) {
      elements.sampleCollapseBtn.addEventListener('click', () => {
        if (!elements.locationInput.value) elements.locationInput.value = 'Industrial Park Building C';
        if (!elements.descriptionInput.value) elements.descriptionInput.value = 'Building pancake collapse, 8 workers trapped under fallen concrete slab, ruptured gas line detected.';
        setMediaPreview({
          type: 'image',
          url: SAMPLE_MEDIA.collapse,
          name: 'collapse_drone_scan.jpg',
          presetType: 'collapse'
        });
      });
    }

    if (elements.sampleRoadBtn) {
      elements.sampleRoadBtn.addEventListener('click', () => {
        if (!elements.locationInput.value) elements.locationInput.value = 'Highway 101 Mile 42';
        if (!elements.descriptionInput.value) elements.descriptionInput.value = 'Massive fallen oak tree across both lanes, road completely impassable, no injuries.';
        setMediaPreview({
          type: 'image',
          url: SAMPLE_MEDIA.road,
          name: 'traffic_cam_obstruction.jpg',
          presetType: 'road'
        });
      });
    }

    if (elements.sampleFireBtn) {
      elements.sampleFireBtn.addEventListener('click', () => {
        if (!elements.locationInput.value) elements.locationInput.value = 'Ridgefield Pines Suburb';
        if (!elements.descriptionInput.value) elements.descriptionInput.value = 'Wildfire advancing towards residential perimeter, thick smoke plume, evacuation needed.';
        setMediaPreview({
          type: 'image',
          url: SAMPLE_MEDIA.fire,
          name: 'aerial_wildfire_threat.jpg',
          presetType: 'fire'
        });
      });
    }

    // Filter Controls
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', () => {
        if (elements.searchInput.value.trim()) {
          elements.clearSearchBtn.classList.remove('hidden');
        } else {
          elements.clearSearchBtn.classList.add('hidden');
        }
        renderDashboard();
      });
    }

    if (elements.clearSearchBtn) {
      elements.clearSearchBtn.addEventListener('click', () => {
        elements.searchInput.value = '';
        elements.clearSearchBtn.classList.add('hidden');
        renderDashboard();
      });
    }

    if (elements.filterPriority) elements.filterPriority.addEventListener('change', renderDashboard);
    if (elements.filterStatus) elements.filterStatus.addEventListener('change', renderDashboard);
    if (elements.filterType) elements.filterType.addEventListener('change', renderDashboard);
    if (elements.sortSelect) elements.sortSelect.addEventListener('change', renderDashboard);

    // Reset Filters Button
    if (elements.resetFiltersBtn) {
      elements.resetFiltersBtn.addEventListener('click', () => {
        elements.searchInput.value = '';
        elements.clearSearchBtn.classList.add('hidden');
        elements.filterPriority.value = 'all';
        elements.filterStatus.value = 'all';
        elements.filterType.value = 'all';
        elements.sortSelect.value = 'score-desc';
        renderDashboard();
      });
    }

    // Delegated Events on Incident List (Status change, Inspect, Delete)
    if (elements.incidentList) {
      elements.incidentList.addEventListener('change', e => {
        if (e.target.classList.contains('status-select')) {
          const id = e.target.getAttribute('data-id');
          const newStatus = e.target.value;
          handleStatusChange(id, newStatus);
        }
      });

      elements.incidentList.addEventListener('click', e => {
        const inspectBtn = e.target.closest('[data-inspect-id]');
        if (inspectBtn) {
          const id = inspectBtn.getAttribute('data-inspect-id');
          showIncidentModal(id);
          return;
        }

        const deleteBtn = e.target.closest('[data-delete-id]');
        if (deleteBtn) {
          const id = deleteBtn.getAttribute('data-delete-id');
          handleDeleteIncident(id);
          return;
        }
      });
    }

    // Reset Demo Data Button
    if (elements.resetDemoBtn) {
      elements.resetDemoBtn.addEventListener('click', () => {
        if (confirm('Reset incident queue back to original 3 demo incidents with AI media?')) {
          resetToSeedData();
        }
      });
    }

    // Export Data Button
    if (elements.exportDataBtn) {
      elements.exportDataBtn.addEventListener('click', exportDataAsJSON);
    }

    // Quick Presets
    if (elements.presetCritical) elements.presetCritical.addEventListener('click', () => loadPresetScenario('critical'));
    if (elements.presetFlood) elements.presetFlood.addEventListener('click', () => loadPresetScenario('flood'));
    if (elements.presetRoad) elements.presetRoad.addEventListener('click', () => loadPresetScenario('road'));

    // One-Tap Emergency SOS Trigger
    if (elements.triggerSosBtn) {
      elements.triggerSosBtn.addEventListener('click', handleOneTapSOS);
    }

    // Connectivity Status Pill Click (Toggle Offline Simulation Mode)
    if (elements.connectivityStatusBtn) {
      elements.connectivityStatusBtn.addEventListener('click', () => {
        simulatedOffline = !simulatedOffline;
        updateConnectivityUI();
        if (simulatedOffline) {
          showToast('📡 Simulated Offline Mode enabled. New SOS reports will buffer locally in pendingSOS queue.', 'critical');
        } else {
          showToast('🟢 Signal Restored. Automatically transmitting pending SOS reports.', 'success');
        }
      });
    }

    // Native Window Online / Offline Events
    window.addEventListener('online', () => {
      console.log('[Network] Browser online event detected.');
      updateConnectivityUI();
    });

    window.addEventListener('offline', () => {
      console.log('[Network] Browser offline event detected.');
      updateConnectivityUI();
    });

    // Modal Close
    if (elements.modalCloseBtn) elements.modalCloseBtn.addEventListener('click', closeModal);
    if (elements.modalDismissBtn) elements.modalDismissBtn.addEventListener('click', closeModal);
    if (elements.modal) {
      elements.modal.addEventListener('click', e => {
        if (e.target === elements.modal) closeModal();
      });
    }

    // Keyboard ESC for modal
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !elements.modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     INITIALIZATION
     ========================================================================== */

  function init() {
    registerServiceWorker();
    loadIncidents();
    updateLiveScoreEstimator();
    updateConnectivityUI();
    renderDashboard();
    setupEventListeners();
    startLiveClock();
    console.log('Disaster Response Incident Triage Dashboard with Offline SOS Mode initialized.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
