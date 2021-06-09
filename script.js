{
    let tasks = [];
    let hideDoneTask = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTask = !hideDoneTask;
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const doneButtons = document.querySelectorAll(".js-done");

        doneButtons.forEach((doneButton, taskIndex) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    }

    const bindButtonsEvents = () => {
        const buttonHideDoneTasks = document.querySelector(".js-toggleHideDoneTasks");

        if (buttonHideDoneTasks) {
            buttonHideDoneTasks.addEventListener("click", toggleHideDoneTasks);
        };

        const buttonAllTasksDone = document.querySelector(".js-markAllTasksDone");

        if (buttonAllTasksDone) {
            buttonAllTasksDone.addEventListener("click", markAllTasksDone)
        };
    };

    const renderTasks = () => {
        let taskListContent = tasks.map(task => `
            <li class="tasks__item ${task.done && hideDoneTask ? " tasks__item--hidden" : ""}">      
                <button class="tasks__button tasks__button--toggleDone js-done"> 
                    ${task.done ? "✔" : ""}
                </button>  
                <span class="tasks__span ${task.done ? "tasks__span--done" : ""}">
                    ${task.content}
                </span>
                <button class="tasks__button tasks__button--remove js-remove">
                    🗑
                </button>
            </li>`).join("");

        document.querySelector(".js-tasks").innerHTML = taskListContent;
    };

    const renderButtons = () => {
        let buttonsHTML = "";

        if (tasks.length > 0) {
            buttonsHTML = `
            <button class="section__button js-toggleHideDoneTasks">
                ${hideDoneTask ? "Pokaż ukończone" : "Ukryj ukończone"}
            </button>
            <button class="section__button js-markAllTasksDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>
            `
        };

        document.querySelector(".js-buttonsContainer").innerHTML = buttonsHTML;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };

    const clearInput = (newTask) => {
        newTask.value = "";
        newTask.focus();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        clearInput(newTaskElement);

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}