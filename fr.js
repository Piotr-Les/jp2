const name = document.querySelector("#name");
const mess = document.querySelector("#mess");
const formcont = document.querySelector
  ("#form-cont");
const sub = document.querySelector("#sub");
const cake = document.querySelector("#cake-cont");

document.addEventListener('submit', sendMess);
sub.addEventListener('click', getUser)
async function sendMess(e)
{
  e.preventDefault();
  let namev = name.value;
  let messv = mess.value;
  fetch('users.json',
    {
      method: 'POST',
      headers: {
        'Accept': 'aplication/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name: name, mess: mess })
    })
    .then((res) => res.json())
    .then((data) => console.log(data))


  formcont.style.display = "none";
  // formcont.classList.toggle("dis-none")


  name.value = "";
  mess.value = "";

}
async function getUser()
{
  cake.classList.toggle("dis-none")
  cake.style.display = "flex"
  let output = `<div class="box" style=" clear:both; visibility: hidden;"></div>`;
  for (let i = 1; i <= 100; i++) {
    for (let j = 1; j <= 100; j++) {
      output += `<div id="top${i}_left${j}" class="box" style=" border-radius:50px;top:${i}px;left:${j}px;"></div>`
    }
    output += `<div class="box" style=" clear:both; visibility: hidden;"></div>`
  }
  document.querySelector("#cake").innerHTML = output;
  let srx = 50;
  let sry = 50;
  for (let i = 1; i <= 100; i++) {
    for (let j = 1; j <= 100; j++) {
      if (Math.sqrt((i - srx) * (i - srx) + (j - sry) * (j - sry)) >= 50) {
        document.querySelector(`#top${i}_left${j}`).style.visibility = "hidden";
      }
    }
  }
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
