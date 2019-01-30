import { JsonProperty } from "json-object-mapper";
import { IMovie } from "src/domain/entities/IMovie";
import { ImagePathTransformer } from "./transformers/ImagePathTransformer";

export class Movie implements IMovie {
  @JsonProperty()
  public id: Number;
  @JsonProperty()
  public title: String;
  @JsonProperty({
    name: "poster_path",
    deserializer: ImagePathTransformer,
    serializer: ImagePathTransformer
  })
  public posterPath?: string;
  @JsonProperty({
    name: "backdrop_path",
    deserializer: ImagePathTransformer,
    serializer: ImagePathTransformer
  })
  public backdropPath?: string;
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
