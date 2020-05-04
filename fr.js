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
  fetch("users.json")
    .then(function (res)
    {
      return res.json()
    })
    .then((data) =>
    {
      let output = "<h2>Users</h2>";
      data.forEach(function (user)
      {
        output += `
        <ul style="list-style:none">
        <li>ID: ${user.id}</li>
        <li>Name: ${user.name}</li>
        <li>Mess: ${user.mess}</li>
        </ul>
        `
      });
      document.querySelector("#cake-cont").innerHTML = output;
    })
}
