const name = document.querySelector("#name");
const mess = document.querySelector("#mess");
const formcont = document.querySelector
  ("#form-cont");
const sub = document.querySelector("#sub");
const cake = document.querySelector("#cake-cont");
const back = document.querySelector("#back");
const ck = document.querySelector("#cake");

let resp = grecaptcha.getResponse();
document.addEventListener('submit', sendMess);
sub.addEventListener('click', getUser)
async function sendMess(e)
{
  e.preventDefault();
  let namev = name.value;
  let messv = mess.value;
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
  // formcont.classList.toggle("dis-none")


  name.value = "";
  mess.value = "";

}
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

async function getUser()
{
  cake.classList.toggle("dis-none")
  cake.style.display = "flex"
  let output = `<div class="box" style=" clear:both; visibility: hidden;"></div>`;
  for (let i = 1; i <= 50; i++) {
    for (let j = 1; j <= 50; j++) {
      output += `<div id="top${i}_left${j}" title="top: ${i}, left: ${j}" data-t="${i}" data-l="${j}"class="box" style=" border-radius:100px;top:${i}px;left:${j}px;"></div>`
    }
    output += `<div class="box" style=" clear:both; visibility: hidden;"></div>`
  }
  document.querySelector("#cake").innerHTML = output;
  let srx = 25;
  let sry = 25;
  for (let i = 1; i <= 50; i++) {
    for (let j = 1; j <= 50; j++) {
      if (Math.ceil(Math.sqrt((i - srx) * (i - srx) + (j - sry) * (j - sry))) >= 25) {
        document.querySelector(`#top${i}_left${j}`).style.visibility = "hidden";
      }
    }
  }
  back.style.display = "block";

  // fetch("users.json")
  //   .then(function (res)
  //   {
  //     return res.json()
  //   })
  //   .then((data) =>
  //   {
  //     let output = "";
  //     data.forEach(function (user)
  //     {
  //       output += `
  //       <div class="box">
  //       </div>
  //       `
  //     });
  //     document.querySelector("#cake-cont").innerHTML = output;
  //   })
}
