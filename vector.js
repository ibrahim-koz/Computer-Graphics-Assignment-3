class Vector4 {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    setComponent(index, value) {
        switch (index) {
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break;
            case 3:
                this.w = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);
        }

        return this;
    }

    getComponent(index) {
        switch (index) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            case 3:
                return this.w;
            default:
                throw new Error('index is out of range: ' + index);
        }
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }

    combine(b, ascl, bscl) {
        let ret = new Vector4();

        ret.x = (ascl * this.x) + (bscl * b.x);
        ret.y = (ascl * this.y) + (bscl * b.y);
        ret.z = (ascl * this.z) + (bscl * b.z);
        ret.w = (ascl * this.w) + (bscl * b.w);

        return ret;
    }


    clone() {
        return new this.constructor(this.x, this.y, this.z, this.w);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;

        return this;
    }

    addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        this.w += s;

        return this;
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;

        return this;
    }

    subtractScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        this.w -= s;

        return this;
    }

    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;

        return this;
    }

    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;

        return this;
    }

    normalize() {
        return this.divideScalar(this.length() || 1);
    }

    normalized() {
        return this.clone().normalize();
    }

    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }

    scale(desiredLength) {
        let len = this.length();
        if (len !== 0) {
            let l = desiredLength / len;
            this.multiplyScalar(l);
        }
    }

    /**
     * Performs linear interpolation from a vector to given vector by specified a value.
     * @param from
     * @param to
     * @param alpha
     * @returns {Vector4}
     */
    static lerp(from, to, alpha) {
        let ret = new Vector4();

        ret.x = from.x + (to.x - from.x) * alpha;
        ret.y = from.y + (to.y - from.y) * alpha;
        ret.z = from.z + (to.z - from.z) * alpha;
        ret.w = from.w + (to.w - from.w) * alpha;

        return ret;
    }

    equals(v) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w === this.w));
    }

    fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];

        return this;
    }

    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;

        return array;
    }

    randomize() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        this.w = Math.random();

        return this;
    }

    static random() {
        return new Vector4().randomize();
    }
}

class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    setComponent(index, value) {
        switch (index) {
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);
        }

        return this;
    }

    getComponent(index) {
        switch (index) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            default:
                throw new Error('index is out of range: ' + index);
        }
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(b) {
        const ax = this.x, ay = this.y, az = this.z;
        const bx = b.x, by = b.y, bz = b.z;

        let ret = new Vector3();
        ret.x = ay * bz - az * by;
        ret.y = az * bx - ax * bz;
        ret.z = ax * by - ay * bx;

        return ret;
    }

    combine(b, ascl, bscl) {
        let ret = new Vector3();

        ret.x = (ascl * this.x) + (bscl * b.x);
        ret.y = (ascl * this.y) + (bscl * b.y);
        ret.z = (ascl * this.z) + (bscl * b.z);

        return ret;
    }

    clone() {
        return new this.constructor(this.x, this.y, this.z);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
    }

    addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;

        return this;
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;

        return this;
    }

    subtractScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        return this;
    }

    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;

        return this;
    }

    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;

        return this;
    }

    normalize() {
        return this.divideScalar(this.length() || 1);
    }

    normalized() {
        return this.clone().normalize();
    }

    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }

    scale(desiredLength) {
        let len = this.length();
        if (len !== 0) {
            let l = desiredLength / len;
            this.multiplyScalar(l);
        }
    }

    /**
     * Performs linear interpolation from a vector to given vector by specified a value.
     * @param from
     * @param to
     * @param alpha
     * @returns {Vector4}
     */
    static lerp(from, to, alpha) {
        let ret = new Vector3();

        ret.x = from.x + (to.x - from.x) * alpha;
        ret.y = from.y + (to.y - from.y) * alpha;
        ret.z = from.z + (to.z - from.z) * alpha;

        return ret;
    }

    equals(v) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
    }

    fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];

        return this;
    }

    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;

        return array;
    }

    randomize() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();

        return this;
    }

    static random() {
        return new Vector3().randomize();
    }
}

export {Vector4, Vector3};
