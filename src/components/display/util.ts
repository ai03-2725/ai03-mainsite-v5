export const getThumbnailUrl: (originalUrl: string) => string = (originalUrl) => {

  const fileName = originalUrl.split(new RegExp("giantsize|fullsize|largesize|mediumsize"))[0]
  return `${fileName}thumbnail.avif`
  
}