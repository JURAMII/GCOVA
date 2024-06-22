//ham
let ham = document.querySelector('.ham');
let mobMenu = document.querySelector('.mob_menu');
let logo = document.querySelector('.logo img');

window.addEventListener('resize',()=>{
  ham.classList.remove('act');
    mobMenu.style.display = 'none';
    logo.style.opacity = '1';
})

ham.classList.remove('act');
logo.style.opacity = '1';

ham.addEventListener('click',()=>{
  if(ham.classList.contains('act')){
    ham.classList.remove('act');
    mobMenu.style.display = 'none';
    logo.style.opacity = '1';
  }else{
    ham.classList.add('act')
    mobMenu.style.display = 'block';
    logo.style.opacity = '0';
  }
})

//mobile menu
let hamLis = document.querySelectorAll('.ham_tit>li');
let hamSpans = document.querySelectorAll('.ham_tit>li span');
let hamDeps = document.querySelectorAll('.ham_dep');

function closeAll(){
  for(let i=0;i<hamLis.length;i++){
    hamDeps[i].classList.remove('active3')
    hamSpans[i].classList.remove('active3')
  }
}

hamLis.forEach((hamLi,i)=>{
  hamLi.addEventListener('click',()=>{
    closeAll()
    hamDeps[i].classList.toggle('active3');
    hamSpans[i].classList.add('active3');
})
  closeAll()
})

// hamLis.forEach((hamLi,i)=>{
//   hamLi.addEventListener('click',()=>{
//     closeAll()
//     hamDeps[i].classList.add('active3');
//     hamSpans[i].classList.add('active3');
//     if(hamDeps[i].classList.contains('active3')){
//       hamLi.addEventListener('click',()=>{
//         hamDeps[i].classList.toggle('active3');
//         hamSpans[i].classList.toggle('active3');
//       })
//     }
// })
//   closeAll()
// })

//nav
let nav = document.querySelector('nav')
let navLis = document.querySelectorAll('.nav_list>li');
let navAs = document.querySelectorAll('.nav_list>li>a');
let depWraps = document.querySelectorAll('.dep_wrap');
// console.log(depWrapAs)

for(let i=0; i<navLis.length; i++){
	navLis[i].addEventListener('mouseover',()=>{
		navLis[i].style.backgroundColor = 'var(--main-orange)';
		nav.style.height = '249px'
    navAs[i].style.color = 'var(--main-white)'
		for(j=0; j<depWraps.length; j++){
			depWraps[j].classList.add('active')
		}
	})
}
for(let i=0; i<navLis.length; i++){
	navLis[i].addEventListener('mouseleave',()=>{
		navLis[i].style.backgroundColor = 'var(--main-white)';
		nav.style.height = '49px'
    navAs[i].style.color = 'var(--main-black)'
		for(j=0; j<depWraps.length; j++){
			depWraps[j].classList.remove('active')	
		}
	})
}

  //탭메뉴
  // let taps = document.querySelectorAll('.tap li');

  // taps.forEach((tap,i)=>{
  //   tap.addEventListener('click',()=>{
  //     for(let j=0;j<taps.length;j++){
  //       conts[j].style.display='none'
  //       taps[j].style.borderBottom ='none'
  //     }
  //     conts[i].style.display='block'
  //     taps[i].style.borderBottom ='2px solid black'
  //   })
  // })

  //탑버튼
  let topBtn = document.querySelector('.top_icon')

  window.addEventListener('scroll',()=>{
    if(window.scrollY>200){
      topBtn.style.bottom = '30px'
    }else if(window.scrollY<200){
      topBtn.style.position = '-300px'
    }
  })
  
  topBtn.addEventListener('click',()=>{
    window.scrollTo(
      {
        top: 0,
        behavior : 'smooth'
      }
    )
  })

  