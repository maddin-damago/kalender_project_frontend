export async function getLeistungen() {
  const result = await fetch("http://localhost:1234/api/v1/leistungen");
  return result.json();
}
