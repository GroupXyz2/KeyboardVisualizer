# QWERTZ Keyboard Visua2. **OBS-Only Mode** 
   - **App wird praktisch unsichtbar für den User** (0.01% Opacity)
   - **Fenster ist "durchklickbar"** - fängt keine Eingaben ab
   - **OBS kann das Fenster trotzdem capturen** (Window Capture funktioniert weiterhin)
   - Fenster verschwindet aus der Taskbar und verliert alwaysOnTop Status
   - Optimierte Darstellung für bessere OBS-Sichtbarkeit

Eine Desktop-Anwendung zum Visualisieren von Tastatureingaben, auch wenn die App im Hintergrund läuft.

## Funktionen

- Visualisierung von Tastatureingaben in Echtzeit
- Funktioniert auch, wenn die App nicht im Fokus ist (Globaler Tastenlogger)
- Unterstützung für das deutsche QWERTZ-Tastaturlayout
- Elegantes, modernes Design mit visuellen Effekten
- **NEU: OBS-Streaming-Modi** - Perfekt für Streamings und Content Creation

## OBS-Streaming Integration

Die App bietet drei Modi, die perfekt für OBS Studio entwickelt wurden:

### Modi im Detail:

1. **Normal Mode** (Standard)
   - Für Benutzer und OBS sichtbar
   - Normale Anzeige mit transparentem Hintergrund
   - Fenster ist in der Taskbar sichtbar

2. **OBS-Only Mode** 
   - **App wird praktisch unsichtbar für den User** (0.01% Opacity)
   - **Fenster ist "durchklickbar"** - fängt keine Eingaben ab
   - **OBS kann das Fenster trotzdem capturen** (Window Capture funktioniert weiterhin)
   - Fenster verschwindet aus der Taskbar und verliert alwaysOnTop Status

3. **Off-Screen Mode** (Empfohlen!)
   - **Fenster wird außerhalb des sichtbaren Bildschirms positioniert** (-3000px links)
   - **Für User komplett unsichtbar, aber normal für OBS erfassbar**
   - **Keine Opacity-Tricks nötig** - einfach und zuverlässig
   - Normale Funktionalität für OBS beibehalten

### Mode wechseln:
- **Tastenkombination**: `Ctrl + Shift + O`
- Wechselt zwischen: Normal → OBS-Only → Off-Screen → Normal
- Mode-Anzeige erscheint für 4 Sekunden in der oberen rechten Ecke

## OBS Studio Setup - Schritt für Schritt

### 1. Keyboard Visualizer vorbereiten

1. **App starten** und positionieren:
   ```
   npm run start-all
   ```
2. **Positioniere** die Tastatur an der gewünschten Stelle auf dem Bildschirm
3. **Teste** die Tastatur kurz im Normal Mode
4. **Wechsle in OBS-Only Mode**: Drücke `Ctrl + Shift + H`
   - Die App wird jetzt praktisch unsichtbar für dich
   - Orange Anzeige bestätigt: "OBS-Only Mode - Nur für OBS sichtbar"

### 2. OBS Studio konfigurieren

#### Einfache Window Capture Methode:

1. **Neue Quelle hinzufügen:**
   - Rechtsklick im Sources Panel
   - "Add" → "Window Capture"
   - Name: "Keyboard Visualizer"

2. **Window auswählen:**
   - Window: "QWERTZ Keyboard Visualizer"
   - Capture Cursor: ❌ (deaktiviert)

3. **Fertig!**
   - **KEINE weiteren Filter nötig!**
   - Die App hat bereits einen transparenten Hintergrund
   - OBS erkennt die Transparenz automatisch

### 3. Erweiterte Anpassungen (Optional)

#### Position und Größe in OBS:
- Ziehe die Quelle in der Preview an die gewünschte Position
- Verwende die Ecken zum Vergrößern/Verkleinern
- **Transform** → Verschiedene Anpassungsoptionen verfügbar

#### Für bessere Sichtbarkeit (bei Bedarf):
1. **Color Correction Filter:**
   - Rechtsklick auf die Quelle → "Filters" → "+" → "Color Correction"
   - Brightness: +0.1 bis +0.3
   - Contrast: +0.2 bis +0.4

2. **Sharpen Filter:**
   - "Filters" → "+" → "Sharpen"
   - Sharpness: 0.2 - 0.5

### 4. Tipps für beste Ergebnisse

✅ **Do's:**
- Verwende Window Capture für beste Ergebnisse
- Positioniere die App vor dem Wechsel in OBS-Only Mode
- Nutze die optimierte OBS-Only Darstellung für besseren Kontrast

❌ **Don'ts:**
- Keine komplexen Filter nötig - die App ist bereits optimiert
- Nicht Display Capture verwenden (Window Capture ist besser)
- Nicht die App bewegen während sie im OBS-Only Mode ist

### 5. Troubleshooting

**Problem: OBS zeigt die App nicht an**
- Lösung: Starte OBS als Administrator oder überprüfe ob die App wirklich im OBS-Only Mode ist

**Problem: App verschwindet komplett**
- Lösung: Drücke `Ctrl + Shift + H` um zurück in Normal Mode zu wechseln

**Problem: Tastatur in OBS zu dunkel/hell**
- Lösung: Füge Color Correction Filter hinzu und passe Brightness/Contrast an

**Problem: App reagiert nicht mehr**
- Lösung: `Alt + F4` beendet die App, dann neu starten

---

## Quick Start für Streaming:

1. **Starten:** Doppelklick auf `Start_Keyboard_Visualizer.vbs` (keine Konsolen!)
2. Tastatur positionieren 
3. `Ctrl + Shift + H` → `Ctrl + Shift + H` → **Off-Screen Mode** (empfohlen!)
4. In OBS: Window Capture → "QWERTZ Keyboard Visualizer"
5. **Fertig!** 🎯

**Vorteil Off-Screen Mode:** Fenster ist komplett außerhalb des Bildschirms aber für OBS normal erfassbar!

**Vorteil:** Komplett transparenter Hintergrund, keine Chroma Key Probleme, perfekte Integration.

## Technologien

- **Electron**: Für die Desktop-Anwendung und Benutzeroberfläche
- **Python (pynput)**: Für das globale Abhören von Tastatureingaben im System
- **Socket.io**: Für die Kommunikation zwischen Python-Hook und Electron-App

## Installation

### Voraussetzungen

1. [Node.js](https://nodejs.org/) (v14 oder neuer)
2. [Python](https://www.python.org/downloads/) (v3.6 oder neuer)
3. npm (wird mit Node.js installiert)

### Einrichtung

1. Klone oder lade dieses Repository herunter
2. Öffne ein Terminal im Projektverzeichnis

3. Installiere die Node.js-Abhängigkeiten:
   ```
   npm install
   ```

4. Installiere die Python-Abhängigkeiten:
   ```
   npm run install-hook
   ```
   Diese führt `pip install pynput socketio` aus

### Starten der Anwendung

#### Einfacher Start (Empfohlen - keine Konsolen):

**Doppelklick auf:** `Start_Keyboard_Visualizer.vbs`
- ✅ Startet komplett ohne sichtbare Konsolen
- ✅ Python-Hook wird automatisch gestartet  
- ✅ Automatisches Beenden aller Prozesse beim App-Schließen

#### Entwickler-Optionen (mit Konsolen für Debugging):

**Mit sichtbaren Konsolen:**
```
npm run start-all
```

**Nur Electron-App (Python Hook wird automatisch gestartet):**
```
npm start
```

**Komponenten einzeln starten:**
- Python-Hook: `npm run start-hook`
- Electron-App: `npm start`

## Verwendung

- Nach dem Start ist die App sofort einsatzbereit
- Drücke Tasten auf deiner Tastatur, und sie werden in der App hervorgehoben
- Die App funktioniert auch, wenn sie im Hintergrund läuft

### Tastenkombinationen:

- **`Alt + F4`**: App beenden
- **`Ctrl + Shift + H`**: Display-Mode wechseln (Normal → OBS-Only → Off-Screen → Normal)
- **`Esc + Shift`**: Python-Hook beenden (nur im Terminal)

### Modi-Übersicht:

| Modus | Shortcut | Für User sichtbar | Für OBS sichtbar | Position | Eingaben abfangen | Verwendung |
|-------|----------|------------------|------------------|----------|-------------------|------------|
| Normal | `Ctrl+Shift+H` (1x) | ✅ Ja | ✅ Ja | Normal | ✅ Ja | Normaler Betrieb |
| OBS-Only | `Ctrl+Shift+H` (2x) | ❌ Praktisch nein (0.01% Opacity) | ✅ Ja | Normal | ❌ Nein (durchklickbar) | Streaming (Alt) |
| Off-Screen | `Ctrl+Shift+H` (3x) | ❌ Nein (außerhalb Bildschirm) | ✅ Ja | -3000px links | ✅ Ja (aber egal) | **Streaming (Empfohlen)** |

**Warum Off-Screen Mode besser ist:**
- ✅ **Einfacher**: Keine Opacity-Tricks oder komplexe Event-Weiterleitung
- ✅ **Zuverlässiger**: Funktioniert immer, egal welche Windows-Version oder -Einstellungen
- ✅ **Performanter**: Keine ständigen setIgnoreMouseEvents() Calls
- ✅ **Sauberer**: Fenster hat normale Eigenschaften, ist nur woanders positioniert

## Hinweise

- Der Python-Hook erfasst alle Tastatureingaben systemweit - verwende diese App verantwortungsvoll
- Die App ist für das deutsche QWERTZ-Layout optimiert
- **Off-Screen Mode ist der empfohlene Streaming-Mode** - einfach und zuverlässig
- Für Multi-Monitor Setups: Off-Screen Mode funktioniert unabhängig von der Monitor-Konfiguration
