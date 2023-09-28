let tasks = [];

class Task {
  id;
  name;
  priority;
  _assignedTo;
  _status;
  removeChecked = false;

  constructor(
    name,
    priority,
    _assignedTo = "Mohamed",
    status = "pending",
    id = 0
  ) {
    this.id = id;
    this.name = name;
    this.priority = priority;
    this._assignedTo = _assignedTo;
    this._status = status;
  }
  getName() {
    return this.name;
  }

  getPriority() {
    return this.priority;
  }
  setName(name) {
    this.name = name;
  }
  setStatus(status) {
    this.status = status;
  }
  setPriority(priority) {
    this._priority = priority;
  }
  get increasePriority() {
    if (this._priority > 1) this._priority--;
  }

  decreasaePriority() {
    this._priority++;
  }
  done(i) {
    this._status = "done";
    document.getElementById(`taskCell${i}`).style.textDecorationLine =
      "line-through";
  }
  unDone(i) {
    this._status = "undone";
    document.getElementById(`taskCell${i}`).style.textDecorationLine = "none";
  }

  displayTaskData() {
    console.log(
      `${this.name} - ${this._priority} - ${this._assignedTo} - ${this.status}`
    );
  }
}

const sortTasks = () => {
  sort(tasks);
  addTasksToTable(tasks);
};
const validate = (task, priority) => {
  if (task === "" || task === undefined)
    return alert("Task name is not Valid, Please Enter Valid Name");
  else if (isNaN(priority) || priority < 1 || priority > 5)
    return alert("Priority is not Valid, Please Enter priority from 1 to 5");
  else return true;
};
const edit = (i) => {
  let saveBtn = document.getElementById(`save${i}`);
  let cancelBtn = document.getElementById(`cancel${i}`);
  let editBtn = document.getElementById(`edit${i}`);

  let taskCell = document.getElementById(`taskCell${i}`);
  let priorityCell = document.getElementById(`priorityCell${i}`);
  taskCell.style.backgroundColor = "white";
  priorityCell.style.backgroundColor = "white";

  let footer = document.getElementById("footer");

  /*  taskCell.contentEditable = "true";
  priorityCell.contentEditable = "true"; */
  taskCell.setAttribute("contentEditable", "true");
  priorityCell.setAttribute("contentEditable", "true");

  editBtn.style.display = "none";
  saveBtn.style.display = "inline-block";
  cancelBtn.style.display = "inline-block";
  saveBtn.style.backgroundColor = "yellow";
  cancelBtn.style.backgroundColor = "yellow";

  footer.style.display = "table-row";
};

function save(i) {
  console.log(tasks[i]);
  let taskCell = document.getElementById(`taskCell${i}`);
  let priorityCell = document.getElementById(`priorityCell${i}`);

  let saveBtn = document.getElementById(`save${i}`);
  let cancelBtn = document.getElementById(`cancel${i}`);
  let editBtn = document.getElementById(`edit${i}`);

  if (validate(taskCell.innerHTML, priorityCell.innerHTML)) {
    tasks[i].name = taskCell.innerHTML;
    tasks[i].priority = priorityCell.innerHTML;

    taskCell.setAttribute("contentEditable", "false");
    priorityCell.setAttribute("contentEditable", "false");

    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
    editBtn.style.display = "inline-block";
  }

  let Save = document.getElementsByClassName("save");
  let j = 0;
  for (let i = 0; i < Save.length; ++i) {
    if (Save[i].style.display !== "none") {
      ++j;
      break;
    }
  }
  if (j === 0) {
    document.getElementById("footer").style.display = "none";
    addTasksToTable(tasks);
  }

  console.log(tasks[i]);
}

const removeAll = () => {
  let checked = document.getElementsByClassName("removeCheck");
  let newTasks = [];
  console.log(checked);
  for (let i = 0; i < checked.length; ++i) {
    let elementId = checked[i].getAttribute("id");
    let j = elementId[elementId.length - 1];
    if (tasks[j].removeChecked === false) {
      newTasks.push(tasks[j]);
      /* checkedElement = tasks[j];
      let k = newTasks.indexOf(checkedElement);
      newTasks.splice(k, 1); */
    }
  }
  tasks = newTasks;
  addTasksToTable(newTasks);
};

const cancel = (i) => {
  document.getElementById(`save${i}`).style.display = "none";
  document.getElementById(`cancel${i}`).style.display = "none";
  document.getElementById(`edit${i}`).style.display = "inline-block";

  let taskCell = document.getElementById(`taskCell${i}`);
  let priorityCell = document.getElementById(`priorityCell${i}`);
  taskCell.innerHTML = tasks[i].name;
  priorityCell.innerHTML = tasks[i].priority;

  taskCell.setAttribute("contentEditable", "false");
  priorityCell.setAttribute("contentEditable", "false");

  let Cancel = document.getElementsByClassName("cancel");
  let j = 0;
  for (let i = 0; i < Cancel.length; ++i) {
    if (Cancel[i].style.display !== "none") {
      ++j;
      break;
    }
  }
  j === 0 ? (document.getElementById("footer").style.display = "none") : " ";
};

const saveAll = () => {
  let Save = document.getElementsByClassName("save");
  for (let i = 0; i < Save.length; ++i) {
    save(i);
  }
  document.getElementById("footer").style.display = "none";
  addTasksToTable(tasks);
};

const addTasksToTable = (Tasks) => {
  //console.log(tasks);

  let row = document.getElementById("row");
  let body = document.getElementById("body");
  body.innerHTML = " ";
  for (let i = 0; i < Tasks.length; ++i) {
    let newRow = body.insertRow(-1);
    let newCellId = newRow.insertCell(0);
    newCellId.innerHTML = i + 1;
    Tasks[i].id = i;
    let newCellTask = newRow.insertCell(1);
    newCellTask.innerHTML = Tasks[i].name;
    newCellTask.setAttribute("id", `taskCell${i}`);
    let newCellPriority = newRow.insertCell(2);
    newCellPriority.innerHTML = Tasks[i].priority;
    newCellPriority.setAttribute("id", `priorityCell${i}`);

    let newCellStatus = newRow.insertCell(3);
    let statusCheck = document.createElement("input");

    statusCheck.setAttribute("type", "checkbox");
    statusCheck.setAttribute("class", "check");
    statusCheck.setAttribute("id", `check${i}`);
    //statusCheck.value = "undone";
    newCellStatus.appendChild(statusCheck);

    let newCellRemove = newRow.insertCell(4);
    let newBtn1 = document.createElement("button");
    newBtn1.innerText = "Remove";
    newBtn1.value = i;
    newCellRemove.appendChild(newBtn1);

    let removeCheck = document.createElement("input");
    removeCheck.setAttribute("type", "checkbox");
    removeCheck.setAttribute("class", "removeCheck");
    removeCheck.setAttribute("id", `removeCheck${i}`);
    //statusCheck.value = "undone";
    newCellRemove.appendChild(removeCheck);

    newCell = newRow.insertCell(5);
    let newBtn2 = document.createElement("button");
    newBtn2.innerText = "Edit";
    newBtn2.value = i;
    newBtn2.setAttribute("class", "edit");
    newBtn2.setAttribute("id", `edit${i}`);
    newBtn2.style.backgroundColor = "orange";
    newCell.appendChild(newBtn2);

    let newBtn3 = document.createElement("button");
    newBtn3.innerText = "Save";
    newBtn3.value = i;
    newBtn3.setAttribute("class", "save");
    newBtn3.setAttribute("id", `save${i}`);
    newBtn3.setAttribute("style", `display:none`);
    newCell.appendChild(newBtn3);

    let newBtn4 = document.createElement("button");
    newBtn4.innerText = "Cancel";
    newBtn4.value = i;
    newBtn4.setAttribute("class", "cancel");
    newBtn4.setAttribute("id", `cancel${i}`);
    newBtn4.setAttribute("style", `display:none`);
    newCell.appendChild(newBtn4);

    newBtn1.addEventListener("click", function () {
      Tasks.splice(tasks[i].id, 1);
      addTasksToTable(Tasks);
    });

    newBtn2.addEventListener("click", function () {
      edit(tasks[i].id);
    });

    newBtn3.addEventListener("click", function () {
      save(tasks[i].id);
    });

    newBtn4.addEventListener("click", function () {
      cancel(tasks[i].id);
    });

    statusCheck.addEventListener("change", function (e) {
      checkBox = e.target;

      if (checkBox.checked) {
        tasks[i].done(i);
      } else {
        tasks[i].unDone(i);
      }
    });

    removeCheck.addEventListener("change", function (e) {
      checkBox = e.target;
      if (checkBox.checked) {
        tasks[i].removeChecked = true;
      }
      console.log(tasks);
    });
  }
};
const sort = (tasks) => {
  let temp = 0;
  for (let i = 0; i < tasks.length; ++i) {
    for (let j = 0; j < tasks.length - 1; ++j) {
      if (tasks[j].priority > tasks[j + 1].priority) {
        temp = tasks[j];
        tasks[j] = tasks[j + 1];
        tasks[j + 1] = temp;
      }
    }
  }
};
const add = () => {
  //console.log(task,priority);
  let name = document.getElementById("task").value;
  name = name.trim();
  let priority = Number(document.getElementById("priority").value);
  let task = new Task(name, priority);

  if (validate(task.name, task.getPriority())) {
    tasks.push(task);
    document.getElementById("task").value = " ";
    document.getElementById("priority").value = " ";
  }

  addTasksToTable(tasks);
};
