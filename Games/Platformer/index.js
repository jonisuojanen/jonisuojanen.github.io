import { Animation } from "./Animation";


const canvas = document.querySelector('canvas1');
const c = canvas.getContext('2d'); //context
canvas.width = 1024;
canvas.height = 576;

let scrollOffset = 0;

const gravity = 1.25;








class Player
{
    constructor()
    {
        this.position =
        {
            x: 100,
            y: 100
        }

        this.velocity =
        {
            x: 0, //moveSpeed
            y: 1 //gravity
        }
        this.width = 100;
        this.height = 100;
        this.image = image

    }

    draw()
    {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update()
    {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;


        if (this.position.y + this.height + this.velocity.y <= canvas.height)
        { this.velocity.y += gravity; }
        else
        {
            this.velocity.y = 0;
        }

    }

}
const player = new Player();

class Platform
{
    constructor({ x, y, image })
    {
        this.position =
        {
            x,
            y
        }
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }
    draw()
    {
        c.drawImage(this.image, this.position.x, this.position.y)
        // c.fill
        // c.fillStyle = 'blue';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

}

class GenericObject
{
    constructor({ x, y, image })
    {
        this.position =
        {
            x,
            y
        }
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }
    draw()
    {
        c.drawImage(this.image, this.position.x, this.position.y)
    }

}

const playerImage = new Image();
playerImage.src = './assets/shadow_dog.png';

function CreateImage(image, imageSource)
{
    const image = new Image();
    image.src = imageSource
}

// const genericObjects = [new GenericObject({
//     x: 0,
//     y: 0.
//     image: backgroundImage
// })];


const platforms = [new Platform(
    { x: -1, y: 450, image: CreateImage(image, imageSource) }), new Platform(
        { x: platformimage.width - 2, y: 450, image: platformimage })];

function newFunction()
{
    const background = new Image();
    backgroundImage.src = './assets/BG1.png';

    const middlebackground = new Image();
    middlebackgroundImage.src = './assets/BG2.png';
}

function animate()
{
    requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);


    platforms.forEach((platform) =>
    {
        platform.draw()
    })
    player.update();






    //INPUT
    if (keys.right.pressed && player.position.x < 400)
    {
        player.velocity.x = 5;
    }
    else if (keys.left.pressed && player.position.x > 100)
    {
        player.velocity.x = -5;
    }
    else
    {
        player.velocity.x = 0;

        //Platform movement
        if (keys.right.pressed)
        {
            //movement tracker\
            scrollOffset += 5;
            platforms.forEach((platform) =>
            {
                platform.position.x -= 5
            })
        }
        else if (keys.left.pressed)
        {
            scrollOffset -= -5;
            platforms.forEach((platform) =>
            {
                platform.position.x += 5
            })
        }
    }

    //PLATFORM COLLISION DETECTION
    platforms.forEach((platform) =>
    {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width)
        {
            player.velocity.y = 0;
        }
    })
    if (scrollOffset > 2000)
    {
        //WIN CONDITION
    }
}


const keys =
{
    right:
        { pressed: false },
    left:
        { pressed: false },
}


animate()


//Input
addEventListener('keydown', ({ keyCode }) => 
{
    // console.log(keyCode);
    switch (keyCode)
    {
        case 65:
            // console.log('left');
            keys.left.pressed = true;
            break;
        case 83:
            // console.log('down');

            break;
        case 68:
            // console.log('right')
            keys.right.pressed = true;
            break;
        case 87:
            // console.log('up')
            player.velocity.y -= 20;
            break;
    }
})
addEventListener('keyup', ({ keyCode }) => 
{
    // console.log(keyCode);
    switch (keyCode)
    {
        case 65:
            // console.log('left');
            keys.left.pressed = false;
            break;
        case 83:
            console.log('down');
            break;
        case 68:
            // console.log('right')
            keys.right.pressed = false;
            break;
        case 87:
            // console.log('up')
            player.velocity.y -= 20;
            break;
    }
})