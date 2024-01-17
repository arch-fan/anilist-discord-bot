import { anilistRequest } from "@/helpers/anilist.request";

interface AnilistTopAnimes {
  data: {
    Page: {
      media: {
        id: number;
        siteUrl: string;
        title: {
          romaji: string;
        };
        averageScore: number;
      }[];
    };
  };
}

function isAnilistTop100(obj: any): obj is AnilistTopAnimes {
  const typeGuard: boolean =
    obj &&
    typeof obj === "object" &&
    obj.data &&
    typeof obj.data === "object" &&
    obj.data.Page &&
    typeof obj.data.Page === "object" &&
    Array.isArray(obj.data.Page.media) &&
    obj.data.Page.media.every(
      (mediaItem: AnilistTopAnimes["data"]["Page"]["media"][0]) =>
        typeof mediaItem === "object" &&
        typeof mediaItem.id === "number" &&
        typeof mediaItem.siteUrl === "string" &&
        mediaItem.title &&
        typeof mediaItem.title === "object" &&
        typeof mediaItem.title.romaji === "string" &&
        typeof mediaItem.averageScore === "number"
    );

  if (!typeGuard) console.error("Type wasn't matched!");

  return typeGuard;
}

export async function getTopAnime({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}): Promise<AnilistTopAnimes | null> {
  const query = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, sort: [SCORE_DESC], isAdult: false) {
        id
        siteUrl
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
      resTypeGuard: isAnilistTop100,
    });

    return response;
  } catch (e) {
    throw e;
  }
}
