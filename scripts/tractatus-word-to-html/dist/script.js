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


/*tFunction (displays tlp & eng_tlp, hides rest) */
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
  var r = document.getElementsByClassName('pt');
  	for (var i = 0; i < r.length; i++) 
  	{
  		r[i].style.display = 'none';
  	}
  var e_p = document.getElementsByClassName('eng_pt');
  	for (var i = 0; i < e_p.length; i++) 
  	{
  		e_p[i].style.display = 'none';
  	} 		
  var t = document.getElementsByClassName('tlp');
  	for (var i = 0; i < t.length; i++) 
  	{
  		t[i].style.display = 'inline';
  	}  	
  var e_t = document.getElementsByClassName('eng_tlp');
  	for (var i = 0; i < e_t.length; i++) 
  	{
  		e_t[i].style.display = 'inline';
  	} 
}

/*eFunction (displays eng, hides rest) */
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
  var r = document.getElementsByClassName('pt');
  	for (var i = 0; i < r.length; i++) 
  	{
  		r[i].style.display = 'none';
  	}	
  var e_p = document.getElementsByClassName('eng_pt');
  	for (var i = 0; i < e_p.length; i++) 
  	{
  		e_p[i].style.display = 'none';
  	}	
  var e_t = document.getElementsByClassName('eng_tlp');
  	for (var i = 0; i < e_t.length; i++) 
  	{
  		e_t[i].style.display = 'none';
  	} 
  var e = document.getElementsByClassName('eng');
  	for (var i = 0; i < e.length; i++) 
  	{
  		e[i].style.display = 'inline';
  	} 

}

/*dFunction (displays deu, hides rest) */
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
  var r = document.getElementsByClassName('pt');
  	for (var i = 0; i < r.length; i++) 
  	{
  		r[i].style.display = 'none';
  	}
  var e_p = document.getElementsByClassName('eng_pt');
	for (var i = 0; i < e_p.length; i++) 
	{
		e_p[i].style.display = 'none';
	}	
  var e_t = document.getElementsByClassName('eng_tlp');
	for (var i = 0; i < e_t.length; i++) 
	{
		e_t[i].style.display = 'none';
	} 
  var d = document.getElementsByClassName('deu');
  	for (var i = 0; i < d.length; i++) 
  	{
  		d[i].style.display = 'inline';
  	}	

}

/*rFunction (displays pt & eng_pt, hides rest) */
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
  var e_t = document.getElementsByClassName('eng_tlp');
  	for (var i = 0; i < e_t.length; i++) 
  	{
  		e_t[i].style.display = 'none';
  	} 
  var e_p = document.getElementsByClassName('eng_pt');
  	for (var i = 0; i < e_p.length; i++) 
  	{
  		e_p[i].style.display = 'inline';
  	}	
  var r = document.getElementsByClassName('pt');
  	for (var i = 0; i < r.length; i++) 
  	{
  		r[i].style.display = 'inline';
  	}	
}

/* Set the width of the side navigation to 250px */
function openNav() {
	document.getElementById("mySidenav").style.width = "50px";
  }
  
/* Set the width of the side navigation to 0 */
function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
  }