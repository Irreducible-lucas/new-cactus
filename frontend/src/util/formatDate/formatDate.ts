export const formatDate = (isaDate: string | number | Date): string => {
  const date = new Date(isaDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
