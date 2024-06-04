export const tldChoices = () => {
  const tlds = ["mf", "btw", "fr", "yap", "dev", "scam", "zip", "root", "web", "rizz", "habibi", "sigma", "now", "it", "soy", "lol", "uwu", "ohio"];
  return tlds.map((tld) => ({ name: tld, value: tld }));
}

/**
 * 
 * @param {string} id User ID
 * @returns {boolean} Whether the user is allowed to register a domain (true = allowed, false = not allowed)
 */
export const checkLimit = (id) => {
  return false
}

/**
 * 
 * @param {string} id User ID
 * @returns {boolean} Whether the update was successful
 */
export const updateLimit = (id) => {
  return false
}