import { z } from "zod";

export const UserSchema = z.object({
  data: z.object({
    User: z.object({
      name: z.string(),
      createdAt: z.number(),
      avatar: z.object({
        large: z.string(),
      }),
      siteUrl: z.string(),
      statistics: z.object({
        anime: z.object({
          count: z.number(),
          meanScore: z.number(),
        }),
        manga: z.object({
          count: z.number(),
          meanScore: z.number(),
        }),
      }),
    }),
  }),
});

export type User = z.infer<typeof UserSchema>;
