# Lovelace Bus Arrival Card

A custom Home Assistant Lovelace card to display upcoming bus arrivals in a simple, clear format.

Built to work alongside the [Bus Arrival Alert](https://github.com/massimopalmieri/home-assistant-bus-arrival-alert) integration, but flexible enough to be adapted to any similar source of bus arrival data.

---

## ✨ Features

- 🚍 Displays upcoming buses and their arrival times.
- 🕒 Clean formatting for one or multiple upcoming arrivals.
- 🎨 Home Assistant look-and-feel (uses `ha-card` styling).
- ⚙️ Built with Lit + Vite for modern performance.
- 🛠️ Simple to configure and install manually.

---

## 📦 Installation

1. Clone or download this repository locally.

2. Build the card:

```bash
npm install
npm run build
```

This will output the compiled `bus-arrival-card.js` file into the `dist/` directory.

3. Copy the built file into your Home Assistant `/config/www/` directory:

```bash
cp dist/bus-arrival-card.js /path/to/homeassistant/config/www/
```

4. In Home Assistant:

- Go to **Settings → Dashboards → Resources**.
- Click **Add Resource**.
- Set the URL to:

```yaml
url: /local/bus-arrival-card.js
type: module
```

- Save and reload Lovelace.

5. Add the card manually in your dashboard:

```yaml
type: custom:bus-arrival-card
title: "Next Buses"
```

---

## 🛠️ Development

During development:

```bash
npm install
npm run build
```

This uses Vite to quickly compile the project.

The source files are located inside the `src/` directory.

---

## 🚀 Future Improvements

- Connect dynamically to real entity state (e.g., a `sensor.bus_arrival_alert`).
- Automatically refresh on updates to bus arrival data.
- Additional card customizations: icons, colors by waiting time, error handling.
- Support for multiple stops in one card.

---

## 📜 License

This project is licensed under the MIT License.