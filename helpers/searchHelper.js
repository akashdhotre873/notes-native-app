export const runSearchAlgorithm = ({ pattern, text }) => {
  const matchedIndices = [];
  if (pattern === '') {
    return true;
  }

  let currentIndex = 0;
  for (const patternChar of pattern) {
    let matchFound = false;

    for (let index = currentIndex; index < text.length; index++) {
      const textChar = text[index];

      currentIndex = index + 1;
      if (textChar === patternChar) {
        matchedIndices.push(index);
        matchFound = true;
        break;
      }
    }
    if (matchFound === false) {
      return false;
    }
  }

  return {
    matches: pattern.length === matchedIndices.length,
    matchedIndices,
  };
};
