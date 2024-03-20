import {
	array,
	object,
	optional,
	string,
	number,
	url,
	type Input,
} from "valibot";

export const SearchAnimesSchema = object({
	data: object({
		Page: object({
			media: optional(
				array(
					object({
						id: number(),
						title: object({
							romaji: string(),
						}),
						description: string(),
						coverImage: object({
							medium: string([url()]),
						}),
						meanScore: number(),
						siteUrl: string([url()]),
					}),
				),
			),
		}),
	}),
});

export type SearchAnimes = Input<typeof SearchAnimesSchema>;
