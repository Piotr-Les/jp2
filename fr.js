const name = document.querySelector("#name");
const mess = document.querySelector("#mess");
const formcont = document.querySelector("#form-cont");
const sub = document.querySelector("#sub");
const cake = document.querySelector("#cake-cont");
const cakewd = document.querySelector("#cake-widecont");
const back = document.querySelector("#back");
const ck = document.querySelector("#cake");
const uinf = document.querySelector("#uinf");
const uinfcont = document.querySelector("#uinf-cont");
const accordions = document.querySelector(".accordion");
const accContent = document.querySelector(".accordion-content");
const notifCont = document.querySelector(".notifCont");
const notifClose = document.querySelector(".notifClose")

let backendUrl;

if (location.hostname === 'tort.fdnt.pl' || location.hostname === 'www.tort.fdnt.pl') {
    backendUrl = 'https://api.tort.fdntkrakow.pl';
} else if (location.hostname === 'tort.stage.fdntkrakow.pl' || location.hostname === 'www.tort.stage.fdntkrakow.pl') {
    backendUrl = 'https://api.tort.stage.fdntkrakow.pl';
} else {
    backendUrl = 'http://127.0.0.1:8000'
}


document.addEventListener('submit', sendMess);
sub.addEventListener('click', getUser);
name.addEventListener('keyup', checkName);
mess.addEventListener('keyup', checkMess);


// acordeon expand colapse function
accordions.addEventListener('click', exp)

function exp()
{
    this.classList.toggle('is-open');
    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
        // accordion is currently open, so close it
        content.style.maxHeight = null;
    } else {
        // accordion is currently closed, so open it
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

// asign value from acordeon function
accContent.addEventListener('click', asVal);

function asVal(e)
{
    if (e.target.classList.contains("l-opt")) {
        mess.value = e.target.getAttribute("data-vl");
        mess.style.border = "1.5px solid #5cb85c"
    }
}

function checkName()
{
    if (name.value.length <= 128) {
        name.style.border = "1.5px solid #5cb85c"
    } else {
        name.style.border = "1.5px solid #d9534f"
    }
}

function checkMess()
{
    if (mess.value.length <= 256) {
        mess.style.border = "1.5px solid #5cb85c"
    } else {
        mess.style.border = "1.5px solid #d9534f"
    }
}
notifClose.addEventListener('click', function ()
{
    notifCont.classList.remove("notifActive");
})
function showNot()
{
    notifCont.classList.add("notifActive");
    setTimeout(function ()
    {
        notifCont.classList.remove("notifActive");
    }, 6000);
}
//send message funciotn
async function sendMess(e)
{

    e.preventDefault();

    let resp = grecaptcha.getResponse();
    let namev = name.value;
    let messv = mess.value;
    if (namev.length <= 128 && messv.length <= 256) {
        showNot()
        fetch(`${backendUrl}/api/v1/cake/`,
            {
                'method': 'POST',
                'headers': {
                    'Accept': 'aplication/json, text/plain, */*',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ 'name': namev, 'text': messv, 'captcha': resp })
            })
            .then((res) => res.json())
            .then(
                (data) =>
                {
                    console.log(data);
                    drawDot();
                }
            );

        formcont.style.display = "none";
        name.value = "";
        mess.value = "";
    } else {
        alert("zbyt duża ilość znaków w czerwonych polach");
    }
    drawSphere();
    drawDot();

}

async function drawDot()
{
    fetch(`${backendUrl}/api/v1/cake/`)
        .then(function (res)
        {
            return res.json()
        })
        .then((data) =>
        {
            data.forEach(function (cakeFragment)
            {
                let randomElement = cakeFragment.position.position;
                for (let i = 1; i <= 50; i++) {
                    for (let j = 1; j <= 50; j++) {
                        if (document.querySelector(`#top${i}_left${j}`).getAttribute('data-nr') == randomElement) {

                            document.querySelector(`#top${i}_left${j}`).style.visibility = "visible";
                            document.querySelector(`#top${i}_left${j}`).setAttribute('data-name', cakeFragment.name);
                            document.querySelector(`#top${i}_left${j}`).setAttribute('data-mess', cakeFragment.text);
                        }
                    }
                }
            });

        })
}

function getUser()
{

    cake.classList.toggle("dis-none");
    cakewd.classList.toggle("dis-none");
    cake.style.display = "grid";
    back.style.display = "block";
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
    cakewd.classList.toggle("dis-none");
    cake.style.display = "none";
    formcont.style.display = "block";

}

// mini div click current function
ck.addEventListener('click', currDiv);

function currDiv(e)
{
    let tg = e.target;
    if (e.target.classList.contains("box")) {
        e.target.classList.toggle('pulse');
        $(e.target).siblings().removeClass("pulse");
        uinf.innerHTML = `<strong>${e.target.getAttribute('data-name')}</strong>: ${e.target.getAttribute('data-mess')} `;
    }
}

// draw sphere function
async function drawSphere()
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

            } else {
                document.querySelector(`#top${i}_left${j}`).setAttribute('data-nr', cn);
                cn++;
            }
        }
    }

}



