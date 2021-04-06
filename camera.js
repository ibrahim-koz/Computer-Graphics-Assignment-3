import * as mat4 from "./koz-matrix/mat4.js";
class Camera{
    constructor(cameraPosition, cameraTarget, upVector) {
        this.position = cameraPosition;
        this.target = cameraTarget;
        this.upVector = upVector;

        this.projectionMatrix = mat4.create();

        this.viewMatrix = mat4.create();
        mat4.lookAt(this.viewMatrix, this.position, this.target, this.upVector);
        mat4.invert(this.viewMatrix, this.viewMatrix);
    }
}

export {Camera}