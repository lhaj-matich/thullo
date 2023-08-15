const placeHolder =
  "https://static.vecteezy.com/system/resources/previews/004/141/669/large_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

export const createUnsplashLink = (imageId: string | undefined, height: number, width: number) => {
    if (imageId?.startsWith("http"))
        return imageId;
    if (!imageId) return placeHolder;
    return `https://source.unsplash.com/${imageId}/${width}x${height}`;
  };
  