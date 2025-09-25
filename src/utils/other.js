export function generateRandomId() {
  const usedIds = new Set();

  while (true) {
    // Generate a random ID
    const randomId = Math.floor(Math.random() * 1000000); // Adjust the range as needed

    // Check if the ID is already used
    if (!usedIds.has(randomId)) {
      // Add the ID to the set of used IDs and return
      usedIds.add(randomId);
      return randomId;
    }
  }
}
