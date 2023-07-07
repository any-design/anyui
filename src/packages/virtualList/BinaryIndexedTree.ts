function power2le(n: number) {
  let sum = 1;
  let tmp = 2;
  while (tmp <= n) {
    sum = tmp;
    tmp = sum << 1;
  }
  return sum;
}

class BinaryIndexedTree {
  private tree!: number[];
  private bitMask!: number;

  public constructor(nums: number[]) {
    this.__init(nums);
  }

  public update(i: number, val: number) {
    while (i < this.tree.length) {
      this.tree[i] += val;
      // eslint-disable-next-line no-param-reassign
      i = i + (i & -i);
    }
  }

  public prefixSum(n = this.tree.length - 1) {
    let sum = 0;
    while (n > 0) {
      sum += this.tree[n];
      // eslint-disable-next-line no-param-reassign
      n -= n & -n;
    }
    return sum;
  }

  public rangeSum(i: number, j: number) {
    return this.prefixSum(j) - this.prefixSum(i - 1);
  }

  public getValue(i: number) {
    let sum = this.tree[i];
    if (i > 0) {
      let z = i - (i & -i);
      // eslint-disable-next-line no-param-reassign
      i--;
      while (i !== z) {
        sum -= this.tree[i];
        // eslint-disable-next-line no-param-reassign
        i -= i & -i;
      }
    }
    return sum;
  }

  public find(target: number) {
    let idx = 0;
    let len = this.tree.length;
    let bitMask = this.bitMask;
    while (bitMask !== 0 && idx < len) {
      let tIdx = idx + bitMask;
      if (target === this.tree[tIdx]) {
        return tIdx;
      } else if (target > this.tree[tIdx]) {
        idx = tIdx;
        // eslint-disable-next-line no-param-reassign
        target -= this.tree[tIdx];
      }
      bitMask >>= 1;
    }
    if (target !== 0) {
      return -1;
    } else {
      return idx;
    }
  }

  public findG(target: number) {
    let idx = 0;
    let len = this.tree.length;
    let bitMask = this.bitMask;
    while (bitMask !== 0 && idx < len) {
      let tIdx = idx + bitMask;
      if (target >= this.tree[tIdx]) {
        idx = tIdx;
        // eslint-disable-next-line no-param-reassign
        target -= this.tree[tIdx];
      }
      bitMask >>= 1;
    }
    if (target !== 0) {
      return -1;
    } else {
      return idx;
    }
  }

  public findGe(target: number) {
    let idx = 0;
    let len = this.tree.length;
    let bitMask = this.bitMask;
    while (bitMask !== 0 && idx < len) {
      let tIdx = idx + bitMask;
      if (target === this.tree[tIdx]) {
        return tIdx;
      } else if (target > this.tree[tIdx]) {
        idx = tIdx;
        // eslint-disable-next-line no-param-reassign
        target -= this.tree[tIdx];
      }
      bitMask >>= 1;
    }
    return target === 0 ? idx : idx + 1 < this.tree.length ? idx + 1 : -1;
  }

  private __init(nums: number[]) {
    this.tree = Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
      this.tree[i + 1] = nums[i];
    }
    for (let i = 1; i < this.tree.length; i++) {
      let j = i + (i & -i);
      if (j < this.tree.length) {
        this.tree[j] += this.tree[i];
      }
    }
    this.bitMask = power2le(nums.length - 1);
  }
}

export default BinaryIndexedTree;
