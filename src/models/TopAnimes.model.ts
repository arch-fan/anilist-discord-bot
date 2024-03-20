import { object, number, array, string, type Input } from "valibot";

export const TopAnimesSchema = object({
  data: object({
    Page: object({
      media: array(
        object({
          id: number(),
          siteUrl: string(),
          coverImage: object({
            medium: string(),
          }),
          title: object({
            romaji: string(),
          }),
          averageScore: number(),
        })
      ),
    }),
  }),
});

export type TopAnimes = Input<typeof TopAnimesSchema>;
