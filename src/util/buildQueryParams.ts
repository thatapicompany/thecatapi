export function buildQueryParams(
  filter: Record<string, any>,
  mapper?: (x: Record<string, any>) => [string, any][]
): string {
  let _filters = Object.entries(filter);
  if (mapper) {
    _filters = mapper(filter);
  }
  if (_filters.length === 0) {
    return "";
  }
  const filters = _filters.map(([key, value]) => `${key}=${value}`);
  return `?${filters.join("&")}`;
}
