interface IUser {
  readonly userName: string;
  readonly iconUrl: string;
  readonly profileUrl: string;
  readonly totalAnimeCount: number;
  readonly totalMangaCount: number;
  readonly animeMeanScore: number;
  readonly mangaMeanScore: number;
}

export class User implements IUser {
  constructor(
    public readonly userName: string,
    public readonly iconUrl: string,
    public readonly profileUrl: string,
    public readonly totalAnimeCount: number,
    public readonly totalMangaCount: number,
    public readonly animeMeanScore: number,
    public readonly mangaMeanScore: number
  ) {}
}
