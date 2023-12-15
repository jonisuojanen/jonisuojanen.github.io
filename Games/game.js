class Game
{
    constructor()
    {
        this.canvas = document.getElementById("game");
        this.context = this.canvas.getContext("2d");
        this.sprites = [];

        this.spriteImage = new Image();
        this.spriteImage.src = "flower.png";


        const game = this;
        this.spriteImage.onload = function ()
        {
            game.lastRefreshTime = Date.now();
            game.spawn();
            game.refresh();
        }
    }

    spawn()
    {
        const sprite = new Sprite({
            context: this.context,
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            width: this.spriteImage.width,
            height: this.spriteImage.height,
            image: this.spriteImage,
            states: [{ mode: "spawn", duration: 0.5 }, { mode: "static", duration: 1.5 }, { mode: "die", duration: 0.8 }]
        });

        this.sprites.push(sprite);
        this.sinceLastSpawn = 0;
    }



    refresh()
    {
        const now = Date.now();
        const dt = (now - this.lastRefreshTime) / 1000.0;

        this.update(dt);
        this.render();

        this.lastRefreshTime = now;

        const game = this;
        requestAnimationFrame(function () { game.refresh(); });

    }

    update(dt)
    {
        this.sinceLastSpawn += dt;
        if (this.sinceLastSpawn > 1) this.spawn();
    }

    render()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let sprite of this.sprites) { sprite.render(); }
    }
}

// Sprite
class Sprite
{
    constructor(options)
    {
        this.context = options.context;
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
        this.x = options.x;
        this.y = options.y;
        this.states = options.states;
        this.state = 0;
        this.scale = (options.scale == null) ?
            1.0 : options.scale
        this.opacity = (options.opacity == null) ?
            1.0 : this.opacity;
        this.currentTime = 0;
        this.kill = false;
    }

    set state(index)
    {
        this.stateIndex = index;
        this.stateTime = 0;
    }

    get state()
    {
        let result;
        if (this, stateIndex < this.states.length)
            result = this.states[this.stateIndex];
        return result;
    }

    update(dt)
    {
        this.stateTime += dt;
        const state = this.state;
        if (state == null)
        {
            this.kill = true;
            return;
        }
        const delta =
            this.stateTime / state.duration;
        if (delta > 1)
        {
            this.state =
                this.stateIndex = 1;
        }

        switch (state.mode)
        {
            case "spawn":
                this.scale = delta;
                this.opacity = delta;
                break;
            case "static":
                this.scale = 1.0;
                this.opacity = 1.0;
                break;
            case "die":
                this.scale = 1.0 + delta;
                this.opacity = 1.0 - delta;
                if (this.opacity < 0)
                {
                    this.opacity = 0;
                    break;
                }

        }
    }

    // Rendering
    render()
    {
        // Draw the animation
        this.context.drawImage(
            this.image,
            this.x,
            this.y);
    }
}