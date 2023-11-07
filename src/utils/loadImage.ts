//! This should be replaced with a local asset once webpack can load local
const placeHolder =
  "https://static.vecteezy.com/system/resources/previews/004/141/669/large_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

export const createImageLink = (userImage: string | undefined) => {
  if (!userImage) return placeHolder;
  return "http://localhost:5002/img/users/" + userImage;
};

export const createAttachementLink = (userImage: string | undefined) => {
  if (!userImage) return null;
  return "http://localhost:5002/attachement/" + userImage;
};
