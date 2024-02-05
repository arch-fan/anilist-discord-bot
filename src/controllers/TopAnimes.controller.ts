import { anilistRequest } from "@/helpers/anilist.request";
import { TopAnimesSchema, type TopAnimes } from "@/models/TopAnimes.model";

export async function getTopAnime({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}): Promise<TopAnimes | null> {
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

  const variables = {
    page,
    perPage,
  };

  try {
    const response = await anilistRequest({
      query,
      variables,
      parser: TopAnimesSchema.parse,
    });

    return response;
  } catch (e) {
    throw e;
  }
}
