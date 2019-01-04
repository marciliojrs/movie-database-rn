var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { JsonProperty } from "json-object-mapper";
import { ImagePathTransformer } from "./transformers/ImagePathTransformer";
export class Movie {
    constructor() {
        this.id = 0;
        this.title = "";
        this.posterPath = undefined;
        this.backdropPath = undefined;
        this.overview = "";
        this.releaseDate = new Date();
    }
}
__decorate([
    JsonProperty()
], Movie.prototype, "id", void 0);
__decorate([
    JsonProperty()
], Movie.prototype, "title", void 0);
__decorate([
    JsonProperty({
        name: "poster_path",
        deserializer: ImagePathTransformer,
        serializer: ImagePathTransformer
    })
], Movie.prototype, "posterPath", void 0);
__decorate([
    JsonProperty({
        name: "backdrop_path",
        deserializer: ImagePathTransformer,
        serializer: ImagePathTransformer
    })
], Movie.prototype, "backdropPath", void 0);
__decorate([
    JsonProperty()
], Movie.prototype, "overview", void 0);
__decorate([
    JsonProperty()
], Movie.prototype, "releaseDate", void 0);
//# sourceMappingURL=Movie.js.map