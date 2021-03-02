export abstract class CommonConstants {
    public static readonly CANVAS_SIZE: Array<number> = [500, 500];
    public static readonly SNAKE_START: Array<Array<number>> = [
        [6,7.5],
        [6,8]
    ];
    public static readonly APPLE_START: Array<number> = [6, 3];
    public static readonly SCALE = 40;
    public static readonly SPEED: number|null = 200;
    public static readonly DIRECTIONS: {[key: number]: Array<number>} = {
        38: [0, -0.5],  //up
        40: [0, 0.5],   //down
        37: [-0.5, 0],  //left
        39: [0.5, 0],    //right
        87: [0, -0.5],  //up
        83: [0, 0.5],   //down
        65: [-0.5, 0],  //left
        68: [0.5, 0],    //right

    };
  public static readonly SNAKE_SOUND_VOLUME: number = 0.5;
}
