let W = window.innerWidth;
let H = window.innerHeight;
let L;
let M = 4;
let N = 4;
let R;
let Ord;
let GmH = [];
let cols;
let rows;
let subgroup;
let c;
let drag = 0;
let button1;
let button2;

function setup() {
    if (W >= H) {
        L = H;
    } else {
        L = W;
    }
    c = createCanvas(W, H);
    background(0);
    cols = floor(W/(M+1));
    rows = floor(H/(N+1));
    R = floor(cols*rows/(1.8*(Math.sqrt(Math.pow(cols, 2)+Math.pow(rows, 2)))));
    m_slider = createSlider(2, 31, 6, 1);
    m_slider.position(W/3, H/20);
    m_slider.style('width', '15vw');
    n_slider = createSlider(2, 31, 6, 1);
    n_slider.position(W/2, H/20);
    n_slider.style('width', '15vw');
    M = m_slider.value();
    N = n_slider.value();
    m_slider.hide();
    n_slider.hide();
    button1 = createButton('Set');
    button1.position(W-W/5, H/20);
    button1.hide();
    init();
}

function init() {
    W = window.innerWidth;
    H = window.innerHeight;
    createCanvas(W, H);
    background(0);
    subgroup = [];
    GmH = [];
    Ord = 0;
    cols = floor(W/(M+1));
    rows = floor(H/(N+1));
    R = floor(cols*rows/(1.8*(Math.sqrt(Math.pow(cols, 2)+Math.pow(rows, 2)))));
}

function deviceTurned() {
    resize();
}

function set_mn() {
    M = m_slider.value();
    N = n_slider.value();
    button2.hide();
    m_slider.hide();
    n_slider.hide();
    button1.show();
    init();
}

function set_() {
    button1.hide();
    m_slider.show();
    n_slider.show();
    button2 = createButton('Run');
    button2.position(W-W/5, H/20);
    button2.mousePressed(set_mn);
}

function mouseDragged() {
    if (drag % 2 === 0 && mouseX < 1.5*cols) {
        button1.show();
    } else {
        button1.hide();
    }
}

function mouseReleased() {
    drag++;
}



function touchStarted() {
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

function mousePressed() {
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
    button1.mousePressed(set_);
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
}

window.addEventListener("resize", onResize);

function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    createCanvas(width, height);
}





