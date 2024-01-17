interface Parameters<T> {
  query: string;
  variables?: Record<string, string | number>;
  resTypeGuard: (obj: any) => obj is T;
}

export const anilistRequest = async <T>({
  query,
  variables,
  resTypeGuard,
}: Parameters<T>): Promise<T | null> => {
  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();

    if (resTypeGuard(data)) {
      return data;
    }
    return null;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
