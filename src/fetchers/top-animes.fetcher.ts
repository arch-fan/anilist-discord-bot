import { useAnilist } from "@/utils/anilist.request";
import { type InferInput, array, number, object, string } from "valibot";

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
        }),
      ),
    }),
  }),
});

export type TopAnimes = InferInput<typeof TopAnimesSchema>;

export async function getTopAnimes(page: number, perPage: number) {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, sort: [SCORE_DESC], isAdult: false) {
          id
          siteUrl
          coverImage {
            medium
          }
          title {
            romaji
          }
          averageScore
        }
      }
    }
  `;

  const data = await useAnilist({
    query,
    variables: {
      page,
      perPage,
    },
    schema: TopAnimesSchema,
  });

  return data;
}
