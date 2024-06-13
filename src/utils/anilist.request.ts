import {
  type BaseIssue,
  type BaseSchema,
  type InferInput,
  safeParse,
} from "valibot";

interface Props {
  query: string;
  schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>;
  variables?: Record<string, unknown>;
}

export const useAnilist = async ({
  query,
  schema,
  variables,
}: Props): Promise<InferInput<typeof schema> | undefined> => {
  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  };

  try {
    const response = await fetch("https://graphql.anilist.co", options);
    const data = await response.json();

    const parsed = safeParse(schema, data);

    if (parsed.success) {
      return parsed.output;
    }
  } catch (e) {
    console.error(e);
  }
};
