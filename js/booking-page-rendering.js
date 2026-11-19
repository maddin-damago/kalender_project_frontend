"use strict";

import { getLeistungen, getMitarbeiterViaLeistungenIds } from "./api/api.js";

const leistungenContainer = document.getElementById("leistungen");
const personenContainer = document.getElementById("personen");
const leistungen = await getLeistungen();
const leistungsIds = [];
renderBookingPage(leistungen, leistungsIds);

document.addEventListener("DOMContentLoaded", async () => {
  //   console.log(leistungen);
});

function renderBookingPage(leistungen, leistungsIds) {
  leistungenContainer.innerHTML = "";
  personenContainer.innerHTML = "";

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

    // event listener

    leistungEL.addEventListener("click", async () => {
      personenContainer.innerHTML = "";
      const egalBtn = document.createElement("button");
      egalBtn.type = "button";
      egalBtn.textContent = "Egal";
      egalBtn.classList.add("personen-active");
      personenContainer.append(egalBtn);
      leistungEL.classList.toggle("leistung-active");
      if (leistungsIds.includes(l.id)) {
        let idx = leistungsIds.indexOf(l.id);
        leistungsIds.splice(idx, 1);
      } else {
        leistungsIds.push(l.id);
      }
      const mitarbeiterAvailableForLeistungen =
        await getMitarbeiterViaLeistungenIds(leistungsIds);
      console.log(mitarbeiterAvailableForLeistungen);

      mitarbeiterAvailableForLeistungen.forEach((ma) => {
        const maBtn = document.createElement("button");
        maBtn.type = "button";
        maBtn.textContent = ma.ma_name;

        personenContainer.append(maBtn);
      });
    });
  });
  const egalBtn = document.createElement("button");
  egalBtn.type = "button";
  egalBtn.textContent = "Egal";
  egalBtn.classList.add("personen-active");
  personenContainer.append(egalBtn);
}
