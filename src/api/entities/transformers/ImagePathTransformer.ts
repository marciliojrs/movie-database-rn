import { Deserializer, Serializer } from "json-object-mapper";

export class ImagePathTransformer implements Deserializer, Serializer {
  public deserialize = (value: string): string => {
    return "https://image.tmdb.org/t/p/w500" + value;
  }
  public serialize = (value: string): string => {
    return value;
  }
}
