interface Parameters<T> {
  query: string;
  variables?: Record<string, string | number>;
  parser: (obj: any) => T;
}

export const anilistRequest = async <T>({
  query,
  variables,
  parser,
}: Parameters<T>): Promise<T | null> => {
  try {
    const data = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());

    const parsed = parser(data);

    return parsed;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
