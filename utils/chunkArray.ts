// stolen from https://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays

const chunkArray = (a, n, balanced) => {
  if (n < 2) return [a];

  const len = a.length,
    out = [];
  let i = 0;
  let size = 0;

  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, (i += size)));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, (i += size)));
    }
  } else {
    //eslint-ignore-next-line
    n--;
    size = Math.floor(len / n);
    if (len % size === 0) size--;
    while (i < size * n) {
      out.push(a.slice(i, (i += size)));
    }
    out.push(a.slice(size * n));
  }

  return out;
};

export default chunkArray;
