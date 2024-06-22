import { useAnilist } from "@/utils/anilist.request";
import { type InferInput, array, number, object, string } from "valibot";

export const SearchSchema = object({
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
        }),
      ),
    }),
  }),
});

export type Search = InferInput<typeof SearchSchema>;

export async function searchAnimes(
  search: string,
  page: number,
  perPage: number,
) {
  const query = `
    query($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
      media(search: $search) {
    	  id
        siteUrl
        coverImage {
          medium
        }
        title {
          romaji
        }
  	  }
    }
  }
  `;

  const data = await useAnilist({
    query,
    variables: {
      page,
      perPage,
      search,
    },
    schema: SearchSchema,
  });

  return data;
}
