const name = document.querySelector("#name");
const mess = document.querySelector("#mess");
const formcont = document.querySelector("#form-cont");
const sub = document.querySelector("#sub");
const cake = document.querySelector("#cake-cont");
const back = document.querySelector("#back");
const ck = document.querySelector("#cake");

document.addEventListener('submit', sendMess);
sub.addEventListener('click', getUser)
name.addEventListener('keyup', checkName)
mess.addEventListener('keyup', checkMess)

function checkName()
{
  if (name.value.length <= 128) {
    name.style.border = "1.5px solid #5cb85c"
  }
  else {
    name.style.border = "1.5px solid #d9534f"
  }
}
function checkMess()
{
  if (mess.value.length <= 256) {
    mess.style.border = "1.5px solid #5cb85c"
  }
  else {
    mess.style.border = "1.5px solid #d9534f"
  }
}
async function sendMess(e)
{
  e.preventDefault();
  let resp = grecaptcha.getResponse();
  let namev = name.value;
  let messv = mess.value;
  if (namev.length <= 128 && messv.length <= 256) {
    fetch('https://api.tort.stage.fdntkrakow.pl/api/v1/cake/',
      {
        'method': 'POST',
        'headers': {
          'Accept': 'aplication/json, text/plain, */*',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ 'name': namev, 'text': messv, 'captcha': resp })
      })
      .then((res) => res.json())
      .then((data) => console.log(data))

    formcont.style.display = "none";
    name.value = "";
    mess.value = "";
  }
  else {
    alert("zbyt duża ilość znaków w czerwonych polach")
  }
}
// button clicable on capcha
function recaptchaCallback()
{
  sub.removeAttribute('disabled')
}
// return to form function
back.addEventListener("click", goBack);
function goBack()
{
  back.style.display = "none";
  cake.classList.toggle("dis-none");
  cake.style.display = "none";
  formcont.style.display = "block";

}
// mini div current function
ck.addEventListener('click', currDiv);
function currDiv(e)
{
  if (e.target.classList.contains("box")) {
    console.log("div");
  }
}
let ar = [];
// draw sphere function
function drawSphere()
{
  let output = `<div class="box" style=" clear:both; visibility: hidden;"></div>`;
  for (let i = 1; i <= 50; i++) {
    for (let j = 1; j <= 50; j++) {
      output += `<div id="top${i}_left${j}" data-t="${i}" data-l="${j}" data-name="" data-mess="" class="box" style="visibility:hidden;top:${i}px;left:${j}px;"></div>`

    }
    output += `<div class="box" style=" clear:both; visibility: hidden;"></div>`
  }
  document.querySelector("#cake").innerHTML = output;
  let srx = 25;
  let sry = 25;
  let cn = 1;

  for (let i = 1; i <= 50; i++) {
    for (let j = 1; j <= 50; j++) {
      if (Math.ceil(Math.sqrt((i - srx) * (i - srx) + (j - sry) * (j - sry))) >= 25) {

      }
      else {
        document.querySelector(`#top${i}_left${j}`).setAttribute('data-nr', cn);
        ar.push(cn);
        cn++;
      }
    }
  }
}

function drawDot()
{
  fetch("https://api.tort.stage.fdntkrakow.pl/api/v1/cake/")
    .then(function (res)
    {
      return res.json()
    })
    .then((data) =>
    {

      data.forEach(function (user)
      {
        let rdIndex = Math.floor(Math.random() * ar.length)
        let randomElement = ar[rdIndex];
        for (let i = 1; i <= 50; i++) {
          for (let j = 1; j <= 50; j++) {
            if (document.querySelector(`#top${i}_left${j}`).getAttribute('data-nr') == randomElement) {
              ar.slice(rdIndex, 1)
              document.querySelector(`#top${i}_left${j}`).style.visibility = "visible";
              document.querySelector(`#top${i}_left${j}`).setAttribute('data-name', user.name)
              document.querySelector(`#top${i}_left${j}`).setAttribute('data-mess', user.text)
            }
          }
        }
      });

    })
}

async function getUser()
{
  drawSphere();
  drawDot();
  cake.classList.toggle("dis-none")
  cake.style.display = "flex";
  back.style.display = "block";

}
