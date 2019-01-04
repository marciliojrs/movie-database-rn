export class ImagePathTransformer {
    constructor() {
        this.deserialize = (value) => {
            return "https://image.tmdb.org/t/p/w500" + value;
        };
        this.serialize = (value) => {
            return value;
        };
    }
}
//# sourceMappingURL=ImagePathTransformer.js.map