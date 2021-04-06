import * as mat4 from './koz-matrix/mat4.js'
import * as vec3 from './koz-matrix/vec3.js'
class Shape {
    constructor() {
        this.modelMatrix = mat4.create()
    }

    scale(x, y, z) {
        this.modelMatrix = mat4.scale(this.modelMatrix, vec3.fromValues(x, y, z))
    }

    rotate(thetaX, thetaY, thetaZ) {
        let rotation = mat4.rotateX(mat4.create(), thetaX)
        this.modelMatrix = mat4.multiply(rotation, this.modelMatrix)

        rotation = mat4.rotateY(mat4.create(), thetaY)
        this.modelMatrix = mat4.multiply(rotation, this.modelMatrix)

        rotation = mat4.rotateZ(mat4.create(), thetaZ)
        this.modelMatrix = mat4.multiply(rotation, this.modelMatrix)
    }

    move(x, y, z) {
        let translationMatrix = mat4.create()
        translationMatrix = mat4.translate(translationMatrix, vec3.fromValues(x, y, z))
        this.modelMatrix = mat4.multiply(this.modelMatrix, translationMatrix)
    }

    fillColorVertices(colorVertices, colorRepeatTime){
        const filledColorVertices = []
        for (let i = 0; i < colorRepeatTime; i++)
            filledColorVertices.push(colorVertices)
        this.colorVertices = filledColorVertices.flat()
        this.colorVertices.itemSize = colorVertices.length
        this.colorVertices.numItems = colorRepeatTime
    }

    changeColorVertices(colorVertices){
        const filledColorVertices = []
        for (let i = 0; i < this.colorVertices.numItems; i++)
            filledColorVertices.push(colorVertices)

        const itemSize = this.colorVertices.itemSize
        const numItems = this.colorVertices.numItems
        this.colorVertices = filledColorVertices.flat()
        this.colorVertices.itemSize = itemSize
        this.colorVertices.numItems = numItems
    }
}

// we'll go through it.
class Triangle extends Shape {
    constructor(positionVertices, colorVertices, gl) {
        super()
        this.positionVertices = positionVertices
        this.positionVertices.numItems = this.positionVertices.length / this.positionVertices.itemSize
        this.primitiveMode = gl.TRIANGLES
        this.fillColorVertices(colorVertices, this.positionVertices.numItems)
    }
}

class Rectangle extends Shape {
    constructor(width, height, colorVertices, gl) {
        super()
        this.positionVertices = this.computeVertices(width, height)
        this.positionVertices.itemSize = 2
        this.positionVertices.numItems = this.positionVertices.length / this.positionVertices.itemSize
        this.primitiveMode = gl.TRIANGLE_STRIP
        this.fillColorVertices(colorVertices, this.positionVertices.numItems)
    }

    computeVertices(width, height) {
        const w = width
        const h = height

        return [
            w / 2, h / 2,
            w / 2, -h / 2,
            -w / 2, -h / 2,
            w / 2, h / 2,
            -w / 2, -h / 2,
            -w / 2, h / 2
        ];
    }


}

class Circle extends Shape {
    constructor(radius, colorVertices, gl) {
        super()
        this.positionVertices = this.computeVertices(radius)
        this.positionVertices.itemSize = 2
        this.positionVertices.numItems = this.positionVertices.length / this.positionVertices.itemSize
        this.primitiveMode = gl.TRIANGLE_FAN
        this.fillColorVertices(colorVertices, this.positionVertices.numItems)
    }

    computeVertices(radius) {
        const r = radius;
        const rad = Math.PI / 180.0;
        let positionVertices = [];
        for (let i = 0; i < 360; i += 1)
            positionVertices.push(r * Math.cos(i * rad), r * Math.sin(i * rad));
        return positionVertices;
    }
}

export {Triangle, Rectangle, Circle}
