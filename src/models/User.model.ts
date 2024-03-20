import { object, string, number, type Input } from "valibot";

export const UserSchema = object({
  data: object({
    User: object({
      name: string(),
      createdAt: number(),
      avatar: object({
        large: string(),
      }),
      siteUrl: string(),
      statistics: object({
        anime: object({
          count: number(),
          meanScore: number(),
        }),
        manga: object({
          count: number(),
          meanScore: number(),
        }),
      }),
    }),
  }),
});

export type User = Input<typeof UserSchema>;
