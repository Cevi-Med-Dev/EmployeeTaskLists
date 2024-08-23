//imports
import { roles, employeeRoles, webHooks } from "./json.js";

//variables
var call_form_ = document.querySelector("#formContainer form");
var call_formData = new FormData(call_form_);
var call_params = {};
var taskCounter = 0;
var currentChecklist = "";
var dynamicWebhook = "";
var rateOptions = document.querySelectorAll(".smileRating img");
var d = new Date();
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
//updates employee list
function updateNames() {
  const nameSelect = document.getElementById("employee");
  const selectedDepartment = document.getElementById("role").value;
  // Clear previous options
  nameSelect.innerHTML = '<option value="">Select a name</option>';

  if (selectedDepartment && employeeRoles[selectedDepartment]) {
    employeeRoles[selectedDepartment].forEach((name) => {
      nameSelect.add(new Option(name, name));
      console.log(
        selectedDepartment,
        employeeRoles,
        employeeRoles[selectedDepartment]
      );
    });
  } else {
    console.log(
      selectedDepartment,
      employeeRoles,
      employeeRoles[selectedDepartment]
    );
  }
}
const createInterface = (target) => {
  console.log(target, target.value);
  for (const [key, value] of Object.entries(roles)) {
    if (target.value === key) {
      //finds role chosen
      currentChecklist = Object.entries(value); // get checklist
      document.getElementById("taskList").innerHTML = ""; // clears checklist

      currentChecklist.forEach((task) => {
        document.getElementById("title").innerText = `${key} Task List `; //chnages title
        document.getElementById("timeDate").innerText = timeStamp; //chnages time and date

        document.getElementById(
          "taskList"
        ).innerHTML += `<div class="taskContainer">
                                        <div class="splitH">
                                                <h2 class="taskName">${
                                                  task[0]
                                                }</h2>
                                          
                                                <img class="status" src="./assets/imgs/undone.svg" alt="">
                                        </div>
                                      
                                        <ul>
                                               ${task[1]
                                                 .map((taskDescription) => {
                                                   return ` <li>
                                                <label class="taskOverview">
                                                            ${taskDescription}
                                                <input type="checkbox" name=${(taskCounter += 1)} value="${taskDescription}">
                                                <span class="checkmark"></span>
                                                </label>
                                                </li>       `;
                                                 })
                                                 .join("")}       
                                        </ul>
                                </div>`;
      });

      //adds event listeners to new checklist interface
      document.querySelectorAll(".taskContainer").forEach((taskList) => {
        taskList
          .querySelectorAll("input[type=checkbox]")
          .forEach((taskCheckbox) => {
            //checks if all task are in task group are completed
            taskCheckbox.addEventListener("change", () => {
              if (
                taskList.querySelectorAll("input:checked~.checkmark").length ===
                taskList.querySelectorAll("input[type=checkbox]").length
              ) {
                taskList.querySelector("img.status").src =
                  "./assets/imgs/done.svg";
                taskList.querySelector("h2").style.color = "green";
              } else {
                taskList.querySelector("img.status").src =
                  "./assets/imgs/undone.svg";
                taskList.querySelector("h2").style.color = "black";
              }
            });
          });
        //keeps tb task
        taskList.addEventListener("click", () => {
          taskList.querySelector(".splitH").classList.toggle("show");
        });
      });
    } //end of targeted configurations
  } //end of loop
};
//generates role options
Array.from(Object.keys(roles)).forEach((role) => {
  document.getElementById("role").add(new Option(role, role));
});
//when a role is chosen
document.getElementById("role").addEventListener("change", ({ target }) => {
  updateNames();
  call_formData.set("role", target.value);
});

document.getElementById("employee").addEventListener("change", ({ target }) => {
  call_formData.set("employee", target.value);
  call_formData.set("timeStamp", timeStamp);
  dynamicWebhook = webHooks[`${target.value}`];
  document.getElementById("role").classList.add("disabled");
  createInterface(document.getElementById("role"));
  target.classList.add("disabled");
  
  // console.log('webhook for ',target.value, " is ",webHooks[`${target.value}`])
});

document
  .getElementById("feedback")
  .addEventListener("focusout", ({ target }) => {
    call_formData.set("feedback", target.value);
  });

//sets mood value
rateOptions.forEach((rate) => {
  rate.addEventListener("click", () => {
    rateOptions.forEach(
      (rate) => (rate.src = `./assets/imgs/${rate.name}.svg`)
    );
    rate.src = `./assets/imgs/${rate.name}Selected.svg`;
    call_formData.set("moodRate", rate.name);
  });
});

//submitt data form
call_form_.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelectorAll("input[type=checkbox]").forEach((checkBox) => {
    checkBox.checked
      ? call_formData.set(
          `${checkBox.name}`,
          `${checkBox.value.slice(0, 40)} : ✅`
        )
      : call_formData.set(
          `${checkBox.name}`,
          `${checkBox.value.slice(0, 40)} : ❌`
        );
  });

  for (var [key, value] of call_formData.entries()) {
    call_params[key] = value;
  }

  console.log(call_params);

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

//Intro Js implementation for onboarding All Cevimed Staff

// introJs()
//   .setOptions({
//     steps: [
//       {
//         intro: `Hey there CeviMeder!
//     Let's Take a Quick Tour!`,
//       },
//       {
//         element: document.querySelector("#title"),
//         intro:
//           "You will be filling out this form to send quick and easy reports!",
//       },
//       {
//         element: document.querySelector("#role"),
//         intro: "Select your Role in Cevimed..",
//       },
//       {
//         element: document.querySelector("#employee"),
//         intro: "... Then find your Name in this list",
//       },
//       {
//         element: document.querySelector(".splitH"),
//         intro: "Give it a try!",
//       },
//         {
//           element: document.querySelector("#timeDate"),
//           intro: "a time stamp will be generated to keep track of updates so you can send multiple forms",
//         },
//         {
//           element: document.querySelector("#formContainer"),
//           intro: `All your Task lists will open up, When you hover over them, they list will expand... You can keep a task list open by clicking on it.. Give it a try!`
//         },
//         {
//           element: document.querySelector("#taskList"),
//           intro: `Try clicking anywhere on any task and a green check will mark it as done!
//           You will notice Task list icons will change to green when all task in each list are completed, Give it a try before pressing next`
//         },
//         {
//           element: document.querySelector("#formContainer h4"),
//           intro: `Your well-being is very important for Cevimed`
//         },
//         {
//           element: document.querySelector(".smileRating"),
//           intro: `Giving us a quick "mood check-in" helps us ensure you're Happy, Healthy and Productive`
//         },
//         {
//           element: document.querySelector(".split textarea"),
//           intro: `You can give us feedback, details, request and/or any comments that you would like to attach to the report here.`
//         },
//         {
//           element: document.querySelector(".btnContainer"),
//           intro: `This button will send your report and reset the form.`
//         },
//         {
//           element: document.querySelector("body"),
//           intro: `Thank you for taking the tour!`
//         }
      

//     ],
//   })
//   .start();


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
          intro: "Se generará una marca de tiempo para realizar un seguimiento de las actualizaciones para que puedas enviar varios formularios",
        },
        {
          element: document.querySelector("#formContainer"),
          intro: `Toda tu lista de tareas se abrirá. Cuando pases el cursor sobre cualquier lista, la lista se expandirá... Puedes mantener una lista de tareas abierta haciendo clic en ella. ¡Inténtalo!`
        },
        {
          element: document.querySelector("#taskList"),
          intro: `¡Intenta hacer clic en cualquier tarea y una marca verde la marcará como completada!
          Notarás que los íconos de la lista de tareas cambiarán a verde cuando todas las tareas en cada lista estén completadas. Inténtalo antes de presionar siguiente.`
        },
        {
          element: document.querySelector("#formContainer h4"),
          intro: `Tu bienestar es muy importante para Cevimed`
        },
        {
          element: document.querySelector(".smileRating"),
          intro: `Darnos un rápido "chequeo de estado de ánimo" nos ayuda a asegurar que estés Feliz, Saludable y Productivo.`
        },
        {
          element: document.querySelector(".split textarea"),
          intro: `Aquí puedes darnos retroalimentación, detalles, solicitudes y/o cualquier comentario que desees adjuntar al informe.`
        },
        {
          element: document.querySelector(".btnContainer"),
          intro: `Este botón enviará tu informe y reiniciará el formulario.`
        },
        {
          element: document.querySelector("body"),
          intro: `¡Gracias por hacer el recorrido!`
        }
      

    ],
  })
  .start();