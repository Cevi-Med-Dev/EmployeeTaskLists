//imports
import { roles, employeeRoles, webHooks, roleImgs } from "./json.js";

//variables
window.localStorage.setItem("roles", JSON.stringify(roles));
let localRoles = JSON.parse(window.localStorage.getItem("roles"));
let currentRole = JSON.parse(window.localStorage.getItem("currentRole")) || {};
var call_form_ = document.querySelector("#formContainer form");
var call_formData = new FormData(call_form_);
var call_params = {};
var taskCounter = 0;
var dynamicWebhook = "";
var rateOptions = document.querySelectorAll(".smileRating img");
var d = new Date();
var newTaskArray = [];
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var timeStamp = `${daysOfWeek[d.getDay()]} ${d.toLocaleString("default", {
  month: "long",
})} ${d.getDate()}th - ${
  d.getHours() > 12 ? d.getHours() - 12 : d.getHours()
}:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}${
  d.getHours() > 12 ? "pm" : "am"
}`;

//functions
let call_trigger = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data, // body data type must match "Content-Type" header
  });

  return response; // parses JSON response into native JavaScript objects
};
let updateNames = () => {
  const nameSelect = document.getElementById("employee");
  const selectedDepartment = document.getElementById("role").value;
  // Clear previous options
  nameSelect.innerHTML = '<option value="">Select a name</option>';
  if (selectedDepartment && employeeRoles[selectedDepartment]) {
    employeeRoles[selectedDepartment].forEach((name) => {
      nameSelect.add(new Option(name, name));
    });
  } else {
    console.log("error");
  }
};
const createInterface = (currentRole) => {
  currentRole = window.localStorage.getItem("currentRole");
  document.getElementById("taskList").innerHTML = "";
  taskCounter = 0;
  Object.entries(JSON.parse(currentRole)).forEach((task) => {
    console.log(task);
    document.getElementById("title").innerHTML = `<span>
    <img src="./assets/imgs/${
      roleImgs[`${document.getElementById("role").value}`][1]
    }.svg" />
    ${document.getElementById("role").value}   
    </span>`;
    document.getElementById("timeDate").innerText = timeStamp;
    document.getElementById("roleImg").src = `./assets/imgs/${
      roleImgs[`${document.getElementById("role").value}`][1]
    }.png`;
    document.getElementById(
      "taskList"
    ).innerHTML += `<div class="taskContainer">
            <div class="splitH">
                  <h2 class="taskName">${task[0]}</h2>
                  <img class="status" src="./assets/imgs/undone.svg"/>
            </div>
            <ul>${task[1]
              .map((taskDescription) => {
                return `
                <li>
                 <label class="taskOverview">${taskDescription}<input type="checkbox" name=${(taskCounter += 1)} value="${taskDescription}">
                  <img id="taskIcon" src="./assets/imgs/${
                    roleImgs[`${document.getElementById("role").value}`][2]
                  }.svg" />
                 <span class="checkmark"></span></label>
                  ${
                    task[0] === "New Task List"
                      ? `<aside id="actionBtns">
                            <img id="edit" name=${taskCounter} src="./assets//imgs/edit1.svg" alt=""/> 
                            <img id="trash" name=${taskCounter} src="./assets//imgs/trash1.svg" alt=""/>
                  </aside>`
                      : ""
                  }
                </li>`;
              })
              .join("")}
            </ul>
      </div>`;
  });
  document.querySelectorAll(".taskContainer").forEach((taskList) => {
    console.log(taskList);
    taskList
      .querySelectorAll("input[type=checkbox]")
      .forEach((taskCheckbox) => {
        //checks if all task are in task group are completed
        taskCheckbox.addEventListener("change", () => {
          if (
            taskList.querySelectorAll("input:checked~.checkmark").length ===
            taskList.querySelectorAll("input[type=checkbox]").length
          ) {
            // taskList.style.pointerEvents ="none";
            taskList.querySelector("img.status").src = "./assets/imgs/logo.png";
            taskList.style.color = "green";
            taskList.style.border = "2px solid green";
            taskList.style.background = "#3EA54387";
            taskList.querySelector("h2").style.color = "white";
            taskList.querySelector("ul").style.background = "white";
          } else {
            taskList.querySelector("img.status").src =
              "./assets/imgs/undone.svg";
            taskList.querySelector("h2").style.color = "black";
            taskList.style.color = "#black";
            taskList.querySelector("h2").style.color = "black";
            taskList.style.background = "white";
          }
        });
      });
    //keeps tb task
    taskList.querySelector(".splitH").addEventListener("click", (e) => {
      taskList.querySelector("ul").classList.toggle("show");
    });
  });
};

//triggers
Array.from(Object.keys(roles)).forEach((role) => {
  document.getElementById("role").add(new Option(role, role));
});

document.getElementById("role").addEventListener("change", ({ target }) => {
  updateNames();
  window.localStorage.setItem(
    "currentRole",
    JSON.stringify(localRoles[`${target.value}`])
  );
  call_formData.set("role", target.value);
});
document.getElementById("employee").addEventListener("change", ({ target }) => {
  call_formData.set("employee", target.value);
  call_formData.set("timeStamp", timeStamp);
  dynamicWebhook = webHooks[`${target.value}`];
  document.getElementById("role").classList.add("disabled");
  createInterface(document.getElementById("role"));
  target.classList.add("disabled");
});
document.getElementById("feedback").addEventListener("focusout", ({ target }) => {
    call_formData.set("feedback", target.value);
  });
rateOptions.forEach((rate) => {
  rate.addEventListener("click", () => {
    rateOptions.forEach(
      (rate) => (rate.src = `./assets/imgs/${rate.name}.svg`)
    );
    rate.src = `./assets/imgs/${rate.name}Selected.svg`;
    call_formData.set("moodRate", rate.alt);
  });
});
call_form_.addEventListener("submit", (e) => {
  document.getElementById("roleImg").src = `./assets/imgs/${roleImgs[`${document.getElementById("role").value}`][0]}.png`;
  e.preventDefault();
  document.querySelectorAll("input[type=checkbox]").forEach((checkBox) => {
    checkBox.checked
      ? call_formData.set(
          `${checkBox.name}`,
          `${checkBox.value.slice(0, 35)}..  : ✅`
        )
      : call_formData.set(`${checkBox.name}`, `${checkBox.value} : ❌`);
  });

  for (var [key, value] of call_formData.entries()) {
    call_params[key] = value;
  }

  call_trigger(`${dynamicWebhook}`, `JSON=${JSON.stringify(call_params)}`).then(
    (data) => {
      console.log(data, call_params, `${dynamicWebhook}`);
      call_form_.reset();
      call_params = {};
      taskCounter = 0;
      document.getElementById("taskList").innerHTML = "";
      document.getElementById("title").innerText =
        "Your Daily Report Has Been Sent! thank you!";
    }
  );
});
document.getElementById("add").addEventListener("click", () => {
  document.getElementById("employee").value === ""
    ? alert("choose a Role and Name before adding task")
    : document.querySelector("#newTaskPopUp").classList.toggle("hide");
});

document.getElementById("addBtn").addEventListener("click", () => {
  let newArr = JSON.parse(window.localStorage.getItem("currentRole"));
  newTaskArray.push(
    `New Task : ${document.getElementById("newTaskDesc").value}`
  );
  newArr["New Task List"] = newTaskArray;
  window.localStorage.setItem("currentRole", JSON.stringify(newArr));
  currentRole = JSON.parse(window.localStorage.getItem("currentRole"));
  console.log(currentRole, newArr);
  createInterface(currentRole);
  document.querySelector("#newTaskDesc").innerText = "";
  document.querySelector("#newTaskDesc").value = "";
  document.querySelector("#newTaskPopUp").classList.toggle("hide");
Array.from(document.querySelectorAll("#edit")).forEach(edtBtn => {
  console.log(edtBtn)
  editBtn.addEventListener("click", ({target})=>{
    console.log(target, target.value)
  })
})
});

document.addEventListener('DOMContentLoaded', ()=>{
  currentRole = JSON.parse(window.localStorage.getItem("currentRole"));
  if(currentRole){
    console.log(currentRole,  document.getElementById("employee").value );
    createInterface(currentRole)
  }
}, false);

document.querySelector(".english").addEventListener("click", () => {
  introJs()
    .setOptions({
      steps: [
        {
          intro: `Hey there CeviMeder!
    Let's Take a Quick Tour!`,
        },
        {
          element: document.querySelector("#title"),
          intro:
            "You will be filling out this form to send quick and easy reports!",
        },
        {
          element: document.querySelector("#role"),
          intro: "Select your Role in Cevimed..",
        },
        {
          element: document.querySelector("#employee"),
          intro: "... Then find your Name in this list",
        },
        {
          element: document.querySelector(".splitH"),
          intro: "Give it a try!",
        },
        {
          element: document.querySelector("#timeDate"),
          intro:
            "a time stamp will be generated to keep track of updates so you can send multiple forms",
        },
        {
          element: document.querySelector("#formContainer"),
          intro: `All your Task lists will open up, When you hover over them, they list will expand... You can keep a task list open by clicking its Name.. Give it a try!`,
        },
        {
          element: document.querySelector("#add"),
          intro: `To add a New task Simply Click here`,
        },
        {
          element: document.querySelector("#newTaskPopUp"),
          intro: `Describe the New task in this Pop up, When done click Add and Your New task will now show up in the List`,
        },
        {
          element: document.querySelector("#taskList"),
          intro: `You will find your new task listed under a New Task List called "New Task"`,
        },
        {
          element: document.querySelector("#taskList"),
          intro: `Try clicking anywhere on any task and a green check will mark it as done!
          You will notice Task list icons will change when all task in a list are completed, Give it a try before pressing next`,
        },
        {
          element: document.querySelector("#formContainer h4"),
          intro: `Your well-being is very important for Cevimed`,
        },
        {
          element: document.querySelector(".smileRating"),
          intro: `Giving us a quick "mood check-in" helps us ensure you're Happy, Healthy and Productive`,
        },
        {
          element: document.querySelector(".split textarea"),
          intro: `You can give us feedback, details, request and/or any comments that you would like to attach to the report here.`,
        },
        {
          element: document.querySelector(".btnContainer"),
          intro: `This button will send your report and reset the form.`,
        },
        {
          element: document.querySelector("body"),
          intro: `Thank you for taking the tour!`,
        },
      ],
    })
    .start();
});
document.querySelector(".spanish").addEventListener("click", () => {
  introJs()
    .setOptions({
      steps: [
        {
          intro: `¡Hola CeviMeder!
      ¡Hagamos un recorrido rápido!`,
        },
        {
          element: document.querySelector("#title"),
          intro:
            "¡Llenarás este formulario para enviar informes de manera rápida y sencilla!",
        },
        {
          element: document.querySelector("#role"),
          intro: "Selecciona tu Rol en Cevimed..",
        },
        {
          element: document.querySelector("#employee"),
          intro: "... Luego encuentra tu Nombre en esta lista",
        },
        {
          element: document.querySelector(".splitH"),
          intro: "¡Inténtalo!",
        },
        {
          element: document.querySelector("#timeDate"),
          intro:
            "Se generará una marca de tiempo para realizar un seguimiento de las actualizaciones para que puedas enviar varios formularios",
        },
        {
          element: document.querySelector("#formContainer"),
          intro:
            "Se abrirán todas tus listas de tareas. Cuando les pases el ratón por encima, la lista se expandirá... Puedes mantener una lista de tareas abierta haciendo clic en su nombre. ¡Inténtalo!",
        },
        {
          element: document.querySelector("#add"),
          intro: "Para añadir una nueva tarea, simplemente haz clic aquí",
        },
        {
          element: document.querySelector("#newTaskPopUp"),
          intro:
            "Describe la nueva tarea en este pop-up. Cuando termines, haz clic en Añadir y tu nueva tarea aparecera en la lista",
        },
        {
          element: document.querySelector("#taskList"),
          intro:
            'Encontrarás tu nueva tarea listada bajo una nueva lista de tareas llamada "Nueva Tarea"',
        },

        {
          element: document.querySelector("#formContainer"),
          intro: `Toda tu lista de tareas se abrirá. Cuando pases el cursor sobre cualquier lista, la lista se expandirá... Puedes mantener una lista de tareas abierta haciendo clic en ella. ¡Inténtalo!`,
        },
        {
          element: document.querySelector("#taskList"),
          intro: `¡Intenta hacer clic en cualquier tarea y una marca verde la marcará como completada!
            Notarás que los íconos de la lista de tareas cambiarán cuando todas las tareas en una lista estén completadas. Inténtalo antes de presionar siguiente.`,
        },
        {
          element: document.querySelector("#formContainer h4"),
          intro: `Tu bienestar es muy importante para Cevimed`,
        },
        {
          element: document.querySelector(".smileRating"),
          intro: `Darnos un rápido "chequeo de estado de ánimo" nos ayuda a asegurar que estés Feliz, Saludable y Productivo.`,
        },
        {
          element: document.querySelector(".split textarea"),
          intro: `Aquí puedes darnos retroalimentación, detalles, solicitudes y/o cualquier comentario que desees adjuntar al informe.`,
        },
        {
          element: document.querySelector(".btnContainer"),
          intro: `Este botón enviará tu informe y reiniciará el formulario.`,
        },
        {
          element: document.querySelector("body"),
          intro: `¡Gracias por hacer el recorrido!`,
        },
      ],
    })
    .start();
});

