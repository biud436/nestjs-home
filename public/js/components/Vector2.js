/**
 * @author 어진석
 */
export class Vector2 {

    /**
     * 비어있는 벡터를 생성합니다
     * @memberof Vector2
     * @return {Vector2} val
     */
    static empty() {
        return new Vector2(0.0, 0.0);
    };

    /**
     * 선형 보간
     * vec1 에서 vec2 로 직선 형태로 이동합니다.
     * @memberof Vector2
     * @function mix
     * @param {Vector2} vec1
     * @param {Vector2} vec2
     * @param {Number} t  frameTime값. 0 ~ 1 사이의 실수
     * @return {Number} val
     * @static
     */
    static mix(vec1, vec2, t) {
        var vec = Vector2.empty();
        vec.x = vec1.x + t * (vec2.x - vec1.x);
        vec.y = vec1.x + t * (vec2.y - vec1.y);
        return vec;
    };

    /**
     * 정규화된 상태인지 확인합니다
     * @memberof Vector2
     * @function isNormalize
     * @param {Vector2} vec
     * @static
     */
    static isNormalize(vec) {
        if ((vec.x >= 0.0 && vec.x <= 1.0) &&
            (vec.y >= 0.0 && vec.y <= 1.0)) {
            return true;
        }
        return false;
    };

    /**
     * 곡선형 보간
     * vec1 에서 vec3 으로 곡선 형태로 이동합니다.
     * @memberof Vector2
     * @function quadraticBezier
     * @param {Vector2} vec1  시작 지점
     * @param {Vector2} vec2  중간 지점
     * @param {Vector2} vec3  끝 지점
     * @param {Number} t  frameTime값. 0 ~ 1 사이의 실수
     * @return {Vector2} p
     * @static
     */
    static quadraticBezier(vec1, vec2, vec3, t) {
        var d, e, p;
        d = Vector2.mix(vec1, vec2, t);
        e = Vector2.mix(vec2, vec3, t);
        p = Vector2.mix(d, e, t);
        return p;
    };

    /**
     * 최대 각도, 최소 각도를 제한합니다 (성능을 위해)
     * @memberof Vector2
     * @function limitAngle
     * @param {Number} angle
     * @return {Number} angle
     * @static
     */
    static limitAngle(angle) {
        while (angle < -Math.PI) angle += Math.PI * 2;
        while (angle >= Math.PI) angle -= Math.PI * 2;
        return angle;
    };

    /**
     * 두 벡터 사이의 거리
     * @memberof Vector2
     * @function distance
     * @param {Vector2} vec1
     * @param {Vector2} vec2
     * @return {Number} dist
     * @static
     */
    static distance(vec1, vec2) {
        var val;
        val = Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2);
        return Math.sqrt(val);
    };

    /**
     * @constructor
     * @memberof Vector2
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x, y) {
        this._x = x;
        this._y = y;
    };

    /**
     * 덧셈
     * @method add
     * @param {Vector2} vec
     * @return {Vector2} this
     */
    add(vec) {
        if (vec instanceof Number) {
            this.x = this.x + vec;
            this.y = this.y + vec;
            return this;
        } else if (vec instanceof Vector2) {
            this.x = this.x + vec.x;
            this.y = this.y + vec.y;
            return this;
        }
        return Vector2.empty();
    };

    /**
     * 뺄셈
     * @method minus
     * @param {Vector2} vec
     * @return {Vector2} this
     */
    minus(vec) {
        if (vec instanceof Number) {
            this.x = this.x - vec;
            this.y = this.y - vec;
            return this;
        } else if (vec instanceof Vector2) {
            this.x = this.x - vec.x;
            this.y = this.y - vec.y;
            return this;
        }
        return Vector2.empty();
    };

    /**
     * 곱셈
     * @method div
     * @param {Vector2} vec
     * @return {Vector2} this
     *
     */
    mul(vec) {
        if (vec instanceof Number) {
            this.x = this.x * vec;
            this.y = this.y * vec;
            return this;
        } else if (vec instanceof Vector2) {
            this.x = this.x * vec.x;
            this.y = this.y * vec.y;
            return this;
        }
        return Vector2.empty();
    };

    /**
     * 나눗셈
     * @method div
     * @param {Vector2} vec
     * @return {Vector2} this
     */
    div(vec) {
        if (vec instanceof Number) {
            this.x = this.x / vec;
            this.y = this.y / vec;
            return this;
        } else if (vec instanceof Vector2) {
            this.x = this.x / vec.x;
            this.y = this.y / vec.y;
            return this;
        }
        return Vector2.empty();
    };

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get length() {
        return this.getLength();
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * 벡터의 크기 
     * 추상화된 벡터 공간에서는 벡터의 크기를 고려하지 않는다.
     * 유클리드 공간에서는 벡터의 크기를 구할 수 있다.
     * 벡터의 크기는 새로운 용어로 ||v||를 벡터 v의 놈(norm)이라고 칭한다.
     * @method getLength
     * @return {Number} angle
     */
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    /**
     * 두 벡터 사이의 각도
     * @method getAngle
     * @param {Vector2} vec
     * @return {Number} val
     */
    getAngle(vec) {
        if (Vector2.isNormalize(this) && Vector2.isNormalize(vec)) {
            var val = this.dot(vec);
            return Math.acos(val);
        } else {
            console.error("This is not normalize vector");
        }
    };

    /**
     * 벡터의 크기는 유클리드 공간에서 성립하므로, 
     * 유클리드 공간에서 벡터의 크기(norm; 독일어)로 나누면 0-1 사이로 일반화된 값을 얻을 수 있다.
     * 
     * 또한 유클리드 기하학이 성립하는 공간이므로 두 점 사이의 거리나 두 벡터가 이루는 각을 구할 수 있다.
     * 
     * @method normalize
     * @return {Vector2} rel
     */
    normalize() {
        var rel = Vector2.empty();
        if (this.length != 0) {
            rel.x = this.x / this.length;
            rel.y = this.y / this.length;
        }
        return rel;
    };

    /**
     * 벡터의 내적를 구한다.
     * 내적의 중요한 용도 중 하나는 두 벡터가 서로 수직인지 아닌지를 판단하는 것이다.
     * 내적이 0이 되는 두 벡터는 직교하는 것으로 정의된다.
     * 즉, 영벡터 0은 모든 벡터와 수직이다.
     * 
     * 두 점 사이의 각도를 구하는 방법은 여러가지가 있다. 
     * 
     * ! 1. Math.atan2 이용
     * = (Math.atan2(y2, x2) * Math.PI / 180.0) - (Math.atan2(y1, x1) * Math.PI / 180.0)
     * = Math.atan2(y2 - y1, x2 - x2) * (Math.PI / 180.0)
     * 
     * 사실 이 방법은 시스템에 부담을 주므로 일반적인 상황에서는 벡터를 써야 맞다.
     * 
     * ! 2. 벡터의 내적 이용
     * 공식적인 방법은 벡터의 내적을 이용하는 방법이다. 
     * 선형대수학 이론에 따르면 공식은 삼각형의 코사인 법칙에서 유도된 공식이다.
     * 
     * 두 벡터 사이의 cos 각을 구할 수 있다. 각 속성을 곱해서 더하면 스칼라 값을 구할 수 있다.
     * 
     * 예를 들어, 다음과 같은 벡터 A (x1 + y2)와 벡터 B (x2 + y2)가 있다고 해보면 다음과 같다.
     * 
     * = A * B = (x1 * x2) + (y1 * y2) = |A|B|cosθ
     * 
     * 이 스칼라 값을 아크코사인 함수 Math.acos(x)에 넣으면 각도를 구할 수 있다. 
     * 단, 벡터가 정규화된 상태여야 한다. 
     * 아크코사인 함수는 길이가 1인 원을 가정하기 때문에 -1부터 1까지만 인수로 받는다.
     * 
     * @method dot
     * @param {Vector} vec
     * @return {Number} angle
     */
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    };

    /**
     * 회전 행렬
     *
     * 이 공식은 각도가 동일한 직각 삼각형 2개를 그려 닮은꼴 관계를 이용하여 삼각비를 통해 최종 좌표를 구한다.
     * 
     * @method rotate
     * @param angle {Number}
     */
    rotate(angle) {
        this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        this.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    };

    /**
     * @method pointDirection
     * @param {Vector2} vec 목표 벡터
     * @param {Number} angle 각도
     * @return {Number} val
     */
    pointDirection(vec, angle) {
        return Math.atan2(vec.y - this.y, vec.x - this.x) - (Math.PI / 180) * angle;
    };

    /**
     * @method isEqual
     * @param {Vector2} vec
     * @return {Boolean} result
     */
    isEqual(vec) {
        var eps = 0.001;
        if ((this.x - vec.x) < eps &&
            (this.y - vec.y) < eps) {
            return true;
        }
        return false;
    };

}