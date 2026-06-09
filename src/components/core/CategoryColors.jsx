// Define your available colors
export const CATEGORY_COLORS = [
  "green.400",
  "blue.400",
  "yellow.400",
  "teal.400",
  "purple.400",
  "orange.400",
  "gray.400",
  "pink.400",
  "green.400",
  "indigo.400",
  "cyan.400",
  "red.400",
  "green.400",
  "cyan.400",
  "teal.400",
  "orange.400",
  "gray.500",
  "purple.600",
  "cyan.500",
  "red.500",
  "purple.500",
  "orange.500",
  "indigo.500",
  "pink.500",
  "cyan.500",
];

// Function to get a deterministic color based on category code or name
export function getCategoryColor(categoryCode = "") {
  if (!categoryCode) return "gray.400"; // fallback color

  // Convert string to a number (hash)
  const hash = [...categoryCode].reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );

  // Pick color by hash modulo color-list-length
  const color = CATEGORY_COLORS[hash % CATEGORY_COLORS.length];

  return color;
}

export function getCategoryColorDark(categoryKey = "") {
  const full = getCategoryColor(categoryKey);
  return full.split(".")[0] + ".700"; // → "red"
}

export function getCategoryColorScheme(categoryKey = "") {
  const full = getCategoryColor(categoryKey);
  return full.split(".")[0]; // → "red"
}
