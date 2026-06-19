export interface ApiResponseEnvelope<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PaginatedResult<T> {
  items: T[];
  total?: number;
}

/** Unwrap `{ success, data }` from the Rust backend. */
export function unwrapData<T>(raw: unknown): T {
  if (
    raw &&
    typeof raw === 'object' &&
    'success' in raw &&
    Object.prototype.hasOwnProperty.call(raw, 'data')
  ) {
    return (raw as ApiResponseEnvelope<T>).data as T;
  }
  return raw as T;
}

/** Unwrap list payloads, including paginated `[items, total]` tuples. */
export function unwrapList<T>(raw: unknown): T[] {
  const data = unwrapData<unknown>(raw);
  if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
    return data[0] as T[];
  }
  if (Array.isArray(data)) {
    return data as T[];
  }
  return [];
}

export function unwrapPaginated<T>(raw: unknown): PaginatedResult<T> {
  const data = unwrapData<unknown>(raw);
  if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
    const items = data[0] as T[];
    const total =
      data.length > 1 && typeof data[1] === 'number' ? (data[1] as number) : undefined;
    return { items, total };
  }
  return { items: unwrapList<T>(raw) };
}
