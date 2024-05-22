export const dateFormat = (dateString) => {
  const date = new Date(dateString);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const day = date.getUTCDate();
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

export function estimateReadingTime(htmlParagraph) {
  // Remove HTML tags from the paragraph
  const text = htmlParagraph.replace(/<[^>]+>/g, '');

  // Count the number of words
  const wordCount = text.split(/\s+/).length;

  // Average reading speed (words per minute)
  const averageReadingSpeed = 200; // You can adjust this value as needed

  // Calculate estimated reading time in minutes
  const readingTimeMinutes = Math.ceil(wordCount / averageReadingSpeed);

  return readingTimeMinutes;
}

export const newestToOldest = (a, b) => {
  const dateA = new Date(a.createdAt);
  const dateB = new Date(b.createdAt);
  return dateB - dateA;
}

export const oldestToNewest = (a, b) => {
  const dateA = new Date(a.createdAt);
  const dateB = new Date(b.createdAt);
  return dateA - dateB;
}

export const aToZ = (a, b) => {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();
  if (titleA < titleB) return -1;
  if (titleA > titleB) return 1;
  return 0;
}

export const zToA = (a, b) => {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();
  if (titleA > titleB) return -1;
  if (titleA < titleB) return 1;
  return 0;
}

export const likesMostToLeast = (a, b) => {
  return b.likes - a.likes;
}

export const likesLeastToMost = (a, b) => {
  return a.likes - b.likes;
}

export const viewsMostToLeast = (a, b) => {
  return b.views - a.views;
}

export const viewsLeastToMost = (a, b) => {
  return a.views - b.views;
}
