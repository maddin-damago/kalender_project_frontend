export async function getLeistungen() {
  const result = await fetch("http://localhost:1234/api/v1/leistungen");
  return result.json();
}

export async function getMitarbeiter() {
  const result = await fetch(`http://localhost:1234/api/v1/mitarbeiter`);
  return result.json();
}

export async function getMitarbeiterViaLeistungenIds(ids) {
  const result = await fetch(
    `http://localhost:1234/api/v1/mitarbeiter/${ids.join(",")}`,
  );
  return result.json();
}

export async function getTimeslotsForMitarbeiter(id, date) {
  const today = new Date().toISOString().split("T")[0];
  const result = await fetch(
    `http://localhost:1234/api/v1/timeslots/${id}/2026-06-04`,
  );
  return result.json();
}
