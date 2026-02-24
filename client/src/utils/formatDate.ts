export const formatDate = (date: string | Date) => {
  const createdAt = new Date(date);
  return createdAt.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
  });
};
