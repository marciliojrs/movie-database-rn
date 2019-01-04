import { IMovie } from "src/domain/entities/IMovie";
import { JsonProperty } from "json-object-mapper";

export class Movie implements IMovie {
  @JsonProperty()
  public id: Number;
  @JsonProperty()
  public title: String;
  @JsonProperty({ name: "poster_path" })
  public posterPath?: String;
  @JsonProperty({ name: "backdrop_path" })
  public backdropPath?: String;
  @JsonProperty()
  public overview: String;
  @JsonProperty()
  public releaseDate: Date;

  constructor() {
    this.id = 0;
    this.title = "";
    this.posterPath = undefined;
    this.backdropPath = undefined;
    this.overview = "";
    this.releaseDate = new Date();
  }
}
