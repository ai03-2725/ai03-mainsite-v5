export const imageAltFromFilename = (filepath: string) => {
  
  // Get just the filename bit
  const filename = filepath.split('/').pop().split(new RegExp(".avif|.jpg|.jpeg|.png|.svg|.webp"))[0].split(new RegExp("-large|-medium|-thumbnail"))[0]

  // Capitalize first char
  const filenameCapitalized = filename.charAt(0).toUpperCase() + filename.slice(1)

  // Replace dash separation with spaces
  return filenameCapitalized.split('-').join(' ')

}