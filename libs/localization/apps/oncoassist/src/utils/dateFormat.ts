export function formatDate(dateString: string) {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return "Invalid Date"; // Handle gracefully
  }

  return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
  }).format(date);
}