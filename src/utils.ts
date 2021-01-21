export const kCombinations = <T>(set: T[], k: number): T[][] => {
  const n = set.length;
  let result: T[][] = [];

  function dfs(current: T[], start: number) {
    if (current.length === k) {
      result.push(current);
      return;
    }
    for (let i = start; i < n; i++) {
      dfs([...current, set[i]], i + 1);
    }
  }
  dfs([], 0);
  return result;
};
