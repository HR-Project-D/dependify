import { ScanFormValues, type Query, VersionGuard } from "@/types/scan";

export function importQuery(query: Query) {
  window.dispatchEvent(
    new CustomEvent("importQuery", {
      detail: query,
    })
  );
}

export function ScanFormToQuery(
  values: ScanFormValues,
  versionGuards: VersionGuard[]
): Query {
  const query: Query = {
    id: crypto.randomUUID(),
    dependencyName: values.dependencyName,
    exactMatch: values.exactMatch,
    versions: versionGuards,
  };

  return query;
}

export function saveQuery(query: Query) {
  const savedQueries = JSON.parse(
    localStorage.getItem("dependify-savedQueries") || "[]"
  );
  savedQueries.push(query);
  localStorage.setItem("dependify-savedQueries", JSON.stringify(savedQueries));
  window.dispatchEvent(new Event("storage"));
}

export function getSavedQueries(): Query[] {
  return JSON.parse(localStorage.getItem("dependify-savedQueries") || "[]");
}

export function clearSavedQueries() {
  localStorage.removeItem("dependify-savedQueries");
  window.dispatchEvent(new Event("storage"));
}

export function addRecentQuery(query: Query) {
  const recentQueries = JSON.parse(
    localStorage.getItem("dependify-recentQueries") || "[]"
  );
  recentQueries.unshift(query);
  localStorage.setItem(
    "dependify-recentQueries",
    JSON.stringify(recentQueries)
  );
  window.dispatchEvent(new Event("storage"));
}

export function getRecentQueries(): Query[] {
  return JSON.parse(localStorage.getItem("dependify-recentQueries") || "[]");
}

export function clearRecentQueries() {
  localStorage.removeItem("dependify-recentQueries");
  window.dispatchEvent(new Event("storage"));
}

export function removeSavedQuery(query: Query) {
  const savedQueries = JSON.parse(
    localStorage.getItem("dependify-savedQueries") || "[]"
  );
  const index = savedQueries.findIndex(
    (savedQuery: Query) => savedQuery === query
  );
  savedQueries.splice(index, 1);
  localStorage.setItem("dependify-savedQueries", JSON.stringify(savedQueries));
  window.dispatchEvent(new Event("storage"));
}

export function removeRecentQuery(query: Query) {
  const recentQueries = JSON.parse(
    localStorage.getItem("dependify-recentQueries") || "[]"
  );
  const index = recentQueries.findIndex(
    (recentQuery: Query) => recentQuery === query
  );
  recentQueries.splice(index, 1);
  localStorage.setItem(
    "dependify-recentQueries",
    JSON.stringify(recentQueries)
  );
  window.dispatchEvent(new Event("storage"));
}
