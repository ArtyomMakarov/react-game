export abstract class CommonConstants {
    public static readonly CANVAS_SIZE: Array<number> = [800, 800];
    public static readonly SNAKE_START: Array<Array<number>> = [
        [8,7],
        [8,8]
    ];
    public static readonly APPLE_START: Array<number> = [8, 3];
    public static readonly SCALE = 40;
    public static readonly SPEED: number|null = 200;
    public static readonly DIRECTIONS: {[key: number]: Array<number>} = {
        38: [0, -1],  //up
        40: [0, 1],   //down
        37: [-1, 0],  //left
        39: [1, 0]    //right
    };
}
