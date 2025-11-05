/**
 * Capitalizes the first letter of a given string.
 * @param {string} str - The input string to capitalize.
 * @returns {string} - A new string with the first letter capitalized.
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}



/**
 * Formats a number into Philippine Peso currency format.
 * @param {number} amount - The amount to format.
 * @returns {string} - Formatted currency string (e.g. "₱1,234.56")
 */
export function formatMoney(amount) {
  if (isNaN(amount)) return "₱0.00";
  return amount.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });
}
