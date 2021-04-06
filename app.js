import {Init} from "./init.js"
import {Triangle, Rectangle, Circle} from "./shape.js"
import * as vec3 from "./koz-matrix/vec3.js"
import {Camera} from "./camera.js"

let renderingContext;
let camera;
let control;

let states = new Map([
    ["spin", false],
    ["scale", false],
    ["move", false],
]);


let squareVertices
let bigCircles
let smallCircles

function initVertices() {
    squareVertices = new Rectangle(0.2, 0.2, [0, 1, 0, 1], renderingContext.gl)

    bigCircles = []
    for (let i = 0; i < 4; i++)
        bigCircles.push(new Circle(0.1, [1, 0, 0, 1], renderingContext.gl))

    smallCircles = []
    for (let i = 0; i < 8; i++)
        smallCircles.push(new Circle(0.025, [1, 0, 0, 1], renderingContext.gl))
}

function moveVertices() {
    bigCircles[0].move(0.1, 0.1, 0)
    bigCircles[1].move(-0.1, 0.1, 0)
    bigCircles[2].move(-0.1, -0.1, 0)
    bigCircles[3].move(0.1, -0.1, 0)

    smallCircles[0].move(0.125, 0.0, 0)
    smallCircles[1].move(0.1, 0.1, 0)
    smallCircles[2].move(0.0, 0.125, 0)
    smallCircles[3].move(-0.1, 0.1, 0)
    smallCircles[4].move(-0.125, 0.0, 0)
    smallCircles[5].move(-0.1, -0.1, 0)
    smallCircles[6].move(0.0, -0.125, 0)
    smallCircles[7].move(0.1, -0.1, 0)
}


function addVerticesToBuffers() {
    for (let i = 0; i < 4; i++)
        renderingContext.addPositionColorBuffer(bigCircles[i]);

    renderingContext.addPositionColorBuffer(squareVertices)

    for (let i = 0; i < 8; i++)
        renderingContext.addPositionColorBuffer(smallCircles[i]);
}

function rotate(t) {
    // rotate respect to t
    squareVertices.rotate(0, 0, t)
    for (let i = 0; i < 4; i++)
        bigCircles[i].rotate(0, 0, t)
    for (let i = 0; i < 8; i++)
        smallCircles[i].rotate(0, 0, t)
}


function scaleByTime(currentTime) {
    const scaleRatio = Math.asin(Math.sin(currentTime)) * (1 / Math.PI) + 1
    squareVertices.scale(scaleRatio, scaleRatio, 1)
    for (let i = 0; i < 4; i++)
        bigCircles[i].scale(scaleRatio, scaleRatio, 1)
    for (let i = 0; i < 8; i++)
        smallCircles[i].scale(scaleRatio, scaleRatio, 1)
}

function transformByRadian() {
    spiralRad -= spiralRate / 10
    const r = Math.asin(Math.sin(spiralRad / 6)) + Math.PI / 2
    x = (r * Math.cos(spiralRad) / 6)
    y = (r * Math.sin(spiralRad) / 8)
}

function transformVertices(x, y, z) {
    squareVertices.move(x, y, z)
    for (let i = 0; i < 4; i++)
        bigCircles[i].move(x, y, z)
    for (let i = 0; i < 8; i++)
        smallCircles[i].move(x, y, z)
}


function init() {
    renderingContext = new Init("scene");
    camera = new Camera(vec3.fromValues(0, 0, 2), vec3.fromValues(0, 0, 0), vec3.fromValues(0, -10, +10));

    const startSpin = document.getElementById("start-spin")
    startSpin.addEventListener("click", start_spin)

    const stopSpin = document.getElementById("stop-spin")
    stopSpin.addEventListener("click", stop_spin)


    const spinSpeed = document.getElementById("spin-speed")

    spinSpeed.onchange = () => {
        spin_speed(spinSpeed.value)
    }

    const startScale = document.getElementById("start-scale")
    startScale.addEventListener("click", start_scale)

    const stopScale = document.getElementById("stop-scale")
    stopScale.addEventListener("click", stop_scale)

    const startSpiral = document.getElementById("start-spiral")
    startSpiral.addEventListener("click", start_spiral)

    const stopSpiral = document.getElementById("stop-spiral")
    stopSpiral.addEventListener("click", stop_spiral)

    const spiralSpeed = document.getElementById("spiral-speed")

    spiralSpeed.onchange = () => {
        spiral_speed(spiralSpeed.value)
    }

    animate();
}


function start_spin() {
    states.set("spin", true);
}

function stop_spin() {
    states.set("spin", false);
}

function spin_speed(speed) {
    spinRate = 0.01 * parseInt(speed)
}

function start_scale() {
    states.set("scale", true);
}

function stop_scale() {
    states.set("scale", false);
}

function start_spiral() {
    states.set("move", true);
}

function stop_spiral() {
    states.set("move", false);
}

function spiral_speed(speed) {
    spiralRate = parseInt(speed)
}


let scaleCurrentTime = 0;
let spinCurrentTime = 0;
let spiralRad = 0;
let alternate = false;
let x = 0;
let y = 0;

let spinRate = 0.01
let spiralRate = 1

function animate() {
    initVertices()
    scaleByTime(scaleCurrentTime)
    moveVertices()
    transformVertices(x, y, 0)

    rotate(spinCurrentTime)

    addVerticesToBuffers()

    if (states.get("spin"))
        spinCurrentTime += spinRate

    if (states.get("scale"))
        scaleCurrentTime += 0.01

    if (states.get("move"))
        transformByRadian()

    renderingContext.drawScene(camera)
    requestAnimationFrame(animate);
}

window.onload = function () {
    init();
};


