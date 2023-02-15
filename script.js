let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let tabs = document.querySelectorAll('.task-tabs div');
let underLine = document.getElementById('under-line');
let mode = 'all';
let taskList = [];

//+클릭시 할일 addeventlistener
addButton.addEventListener('click', addTask);
//엔터키 입력시 저장
taskInput.addEventListener('keyup', function (event) {
   if (event.keyCode === 13) {
      addTask(event);
   }
});
//all / not done / done 탭 필터
for (let i = 1; i < tabs.length; i++) {
   tabs[i].addEventListener('click', function (event) {
      filter(event);
   });
}

// 할일 추가 함수
function addTask() {
   let task = {
      id: randomIDGenerate(),
      taskContent: taskInput.value,
      isComplete: false,
   };
   if (taskInput.value === '') {
      alert('할일을 입력해주세요.');
      return;
   }
   taskList.push(task);

   taskInput.value = '';
   render();
}

//html에 그려주는 함수
function render() {
   let resultHTML = '';
   let list = [];

   if (mode === 'all') {
      list = taskList;
   } else {
      list = filterList;
   }

   for (let i = 0; i < list.length; i++) {
      if (list[i].isComplete) {
         resultHTML += `
        <div class="task" id="${list[i].id}">
            <div class="task-done">${list[i].taskContent}</div>
            <div class="button-box">
               <button onClick="toggleComplete('${list[i].id}')">되돌리기</button>
               <button onClick="deleteTask('${list[i].id}')">삭제</button>
            </div>      
        </div>
        `;
      } else {
         resultHTML += `
        <div class="task" id="${list[i].id}">
            <div>${list[i].taskContent}</div>
            <div class="button-box">
               <button onClick="toggleComplete('${list[i].id}')">체크</button>
               <button onClick="deleteTask('${list[i].id}')">삭제</button>
            </div>
        </div>`;
      }
   }
   document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id) {
   for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === id) {
         taskList[i].isComplete = !taskList[i].isComplete;
         break;
      }
   }
   filter();
}

function deleteTask(id) {
   for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id == id) {
         taskList.splice(i, 1);
      }
   }
   filter();
}

function filter(e) {
   filterList = [];

   if (e) {
      mode = event.target.id;
      underLine.style.width = e.target.offsetWidth + 'px';
      underLine.style.left = e.target.offsetLeft + 'px';
      underLine.style.top = e.target.offsetTop + (e.target.offsetHeight - 4) + 'px';
   }

   if (mode === 'ongoing') {
      for (let i = 0; i < taskList.length; i++) {
         if (taskList[i].isComplete == false) {
            filterList.push(taskList[i]);
         }
      }
   } else if (mode === 'done') {
      for (let i = 0; i < taskList.length; i++) {
         if (taskList[i].isComplete) {
            filterList.push(taskList[i]);
         }
      }
   }
   render();
}

//랜덤으로 아이디 만들어주는 함수
function randomIDGenerate() {
   return Math.random().toString(36).substr(2, 16);
}
