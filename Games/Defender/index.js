console.log(gsap)
const canvas = document.querySelector('canvas');
const scoreText = document.querySelector('#scoreEl');
const gameOverPanel = document.querySelector('#GameOver');
const endScoreText = document.querySelector('#endScore');
const buttonElement = document.querySelector('#button');
const StartPanel = document.querySelector('#Start');
const startbuttonElement = document.querySelector('#startbutton');


const context = canvas.getContext('2d');

canvas.width = innerWidth // property of window object
canvas.height = innerHeight;

const friction = 0.99

class Player
{
    constructor(x, y, radius, color) //each time instantiated class
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw()
    {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }
}


class Projectile
{
    constructor(x, y, radius, color, velocity) //each time instantiated class
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw()
    {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }
    update()
    {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;

    }

}


class Enemy
{
    constructor(x, y, radius, color, velocity) //each time instantiated class
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw()
    {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }
    update()
    {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;

    }


}

class Particle
{
    constructor(x, y, radius, color, velocity) //each time instantiated class
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw()
    {
        context.save();
        context.globalAlpha = this.alpha;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.restore();
    }
    update()
    {
        this.draw();
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.alpha -= 0.01;

    }


}

//INPUT
addEventListener('click', (event) =>
{
    console.log(projectiles)
    //calculate the triangle angle
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);

    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }

    projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', velocity));
})

buttonElement.addEventListener('click', () =>
{
    //RESTART

    Initialize();
    animate();
    spawnEnemies();
    gsap.to(gameOverPanel,
        {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "expo.in",
            onComplete: () =>
            {
                gameOverPanel.style.display = 'none';

            }
        });
})

startbuttonElement.addEventListener('click', () =>
{

    Initialize();
    animate();
    spawnEnemies();


    gsap.to(StartPanel,
        {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "expo.in",
            onComplete: () =>
            {
                StartPanel.style.display = 'none';

            }
        });

})



const x = canvas.width / 2;
const y = canvas.height / 2;

let player = new Player(x, y, 15, 'white');


// const projectile = new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', { x: 1, y: 1 }); //spawn at a location static

let projectiles = [];
let enemies = [];
let particles = [];
let score = 0;
let animationId;
let intervalid;

function Initialize()
{
    player = new Player(x, y, 10, 'white');
    enemies = [];
    projectiles = [];
    particles = [];
    animationId
    score = 0
    scoreText.innerHTML = score


}




function spawnEnemies()
{
    intervalid = setInterval(() =>
    {
        const radius = Math.random() * (30 - 5) + 5; // Enemy size

        //spawn location
        let x
        let y
        if (Math.random() < 0.5)
        {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
            // y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        else
        {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }

        const color = `hsl(${Math.random() * 360},50%,50%)`; //fn + esc for backticks, ${} to spesify code instead of string template literal

        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x); // spawn at random lcations on canvas
        console.log(angle)

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy(x, y, radius, color, velocity));
    }, 1000)
}



function animate()
{
    animationId = requestAnimationFrame(animate); //End frame, SEE BELOW
    context.fillStyle = 'rgba(0,0,0,0.1' //Alpha gives a trail effect
    context.fillRect(0, 0, canvas.width, canvas.height)
    player.draw(); //draw it


    for (let index = particles.length - 1; index >= 0; index--)
    {
        const particle = particles[index];

        if (particle.alpha <= 0)
        {
            //DESTROY
            particles.splice(index, 1)
        }
        else { particle.update(); }

    }

    for (let index = projectiles.length - 1; index >= 0; index--)
    {
        const projectile = projectiles[index];
        projectile.update()

        //REMOVE FROM EDGES OF THE SCREEN
        if (projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height)
        {
            projectiles.splice(index, 1)
        }
    }



    //Reverse for loop [][][][] enemies list checking is reversed to prevent missing something.
    for (let index = enemies.length - 1; index >= 0; index--)
    {
        const enemy = enemies[index];

        {
            enemy.update();

            const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y) //Distance between 2 points , Collision

            if (distance - enemy.radius - player.radius < 1)
            { // END GAME
                cancelAnimationFrame(animationId) //END GAME FRAME IS USED TO STOP THE UPDATED ANIMATION FRAMES AKA ENDS GAME
                clearInterval(intervalid)

                gsap.fromTo(gameOverPanel, { scale: 0.8, opacity: 0 }, {
                    scale: 1, opacity: 1, ease: 'expo'
                });

                gameOverPanel.style.display = 'block';
                endScoreText.innerHTML = score;

            }

            for (let index = projectiles.length - 1; index >= 0; index--)
            {
                const projectile = projectiles[index];

                const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y) //Distance between 2 points , Collision
                //Projectiles collision to enemy, removed, can cause flashing when removed due to  frame loading with an empty array

                if (distance - enemy.radius < 1)
                {
                    //Particle explosions
                    for (let i = 0; i < enemy.radius * 2; i++)
                    {
                        particles.push(new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, {
                            x: (Math.random() - 0.5) * (Math.random() * 5),
                            y: (Math.random() - 0.5) * (Math.random() * 5)
                        })
                        );
                    }

                    //Make enemy smaller
                    if (enemy.radius - 10 > 10)
                    {
                        gsap.to(enemy, { radius: enemy.radius - 10 });
                        projectiles.splice(index, 1)

                    }

                    else
                    {
                        //DESTROY ENEMY
                        score += 50;
                        scoreText.innerHTML = score;
                        enemies.splice(index, 1);
                        projectiles.splice(index, 1)

                    }
                }
            }
        }
    }

}

console.log(player);
