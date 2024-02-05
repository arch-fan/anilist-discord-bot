import { anilistRequest } from "@/helpers/anilist.request";
import { UserSchema, type User } from "@/models/User.model";

export async function getUserByUsername(
  userName: string
): Promise<User | null> {
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
      parser: UserSchema.parse,
    });

    return response;
  } catch (e) {
    throw e;
  }
}
