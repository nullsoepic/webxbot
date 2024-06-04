export const tldChoices = () => {
  const tlds = ["mf", "btw", "fr", "yap", "dev", "scam", "zip", "root", "web", "rizz", "habibi", "sigma", "now", "it", "soy", "lol", "uwu", "ohio"];
  return tlds.map((tld) => ({ name: tld, value: tld }));
}

/**
 * 
 * @param {string} id User ID
 * @returns {boolean} Whether the user is allowed to register a domain (true = allowed, false = not allowed)
 */
import fs from 'fs';

export const checkLimit = (id) => {
  const users = JSON.parse(fs.readFileSync('users.json'));
  const user = users.find((user) => user.id === id);
  return user ? user.domains.length >= 3 : false;
}

/**
 * 
 * @param {string} id User ID
 * @param {string} name Discord Username
 * @param {string} domain Domain
 * @returns {boolean} Whether the update was successful
 */
export const updateLimit = (id, name, domain) => {
  const users = JSON.parse(fs.readFileSync('../users.json'));
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    users.push({ id, name, domains: [domain] });
  } else {
    const user = users[userIndex];
    if (user.domains.length < 3) {
      user.domains.push(domain);
    }
  }
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  return true;
}
