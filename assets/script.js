//imports
import { roles, employeeRoles, webHooks } from "./json.js";

//variables
var dynamicWebhook = "https://hooks.airtable.com/workflows/v1/genericWebhook/appELJwYYus7qLt4Q/wfl57mybweawrKPo6/wtroiThpLZvvn9ItQ"
var call_form_ = document.querySelector("#formContainer form");
var call_formData = new FormData(call_form_);
var call_params = "";
var currentChecklist = "";
var rateOptions = document.querySelectorAll(".smileRating img");
var taskCounter = 0;
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
  const departmentSelect = document.getElementById("role");
  const nameSelect = document.getElementById("employee");
  const selectedDepartment = departmentSelect.value;

  // Clear previous options
  nameSelect.innerHTML = '<option value="">Select a name</option>';

  if (selectedDepartment && employeeRoles[selectedDepartment]) {
    employeeRoles[selectedDepartment].forEach((name) => {
      nameSelect.add(new Option(name, name));
    });
  }
}
const createInterface = (target) => {
  for (const [key, value] of Object.entries(roles)) {
    if (target.value === key) {
      //finds role chosen
      currentChecklist = Object.entries(value); // get checklist
      document.getElementById("taskList").innerHTML = ""; // clears checklist
      currentChecklist.forEach((task) => {
        //runs thru every task
        document.getElementById("title").innerText = `${key} CheckList`; //chnages title
        document.getElementById(
          "taskList"
        ).innerHTML += `<div class="taskContainer">
                                        <div class="splitH">
                                                <h2 class="taskName">${
                                                  task[0]
                                                } </h2>
                                                <img class="status" src="./assets/imgs/undone.svg" alt="">
                                        </div>
                                        <ul>
                                               ${task[1]
                                                 .map((taskDescription) => {
                                                   return ` <li>
                                                <label class="taskOverview">
                                                            ${taskDescription}
                                                <input name="${taskCounter++}" type="checkbox" value="${taskDescription}">
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
  createInterface(target);
  call_formData.set("role",target.value);
});

document.getElementById("employee").addEventListener("change", ({ target }) => {
  call_formData.set("employee",target.value);
  dynamicWebhook = webHooks[`${target.value}`]
  console.log('webhook for ',target.value, " is ",webHooks[`${target.value}`])
});

document.getElementById("feedback").addEventListener("focusout", ({ target }) => {
  call_formData.set("feedback",target.value);
});


//sets mood value
rateOptions.forEach((rate) => {
  rate.addEventListener("click", () => {
    rateOptions.forEach(
      (rate) => (rate.src = `./assets/imgs/${rate.name}.svg`)
    );
    rate.src = `./assets/imgs/${rate.name}Selected.svg`;
    call_formData.set("moodRate",rate.name);
  });
});

//submitt data form
call_form_.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("not sent", call_formData)
  document.querySelectorAll("input[type=checkbox]").forEach((checkBox) => {
    checkBox.checked
      ? call_formData.append(`${(checkBox.value).slice(0,15)}`, "done")
      : call_formData.append(`${(checkBox.value).slice(0,15)}`, `Not done`);
  });

  for (var [key, value] of call_formData.entries()) {
    call_params += `${key}=${value}&`;
    console.log(key, value);
  }
  console.log("this is the data retreived", call_params);
  call_trigger(
    dynamicWebhook,
    call_params
  ).then((data) => {
    console.log(data);
    call_form_.reset();
    window.alert("Your Daily Report Has Been Sent! thank you!");
    // window.location.reload()
  });
});

