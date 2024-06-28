const board = document.querySelector(".magic-board");
const magicStick = document.querySelector(".magic-stick");
const cards = document.querySelectorAll(".magic-board > .card");
const maxRotation = 10;
const deviationfactor = .5;
const deviationXFactor = 1.2;
//const deviationXPixels = 60;

const clamp = (min,x,max)=>{
    return (x<min)?min:((x>max)?max:x);
}

board.addEventListener("mousemove", (event) => {
    const x  = event.clientX - board.getBoundingClientRect().left;
    const y = event.clientY - board.getBoundingClientRect().top;

    const percentX = Math.round(x/board.clientWidth*100);
    const percentY = Math.round(y/board.clientHeight*100);

    const centerX = board.clientWidth/2 +  board.offsetLeft;

    const rotateDeg = (x-centerX)/board.clientWidth*2*maxRotation;

    // magicStick.style.top = `${clamp(5,percentY*deviationfactor,60)}%`;
    // //magicStick.style.left = `${clamp(2, 50 + (percentX-50)*deviationXFactor,98)}%`;
    // magicStick.style.left = `${clamp(5,x + (x-centerX)/board.clientWidth*2*deviationXPixels,board.clientWidth-20)}px`;
    // magicStick.style.transform = `rotate(${rotateDeg}deg)`;


    magicStick.animate({
        left: `${clamp(2, 50 + (percentX-50)*deviationXFactor,98)}%`,
        top: `${clamp(5,percentY*deviationfactor,60)}%`,
        rotate:  `${rotateDeg}deg`
    }, { duration: 400, fill: "forwards" });

    magicStick.querySelector(".stick-bottom").style.background  = `linear-gradient(to right, rgb(10,10,10) 0%,  rgb(60,60,60) ${100 - percentX}%, rgb(10,10,10) 100%)`;
    magicStick.querySelector(".stick-top").style.background  = `linear-gradient(to right, grey 0%,  white ${100 - percentX}%, grey 100%)`;

    cards.forEach(card=>{
        const cardX = magicStick.getBoundingClientRect().left - card.getBoundingClientRect().left;

        //if(cardX<0) return;

        const opacity = 1 - clamp(0,cardX/card.clientWidth,1);
        const blur = opacity*8;

        card.querySelector(".card-image").style.backdropFilter = `blur(${blur}px)`
        card.querySelector(".card-cover").style.opacity = opacity;
    })

});