export namespace random {
    /**
     * Get a random integer in [ min, max ]
     * @param min [min=0] - Lower bound (integer, inclusive)
     * @param max [max=1] - Upper bound (integer, inclusive)
     * @returns
     */
    export function int(min: number = 0, max: number = 1) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Get a random floating point number in [ min, max )
     * @param min [min=0] - Lower bound (float, inclusive)
     * @param max [max=1] - Upper bound (float, exclusive)
     * @returns
     */
    export function float(min: number = 0, max: number = 1) {
        return Math.random() * (max - min) + min;
    }

    /**
     * Get a random boolean value
     * @returns
     */
    export function boolean() {
        return Math.random() >= 0.5;
    }

    /**
     * Generate Random Point in a Circle.
     * @param radius 1
     * @param x_center 0
     * @param y_center 0
     * @returns
     */
    export function inCircle(radius: number = 1, x_center: number = 0, y_center: number = 0) {
        let ang = Math.random() * 2 * Math.PI,
            hyp = Math.sqrt(Math.random()) * radius,
            adj = Math.cos(ang) * hyp,
            opp = Math.sin(ang) * hyp;
        return { x: x_center + adj, y: y_center + opp };
    }

    /**
     * Generate Random Point on a Circle.
     * @param radius 1
     * @param x_center 0
     * @param y_center 0
     * @returns
     */
    export function onCircle(radius: number = 1, x_center: number = 0, y_center: number = 0) {
        let ang = Math.random() * 2 * Math.PI,
            adj = Math.cos(ang) * radius,
            opp = Math.sin(ang) * radius;
        return { x: x_center + adj, y: y_center + opp };
    }

    /**
     * Get a random item from an array.
     * @param arr
     * @returns
     */
    export function fromArr<T>(arr: Array<T>): T {
        let idx = random.int(0, arr.length - 1);
        return arr[idx];
    }

    /**
     * Returns a single item from an array with relative weighting of odds
     * @param arr
     * @param weights
     * @param trim
     * @returns
     */
    export function weighted<T>(arr: Array<T>, weights: Array<number>, trim: boolean = false): T {
        if (arr.length !== weights.length) {
            throw new RangeError("weighted:: Length of array and weights must match");
        }

        let sum: number = 0;
        let val: number;
        for (let index = 0; index < weights.length; ++index) {
            val = weights[index];
            if (val > 0) {
                sum += val;
            }
        }

        if (sum === 0) {
            throw new RangeError("weighted:: No valid entries in array weights");
        }

        let selected = Math.random() * sum;

        let total: number = 0;
        let lastGoodIdx: number = -1;
        let chosenIdx: number = 0;
        for (let index = 0; index < weights.length; ++index) {
            val = weights[index];
            total += val;
            if (val > 0) {
                if (selected <= total) {
                    chosenIdx = index;
                    break;
                }
                lastGoodIdx = index;
            }

            if (index === weights.length - 1) {
                chosenIdx = lastGoodIdx;
            }
        }

        let chosen = arr[chosenIdx];
        if (trim) {
            arr.splice(chosenIdx, 1);
            weights.splice(chosenIdx, 1);
        }

        return chosen;
    }
}
