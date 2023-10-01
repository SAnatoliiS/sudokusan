/* eslint-disable no-param-reassign */
/**
 * The doubly-doubly circularly linked data object.
 * Data object X
 */
export class DoX {
    public V: string;

    public L: this;

    public R: this;

    public U: this;

    public D: this;

    public S: number;

    public H: this;

    constructor(V: string, H?: DoX) {
        this.V = V;
        this.L = this;
        this.R = this;
        this.U = this;
        this.D = this;
        this.S = 1;
        this.H = (H ?? this) as this;
        if (H) {
            H.S += 1;
        }
    }
}
