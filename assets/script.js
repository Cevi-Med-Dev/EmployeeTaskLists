//imports
import { roles,employeeRoles } from "./json.js";

//variables
var call_form_ = document.querySelector("#formContainer form");
var call_formData = new FormData(call_form_);
var currentChecklist = "";
var rateOptions = document.querySelectorAll(".smileRating img");


//updates employee list 
function updateNames() {
  const departmentSelect = document.getElementById('role');
  const nameSelect = document.getElementById('employee');
  const selectedDepartment = departmentSelect.value;

  // Clear previous options
  nameSelect.innerHTML = '<option value="">Select a name</option>';

  if (selectedDepartment && employeeRoles[selectedDepartment]) {
      employeeRoles[selectedDepartment].forEach(name => {
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
                                               ${task[1].map(
                                                 (taskDescription) => {
                                                   return ` <li>
                                                <label class="taskOverview">
                                                            ${taskDescription}
                                                <input type="checkbox">
                                                <span class="checkmark"></span>
                                                </label>
                                                </li>       `;
                                                 }
                                               )}       
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
}
//generates role options
Array.from(Object.keys(roles)).forEach((el) => {
  document.getElementById("role").add(new Option(el, el));
});

//when a role is chosen
document.getElementById("role").addEventListener("change", ({ target }) => {
  //match name with role
  updateNames() 
  //starts to loop roles
 createInterface(target)
});

//retreives mood value
rateOptions.forEach((rate) => {
  rate.addEventListener("click", () => {
    rateOptions.forEach(
      (rate) => (rate.src = `./assets/imgs/${rate.name}.svg`)
    );
    rate.src = `./assets/imgs/${rate.name}Selected.svg`;
    document.getElementById("moodRate").value = rate.name;
  });
});

//submitt data form
document.querySelector("button[type=submit]").addEventListener("click", (e) => {
  e.preventDefault();
  call_formData = new FormData(call_form_);
  document.querySelectorAll("input[type=checkbox]").forEach((box) => {
    box.checked && call_formData.append(`${box.name}`, `${box.value}`);
  });
  console.log(Object.entries(call_formData));
});

