export async function getLeistungen() {
  const result = await fetch("http://localhost:1234/api/v1/leistungen");
  return result.json();
}

export async function getMitarbeiterViaLeistungenIds(ids) {
  const result = await fetch(
    `http://localhost:1234/api/v1/mitarbeiter/${ids.join(",")}`,
  );
  return result.json();
}
