import { type BaseSchema, safeParse } from "valibot";

interface Parameters<T extends BaseSchema> {
  query: string;
  variables?: Record<string, string | number>;
  schema: T;
}

export const anilistRequest = async <T extends BaseSchema>({
  query,
  variables,
  schema,
}: Parameters<T>): Promise<T | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    };

    const response = await fetch("https://graphql.anilist.co", options);
    const data = await response.json();

    const parsed = safeParse(schema, data);

    if (parsed.success) {
      return parsed.output;
    }
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
