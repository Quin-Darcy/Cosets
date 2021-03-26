class Coset {
    constructor(g, H) {
        this.g = g;
        this.H = H;
        this.gH = new Array(H.length);
        for (let i = 0; i < H.length; i++) {
            this.gH[i] = [(g[0]+this.H[i][0])%M, (g[1]+this.H[i][1])%N];
        }
    }
}
