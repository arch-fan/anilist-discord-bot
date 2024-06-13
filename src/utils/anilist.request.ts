import {
  type BaseIssue,
  type BaseSchema,
  type InferInput,
  safeParse,
} from "valibot";

type GenericSchema = BaseSchema<unknown, unknown, BaseIssue<unknown>>;

interface Props<T extends GenericSchema> {
  query: string;
  schema: T;
  variables?: Record<string, unknown>;
}

export const useAnilist = async <T extends GenericSchema>({
  query,
  schema,
  variables,
}: Props<T>): Promise<InferInput<T> | undefined> => {
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
