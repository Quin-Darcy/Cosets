let W = window.innerWidth-20;
let H = window.innerHeight-20;
console.log(W);
console.log(H);
let L;
let M = 9;
let N = 12;
let R;
let Ord;
let GmH = [];
let cols;
let rows;
let subgroup;
let c;
let IMG = false;

function setup() {
    if (W >= H) {
        L = H;
    } else {
        L = W;
    }
    R = floor(3*L/(M*N));
    c = createCanvas(W, H);
    background(0);
    cols = floor(W/(M+1));
    rows = floor(H/(N+1));
    init();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        IMG = true;
    }
}

function init() {
    subgroup = [];
    GmH = [];
    Ord = 0;
    cols = floor(W/(M+1));
    rows = floor(H/(N+1));
    R = floor(3*L/(M*N));
}

function doubleClicked() {
    if (mouseX >= W/2 && mouseY <= H/2) {
        M += 1;
        init();
    }
    if (mouseX >= W/2 && mouseY > H/2) {
        N -= 1;
        init();
    }
    if (mouseX < W/2 && mouseY <= H/2) {
        N += 1;
        init();
    }
    if (mouseX < W/2 && mouseY > H/2) {
        M -= 1;
        init();
    }
}

function mouseClicked() {
    init();
    on_point = false;
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (dist(mouseX, mouseY, cols*(i+1), H-rows*(j+1)) <= R) {
                subgroup.push([i, j]);
                on_point = true;
                break;
            }
        }
    }
    if (on_point) {
        get_sub();
    }
}

function get_sub() {
    let exit = false;
    let a = subgroup[0][0];
    let b = subgroup[0][1];
    let c = a;
    let d = b;

    Ord = math.lcm(floor(M/math.gcd(a, M)), floor(N/math.gcd(b, N)));
    for (let i = 0; i < Ord-1; i++) {
        a = (a+c) % M;
        b = (b+d) % N;
        subgroup.push([a, b]);
    }
    get_cosets();
}

function equals(a, b) {
    let count = 0;
    for (i = 0; i < a.length; i++) {
        for (j = 0; j < b.length; j++) {
            if (a[i][0] === b[j][0] && a[i][1] === b[j][1]) {
                count++;
            }
        }
    }
    if (count === a.length) {
        return true;
    } else {
        return false;
    }
}

function get_cosets() {
    let count = 0;
    let temp1 = [];
    let temp2 = [];
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            GmH.push(new Coset([i, j], subgroup));
        }
    }
    let C = GmH.length;
    for (let i = 0; i < GmH.length-1; i++) {
        for (let j = i+1; j < GmH.length; j++) {
            if (equals(GmH[i].gH, GmH[j].gH)) {
                GmH.splice(j, 1);
            }
        }
    }
}

function draw() {
    background(0);
    if (GmH.length > 0) {
        colorMode(HSB, GmH.length);
        for (let i = 0; i < GmH.length; i++) {
            for (let j = 0; j < GmH[i].gH.length; j++) {
                noStroke();
                fill(i, GmH.length, GmH.length);
                ellipse(cols*(GmH[i].gH[j][0]+1), H-rows*(GmH[i].gH[j][1]+1), R);
            }
        }
    } else {
        for (let i = 0; i < M; i++) {
            for (let j = 0; j < N; j++) {
                noStroke();
                fill(100);
                ellipse(cols*(i+1), H-rows*(j+1), R);
            }
        }
    }
    if (IMG) {
        noLoop();
        saveCanvas(c, 'image', 'jpg');
        IMG = false;
        loop();
    }
}

window.addEventListener("resize", onResize);

function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    createCanvas(width, height);
}





