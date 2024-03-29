import {
  type ScanFormValues,
  type Query,
  type VersionGuard,
} from "@/types/scan";

export function importQuery(query: Query) {
  window.dispatchEvent(new CustomEvent("importQuery", { detail: query }));
}

export function addIdToQuery(query: Query) {
  return { ...query, id: crypto.randomUUID() };
}

export function scanFormToQuery(
  values: ScanFormValues,
  versionGuards: VersionGuard[]
): Query {
  return {
    id: crypto.randomUUID(),
    dependencyName: values.dependencyName,
    exactMatch: values.exactMatch,
    versions: versionGuards,
  };
}

export function saveQuery(query: Query) {
  const savedQueries = JSON.parse(
    localStorage.getItem("dependify-savedQueries") || "[]"
  );
  savedQueries.push(addIdToQuery(query));
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

  if (recentQueries.length > 9) {
    recentQueries.pop();
  }

  recentQueries.unshift(addIdToQuery(query));
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
    (savedQuery: Query) => savedQuery.id === query.id
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
    (recentQuery: Query) => recentQuery.id === query.id
  );
  recentQueries.splice(index, 1);
  localStorage.setItem(
    "dependify-recentQueries",
    JSON.stringify(recentQueries)
  );
  window.dispatchEvent(new Event("storage"));
}
