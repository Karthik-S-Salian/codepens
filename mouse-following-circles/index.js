const colors = ["#0A4247", "#8C2F0D", "#F2A057", "#F2C185", "#8CB7B8"];
const svg = document.getElementById("svg");
const starGroup = document.getElementById("stars")
let prvsTime = 0
const svgBoundRect = svg.getBoundingClientRect();

class Star {
    constructor(radius) {
        this.radius = radius;
        this.x = Math.random() * svgBoundRect.width*1.5;
        this.y = Math.random() * svgBoundRect.height*1.5;
        this.speed = .07
    }

    setInitialPos() {
        this.x = Math.random() * svgBoundRect.height + svgBoundRect.width;
        this.y = Math.random() * svgBoundRect.width - svgBoundRect.width;
    }

    getTemplate() {
        return `<circle cx="${this.x}" cy="${this.y}" r="${this.radius}" stroke="black" stroke-width="3" fill="${colors[Math.floor(Math.random()*colors.length)]}" />`
    }

    update(dt) {
        this.x = this.x - dt * this.speed;
        this.y = this.y + dt * this.speed;
        if (this.x < 0 || this.y > svgBoundRect.height) {
            this.setInitialPos()
        }
        return [this.x, this.y]
    }

}

const stars = []

for (let i = 0; i < 100; i++) {
    stars.push(new Star(Math.random() * 5 + 0.5))
}

for (const star of stars) {
    starGroup.innerHTML += star.getTemplate()
}


function step(dt) {
    Array.from(starGroup.children).forEach((child, index) => {
        const [x, y] = stars[index].update(dt);
        child.setAttribute("cx", x.toString());
        child.setAttribute("cy", y.toString());
    })
}

class DynamicCircle {
    constructor() {
        this.mass = Math.random() * 0.8 + 0.4;
        // Spring stiffness
        this.K = -(Math.random() * 10 + 2);
        // Damping constant
        this.B = -(Math.random() * 0.5 + 0.2);
        this.x = Math.floor(Math.random() * svgBoundRect.width);
        this.y = Math.floor(Math.random() * svgBoundRect.height);
        this.r = ((this.mass - 1.2) / (0.4 - 1.2)) * (14 - 2) + 2;
        this.vx = 0;
        this.vy = 0;
    }

    getTemplate() {
        return `<circle cx="${this.x}" cy="${this.y}" r="${this.r}" fill="${colors[Math.floor(Math.random()*colors.length)]}" />`
    }

    tick(t,origin) {
        if(origin==null){
            return [this.x,this.y]
        }
        const spring_x = this.K * (this.x - origin.x);
        const damper_x = this.B * this.vx;
        const ax = (spring_x + damper_x) / this.mass;
        
        this.vx += ax * (t / 1000);
        this.x += this.vx * (t / 1000);
  
        const spring_y = this.K * (this.y - origin.y);
        const damper_y = this.B * this.vy;
        const ay = (spring_y + damper_y) / this.mass;
        this.vy += ay * (t / 1000);
        this.y += this.vy * (t / 1000);
        return [this.x,this.y]
      }
}

const ballGroup = document.getElementById("balls")

let origin = null;

svg.addEventListener("mousemove",e=>{
    origin = {
        x : e.offsetX - svgBoundRect.width/2,
        y : e.offsetY - svgBoundRect.height/2
    }
    
})

balls = []
for (let i = 0; i < 50; i++) {
    balls.push(new DynamicCircle())
}

for (const ball of balls) {
    ballGroup.innerHTML += ball.getTemplate()
}

function stepball(dt) {
    Array.from(ballGroup.children).forEach((child, index) => {
        const [x, y] = balls[index].tick(dt,origin);
        child.style.transform = `translate(${x}px, ${y}px)`;
    })
}

const wrapper = (timeStamp) => {
    const dt = timeStamp - prvsTime;
    prvsTime = timeStamp;
    step(dt)
    stepball(dt);
    window.requestAnimationFrame(wrapper)
}

window.requestAnimationFrame(wrapper);