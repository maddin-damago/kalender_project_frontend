"use strict";

import { getLeistungen } from "./api/api.js";

const leistungenContainer = document.getElementById("leistungen");

document.addEventListener("DOMContentLoaded", async () => {
  const leistungen = await getLeistungen();
  console.log(leistungen);

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
  });
});
