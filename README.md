# Disaster Response Incident Triage Dashboard
### Multimodal AI & Offline-Resilient Emergency Operations Center

An explainable, multimodal decision-support dashboard designed for Emergency Operations Centers (EOC) during disaster response. Features **no-signal resilient Offline SOS mode**, AI computer vision (photos/videos), and automatic priority ranking.

## 🚀 Instant Launch
No installation or build step needed:
* **Local HTTP Server**: **[http://localhost:8080](http://localhost:8080)**
* **Direct File Link**: [Open index.html](file:///Users/vigneshr/.gemini/antigravity/scratch/disaster-triage-dashboard/index.html)

---

## 🚨 Offline SOS Mode (No-Signal Resilient)

Designed specifically for zero-signal disaster zones where cell towers and power grids are destroyed:

1. **Prominent One-Tap Red "SOS" Button**:
   - Single-tap creates an immediate **Critical incident (100 pts)**.
   - Pre-fills type `Emergency SOS`, severity `High`, immediate danger = `true`, and captures GPS/beacon coordinates.
2. **Offline Queue (`pendingSOS` in `localStorage`)**:
   - When tapped with no connectivity (`!navigator.onLine` or offline toggle), holds the SOS in a local persistent buffer.
   - Displays clear status banner:
     > *"📡 No signal detected — SOS queued. It will send automatically when connection returns."*
3. **Auto-Transmission on Reconnection**:
   - Listens to the browser `online` event.
   - Automatically flushes and transmits all queued SOS packets, updates their status to `Sent`, and pins them as **Critical at the top of the dashboard**.
4. **Connectivity Telemetry Indicator in Header**:
   - Real-time indicator: `🟢 ONLINE (LIVE)` or `🔴 NO SIGNAL (OFFLINE)`.
   - **Clickable for Hackathon Demos**: Tap the indicator to toggle Simulated Offline Mode on/off without needing to disconnect Wi-Fi!
5. **Service Worker (`sw.js`)**:
   - Fully caches application shell (`index.html`, `style.css`, `script.js`).
   - The page loads and operates 100% offline.
6. **Honesty & Safety Advisory**:
   - Clearly noted in the UI:
     > *"⚠️ In areas with no signal at all, use your phone's built-in satellite emergency SOS if available."*

---

## 🤖 Multimodal AI Features (Photos / Videos + Text)

* **Media Upload**: Accepts ground photos or drone video clips (`.jpg`, `.png`, `.webp`, `.mp4`, `.webm`).
* **Instant Demo Presets**: Test with 4 high-res disaster scene presets (Flood Rooftop, Building Collapse, Blocked Highway, Wildfire).
* **AI Computer Vision Bounding Boxes**: Highlights hazards directly on the media with confidence percentages:
  - `[FLOODWATER INUNDATION: 94%]`
  - `[ROOFTOP ENTRAPMENT: 89%]`
  - `[STRUCTURAL COLLAPSE: 93%]`
  - `[HIGHWAY OBSTRUCTION: 96%]`
* **Autonomous Auto-Triage**: Single click rates priority, extracts trapped individuals, and explains its rationale.

---

## ⚡ Core Rules & Priority Scoring Formula

* **Immediate danger to life**: `+50 pts`
* **People trapped or injured**: `+30 pts`
* **Severe structural / electrical / road hazard**: `+20 pts`
* **More than 5 people affected**: `+10 pts`
* **Baseline severity** (if no trapped civilians): High (`+30 pts`), Medium (`+20 pts`), Low (`+10 pts`)

### Priority Tiers:
* **70–100 → Critical** (Red badge · Immediate human review & urgent dispatch)
* **40–69 → High** (Orange badge · Prompt response planning)
* **20–39 → Medium** (Yellow badge · Review and assign field unit)
* **0–19 → Low** (Slate badge · Routine monitoring)

---

## 📋 Default Seed Incidents
1. **#001 Flooded house, Green Street**: 4 people trapped, immediate danger → **Critical (90 pts)**
2. **#002 Fallen tree, Main Road**: Road blocked, no injuries → **High (50 pts)**
3. **#003 Minor water damage, Lake View Street**: Storm seepage → **Low (10 pts)**
