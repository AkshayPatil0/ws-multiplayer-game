import thumbnail from "../../thumbnail.png";

export const addImageMeta = () => {
  const ogImage = document.createElement("meta");
  ogImage.setAttribute("property", "og:image");
  ogImage.setAttribute("content", thumbnail);

  const twitterImage = document.createElement("meta");
  twitterImage.setAttribute("name", "twitter:image");
  twitterImage.setAttribute("content", thumbnail);

  document.head.appendChild(ogImage);
  document.head.appendChild(twitterImage);
};
