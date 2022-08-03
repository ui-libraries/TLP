function qs(selector, all = false) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector)
}

const sections = qs('.section', true);
const timeline = qs('.timeline');
const line = qs('.line');
line.style.bottom = `calc(100% - 20px)`;
let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * 0.8;

function scrollHandler(e){
    const{
        scrollY
    } = window;
    up = scrollY < prevScrollY;
    down = !up;
    const timelineRect = timeline.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect(); //CONST LINEHEIGHT = lineRect.bottom - lineRect.top

    const dist = targetY - timelineRect.top
    console.log(dist);

    if (down && !full){
        set = Math.max(set, dist);
            line.style.bottom = `calc(100% - ${set}px)`
    }

    if (dist > timeline.offsetHeight + 50 && !full){
        full = true;
        line.style.bottom = `-50px`
    }

    sections.forEach(item => {
        //console.log(items);
        const rect = item.getBoundingClientRect();

        if(rect.top + item.offsetHeight / 5 < targetY) {
            item.classList.add('show-me')
        }
    });

    prevScrollY = window.scrollY;
}

scrollHandler();
line.style.display = 'block';
window.addEventListener('scroll', scrollHandler)


 /* keydown events */
document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyT') {
    tFunction()
  }
});

document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyE') {
    eFunction()
  }
});

document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyD') {
    dFunction()
  }
});

document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyR') {
    rFunction()
  }
});

function tFunction() {
  var d = document.getElementsByClassName('deu');
  	for (var i = 0; i < d.length; i++) 
  	{
  		d[i].style.display = 'none';
  	}
  var e = document.getElementsByClassName('eng');
  	for (var i = 0; i < e.length; i++) 
  	{
  		e[i].style.display = 'none';
  	}
  var d = document.getElementsByClassName('pt');
  	for (var i = 0; i < d.length; i++) 
  	{
  		d[i].style.display = 'none';
  	}	
  var t = document.getElementsByClassName('tlp');
  	for (var i = 0; i < t.length; i++) 
  	{
  		t[i].style.display = 'inline';
  	}  	
}

function eFunction() {
  var d = document.getElementsByClassName('deu');
  	for (var i = 0; i < d.length; i++) 
  	{
  		d[i].style.display = 'none';
  	}
  var t = document.getElementsByClassName('tlp');
  	for (var i = 0; i < t.length; i++) 
  	{
  		t[i].style.display = 'none';
  	}
  var d = document.getElementsByClassName('pt');
  	for (var i = 0; i < d.length; i++) 
  	{
  		d[i].style.display = 'none';
  	}	
  var e = document.getElementsByClassName('eng');
  	for (var i = 0; i < e.length; i++) 
  	{
  		e[i].style.display = 'inline';
  	} 	
}

function dFunction() {
  var e = document.getElementsByClassName('eng');
  	for (var i = 0; i < e.length; i++) 
  	{
  		e[i].style.display = 'none';
  	}
  var t = document.getElementsByClassName('tlp');
  	for (var i = 0; i < t.length; i++) 
  	{
  		t[i].style.display = 'none';
  	}
  var d = document.getElementsByClassName('pt');
  	for (var i = 0; i < d.length; i++) 
  	{
  		d[i].style.display = 'none';
  	}	
  var d = document.getElementsByClassName('deu');
  	for (var i = 0; i < d.length; i++) 
  	{
  		d[i].style.display = 'inline';
  	}	
}

function rFunction() {
  var e = document.getElementsByClassName('eng');
  	for (var i = 0; i < e.length; i++) 
  	{
  		e[i].style.display = 'none';
  	}
  var t = document.getElementsByClassName('tlp');
  	for (var i = 0; i < t.length; i++) 
  	{
  		t[i].style.display = 'none';
  	}  
  var d = document.getElementsByClassName('deu');
  	for (var i = 0; i < d.length; i++) 
  	{
  		d[i].style.display = 'none';
  	}	
  var r = document.getElementsByClassName('pt');
  	for (var i = 0; i < r.length; i++) 
  	{
  		r[i].style.display = 'inline';
  	}	
}