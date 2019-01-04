import { Serializer, Deserializer } from "json-object-mapper";

export class ImagePathTransformer implements Deserializer, Serializer {
  deserialize = (value: string): string => {
    return "https://image.tmdb.org/t/p/w500" + value;
  };
  serialize = (value: string): string => {
    return value;
  };
}
