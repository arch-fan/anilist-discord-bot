interface IAnime {
  readonly name: string;
  readonly description: string;
  readonly episodes: number;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly season: string;
  readonly meanScore: number;
  readonly format: string;
}

export class Anime implements IAnime {
  readonly name: string;
  readonly description: string;
  readonly episodes: number;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly season: string;
  readonly meanScore: number;
  readonly format: string;

  constructor({
    name,
    description,
    episodes,
    startDate,
    endDate,
    season,
    meanScore,
    format,
  }: IAnime) {
    this.name = name;
    this.description = description;
    this.episodes = episodes;
    this.startDate = startDate;
    this.endDate = endDate;
    this.season = season;
    this.meanScore = meanScore;
    this.format = format;
  }
}
