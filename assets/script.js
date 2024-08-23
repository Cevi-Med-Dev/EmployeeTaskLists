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
          taskList.querySelector("ul").classList.toggle("show");
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
  introJs()
    .setOptions({
      steps: [
        {
          intro: `Good Job! 
          You got this!
      Now Let's take quick look at the tasks assigned to you!`,
        },
        {
          element: document.querySelector("#timeDate"),
          intro: "a time stamp will be generated to keep track of when ",
        },
        {
          element: document.querySelector("#formContainer"),
          intro: `Task will open up when you hover your mouse, You can keep a task categbory open by clikcing on it
          
          Give it a try! 
          `,
        },
        {
          element: document.querySelector("#taskList"),
          intro: `Try clicking anywhere on any task and a green check will mark it as done!

          You will notice task category icons will change to green when all task in each category are completed`
        },
        {
          element: document.querySelector(h4),
          intro: `Your well being is very important for Cevimed`
        },
        {
          element: document.querySelector(".smilerating"),
          intro: `Givivng a quick mood check-in helps us ensure our staff are happy, healthy and productive`
        },
        {
          element: document.querySelector(".split"),
          intro: `You can give us feedback, details and anything else you would like to attach to your report here`
        },
        {
          element: document.querySelector(".btnContainer"),
          intro: `This button will send your report and reset the form so make sure yopur are completely done before sending`
        },
        {
          element: document.querySelector(body),
          intro: `Thank you for taking this tour!!!`
        }
      ],
    })
    .start();
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

introJs()
  .setOptions({
    steps: [
      {
        intro: `Hey The CeviMeder!
    Let's Take Quick Tour!`,
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
        intro: "... Then find your Name in the list to the right",
      },
      {
        element: document.querySelectorAll(".taskContainer"),
        intro: "Give it a try!",
      },
    ],
  })
  .start();
