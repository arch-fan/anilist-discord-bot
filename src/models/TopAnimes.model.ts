import { z } from "zod";

export const TopAnimesSchema = z.object({
  data: z.object({
    Page: z.object({
      media: z.array(
        z.object({
          id: z.number(),
          siteUrl: z.string(),
          coverImage: z.object({
            medium: z.string(),
          }),
          title: z.object({
            romaji: z.string(),
          }),
          averageScore: z.number(),
        })
      ),
    }),
  }),
});

export type TopAnimes = z.infer<typeof TopAnimesSchema>;
