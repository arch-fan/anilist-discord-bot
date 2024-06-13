import { useAnilist } from "@/utils/anilist.request";
import { type InferOutput, number, object, string } from "valibot";

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

export type User = InferOutput<typeof UserSchema>;

export async function getUser(username: string) {
  const query = `
        query ($username: String) {
          User(name: $username) {
            name
            about
            createdAt
            avatar {
              large
            }
            siteUrl
            statistics {
              anime {
                count
                meanScore
              }
              manga {
                count
                meanScore
              }
            }
          }
        }
      `;

  const data = await useAnilist({
    query,
    variables: {
      username,
    },
    schema: UserSchema,
  });

  return data;
}
