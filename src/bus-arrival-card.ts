import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";

@customElement("bus-arrival-card")
export class BusArrivalCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Object }) _config!: any;

  static styles = css`
    ha-card {
      background-color: black;
      color: #ffc107;
      border-radius: 12px;
      overflow: hidden;
    }
    .card {
      padding: 16px;
    }
    .fade-in {
      animation: fadeIn 0.5s ease-in-out;
    }
    .loading {
      font-size: 18px;
      text-align: center;
      padding: 20px;
    }
    .bus-table {
      width: 100%;
      margin-top: 16px;
      font-family: "Courier New", Courier, monospace;
      font-size: 18px;
      border-spacing: 12px 4px;
    }
    td {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .index {
      text-align: right;
      width: 32px;
    }
    .line {
      text-align: right;
      width: 48px;
      font-weight: bold;
    }
    .destination {
      text-align: left;
      padding-left: 8px;
    }
    .minutes {
      text-align: right;
      width: 48px;
      font-weight: bold;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;

  setConfig(config: any) {
    if (!config.entity) {
      throw new Error("You must define an entity");
    }
    this._config = config;
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const entity = this.hass.states[this._config.entity];
    if (!entity) {
      return html`
        <ha-card>
          <div class="card loading">Loading<span class="dots"></span></div>
        </ha-card>
      `;
    }

    let arrivals = entity.attributes.arrivals;

    if (typeof arrivals === "string") {
      try {
        arrivals = JSON.parse(arrivals);
      } catch (e) {
        console.error("Failed to parse arrivals JSON", e);
        arrivals = [];
      }
    }

    const hasArrivals = Array.isArray(arrivals) && arrivals.length > 0;

    if (hasArrivals) {
      arrivals.sort((a, b) => a.minutes - b.minutes);
    }
    return html`
      <ha-card>
        <div class="card fade-in">
          <!-- <h2>${this._config.title || "Next Buses"}</h2> -->
          ${!hasArrivals
            ? html`<div>No upcoming buses</div>`
            : html`
                <table class="bus-table">
                  <tbody>
                    ${arrivals.map(
                      (bus, index) => html`
                        <tr>
                          <td class="index">${index + 1}</td>
                          <td class="line">${bus.line}</td>
                          <td class="destination">${bus.destination}</td>
                          <td class="minutes">
                            ${bus.minutes === 0 ? "due" : `${bus.minutes} min`}
                          </td>
                        </tr>
                      `
                    )}
                  </tbody>
                </table>
              `}
        </div>
      </ha-card>
    `;
  }

  static getConfigElement() {
    return document.createElement("hui-entities-card-editor");
  }

  static getStubConfig() {
    return { entity: "" };
  }
}
