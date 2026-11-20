"use strict";

import {
  getLeistungen,
  getMitarbeiterViaLeistungenIds,
  getTimeslotsForMitarbeiter,
} from "./api/api.js";

const leistungenContainer = document.getElementById("leistungen");
const personenContainer = document.getElementById("personen");
const timeslotsContainer = document.getElementById("timeslots");
const vornameEL = document.getElementById("kundenVorname");
const nachnameEL = document.getElementById("kundenNachname");
const telefonEL = document.getElementById("kundenTel");
const emailEL = document.getElementById("kundenEmail");
const leistungen = await getLeistungen();
const leistungsIds = [];
renderLeistungen(leistungen, leistungsIds);
renderMitarbeiter();
const timeslotsInit = await getTimeslotsForMitarbeiter();
renderTimeslots(timeslotsInit);

const buchungState = {
  kunde: {
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
  },
  ma: undefined,
  leistungen: leistungsIds,
  start_datum: "",
};

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Hello World");
});

vornameEL.addEventListener("change", () => {
  buchungState.kunde.vorname = vornameEL.value;
});
nachnameEL.addEventListener("change", () => {
  buchungState.kunde.nachname = nachnameEL.value;
});
telefonEL.addEventListener("change", () => {
  buchungState.kunde.telefon = telefonEL.value;
});
emailEL.addEventListener("change", () => {
  buchungState.kunde.email = emailEL.value;
});

console.log(buchungState);

function renderLeistungen(leistungen, leistungsIds) {
  leistungenContainer.innerHTML = "";

  leistungen.forEach((l) => {
    const { leistung, dauer_in_min, preis_in_eur } = l;
    const leistungEL = document.createElement("div");
    leistungEL.classList.add("leistung");

    const leistungNameEL = document.createElement("h2");
    leistungNameEL.textContent = leistung;

    const preisDauerEL = document.createElement("div");
    preisDauerEL.classList.add("preis-dauer");
    const dauerEL = document.createElement("span");
    dauerEL.textContent = dauer_in_min + " Min";
    const seperator = document.createElement("span");
    seperator.textContent = "-";
    const preisEL = document.createElement("span");
    preisEL.textContent = preis_in_eur + " €";

    preisDauerEL.append(dauerEL);
    preisDauerEL.append(seperator);
    preisDauerEL.append(preisEL);

    leistungEL.append(leistungNameEL);
    leistungEL.append(preisDauerEL);

    leistungenContainer.append(leistungEL);

    leistungEL.addEventListener("click", async () => {
      leistungEL.classList.toggle("leistung-active");
      if (leistungsIds.includes(l.id)) {
        let idx = leistungsIds.indexOf(l.id);
        leistungsIds.splice(idx, 1);
      } else {
        leistungsIds.push(l.id);
      }
      renderMitarbeiter();
      renderTimeslots(timeslotsInit);
    });
  });
}

async function renderMitarbeiter() {
  personenContainer.innerHTML = "";

  const mitarbeiterAvailableForLeistungen =
    await getMitarbeiterViaLeistungenIds(leistungsIds);

  const egalBtn = document.createElement("button");
  egalBtn.type = "button";
  egalBtn.textContent = "Egal";
  egalBtn.classList.add("personen-active");
  personenContainer.append(egalBtn);
  mitarbeiterAvailableForLeistungen.forEach((ma) => {
    const maBtn = document.createElement("button");
    maBtn.type = "button";
    maBtn.textContent = ma.ma_name;
    maBtn.dataset.id = ma.id;
    personenContainer.append(maBtn);
  });

  Array.from(personenContainer.children).forEach((cn) => {
    cn.addEventListener("click", async () => {
      buchungState.ma = cn.dataset.id;
      Array.from(personenContainer.children).forEach((cn2) => {
        cn2.classList.remove("personen-active");
      });
      cn.classList.add("personen-active");

      const timeslots = await getTimeslotsForMitarbeiter(cn.dataset.id);
      renderTimeslots(timeslots);
    });
  });
}

function renderTimeslots(timeslots) {
  timeslotsContainer.innerHTML = "";

  timeslots.forEach((ts) => {
    const slotBtnEl = document.createElement("button");
    slotBtnEl.textContent = ts.value;
    slotBtnEl.classList.add("timeslot-button");
    if (ts.isAvailable === false) {
      slotBtnEl.classList.add("timeslot-unavailable");
    }

    timeslotsContainer.append(slotBtnEl);
  });
}
