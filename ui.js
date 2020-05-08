
// burger
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
burger.addEventListener('click', function ()
{
  // navmenu animation
  nav.classList.toggle('nav-active');
  navLinks.forEach((link, index) =>
  {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`
    }
  });
  // burger animation
  burger.classList.toggle('toggle');
});


// logo i navbar
const Logo = document.querySelector("#logo-img");
const navbar = document.querySelector("nav");
let endOfDocumentTop = 30;
let size = 0;
let clwidth = document.documentElement.clientWidth;
//
window.onload = function ()
{
  const Logo = document.querySelector("#logo-img");
  let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  if (clwidth >= 1025) {
    if (scroll == 0) {
      Logo.className = "logo-big";
      Logo.style.position = "absolute"
    }
  }
}

window.onscroll = function ()
{
  if (clwidth >= 1025) {
    growShrinkLogo()
  }
  else {
    const Logo = document.querySelector("#logo-img");
    const navbar = document.querySelector("nav");
    Logo.className = "logo-tiny";
    Logo.style.top = "auto"
    navbar.style.height = "10vh"
  }
};

function growShrinkLogo()
{
  let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  if (size == 0 && scroll > endOfDocumentTop) {
    Logo.className = "logo-tiny";
    navbar.style.height = "9vh"
    size = 1;
  } else if (size == 1 && scroll <= endOfDocumentTop) {
    Logo.className = "logo-big";
    Logo.style.position = "absolute"
    Logo.style.top = "0"
    navbar.style.height = "10vh"
    size = 0;
  }
}