import { anilistRequest } from "@/helpers/anilist.request";

interface AniListUser {
  data: {
    User: {
      name: string;
      createdAt: number;
      avatar: { large: string };
      siteUrl: string;
      statistics: {
        anime: { count: number; meanScore: number };
        manga: { count: number; meanScore: number };
      };
    };
  };
}

function isAniListUser(obj: any): obj is AniListUser {
  const typeGuard: boolean =
    obj &&
    typeof obj === "object" &&
    obj.data &&
    typeof obj.data === "object" &&
    obj.data.User &&
    typeof obj.data.User === "object" &&
    typeof obj.data.User.name === "string" &&
    obj.data.User.avatar &&
    typeof obj.data.User.avatar === "object" &&
    typeof obj.data.User.avatar.large === "string" &&
    typeof obj.data.User.siteUrl === "string" &&
    typeof obj.data.User.createdAt === "number" &&
    obj.data.User.statistics &&
    typeof obj.data.User.statistics === "object" &&
    obj.data.User.statistics.anime &&
    typeof obj.data.User.statistics.anime === "object" &&
    typeof obj.data.User.statistics.anime.count === "number" &&
    typeof obj.data.User.statistics.anime.meanScore === "number" &&
    obj.data.User.statistics.manga &&
    typeof obj.data.User.statistics.manga === "object" &&
    typeof obj.data.User.statistics.manga.count === "number" &&
    typeof obj.data.User.statistics.manga.meanScore === "number";

  if (!typeGuard) console.error("Type wasn't matched!");

  return typeGuard;
}

export async function getUserByUsername(
  userName: string
): Promise<AniListUser | null> {
  const query = `
      query ($userName: String) {
        User(name: $userName) {
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

  const variables = {
    userName: userName,
  };

  try {
    const response = await anilistRequest({
      query,
      variables,
      resTypeGuard: isAniListUser,
    });

    return response;
  } catch (e) {
    throw e;
  }
}
