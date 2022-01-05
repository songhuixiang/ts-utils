// 梅森旋转算法（Mersenne twister）
export class seedrandom {
    private N: number;
    private M: number;
    private MATRIX_A: number;
    private UPPER_MASK: number;
    private LOWER_MASK: number;
    private mt: Array<number>;
    private mti: number;

    constructor(seed?: number | string) {
        let _seed = 0;
        if (seed === undefined) {
            // kept random number same size as time used previously to ensure no unexpected results downstream
            _seed = Math.floor(Math.random() * Math.pow(10, 13));
        } else if (typeof seed === "string") {
            for (let j = 0; j < seed.length; j++) {
                // create a numeric hash for each argument, add to seedling
                let hash = 0;
                for (let k = 0; k < seed.length; k++) {
                    hash = seed.charCodeAt(k) + (hash << 6) + (hash << 16) - hash;
                }
                _seed += hash;
            }
        } else {
            _seed = seed;
        }

        /* Period parameters */
        this.N = 624;
        this.M = 397;
        this.MATRIX_A = 0x9908b0df; /* constant vector a */
        this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
        this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

        this.mt = new Array(this.N); /* the array for the state vector */
        this.mti = this.N + 1; /* mti==N + 1 means mt[N] is not initialized */

        this.init_genrand(_seed);
    }

    private init_genrand(s: number) {
        this.mt[0] = s >>> 0;
        for (this.mti = 1; this.mti < this.N; this.mti++) {
            s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
            this.mt[this.mti] = ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253 + this.mti;
            this.mt[this.mti] >>>= 0;
        }
    }

    private genrand_int32() {
        let y;
        let mag01 = new Array(0x0, this.MATRIX_A);
        /* mag01[x] = x * MATRIX_A  for x=0,1 */

        if (this.mti >= this.N) {
            /* generate N words at one time */
            let kk;

            if (this.mti === this.N + 1) {
                /* if init_genrand() has not been called, */
                this.init_genrand(5489); /* a default initial seed is used */
            }
            for (kk = 0; kk < this.N - this.M; kk++) {
                y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
                this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            for (; kk < this.N - 1; kk++) {
                y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
                this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
            this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

            this.mti = 0;
        }

        y = this.mt[this.mti++];

        /* Tempering */
        y ^= y >>> 11;
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= y >>> 18;

        return y >>> 0;
    }

    /**
     * Get a random number in [ 0, 1 )
     * @returns 0 <= random < 1
     */
    public random() {
        return this.genrand_int32() * (1.0 / 4294967296.0);
        /* divided by 2^32 */
    }

    /**
     * Get a random integer in [ min, max ]
     * @param min [min=0] - Lower bound (integer, inclusive)
     * @param max [max=1] - Upper bound (integer, inclusive)
     * @returns min <= random integer <= max
     */
    public integer(min: number = 0, max: number = 1) {
        return Math.floor(this.random() * (max - min + 1) + min);
    }

    /**
     * Get a random floating point number in [ min, max )
     * @param min [min=0] - Lower bound (float, inclusive)
     * @param max [max=1] - Upper bound (float, exclusive)
     * @param fixed By default it will return a fixed number of at most 4 digits after the decimal.
     * @returns min <= random float < max
     */
    public float(min: number = 0, max: number = 1, fixed: number = 4) {
        return Number((this.random() * (max - min) + min).toFixed(fixed));
    }

    /**
     * Get a random boolean value
     * @param percent The default percent of success (returning true) is 50%.
     * @returns
     */
    public boolean(percent: number = 50) {
        return this.random() * 100 < percent;
    }
}
