export class SetHelper<T> extends Set<T> {
    /**
     * 验证集合是否为有效集合
     * @param {*} set
     * @returns
     */
    private _isValid = (set: Set<T>) => {
        return set && set instanceof Set && set.size > 0;
    };

    union(set: SetHelper<T>) {
        if (!this._isValid(set)) return new SetHelper<T>();
        return new SetHelper([...this, ...set]);
    }

    difference(set: SetHelper<T>) {
        if (!this._isValid(set)) return new SetHelper<T>();
        const differenceSet = new SetHelper<T>();
        this.forEach((item) => {
            !set.has(item) && differenceSet.add(item);
        });
        return differenceSet;
    }

    intersection(set: SetHelper<T>) {
        const intersectionSet = new SetHelper();
        if (!this._isValid(set)) return intersectionSet;
        const [smallerSet, biggerSet] = set.size <= this.size ? [set, this] : [this, set];
        smallerSet.forEach((item) => {
            biggerSet.has(item) && intersectionSet.add(item);
        });
        return intersectionSet;
    }

    intersectionDifference(set: SetHelper<T>) {
        if (!this._isValid(set)) return new SetHelper<T>();
        return new SetHelper<T>([...this.difference(set), ...set.difference(this)]);
    }

    isSubset(set: SetHelper<T>) {
        if (!this._isValid(set)) return false;
        return this.size <= set.size && [...this].every((item) => set.has(item));
    }

    isSuperset(set: SetHelper<T>) {
        if (!this._isValid(set)) return false;
        return this.size >= set.size && [...set].every((item) => this.has(item));
    }
}

export class StaticSet<T> extends SetHelper<T> {
    constructor(items: Set<number> | Iterable<T> | null | undefined) {
        super(items);
        this.add = undefined;
        this.delete = undefined;
        this.clear = undefined;
    }
}

const setA = new StaticSet(new Set([1, 2, 3, 4]));
const setB = new StaticSet(new Set([3, 4, 5, 6]));
console.log([...setA.union(setB)]); // [ 1, 2, 3, 4, 5, 6 ]
console.log([...setA.difference(setB)]); // [ 1, 2 ]
console.log([...setA.intersection(setB)]); // [ 3, 4 ]
console.log([...setB.intersectionDifference(setA)]); // [ 5, 6, 1, 2 ]
