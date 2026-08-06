// ===========================
// OlyGYM - script.js (1-ci hissə)
// Loading + Theme + Language
// ===========================

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const motivationText = document.getElementById("motivation-text");
    const startBtn = document.getElementById("startBtn");

    const motivationWords = [
        "Sən güclüsən. Başla.",
        "Disiplin motivasiyadan güclüdür.",
        "Bu gün çalış, sabah nəticəni gör.",
        "Kiçik addımlar böyük dəyişiklik yaradar.",
        "Davam et, dayanma.",
        "Ən yaxşı versiyanı qur.",
        "Hər məşq səni bir addım irəli aparır."
    ];

    let motivationIndex = 0;

    function showMotivationWord() {
        if (!motivationText) return;
        motivationText.textContent = motivationWords[motivationIndex];
        motivationIndex = (motivationIndex + 1) % motivationWords.length;
    }

    if (loadingScreen) {
        loadingScreen.style.display = "grid";
    }

    showMotivationWord();

    const motivationInterval = setInterval(() => {
        showMotivationWord();
    }, 385);

    setTimeout(() => {
        clearInterval(motivationInterval);
        if (loadingScreen) {
            loadingScreen.style.display = "none";
        }
    }, 2700);

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            const workoutSection = document.getElementById("workout");
            if (workoutSection) {
                workoutSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    const savedTheme = localStorage.getItem("olygym-theme") || "dark";
    const savedLanguage = localStorage.getItem("olygym-language") || "aze";

    function applyTheme(theme) {
        document.body.classList.toggle("light-theme", theme === "light");
        localStorage.setItem("olygym-theme", theme);
    }

    function applyLanguage(language) {
        localStorage.setItem("olygym-language", language);
        document.documentElement.lang = language === "aze" ? "az" : language;
    }

    applyTheme(savedTheme);
    applyLanguage(savedLanguage);

    document.querySelectorAll("[data-theme]").forEach((button) => {
        button.addEventListener("click", () => {
            const theme = button.getAttribute("data-theme");
            if (theme) applyTheme(theme);
        });
    });

    document.querySelectorAll("[data-language]").forEach((button) => {
        button.addEventListener("click", () => {
            const language = button.getAttribute("data-language");
            if (language) applyLanguage(language);
        });
    });
});
// ===========================
// OlyGYM - script.js (2-ci hissə)
// User Profile + Storage
// ===========================


// ---------- User Profile ----------

const profile = {

    name: "",
    age: 0,
    height: 0,
    weight: 0,
    gender: "",
    goal: ""

};


// ---------- Weekly Plan ----------

const weeklyPlan = {

    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []

};


// ---------- Stats ----------

const stats = {

    streak: 0,
    water: 0,
    calories: 0

};


// ---------- Current Workout ----------

const currentWorkout = {

    day: "",
    muscle: "",
    exercise: "",
    sets: 0,
    reps: 0

};


// ---------- Save ----------

function saveAllData(){

    localStorage.setItem(
        "olygym-profile",
        JSON.stringify(profile)
    );

    localStorage.setItem(
        "olygym-weekly-plan",
        JSON.stringify(weeklyPlan)
    );

    localStorage.setItem(
        "olygym-stats",
        JSON.stringify(stats)
    );

    localStorage.setItem(
        "olygym-current-workout",
        JSON.stringify(currentWorkout)
    );

}



// ---------- Load ----------

function loadAllData(){

    const savedProfile =
        JSON.parse(
            localStorage.getItem("olygym-profile")
        );

    if(savedProfile){

        Object.assign(profile,savedProfile);

    }



    const savedWeeklyPlan =
        JSON.parse(
            localStorage.getItem("olygym-weekly-plan")
        );

    if(savedWeeklyPlan){

        Object.assign(weeklyPlan,savedWeeklyPlan);

    }



    const savedStats =
        JSON.parse(
            localStorage.getItem("olygym-stats")
        );

    if(savedStats){

        Object.assign(stats,savedStats);

    }



    const savedWorkout =
        JSON.parse(
            localStorage.getItem("olygym-current-workout")
        );

    if(savedWorkout){

        Object.assign(currentWorkout,savedWorkout);

    }

}



// ---------- Profile Inputs ----------

function bindProfileInputs(){

    const fields=[

        "nameInput",
        "ageInput",
        "heightInput",
        "weightInput",
        "genderInput",
        "goalInput"

    ];



    fields.forEach(id=>{

        const input=document.getElementById(id);

        if(!input) return;

        input.addEventListener("input",()=>{

            profile.name=
                document.getElementById("nameInput")?.value || "";

            profile.age=
                Number(
                    document.getElementById("ageInput")?.value
                ) || 0;

            profile.height=
                Number(
                    document.getElementById("heightInput")?.value
                ) || 0;

            profile.weight=
                Number(
                    document.getElementById("weightInput")?.value
                ) || 0;

            profile.gender=
                document.getElementById("genderInput")?.value || "";

            profile.goal=
                document.getElementById("goalInput")?.value || "";

            saveAllData();

        });

    });

}



// ---------- Restore Inputs ----------

function restoreProfileInputs(){

    const map={

        nameInput:profile.name,
        ageInput:profile.age,
        heightInput:profile.height,
        weightInput:profile.weight,
        genderInput:profile.gender,
        goalInput:profile.goal

    };



    Object.keys(map).forEach(id=>{

        const input=document.getElementById(id);

        if(input){

            input.value=map[id];

        }

    });

}



// ---------- Init ----------

document.addEventListener("DOMContentLoaded",()=>{

    loadAllData();

    bindProfileInputs();

    restoreProfileInputs();

});
// ===========================
// OlyGYM - script.js (3-cü hissə)
// Days + Muscles + Exercise Data
// ===========================


// ---------- Days ----------

const weekDays = [

    {
        id: "monday",
        title: "Bazar ertəsi"
    },

    {
        id: "tuesday",
        title: "Çərşənbə axşamı"
    },

    {
        id: "wednesday",
        title: "Çərşənbə"
    },

    {
        id: "thursday",
        title: "Cümə axşamı"
    },

    {
        id: "friday",
        title: "Cümə"
    },

    {
        id: "saturday",
        title: "Şənbə"
    },

    {
        id: "sunday",
        title: "Bazar"
    }

];


// ---------- Selected Day ----------

let selectedDay = "";


// ---------- Muscles ----------

const muscles = [

    {
        id: "chest",
        title: "Sinə"
    },

    {
        id: "back",
        title: "Kürək"
    },

    {
        id: "shoulders",
        title: "Çiyin"
    },

    {
        id: "biceps",
        title: "Biceps"
    },

    {
        id: "triceps",
        title: "Triceps"
    },

    {
        id: "forearms",
        title: "Bilək"
    },

    {
        id: "abs",
        title: "Qarın"
    },

    {
        id: "obliques",
        title: "Yan Qarın"
    },

    {
        id: "legs",
        title: "Ayaq"
    },

    {
        id: "calves",
        title: "Baldır"
    },

    {
        id: "glutes",
        title: "Glute"
    },

    {
        id: "neck",
        title: "Boyun"
    }

];


// ---------- Exercise Library ----------

const exerciseLibrary = {

    chest: [

        {
            name:"Bench Press",
            kcal:8
        },

        {
            name:"Incline Bench Press",
            kcal:8
        },

        {
            name:"Decline Bench Press",
            kcal:8
        },

        {
            name:"Push Up",
            kcal:6
        },

        {
            name:"Cable Fly",
            kcal:6
        },

        {
            name:"Dumbbell Fly",
            kcal:6
        },

        {
            name:"Chest Press",
            kcal:7
        },

        {
            name:"Machine Press",
            kcal:7
        },

        {
            name:"Pullover",
            kcal:6
        },

        {
            name:"Weighted Push Up",
            kcal:7
        }

    ],



    back:[

        {
            name:"Pull Up",
            kcal:8
        },

        {
            name:"Lat Pulldown",
            kcal:7
        },

        {
            name:"Barbell Row",
            kcal:8
        },

        {
            name:"Dumbbell Row",
            kcal:7
        },

        {
            name:"Deadlift",
            kcal:10
        },

        {
            name:"Cable Row",
            kcal:7
        },

        {
            name:"Machine Row",
            kcal:7
        },

        {
            name:"Face Pull",
            kcal:6
        },

        {
            name:"Hyperextension",
            kcal:6
        },

        {
            name:"Straight Arm Pulldown",
            kcal:6
        }

    ],



    shoulders:[

        {
            name:"Overhead Press",
            kcal:8
        },

        {
            name:"Arnold Press",
            kcal:8
        },

        {
            name:"Lateral Raise",
            kcal:6
        },

        {
            name:"Front Raise",
            kcal:6
        },

        {
            name:"Rear Delt Fly",
            kcal:6
        },

        {
            name:"Machine Shoulder Press",
            kcal:7
        },

        {
            name:"Cable Raise",
            kcal:6
        },

        {
            name:"Push Press",
            kcal:8
        },

        {
            name:"Upright Row",
            kcal:7
        },

        {
            name:"Plate Raise",
            kcal:6
        }

    ]

};


// ---------- Helpers ----------

function getMuscleTitle(id){

    const muscle=muscles.find(item=>item.id===id);

    if(!muscle){

        return "";

    }

    return muscle.title;

}



function getExerciseList(id){

    return exerciseLibrary[id] || [];

}



// ---------- Day Buttons ----------

function bindDayButtons(){

    document.querySelectorAll(".day-card").forEach(card=>{

        card.addEventListener("click",()=>{

            document
            .querySelectorAll(".day-card")
            .forEach(item=>{

                item.classList.remove("active-day");

            });

            card.classList.add("active-day");

            selectedDay=
                card.dataset.day;

            currentWorkout.day=
                selectedDay;

            saveAllData();

        });

    });

}



// ---------- Init ----------

document.addEventListener("DOMContentLoaded",()=>{

    bindDayButtons();

});// ===========================
// OlyGYM - script.js (4-cü hissə)
// Muscle Selection + Exercise UI
// ===========================


// ---------- Current Selection ----------

let selectedMuscle = "";
let selectedExercise = "";


// ---------- Select Muscle ----------

function selectMuscle(muscleId){

    selectedMuscle = muscleId;

    currentWorkout.muscle = muscleId;
    currentWorkout.exercise = "";

    selectedExercise = "";

    saveAllData();

    renderExerciseList();

    updateWorkoutSummary();

}


// ---------- Render Exercise List ----------

function renderExerciseList(){

    const container = document.getElementById("exerciseContainer");

    if(!container) return;

    container.innerHTML = "";

    const exercises = getExerciseList(selectedMuscle);

    exercises.forEach((exercise,index)=>{

        const card = document.createElement("div");

        card.className = "exercise-card";

        card.innerHTML = `

            <h3>${index+1}. ${exercise.name}</h3>

            <p>${exercise.kcal} kcal / set</p>

            <button
                class="chooseExerciseButton"
                data-name="${exercise.name}">
                Seç
            </button>

        `;

        container.appendChild(card);

    });

    bindExerciseButtons();

}



// ---------- Exercise Buttons ----------

function bindExerciseButtons(){

    document
    .querySelectorAll(".chooseExerciseButton")
    .forEach(button=>{

        button.addEventListener("click",()=>{

            selectedExercise =
                button.dataset.name;

            currentWorkout.exercise =
                selectedExercise;

            saveAllData();

            updateWorkoutSummary();

        });

    });

}



// ---------- Muscle Buttons ----------

function bindMuscleButtons(){

    document
    .querySelectorAll("[data-muscle]")
    .forEach(button=>{

        button.addEventListener("click",()=>{

            document
            .querySelectorAll("[data-muscle]")
            .forEach(item=>{

                item.classList.remove("active-muscle");

            });

            button.classList.add("active-muscle");

            selectMuscle(

                button.dataset.muscle

            );

        });

    });

}



// ---------- Restore Selection ----------

function restoreWorkoutSelection(){

    if(currentWorkout.muscle){

        selectedMuscle =
            currentWorkout.muscle;

    }

    if(currentWorkout.exercise){

        selectedExercise =
            currentWorkout.exercise;

    }

    renderExerciseList();

}



// ---------- Workout Summary ----------

function updateWorkoutSummary(){

    const muscle =
        document.getElementById("summaryMuscle");

    const exercise =
        document.getElementById("summaryExercise");

    if(muscle){

        muscle.textContent =
            selectedMuscle
            ? getMuscleTitle(selectedMuscle)
            : "-";

    }

    if(exercise){

        exercise.textContent =
            selectedExercise || "-";

    }

}



// ---------- Init ----------

document.addEventListener("DOMContentLoaded",()=>{

    bindMuscleButtons();

    restoreWorkoutSelection();

    updateWorkoutSummary();

});// ===========================
// OlyGYM - script.js (5-ci hissə)
// Sets + Reps + Calories
// ===========================


// ---------- Workout Values ----------

currentWorkout.sets = currentWorkout.sets || 0;
currentWorkout.reps = currentWorkout.reps || 0;
currentWorkout.calories = currentWorkout.calories || 0;


// ---------- Find Exercise ----------

function getSelectedExerciseData(){

    if(!selectedMuscle) return null;

    const list = getExerciseList(selectedMuscle);

    return list.find(item=>item.name===selectedExercise) || null;

}



// ---------- Calories ----------

function calculateWorkoutCalories(){

    const exercise = getSelectedExerciseData();

    if(!exercise) return 0;

    return exercise.kcal * currentWorkout.sets;

}



// ---------- Update Summary ----------

function updateWorkoutSummary(){

    const muscle =
        document.getElementById("summaryMuscle");

    const exercise =
        document.getElementById("summaryExercise");

    const sets =
        document.getElementById("summarySets");

    const reps =
        document.getElementById("summaryReps");

    const calories =
        document.getElementById("summaryCalories");



    if(muscle){

        muscle.textContent =
            selectedMuscle
            ? getMuscleTitle(selectedMuscle)
            : "-";

    }

    if(exercise){

        exercise.textContent =
            selectedExercise || "-";

    }

    if(sets){

        sets.textContent =
            currentWorkout.sets;

    }

    if(reps){

        reps.textContent =
            currentWorkout.reps;

    }

    if(calories){

        currentWorkout.calories =
            calculateWorkoutCalories();

        calories.textContent =
            currentWorkout.calories + " kcal";

    }

}



// ---------- Inputs ----------

function bindWorkoutInputs(){

    const setsInput =
        document.getElementById("setsInput");

    const repsInput =
        document.getElementById("repsInput");

    if(setsInput){

        setsInput.value =
            currentWorkout.sets;

        setsInput.addEventListener("input",()=>{

            currentWorkout.sets =
                Number(setsInput.value) || 0;

            saveAllData();

            updateWorkoutSummary();

        });

    }



    if(repsInput){

        repsInput.value =
            currentWorkout.reps;

        repsInput.addEventListener("input",()=>{

            currentWorkout.reps =
                Number(repsInput.value) || 0;

            saveAllData();

            updateWorkoutSummary();

        });

    }

}



// ---------- Save Workout ----------

function saveWorkoutToDay(){

    if(
        !currentWorkout.day ||
        !currentWorkout.muscle ||
        !currentWorkout.exercise
    ){

        return;

    }

    weeklyPlan[currentWorkout.day].push({

        muscle:currentWorkout.muscle,

        exercise:currentWorkout.exercise,

        sets:currentWorkout.sets,

        reps:currentWorkout.reps,

        calories:currentWorkout.calories

    });

    saveAllData();

}



// ---------- Save Button ----------

function bindSaveWorkoutButton(){

    const button =
        document.getElementById("saveWorkout");

    if(!button) return;

    button.addEventListener("click",()=>{

        saveWorkoutToDay();

    });

}



// ---------- Init ----------

document.addEventListener("DOMContentLoaded",()=>{

    bindWorkoutInputs();

    bindSaveWorkoutButton();

    updateWorkoutSummary();

});// ===========================
// OlyGYM - script.js (6-cı hissə)
// Rest Timer + Workout Start
// ===========================


// ---------- Timer ----------

let restTimer = null;
let restSeconds = 90;
let currentSet = 1;
let workoutStarted = false;


// ---------- Timer UI ----------

function updateRestTimerUI(){

    const timer =
        document.getElementById("restTimer");

    if(!timer) return;

    const minute =
        Math.floor(restSeconds / 60);

    const second =
        restSeconds % 60;

    timer.textContent =
        `${minute}:${String(second).padStart(2,"0")}`;

}



// ---------- Reset ----------

function resetRestTimer(){

    clearInterval(restTimer);

    restSeconds = 90;

    updateRestTimerUI();

}



// ---------- Start ----------

function startRestTimer(){

    clearInterval(restTimer);

    restSeconds = 90;

    updateRestTimerUI();

    restTimer = setInterval(()=>{

        restSeconds--;

        updateRestTimerUI();

        if(restSeconds <= 0){

            clearInterval(restTimer);

            showNotification("Fasilə bitdi! Növbəti setə başla.");

        }

    },1000);

}



// ---------- Workout ----------

function startWorkout(){

    if(

        !currentWorkout.exercise ||
        currentWorkout.sets===0 ||
        currentWorkout.reps===0

    ){

        showNotification(
            "Əvvəl məşqi seç."
        );

        return;

    }

    workoutStarted = true;

    currentSet = 1;

    updateCurrentSet();

    showNotification(
        "Məşq başladı!"
    );

}



// ---------- Next Set ----------

function nextSet(){

    if(!workoutStarted){

        return;

    }

    if(

        currentSet >= currentWorkout.sets

    ){

        finishWorkout();

        return;

    }

    currentSet++;

    updateCurrentSet();

    startRestTimer();

}



// ---------- Finish ----------

function finishWorkout(){

    workoutStarted = false;

    clearInterval(restTimer);

    stats.calories +=

        currentWorkout.calories;

    stats.streak++;

    saveAllData();

    showNotification(
        "Məşq tamamlandı!"
    );

    updateWorkoutSummary();

}



// ---------- Current Set ----------

function updateCurrentSet(){

    const current =
        document.getElementById("currentSet");

    if(!current) return;

    current.textContent =

        currentSet +
        " / " +
        currentWorkout.sets;

}



// ---------- Buttons ----------

function bindWorkoutButtons(){

    const startButton =
        document.getElementById("startWorkout");

    const nextButton =
        document.getElementById("nextSet");

    const resetButton =
        document.getElementById("resetTimer");



    if(startButton){

        startButton.addEventListener(

            "click",

            startWorkout

        );

    }



    if(nextButton){

        nextButton.addEventListener(

            "click",

            nextSet

        );

    }



    if(resetButton){

        resetButton.addEventListener(

            "click",

            resetRestTimer

        );

    }

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        updateRestTimerUI();

        updateCurrentSet();

        bindWorkoutButtons();

    }

);// ===========================
// OlyGYM - script.js (7-ci hissə)
// Water Tracker + Streak + Daily Progress
// ===========================


// ---------- Water ----------

const WATER_GOAL = 2500; // ml

stats.water = stats.water || 0;


// ---------- Water UI ----------

function updateWaterUI(){

    const current =
        document.getElementById("waterCurrent");

    const percent =
        document.getElementById("waterPercent");

    const progress =
        document.getElementById("waterProgress");

    if(current){

        current.textContent =
            stats.water + " ml";

    }

    const value =
        Math.min(
            Math.round(
                (stats.water / WATER_GOAL) * 100
            ),
            100
        );

    if(percent){

        percent.textContent =
            value + "%";

    }

    if(progress){

        progress.style.width =
            value + "%";

    }

}



// ---------- Add Water ----------

function addWater(amount){

    stats.water += amount;

    if(stats.water > WATER_GOAL){

        stats.water = WATER_GOAL;

    }

    saveAllData();

    updateWaterUI();

}



// ---------- Reset Water ----------

function resetWater(){

    stats.water = 0;

    saveAllData();

    updateWaterUI();

}



// ---------- Water Buttons ----------

function bindWaterButtons(){

    document
    .querySelectorAll("[data-water]")
    .forEach(button=>{

        button.addEventListener("click",()=>{

            const amount =

                Number(

                    button.dataset.water

                );

            addWater(amount);

        });

    });

}



// ---------- Streak ----------

function updateStreakUI(){

    const streak =
        document.getElementById("streakValue");

    if(streak){

        streak.textContent =
            stats.streak;

    }

}



// ---------- Daily Progress ----------

function updateDailyProgress(){

    const calories =
        document.getElementById("todayCalories");

    const workouts =
        document.getElementById("todayWorkout");

    if(calories){

        calories.textContent =
            stats.calories +
            " kcal";

    }

    if(workouts){

        workouts.textContent =

            workoutStarted
            ? "Aktiv"
            : "Bitib";

    }

}



// ---------- Midnight Reset ----------

function checkNewDay(){

    const today =

        new Date().toDateString();

    const saved =

        localStorage.getItem(
            "olygym-last-day"
        );

    if(saved !== today){

        stats.water = 0;

        localStorage.setItem(

            "olygym-last-day",

            today

        );

        saveAllData();

    }

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        checkNewDay();

        bindWaterButtons();

        updateWaterUI();

        updateStreakUI();

        updateDailyProgress();

    }

);
// ===========================
// OlyGYM - script.js (8-ci hissə)
// Weekly Planner + Day Cards
// ===========================


// ---------- Day Names ----------

const dayNames = {

    monday: "Bazar ertəsi",
    tuesday: "Çərşənbə axşamı",
    wednesday: "Çərşənbə",
    thursday: "Cümə axşamı",
    friday: "Cümə",
    saturday: "Şənbə",
    sunday: "Bazar"

};


// ---------- Weekly UI ----------

function renderWeeklyPlan(){

    const container =
        document.getElementById("weeklyPlan");

    if(!container){

        return;

    }

    container.innerHTML = "";

    Object.keys(weeklyPlan).forEach(day=>{

        const card =
            document.createElement("div");

        card.className =
            "week-card";

        const workouts =
            weeklyPlan[day];

        let html = `

            <h3>

                ${dayNames[day]}

            </h3>

        `;

        if(workouts.length===0){

            html += `

                <p>

                    Hələ plan yoxdur

                </p>

            `;

        }

        workouts.forEach(item=>{

            html += `

                <div class="week-workout">

                    <strong>

                        ${getMuscleTitle(item.muscle)}

                    </strong>

                    <br>

                    ${item.exercise}

                    <br>

                    ${item.sets} Set

                    ·

                    ${item.reps} Təkrar

                    <br>

                    ${item.calories} kcal

                </div>

            `;

        });

        card.innerHTML = html;

        container.appendChild(card);

    });

}



// ---------- Day Counter ----------

function getWorkoutCount(){

    let total = 0;

    Object.keys(weeklyPlan).forEach(day=>{

        total +=

            weeklyPlan[day].length;

    });

    return total;

}



function updateWorkoutCounter(){

    const counter =

        document.getElementById(

            "workoutCounter"

        );

    if(counter){

        counter.textContent =

            getWorkoutCount();

    }

}



// ---------- Clear Week ----------

function clearWeeklyPlan(){

    Object.keys(weeklyPlan).forEach(day=>{

        weeklyPlan[day] = [];

    });

    saveAllData();

    renderWeeklyPlan();

    updateWorkoutCounter();

}



// ---------- Clear Button ----------

function bindClearWeekButton(){

    const button =

        document.getElementById(

            "clearWeek"

        );

    if(!button){

        return;

    }

    button.addEventListener(

        "click",

        ()=>{

            if(

                confirm(

                    "Həftəlik plan silinsin?"

                )

            ){

                clearWeeklyPlan();

            }

        }

    );

}



// ---------- Save Override ----------

const originalSaveWorkoutToDay =
    saveWorkoutToDay;

saveWorkoutToDay = function(){

    originalSaveWorkoutToDay();

    renderWeeklyPlan();

    updateWorkoutCounter();

};



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        renderWeeklyPlan();

        updateWorkoutCounter();

        bindClearWeekButton();

    }

);// ===========================
// OlyGYM - script.js (9-cu hissə)
// Auto Weekly Program + Goal System
// ===========================


// ---------- Goal Types ----------

const goalPlans = {

    muscleGain:{

        monday:["chest","triceps"],
        tuesday:["back","biceps"],
        wednesday:["legs"],
        thursday:["shoulders"],
        friday:["chest","back"],
        saturday:["abs","legs"],
        sunday:["rest"]

    },

    fatLoss:{

        monday:["legs","abs"],
        tuesday:["back"],
        wednesday:["cardio"],
        thursday:["chest"],
        friday:["shoulders"],
        saturday:["fullbody"],
        sunday:["rest"]

    },

    strength:{

        monday:["chest"],
        tuesday:["back"],
        wednesday:["legs"],
        thursday:["shoulders"],
        friday:["arms"],
        saturday:["fullbody"],
        sunday:["rest"]

    }

};


// ---------- Detect Goal ----------

function detectGoal(){

    const goal =

        (profile.goal || "")
        .toLowerCase();

    if(

        goal.includes("əzələ") ||

        goal.includes("muscle")

    ){

        return "muscleGain";

    }

    if(

        goal.includes("arıq") ||

        goal.includes("fat")

    ){

        return "fatLoss";

    }

    return "strength";

}



// ---------- Automatic Program ----------

function generateAutomaticProgram(){

    const selectedPlan =

        goalPlans[
            detectGoal()
        ];

    Object.keys(

        weeklyPlan

    ).forEach(day=>{

        weeklyPlan[day] = [];

    });

    Object.keys(

        selectedPlan

    ).forEach(day=>{

        if(

            selectedPlan[day][0] === "rest"

        ){

            weeklyPlan[day].push({

                muscle:"rest",

                exercise:"İstirahət",

                sets:0,

                reps:0,

                calories:0

            });

            return;

        }

        selectedPlan[day].forEach(muscle=>{

            const list =

                getExerciseList(muscle);

            if(

                list.length === 0

            ){

                return;

            }

            weeklyPlan[day].push({

                muscle:muscle,

                exercise:list[0].name,

                sets:4,

                reps:12,

                calories:

                    list[0].kcal * 4

            });

        });

    });

    saveAllData();

    renderWeeklyPlan();

    updateWorkoutCounter();

    showNotification(

        "Yeni proqram yaradıldı."

    );

}



// ---------- Auto Button ----------

function bindAutoProgramButton(){

    const button =

        document.getElementById(

            "autoProgram"

        );

    if(!button){

        return;

    }

    button.addEventListener(

        "click",

        ()=>{

            generateAutomaticProgram();

        }

    );

}



// ---------- Goal Preview ----------

function updateGoalPreview(){

    const preview =

        document.getElementById(

            "goalPreview"

        );

    if(!preview){

        return;

    }

    const goal =

        detectGoal();

    if(

        goal === "muscleGain"

    ){

        preview.textContent =

            "Əzələ artırma proqramı";

    }

    else if(

        goal === "fatLoss"

    ){

        preview.textContent =

            "Yağ yandırma proqramı";

    }

    else{

        preview.textContent =

            "Güc artırma proqramı";

    }

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        bindAutoProgramButton();

        updateGoalPreview();

    }

);// ===========================
// OlyGYM - script.js (10-cu hissə)
// Progress History + Body Measurements
// ===========================


// ---------- Progress History ----------

let progressHistory = JSON.parse(

    localStorage.getItem(
        "olygym-progress-history"
    )

) || [];



// ---------- Save Progress ----------

function saveProgressHistory(){

    localStorage.setItem(

        "olygym-progress-history",

        JSON.stringify(

            progressHistory

        )

    );

}



// ---------- Add Measurement ----------

function addMeasurement(){

    progressHistory.push({

        date:new Date().toLocaleDateString(),

        weight:profile.weight,

        height:profile.height,

        streak:stats.streak,

        water:stats.water,

        calories:stats.calories

    });

    saveProgressHistory();

    renderProgressHistory();

}



// ---------- Render History ----------

function renderProgressHistory(){

    const container =

        document.getElementById(

            "progressHistory"

        );

    if(!container){

        return;

    }

    container.innerHTML = "";

    progressHistory
    .slice()
    .reverse()
    .forEach(item=>{

        const card =

            document.createElement("div");

        card.className =

            "progress-card";

        card.innerHTML = `

            <h3>

                ${item.date}

            </h3>

            <p>

                Çəki:
                ${item.weight} kg

            </p>

            <p>

                Boy:
                ${item.height} cm

            </p>

            <p>

                🔥
                ${item.calories}
                kcal

            </p>

            <p>

                💧
                ${item.water}
                ml

            </p>

            <p>

                🔥 Streak:
                ${item.streak}

            </p>

        `;

        container.appendChild(card);

    });

}



// ---------- Measurement Button ----------

function bindMeasurementButton(){

    const button =

        document.getElementById(

            "saveMeasurement"

        );

    if(!button){

        return;

    }

    button.addEventListener(

        "click",

        ()=>{

            addMeasurement();

            showNotification(

                "İrəliləyiş yadda saxlanıldı."

            );

        }

    );

}



// ---------- BMI ----------

function calculateBMI(){

    if(

        profile.height <= 0 ||

        profile.weight <= 0

    ){

        return "-";

    }

    const height =

        profile.height / 100;

    return (

        profile.weight /

        (height * height)

    ).toFixed(1);

}



function updateBMI(){

    const bmi =

        document.getElementById(

            "bmiValue"

        );

    if(bmi){

        bmi.textContent =

            calculateBMI();

    }

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        renderProgressHistory();

        bindMeasurementButton();

        updateBMI();

    }

);// ===========================
// OlyGYM - script.js (11-ci hissə)
// Story System (Local Demo)
// ===========================


// ---------- Stories ----------

let stories = JSON.parse(

    localStorage.getItem(
        "olygym-stories"
    )

) || [];



// ---------- Save ----------

function saveStories(){

    localStorage.setItem(

        "olygym-stories",

        JSON.stringify(stories)

    );

}



// ---------- Render ----------

function renderStories(){

    const container =

        document.getElementById(

            "storyContainer"

        );

    if(!container){

        return;

    }

    container.innerHTML = "";

    stories
    .slice()
    .reverse()
    .forEach((story,index)=>{

        const card =

            document.createElement("div");

        card.className =

            "story-card";

        card.innerHTML = `

            <div class="story-header">

                <strong>

                    ${story.user}

                </strong>

                <span>

                    ${story.date}

                </span>

            </div>

            ${
                story.image
                ?
                `<img
                    src="${story.image}"
                    class="story-image"
                >`
                :
                ""
            }

            ${
                story.video
                ?
                `<video
                    controls
                    class="story-video">

                    <source
                    src="${story.video}">

                </video>`
                :
                ""
            }

            <p>

                ${story.caption}

            </p>

            <button
                class="deleteStory"
                data-index="${index}">

                Sil

            </button>

        `;

        container.appendChild(card);

    });

    bindDeleteStoryButtons();

}



// ---------- Add ----------

function addStory(){

    const caption =

        document.getElementById(

            "storyCaption"

        );

    const image =

        document.getElementById(

            "storyImage"

        );

    const video =

        document.getElementById(

            "storyVideo"

        );

    stories.push({

        user:

            profile.name ||

            "Guest",

        caption:

            caption
            ? caption.value
            : "",

        image:

            image &&
            image.files[0]

            ?

            URL.createObjectURL(

                image.files[0]

            )

            :

            "",

        video:

            video &&
            video.files[0]

            ?

            URL.createObjectURL(

                video.files[0]

            )

            :

            "",

        date:

            new Date()

            .toLocaleString()

    });

    saveStories();

    renderStories();

    if(caption){

        caption.value = "";

    }

}



// ---------- Delete ----------

function bindDeleteStoryButtons(){

    document

    .querySelectorAll(

        ".deleteStory"

    )

    .forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                stories.splice(

                    Number(

                        button.dataset.index

                    ),

                    1

                );

                saveStories();

                renderStories();

            }

        );

    });

}



// ---------- Upload Button ----------

function bindStoryButton(){

    const button =

        document.getElementById(

            "uploadStory"

        );

    if(!button){

        return;

    }

    button.addEventListener(

        "click",

        ()=>{

            addStory();

            showNotification(

                "Story paylaşıldı."

            );

        }

    );

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        bindStoryButton();

        renderStories();

    }

);// ===========================
// OlyGYM - script.js (12-ci hissə)
// Settings + Export / Import + App Reset
// ===========================


// ---------- Settings ----------

const settings = JSON.parse(

    localStorage.getItem(

        "olygym-settings"

    )

) || {

    theme:"dark",

    language:"aze",

    notifications:true,

    sounds:true

};



// ---------- Save Settings ----------

function saveSettings(){

    localStorage.setItem(

        "olygym-settings",

        JSON.stringify(settings)

    );

}



// ---------- Apply ----------

function applySettings(){

    document.body.classList.toggle(

        "light-theme",

        settings.theme==="light"

    );

    document.documentElement.lang=

        settings.language==="aze"

        ? "az"

        : settings.language;

}



// ---------- Theme ----------

function bindThemeSettings(){

    document

    .querySelectorAll(

        "[data-theme]"

    )

    .forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                settings.theme=

                    button.dataset.theme;

                saveSettings();

                applySettings();

            }

        );

    });

}



// ---------- Language ----------

function bindLanguageSettings(){

    document

    .querySelectorAll(

        "[data-language]"

    )

    .forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                settings.language=

                    button.dataset.language;

                saveSettings();

                applySettings();

            }

        );

    });

}



// ---------- Export ----------

function exportData(){

    const data={

        profile,

        stats,

        weeklyPlan,

        currentWorkout,

        progressHistory,

        stories,

        settings

    };

    const blob=new Blob(

        [

            JSON.stringify(

                data,

                null,

                2

            )

        ],

        {

            type:"application/json"

        }

    );

    const url=

        URL.createObjectURL(

            blob

        );

    const a=

        document.createElement("a");

    a.href=url;

    a.download="OlyGYM_Backup.json";

    a.click();

    URL.revokeObjectURL(url);

}



// ---------- Import ----------

function importData(file){

    const reader=

        new FileReader();

    reader.onload=()=>{

        try{

            const data=

                JSON.parse(

                    reader.result

                );

            if(data.profile)

                Object.assign(

                    profile,

                    data.profile

                );

            if(data.stats)

                Object.assign(

                    stats,

                    data.stats

                );

            if(data.weeklyPlan)

                Object.assign(

                    weeklyPlan,

                    data.weeklyPlan

                );

            saveAllData();

            showNotification(

                "Backup yükləndi."

            );

        }

        catch{

            showNotification(

                "Backup xətası."

            );

        }

    };

    reader.readAsText(file);

}



// ---------- Reset ----------

function resetApplication(){

    if(

        !confirm(

            "Bütün məlumatlar silinsin?"

        )

    ){

        return;

    }

    localStorage.clear();

    location.reload();

}



// ---------- Buttons ----------

function bindSettingsButtons(){

    const exportButton=

        document.getElementById(

            "exportData"

        );

    const importInput=

        document.getElementById(

            "importData"

        );

    const resetButton=

        document.getElementById(

            "resetApp"

        );

    if(exportButton){

        exportButton.addEventListener(

            "click",

            exportData

        );

    }

    if(importInput){

        importInput.addEventListener(

            "change",

            e=>{

                const file=

                    e.target.files[0];

                if(file){

                    importData(file);

                }

            }

        );

    }

    if(resetButton){

        resetButton.addEventListener(

            "click",

            resetApplication

        );

    }

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        applySettings();

        bindThemeSettings();

        bindLanguageSettings();

        bindSettingsButtons();

    }

);// ===========================
// OlyGYM - script.js (13-cü hissə)
// Guest Mode + Login Preparation
// ===========================


// ---------- Account State ----------

const account = JSON.parse(

    localStorage.getItem(

        "olygym-account"

    )

) || {

    loggedIn:false,

    username:"Guest",

    email:""

};



// ---------- Save Account ----------

function saveAccount(){

    localStorage.setItem(

        "olygym-account",

        JSON.stringify(account)

    );

}



// ---------- Guest Mode ----------

function enableGuestMode(){

    account.loggedIn=false;

    account.username="Guest";

    saveAccount();

    updateAccountUI();

}



// ---------- Login Demo ----------

function loginUser(username,email){

    account.loggedIn=true;

    account.username=username;

    account.email=email;

    saveAccount();

    updateAccountUI();

}



// ---------- Logout ----------

function logoutUser(){

    account.loggedIn=false;

    account.username="Guest";

    account.email="";

    saveAccount();

    updateAccountUI();

}



// ---------- Account UI ----------

function updateAccountUI(){

    const name=

        document.getElementById(

            "accountName"

        );

    const status=

        document.getElementById(

            "accountStatus"

        );

    if(name){

        name.textContent=

            account.username;

    }

    if(status){

        status.textContent=

            account.loggedIn

            ?

            "Login edildi"

            :

            "Guest rejimi";

    }

}



// ---------- Login Button ----------

function bindLoginButtons(){

    const loginButton=

        document.getElementById(

            "loginButton"

        );

    const logoutButton=

        document.getElementById(

            "logoutButton"

        );



    if(loginButton){

        loginButton.addEventListener(

            "click",

            ()=>{

                const username=

                    document.getElementById(

                        "loginUsername"

                    )?.value || "User";


                const email=

                    document.getElementById(

                        "loginEmail"

                    )?.value || "";


                loginUser(

                    username,

                    email

                );


                showNotification(

                    "Xoş gəldin!"

                );

            }

        );

    }



    if(logoutButton){

        logoutButton.addEventListener(

            "click",

            ()=>{

                logoutUser();

                showNotification(

                    "Çıxış edildi."

                );

            }

        );

    }

}



// ---------- Protect Data ----------

function getUserMode(){

    if(account.loggedIn){

        return "user";

    }

    return "guest";

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        updateAccountUI();

        bindLoginButtons();

    }

);// ===========================
// OlyGYM - script.js (14-cü hissə)
// Muscle Map + Body Selection
// ===========================


// ---------- Body Map State ----------

let bodySide = "front";

let selectedBodyMuscle = "";



// ---------- Body Muscles ----------

const bodyMap = {

    front:[

        "chest",
        "shoulders",
        "biceps",
        "abs",
        "obliques",
        "quadriceps",
        "calves"

    ],

    back:[

        "back",
        "triceps",
        "rearShoulders",
        "glutes",
        "hamstrings",
        "calves"

    ]

};



// ---------- Change Side ----------

function changeBodySide(side){

    if(

        side !== "front" &&

        side !== "back"

    ){

        return;

    }


    bodySide = side;


    renderBodyMap();

}



// ---------- Render Body ----------

function renderBodyMap(){

    const container =

        document.getElementById(

            "bodyMap"

        );


    if(!container){

        return;

    }


    container.innerHTML="";


    bodyMap[bodySide].forEach(muscle=>{


        const button =

            document.createElement("button");


        button.className=

            "body-muscle";


        button.dataset.muscle=

            muscle;


        button.textContent=

            getMuscleTitle(muscle)

            ||

            muscle;



        button.addEventListener(

            "click",

            ()=>{


                selectedBodyMuscle=

                    muscle;


                selectMuscle(

                    muscle

                );


                showNotification(

                    getMuscleTitle(muscle)

                    +

                    " seçildi."

                );


            }

        );


        container.appendChild(button);


    });


}



// ---------- Side Buttons ----------

function bindBodySideButtons(){

    const front=

        document.getElementById(

            "frontBody"

        );


    const back=

        document.getElementById(

            "backBody"

        );



    if(front){

        front.addEventListener(

            "click",

            ()=>{

                changeBodySide(

                    "front"

                );

            }

        );

    }



    if(back){

        back.addEventListener(

            "click",

            ()=>{

                changeBodySide(

                    "back"

                );

            }

        );

    }

}



// ---------- Body Progress ----------

function calculateMuscleProgress(){

    const completed = [];

    Object.keys(weeklyPlan)

    .forEach(day=>{


        weeklyPlan[day]

        .forEach(workout=>{


            if(

                !completed.includes(

                    workout.muscle

                )

            ){

                completed.push(

                    workout.muscle

                );

            }


        });


    });


    return completed;

}



// ---------- Render Progress ----------

function renderMuscleProgress(){

    const container=

        document.getElementById(

            "muscleProgress"

        );


    if(!container){

        return;

    }


    const completed=

        calculateMuscleProgress();



    container.innerHTML="";


    muscles.forEach(muscle=>{


        const item=

            document.createElement("div");


        item.className=

            "muscle-progress-item";


        item.innerHTML=

            `

            <span>

            ${muscle.title}

            </span>

            <strong>

            ${
                completed.includes(muscle.id)

                ?

                "✓"

                :

                "○"

            }

            </strong>

            `;


        container.appendChild(item);


    });


}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        renderBodyMap();

        bindBodySideButtons();

        renderMuscleProgress();


    }

);// ===========================
// OlyGYM - script.js (15-ci hissə)
// Advanced Timer + Set Completion System
// ===========================


// ---------- Advanced Workout State ----------

let completedSets = 0;

let workoutActive = false;

let timerRunning = false;



// ---------- Timer Elements ----------

function getTimerElements(){

    return {

        timer:
            document.getElementById(
                "restTimer"
            ),

        set:
            document.getElementById(
                "currentSet"
            )

    };

}



// ---------- Start Workout Session ----------

function beginWorkoutSession(){

    if(

        !selectedExercise ||

        currentWorkout.sets <= 0 ||

        currentWorkout.reps <= 0

    ){

        showNotification(

            "Məşq məlumatlarını doldur."

        );

        return;

    }


    completedSets = 0;

    workoutActive = true;

    currentSet = 1;


    updateCurrentSet();


    showNotification(

        "Məşq başladı."

    );

}



// ---------- Complete Set ----------

function completeCurrentSet(){

    if(!workoutActive){

        return;

    }


    completedSets++;


    if(

        completedSets >=

        currentWorkout.sets

    ){

        completeWorkoutSession();

        return;

    }



    currentSet++;


    updateCurrentSet();


    startRestTimer();


}



// ---------- Complete Workout ----------

function completeWorkoutSession(){

    workoutActive=false;


    stats.calories +=

        currentWorkout.calories;


    stats.streak++;


    saveAllData();


    updateStreakUI();

    updateDailyProgress();


    showNotification(

        "Məşq uğurla tamamlandı!"

    );


}



// ---------- Timer Control ----------

function pauseRestTimer(){

    clearInterval(

        restTimer

    );

    timerRunning=false;

}



function continueRestTimer(){

    if(timerRunning){

        return;

    }


    timerRunning=true;


    restTimer=setInterval(()=>{


        restSeconds--;


        updateRestTimerUI();


        if(restSeconds<=0){


            pauseRestTimer();


            showNotification(

                "Fasilə bitdi."

            );


        }


    },1000);

}



// ---------- Set Progress UI ----------

function updateSetProgress(){

    const progress=

        document.getElementById(

            "setProgress"

        );


    if(!progress){

        return;

    }


    const value=

        Math.round(

            (

                completedSets /

                currentWorkout.sets

            )

            *

            100

        );


    progress.textContent=

        value+"%";

}



// ---------- Buttons ----------

function bindAdvancedTimerButtons(){


    const start=

        document.getElementById(

            "beginWorkout"

        );


    const complete=

        document.getElementById(

            "completeSet"

        );


    const pause=

        document.getElementById(

            "pauseTimer"

        );



    if(start){

        start.addEventListener(

            "click",

            beginWorkoutSession

        );

    }



    if(complete){

        complete.addEventListener(

            "click",

            ()=>{

                completeCurrentSet();

                updateSetProgress();

            }

        );

    }



    if(pause){

        pause.addEventListener(

            "click",

            pauseRestTimer

        );

    }


}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        bindAdvancedTimerButtons();

        updateSetProgress();


    }

);// ===========================
// OlyGYM - script.js (16-cı hissə)
// Workout History + Achievements
// ===========================


// ---------- Workout History ----------

let workoutHistory = JSON.parse(

    localStorage.getItem(

        "olygym-workout-history"

    )

) || [];



// ---------- Save History ----------

function saveWorkoutHistory(){

    localStorage.setItem(

        "olygym-workout-history",

        JSON.stringify(

            workoutHistory

        )

    );

}



// ---------- Add Completed Workout ----------

function addWorkoutHistory(){


    workoutHistory.push({

        date:

            new Date()

            .toLocaleDateString(),


        muscle:

            getMuscleTitle(

                currentWorkout.muscle

            ),


        exercise:

            currentWorkout.exercise,


        sets:

            currentWorkout.sets,


        reps:

            currentWorkout.reps,


        calories:

            currentWorkout.calories


    });


    saveWorkoutHistory();


}



// ---------- Render History ----------

function renderWorkoutHistory(){


    const container =

        document.getElementById(

            "workoutHistory"

        );


    if(!container){

        return;

    }



    container.innerHTML="";



    workoutHistory

    .slice()

    .reverse()

    .forEach(workout=>{


        const item=

            document.createElement(

                "div"

            );


        item.className=

            "history-card";


        item.innerHTML=

        `

        <h3>

            ${workout.date}

        </h3>


        <p>

            ${workout.muscle}

        </p>


        <p>

            ${workout.exercise}

        </p>


        <p>

            ${workout.sets} set

            ×

            ${workout.reps}

            reps

        </p>


        <p>

            🔥

            ${workout.calories}

            kcal

        </p>


        `;


        container.appendChild(item);


    });


}



// ---------- Achievements ----------

const achievements=[

    {

        id:"first",

        title:"İlk addım",

        condition:()=>workoutHistory.length>=1

    },


    {

        id:"five",

        title:"5 məşq tamamlandı",

        condition:()=>workoutHistory.length>=5

    },


    {

        id:"streak7",

        title:"7 günlük streak",

        condition:()=>stats.streak>=7

    },


    {

        id:"calories",

        title:"1000 kcal yandırıldı",

        condition:()=>stats.calories>=1000

    }


];



// ---------- User Achievements ----------

let unlockedAchievements = JSON.parse(

    localStorage.getItem(

        "olygym-achievements"

    )

) || [];



// ---------- Check ----------

function checkAchievements(){


    achievements.forEach(item=>{


        if(

            item.condition()

            &&

            !unlockedAchievements.includes(

                item.id

            )

        ){


            unlockedAchievements.push(

                item.id

            );


            showNotification(

                "Yeni nailiyyət: "

                +

                item.title

            );


        }


    });


    localStorage.setItem(

        "olygym-achievements",

        JSON.stringify(

            unlockedAchievements

        )

    );


}



// ---------- Render Achievements ----------

function renderAchievements(){


    const container=

        document.getElementById(

            "achievementList"

        );


    if(!container){

        return;

    }


    container.innerHTML="";



    achievements.forEach(item=>{


        const unlocked=

            unlockedAchievements.includes(

                item.id

            );


        container.innerHTML +=


        `

        <div class="achievement-card">


            <h3>

            ${item.title}

            </h3>


            <p>

            ${

                unlocked

                ?

                "Açıldı ✓"

                :

                "Kilidli 🔒"

            }

            </p>


        </div>

        `;


    });


}



// ---------- Override Finish ----------

const oldCompleteWorkoutSession =

    completeWorkoutSession;



completeWorkoutSession = function(){


    oldCompleteWorkoutSession();


    addWorkoutHistory();


    checkAchievements();


    renderWorkoutHistory();


    renderAchievements();


};



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        renderWorkoutHistory();


        renderAchievements();


    }

);// ===========================
// OlyGYM - script.js (17-ci hissə)
// Motivational System + Daily Challenges
// ===========================


// ---------- Daily Motivation ----------

const dailyMotivations = [

    "Bu gün etdiyin məşq sabahkı gücündür.",
    "Nəticə davamlılıqdan gəlir.",
    "Öz rekordunu yenilə.",
    "Kiçik addımlar böyük dəyişiklik yaradır.",
    "Planına sadiq qal.",
    "Bəhanə yox, hərəkət.",
    "Güclü olmaq seçimdir."

];



// ---------- Motivation UI ----------

function showDailyMotivation(){

    const box =

        document.getElementById(

            "dailyMotivation"

        );


    if(!box){

        return;

    }


    const day =

        new Date()

        .getDate();


    box.textContent =

        dailyMotivations[

            day %

            dailyMotivations.length

        ];

}



// ---------- Challenge System ----------

const challenges = [

    {

        id:"water",

        title:"2.5L su iç",

        reward:"+1 progress",

        completed:false

    },

    {

        id:"workout",

        title:"Məşqi tamamla",

        reward:"+1 streak",

        completed:false

    },

    {

        id:"calorie",

        title:"500 kcal hədəfi",

        reward:"Yeni nailiyyət",

        completed:false

    }

];



let dailyChallenges = JSON.parse(

    localStorage.getItem(

        "olygym-challenges"

    )

) || challenges;



// ---------- Save Challenges ----------

function saveChallenges(){

    localStorage.setItem(

        "olygym-challenges",

        JSON.stringify(

            dailyChallenges

        )

    );

}



// ---------- Render Challenges ----------

function renderChallenges(){

    const container =

        document.getElementById(

            "challengeList"

        );


    if(!container){

        return;

    }


    container.innerHTML="";


    dailyChallenges.forEach(challenge=>{


        const card =

            document.createElement(

                "div"

            );


        card.className=

            "challenge-card";


        card.innerHTML=

        `

        <h3>

        ${challenge.title}

        </h3>


        <p>

        Mükafat:

        ${challenge.reward}

        </p>


        <button

        class="challengeButton"

        data-id="${challenge.id}">

        ${

            challenge.completed

            ?

            "Tamamlandı ✓"

            :

            "Tamamla"

        }

        </button>

        `;


        container.appendChild(card);


    });


    bindChallengeButtons();

}



// ---------- Complete Challenge ----------

function bindChallengeButtons(){

    document

    .querySelectorAll(

        ".challengeButton"

    )

    .forEach(button=>{


        button.addEventListener(

            "click",

            ()=>{


                const id =

                    button.dataset.id;


                const challenge =

                    dailyChallenges.find(

                        item=>

                        item.id===id

                    );


                if(challenge){


                    challenge.completed=true;


                    saveChallenges();


                    renderChallenges();


                    showNotification(

                        "Challenge tamamlandı!"

                    );


                }


            }

        );


    });

}



// ---------- Daily Reset ----------

function resetChallenges(){

    dailyChallenges =

        challenges.map(item=>({

            ...item,

            completed:false

        }));


    saveChallenges();


}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        showDailyMotivation();


        renderChallenges();


    }

);// ===========================
// OlyGYM - script.js (18-ci hissə)
// Notifications + Sound Effects + UI Helpers
// ===========================


// ---------- Notification Storage ----------

let notifications = JSON.parse(

    localStorage.getItem(
        "olygym-notifications"
    )

) || [];



// ---------- Save Notifications ----------

function saveNotifications(){

    localStorage.setItem(

        "olygym-notifications",

        JSON.stringify(
            notifications
        )

    );

}



// ---------- Add Notification ----------

function addNotification(message){

    notifications.push({

        text: message,

        date:
            new Date()
            .toLocaleString(),

        read:false

    });


    saveNotifications();

    renderNotifications();

}



// ---------- Render Notifications ----------

function renderNotifications(){

    const container =

        document.getElementById(

            "notificationList"

        );


    if(!container){

        return;

    }


    container.innerHTML = "";


    notifications
    .slice()
    .reverse()
    .forEach(item=>{


        const card =

            document.createElement(

                "div"

            );


        card.className =

            "notification-card";


        card.innerHTML =

        `

        <p>

            ${item.text}

        </p>


        <small>

            ${item.date}

        </small>

        `;


        container.appendChild(card);


    });

}



// ---------- Sound ----------

function playSound(type){

    const sounds={

        click:
        "sounds/click.mp3",

        success:
        "sounds/success.mp3",

        timer:
        "sounds/timer.mp3"

    };


    const audio =

        new Audio(

            sounds[type]

        );


    audio.play()

    .catch(()=>{});

}



// ---------- Button Effects ----------

function addButtonEffects(){

    document

    .querySelectorAll(

        "button"

    )

    .forEach(button=>{


        button.addEventListener(

            "click",

            ()=>{

                playSound(
                    "click"
                );

            }

        );


    });

}



// ---------- Scroll Navigation ----------

function bindNavigation(){

    document

    .querySelectorAll(

        "[data-scroll]"

    )

    .forEach(button=>{


        button.addEventListener(

            "click",

            ()=>{


                const target =

                    document.getElementById(

                        button.dataset.scroll

                    );


                if(target){

                    target.scrollIntoView({

                        behavior:"smooth"

                    });

                }


            }

        );


    });

}



// ---------- Back To Top ----------

function bindBackToTop(){

    const button =

        document.getElementById(

            "backTop"

        );


    if(!button){

        return;

    }


    button.addEventListener(

        "click",

        ()=>{


            window.scrollTo({

                top:0,

                behavior:"smooth"

            });


        }

    );

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        renderNotifications();


        addButtonEffects();


        bindNavigation();


        bindBackToTop();


    }

);// ===========================
// OlyGYM - script.js (19-cu hissə)
// Search + Exercise Filter + Favorites
// ===========================


// ---------- Favorites ----------

let favoriteExercises = JSON.parse(

    localStorage.getItem(

        "olygym-favorites"

    )

) || [];



// ---------- Save Favorites ----------

function saveFavorites(){

    localStorage.setItem(

        "olygym-favorites",

        JSON.stringify(

            favoriteExercises

        )

    );

}



// ---------- Toggle Favorite ----------

function toggleFavorite(exerciseName){

    if(

        favoriteExercises.includes(

            exerciseName

        )

    ){

        favoriteExercises =

            favoriteExercises.filter(

                item => item !== exerciseName

            );


        showNotification(

            "Favorilərdən silindi."

        );

    }

    else{

        favoriteExercises.push(

            exerciseName

        );


        showNotification(

            "Favorilərə əlavə edildi."

        );

    }


    saveFavorites();

    renderExerciseList();

}



// ---------- Search Exercise ----------

function searchExercises(value){

    const container =

        document.getElementById(

            "exerciseContainer"

        );


    if(!container){

        return;

    }


    container.innerHTML="";


    const search =

        value

        .toLowerCase();



    Object.keys(

        exerciseLibrary

    )

    .forEach(muscle=>{


        exerciseLibrary[muscle]

        .forEach(exercise=>{


            if(

                exercise.name

                .toLowerCase()

                .includes(search)

            ){


                const card =

                    document.createElement(

                        "div"

                    );


                card.className=

                    "exercise-card";


                card.innerHTML=

                `

                <h3>

                ${exercise.name}

                </h3>


                <p>

                Əzələ:

                ${

                    getMuscleTitle(

                        muscle

                    )

                }

                </p>


                <p>

                ${exercise.kcal}

                kcal / set

                </p>


                <button

                data-favorite=

                "${exercise.name}">

                ${

                    favoriteExercises

                    .includes(

                        exercise.name

                    )

                    ?

                    "★"

                    :

                    "☆"

                }

                </button>


                `;


                container.appendChild(

                    card

                );


            }


        });


    });


    bindFavoriteButtons();

}



// ---------- Favorite Buttons ----------

function bindFavoriteButtons(){

    document

    .querySelectorAll(

        "[data-favorite]"

    )

    .forEach(button=>{


        button.addEventListener(

            "click",

            ()=>{


                toggleFavorite(

                    button.dataset.favorite

                );


            }

        );


    });

}



// ---------- Search Input ----------

function bindSearch(){

    const input =

        document.getElementById(

            "exerciseSearch"

        );


    if(!input){

        return;

    }


    input.addEventListener(

        "input",

        ()=>{


            searchExercises(

                input.value

            );


        }

    );

}



// ---------- Favorite Page ----------

function renderFavorites(){

    const container =

        document.getElementById(

            "favoriteList"

        );


    if(!container){

        return;

    }


    container.innerHTML="";


    favoriteExercises.forEach(item=>{


        container.innerHTML +=

        `

        <div class="favorite-card">

            ${item}

        </div>

        `;


    });

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        bindSearch();


        renderFavorites();


    }

);// ===========================
// OlyGYM - script.js (20-ci hissə)
// User Level + XP + Ranking System
// ===========================


// ---------- Level System ----------

const userLevel = {

    level:1,

    xp:0,

    next:100

};



// ---------- Load Level ----------

const savedLevel = JSON.parse(

    localStorage.getItem(

        "olygym-level"

    )

);



if(savedLevel){

    Object.assign(

        userLevel,

        savedLevel

    );

}



// ---------- Save Level ----------

function saveLevel(){

    localStorage.setItem(

        "olygym-level",

        JSON.stringify(

            userLevel

        )

    );

}



// ---------- Add XP ----------

function addXP(amount){

    userLevel.xp += amount;


    while(

        userLevel.xp >=

        userLevel.next

    ){


        userLevel.xp -=

            userLevel.next;


        userLevel.level++;


        userLevel.next += 50;


        showNotification(

            "Yeni level açıldı: "

            +

            userLevel.level

        );


    }


    saveLevel();

    updateLevelUI();

}



// ---------- Level UI ----------

function updateLevelUI(){

    const level =

        document.getElementById(

            "userLevel"

        );


    const xp =

        document.getElementById(

            "userXP"

        );


    const bar =

        document.getElementById(

            "xpProgress"

        );



    if(level){

        level.textContent =

            userLevel.level;

    }



    if(xp){

        xp.textContent =

            userLevel.xp

            +

            " / "

            +

            userLevel.next;

    }



    if(bar){

        bar.style.width =

            (

                userLevel.xp /

                userLevel.next *

                100

            )

            +

            "%";

    }

}



// ---------- Ranking ----------

let rankingPoints = JSON.parse(

    localStorage.getItem(

        "olygym-ranking"

    )

) || {

    points:0

};



// ---------- Add Points ----------

function addRankingPoints(amount){

    rankingPoints.points += amount;


    localStorage.setItem(

        "olygym-ranking",

        JSON.stringify(

            rankingPoints

        )

    );


    updateRankingUI();

}



// ---------- Ranking UI ----------

function updateRankingUI(){

    const points =

        document.getElementById(

            "rankingPoints"

        );


    if(points){

        points.textContent =

            rankingPoints.points;

    }

}



// ---------- Workout Reward ----------

function rewardWorkout(){

    addXP(25);

    addRankingPoints(10);

}



// ---------- Override Finish Reward ----------

const oldFinishWorkout =

    finishWorkout;



finishWorkout = function(){


    oldFinishWorkout();


    rewardWorkout();


};



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        updateLevelUI();


        updateRankingUI();


    }

);// ===========================
// OlyGYM - script.js (21-ci hissə)
// Workout Calendar + Streak Calendar
// ===========================


// ---------- Calendar Data ----------

let workoutCalendar = JSON.parse(

    localStorage.getItem(

        "olygym-calendar"

    )

) || {};



// ---------- Save Calendar ----------

function saveCalendar(){

    localStorage.setItem(

        "olygym-calendar",

        JSON.stringify(

            workoutCalendar

        )

    );

}



// ---------- Add Workout Day ----------

function markWorkoutDay(){

    const today =

        new Date()

        .toISOString()

        .split("T")[0];


    workoutCalendar[today] = {

        completed:true,

        calories:

            currentWorkout.calories,

        muscle:

            currentWorkout.muscle

    };


    saveCalendar();

    renderCalendar();

}



// ---------- Check Day ----------

function isWorkoutCompleted(date){

    return (

        workoutCalendar[date]

        &&

        workoutCalendar[date].completed

    );

}



// ---------- Calendar Render ----------

function renderCalendar(){

    const container =

        document.getElementById(

            "workoutCalendar"

        );


    if(!container){

        return;

    }


    container.innerHTML="";


    const today =

        new Date();



    for(

        let i=30;

        i>=0;

        i--

    ){


        const date =

            new Date();


        date.setDate(

            today.getDate()-i

        );


        const key =

            date

            .toISOString()

            .split("T")[0];



        const day =

            document.createElement(

                "div"

            );


        day.className =

            "calendar-day";



        day.innerHTML=

        `

        <span>

            ${

                date.getDate()

            }

        </span>


        <strong>

            ${

                isWorkoutCompleted(key)

                ?

                "✓"

                :

                ""

            }

        </strong>

        `;



        container.appendChild(day);


    }

}



// ---------- Streak Calculation ----------

function calculateStreak(){

    let streak = 0;


    let date = new Date();


    while(true){


        const key =

            date

            .toISOString()

            .split("T")[0];


        if(

            isWorkoutCompleted(key)

        ){

            streak++;

            date.setDate(

                date.getDate()-1

            );

        }

        else{

            break;

        }

    }


    stats.streak = streak;


    saveAllData();


    updateStreakUI();

}



// ---------- Override Workout Complete ----------

const oldCompleteSession =

    completeWorkoutSession;



completeWorkoutSession = function(){


    oldCompleteSession();


    markWorkoutDay();


    calculateStreak();


};



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        renderCalendar();


        calculateStreak();


    }

);// ===========================
// OlyGYM - script.js (22-ci hissə)
// Calories Calculator + Nutrition Tracker
// ===========================


// ---------- Nutrition Data ----------

let nutritionData = JSON.parse(

    localStorage.getItem(

        "olygym-nutrition"

    )

) || {

    calories:0,

    protein:0,

    carbs:0,

    fats:0

};



// ---------- Save Nutrition ----------

function saveNutrition(){

    localStorage.setItem(

        "olygym-nutrition",

        JSON.stringify(

            nutritionData

        )

    );

}



// ---------- Add Food ----------

function addFood(){

    const calories =

        Number(

            document.getElementById(

                "foodCalories"

            )?.value

        ) || 0;


    const protein =

        Number(

            document.getElementById(

                "foodProtein"

            )?.value

        ) || 0;


    const carbs =

        Number(

            document.getElementById(

                "foodCarbs"

            )?.value

        ) || 0;


    const fats =

        Number(

            document.getElementById(

                "foodFats"

            )?.value

        ) || 0;



    nutritionData.calories += calories;

    nutritionData.protein += protein;

    nutritionData.carbs += carbs;

    nutritionData.fats += fats;


    saveNutrition();


    updateNutritionUI();


}



// ---------- Nutrition UI ----------

function updateNutritionUI(){

    const calories =

        document.getElementById(

            "nutritionCalories"

        );


    const protein =

        document.getElementById(

            "nutritionProtein"

        );


    const carbs =

        document.getElementById(

            "nutritionCarbs"

        );


    const fats =

        document.getElementById(

            "nutritionFats"

        );



    if(calories){

        calories.textContent =

            nutritionData.calories

            +

            " kcal";

    }


    if(protein){

        protein.textContent =

            nutritionData.protein

            +

            " g";

    }


    if(carbs){

        carbs.textContent =

            nutritionData.carbs

            +

            " g";

    }


    if(fats){

        fats.textContent =

            nutritionData.fats

            +

            " g";

    }

}



// ---------- Daily Calorie Goal ----------

function calculateDailyCalories(){

    if(

        !profile.weight ||

        !profile.height ||

        !profile.age

    ){

        return 0;

    }


    let base =

        (

            10 *

            profile.weight

        )

        +

        (

            6.25 *

            profile.height

        )

        -

        (

            5 *

            profile.age

        );



    if(

        profile.gender === "male"

    ){

        base += 5;

    }

    else{

        base -= 161;

    }



    return Math.round(base);

}



// ---------- Show Goal ----------

function updateCalorieGoal(){

    const goal =

        document.getElementById(

            "dailyCalorieGoal"

        );


    if(goal){

        goal.textContent =

            calculateDailyCalories()

            +

            " kcal";

    }

}



// ---------- Food Button ----------

function bindFoodButton(){

    const button =

        document.getElementById(

            "addFood"

        );


    if(!button){

        return;

    }


    button.addEventListener(

        "click",

        ()=>{

            addFood();


            showNotification(

                "Qida əlavə edildi."

            );

        }

    );

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        updateNutritionUI();


        updateCalorieGoal();


        bindFoodButton();


    }

);// ===========================
// OlyGYM - script.js (23-cü hissə)
// Workout Timer + Personal Records
// ===========================


// ---------- Workout Stopwatch ----------

let workoutTime = 0;

let workoutTimer = null;



// ---------- Load Time ----------

workoutTime =

    Number(

        localStorage.getItem(

            "olygym-workout-time"

        )

    )

    || 0;



// ---------- Timer UI ----------

function updateWorkoutTimeUI(){

    const display =

        document.getElementById(

            "workoutTime"

        );


    if(!display){

        return;

    }


    const hours =

        Math.floor(

            workoutTime / 3600

        );


    const minutes =

        Math.floor(

            (

                workoutTime %

                3600

            )

            /60

        );


    const seconds =

        workoutTime %

        60;



    display.textContent =

        `${String(hours).padStart(2,"0")}:`

        +

        `${String(minutes).padStart(2,"0")}:`

        +

        `${String(seconds).padStart(2,"0")}`;

}



// ---------- Start Timer ----------

function startWorkoutClock(){

    if(workoutTimer){

        return;

    }


    workoutTimer =

        setInterval(()=>{


            workoutTime++;


            localStorage.setItem(

                "olygym-workout-time",

                workoutTime

            );


            updateWorkoutTimeUI();


        },1000);

}



// ---------- Stop Timer ----------

function stopWorkoutClock(){

    clearInterval(

        workoutTimer

    );


    workoutTimer = null;

}



// ---------- Personal Records ----------

let personalRecords = JSON.parse(

    localStorage.getItem(

        "olygym-records"

    )

) || {

    workouts:0,

    calories:0,

    maxSets:0,

    longestStreak:0

};



// ---------- Save Records ----------

function saveRecords(){

    localStorage.setItem(

        "olygym-records",

        JSON.stringify(

            personalRecords

        )

    );

}



// ---------- Update Records ----------

function updateRecords(){

    personalRecords.workouts++;


    personalRecords.calories +=

        currentWorkout.calories;



    if(

        currentWorkout.sets >

        personalRecords.maxSets

    ){

        personalRecords.maxSets =

            currentWorkout.sets;

    }



    if(

        stats.streak >

        personalRecords.longestStreak

    ){

        personalRecords.longestStreak =

            stats.streak;

    }


    saveRecords();


    updateRecordsUI();

}



// ---------- Records UI ----------

function updateRecordsUI(){

    const workouts =

        document.getElementById(

            "recordWorkouts"

        );


    const calories =

        document.getElementById(

            "recordCalories"

        );


    const streak =

        document.getElementById(

            "recordStreak"

        );


    if(workouts){

        workouts.textContent =

            personalRecords.workouts;

    }


    if(calories){

        calories.textContent =

            personalRecords.calories

            +

            " kcal";

    }


    if(streak){

        streak.textContent =

            personalRecords.longestStreak;

    }

}



// ---------- Override Workout Start ----------

const oldBeginWorkout =

    beginWorkoutSession;



beginWorkoutSession = function(){


    oldBeginWorkout();


    startWorkoutClock();


};



// ---------- Override Workout Finish ----------

const oldFinishSession =

    completeWorkoutSession;



completeWorkoutSession = function(){


    oldFinishSession();


    stopWorkoutClock();


    updateRecords();


};



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        updateWorkoutTimeUI();


        updateRecordsUI();


    }

);// ===========================
// OlyGYM - script.js (24-cü hissə)
// Profile Avatar + Media Upload
// ===========================


// ---------- Profile Media ----------

let profileMedia = JSON.parse(

    localStorage.getItem(

        "olygym-profile-media"

    )

) || {

    avatar:"",

    cover:""

};



// ---------- Save Media ----------

function saveProfileMedia(){

    localStorage.setItem(

        "olygym-profile-media",

        JSON.stringify(

            profileMedia

        )

    );

}



// ---------- Avatar Preview ----------

function updateAvatar(){

    const image =

        document.getElementById(

            "profileAvatar"

        );


    if(

        image &&

        profileMedia.avatar

    ){

        image.src =

            profileMedia.avatar;

    }

}



// ---------- Upload Avatar ----------

function uploadAvatar(file){

    if(!file){

        return;

    }


    const reader =

        new FileReader();


    reader.onload = ()=>{


        profileMedia.avatar =

            reader.result;


        saveProfileMedia();


        updateAvatar();


        showNotification(

            "Profil şəkli dəyişdirildi."

        );


    };


    reader.readAsDataURL(

        file

    );

}



// ---------- Avatar Input ----------

function bindAvatarUpload(){

    const input =

        document.getElementById(

            "avatarInput"

        );


    if(!input){

        return;

    }


    input.addEventListener(

        "change",

        ()=>{


            const file =

                input.files[0];


            uploadAvatar(

                file

            );


        }

    );

}



// ---------- Profile Information ----------

function updateProfileCard(){

    const username =

        document.getElementById(

            "profileUsername"

        );


    const age =

        document.getElementById(

            "profileAge"

        );


    const goal =

        document.getElementById(

            "profileGoal"

        );



    if(username){

        username.textContent =

            profile.name ||

            "Guest";

    }



    if(age){

        age.textContent =

            profile.age

            ?

            profile.age +

            " yaş"

            :

            "-";

    }



    if(goal){

        goal.textContent =

            profile.goal ||

            "Məqsəd seçilməyib";

    }

}



// ---------- Profile Stats ----------

function updateProfileStats(){

    const level =

        document.getElementById(

            "profileLevel"

        );


    const xp =

        document.getElementById(

            "profileXP"

        );


    const workouts =

        document.getElementById(

            "profileWorkouts"

        );



    if(level){

        level.textContent =

            userLevel.level;

    }


    if(xp){

        xp.textContent =

            userLevel.xp;

    }


    if(workouts){

        workouts.textContent =

            workoutHistory.length;

    }

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        updateAvatar();


        updateProfileCard();


        updateProfileStats();


        bindAvatarUpload();


    }

);// ===========================
// OlyGYM - script.js (25-ci hissə)
// Exercise Details + Instructions System
// ===========================


// ---------- Exercise Details ----------

const exerciseDetails = {

    "Bench Press":{

        muscle:"Sinə",

        difficulty:"Orta",

        equipment:"Barbell",

        instructions:[

            "Skamyada düzgün uzan.",

            "Çubuğu nəzarətlə aşağı endir.",

            "Sinə əzələsini sıx.",

            "Çubuğu yuxarı itələ."

        ]

    },


    "Push Up":{

        muscle:"Sinə",

        difficulty:"Asan",

        equipment:"Bədən çəkisi",

        instructions:[

            "Əlləri çiyin enində yerləşdir.",

            "Bədəni düz saxla.",

            "Aşağı en.",

            "Yuxarı qalx."

        ]

    },


    "Pull Up":{

        muscle:"Kürək",

        difficulty:"Çətin",

        equipment:"Bar",

        instructions:[

            "Bardan möhkəm tut.",

            "Bədəni yuxarı çək.",

            "Kürəyi sıx.",

            "Yavaş aşağı en."

        ]

    },


    "Squat":{

        muscle:"Ayaq",

        difficulty:"Orta",

        equipment:"Bədən çəkisi",

        instructions:[

            "Ayaqları çiyin enində aç.",

            "Dizləri bük.",

            "Belini düz saxla.",

            "Yenidən qalx."

        ]

    }

};



// ---------- Get Details ----------

function getExerciseDetails(name){

    return (

        exerciseDetails[name]

        ||

        {

            muscle:"",

            difficulty:"",

            equipment:"",

            instructions:[

                "Məlumat əlavə olunacaq."

            ]

        }

    );

}



// ---------- Details Window ----------

function showExerciseDetails(name){

    const data =

        getExerciseDetails(

            name

        );


    const container =

        document.getElementById(

            "exerciseDetails"

        );


    if(!container){

        return;

    }



    container.innerHTML =

    `

    <h2>

        ${name}

    </h2>


    <p>

        Əzələ:

        ${data.muscle}

    </p>


    <p>

        Çətinlik:

        ${data.difficulty}

    </p>


    <p>

        Avadanlıq:

        ${data.equipment}

    </p>


    <h3>

        İcra qaydası:

    </h3>


    <ul>

        ${

            data.instructions

            .map(

                item=>

                `<li>${item}</li>`

            )

            .join("")

        }

    </ul>

    `;

}



// ---------- Detail Buttons ----------

function bindExerciseDetailButtons(){

    document

    .querySelectorAll(

        "[data-exercise-detail]"

    )

    .forEach(button=>{


        button.addEventListener(

            "click",

            ()=>{


                showExerciseDetails(

                    button.dataset

                    .exerciseDetail

                );


            }

        );


    });

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        bindExerciseDetailButtons();


    }

);// ===========================
// OlyGYM - script.js (26-cı hissə)
// AI Workout Recommendation System
// ===========================


// ---------- Recommendation Engine ----------

function generateWorkoutRecommendation(){

    const recommendations = [];

    const age = Number(profile.age) || 0;
    const weight = Number(profile.weight) || 0;
    const goal = (profile.goal || "")
        .toLowerCase();



    // Goal Based

    if(
        goal.includes("əzələ") ||
        goal.includes("muscle")
    ){

        recommendations.push(

            {
                muscle:"chest",
                sets:4,
                reps:10
            },

            {
                muscle:"back",
                sets:4,
                reps:10
            },

            {
                muscle:"legs",
                sets:4,
                reps:12
            }

        );

    }

    else if(

        goal.includes("arıq") ||
        goal.includes("fat")

    ){

        recommendations.push(

            {
                muscle:"legs",
                sets:3,
                reps:15
            },

            {
                muscle:"abs",
                sets:3,
                reps:20
            },

            {
                muscle:"shoulders",
                sets:3,
                reps:12
            }

        );

    }

    else{

        recommendations.push(

            {
                muscle:"fullbody",
                sets:3,
                reps:12
            }

        );

    }



    // Experience Adjustment

    if(age < 18){

        recommendations.forEach(item=>{

            item.sets = Math.min(
                item.sets,
                3
            );

        });

    }



    return recommendations;

}



// ---------- Show Recommendation ----------

function renderRecommendation(){

    const container =

        document.getElementById(
            "recommendation"
        );


    if(!container){

        return;

    }


    const plan =

        generateWorkoutRecommendation();



    container.innerHTML="";



    plan.forEach(item=>{


        const card =

            document.createElement(
                "div"
            );


        card.className =
            "recommendation-card";


        card.innerHTML =

        `

        <h3>

            ${
                getMuscleTitle(
                    item.muscle
                )

                ||

                "Full Body"

            }

        </h3>


        <p>

            ${item.sets} set

            ×

            ${item.reps} təkrar

        </p>

        `;


        container.appendChild(card);


    });

}



// ---------- Recommendation Button ----------

function bindRecommendationButton(){

    const button =

        document.getElementById(
            "generatePlan"
        );


    if(!button){

        return;

    }


    button.addEventListener(

        "click",

        ()=>{


            renderRecommendation();


            showNotification(

                "Sənə uyğun plan hazırlandı."

            );


        }

    );

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        bindRecommendationButton();


    }

);// ===========================
// OlyGYM - script.js (27-ci hissə)
// Theme Animation + Interface Settings
// ===========================


// ---------- Interface Settings ----------

const interfaceSettings = JSON.parse(

    localStorage.getItem(

        "olygym-interface"

    )

) || {

    animations:true,

    compactMode:false,

    largeText:false

};



// ---------- Save Interface ----------

function saveInterfaceSettings(){

    localStorage.setItem(

        "olygym-interface",

        JSON.stringify(

            interfaceSettings

        )

    );

}



// ---------- Apply Interface ----------

function applyInterfaceSettings(){

    document.body.classList.toggle(

        "disable-animation",

        !interfaceSettings.animations

    );


    document.body.classList.toggle(

        "compact-mode",

        interfaceSettings.compactMode

    );


    document.body.classList.toggle(

        "large-text",

        interfaceSettings.largeText

    );

}



// ---------- Toggle Setting ----------

function toggleInterfaceSetting(setting){

    if(

        interfaceSettings[setting]

        ===

        undefined

    ){

        return;

    }


    interfaceSettings[setting] =

        !interfaceSettings[setting];


    saveInterfaceSettings();


    applyInterfaceSettings();

}



// ---------- Settings Buttons ----------

function bindInterfaceSettings(){

    document

    .querySelectorAll(

        "[data-setting]"

    )

    .forEach(button=>{


        button.addEventListener(

            "click",

            ()=>{


                toggleInterfaceSetting(

                    button.dataset.setting

                );


            }

        );


    });

}



// ---------- Page Transition ----------

function pageAnimation(){

    document.body.classList.add(

        "page-loaded"

    );

}



// ---------- Smooth Cards ----------

function animateCards(){

    const cards =

        document.querySelectorAll(

            ".feature-card, .exercise-card"

        );


    cards.forEach(card=>{


        card.addEventListener(

            "mouseenter",

            ()=>{

                card.classList.add(

                    "hover"

                );

            }

        );


        card.addEventListener(

            "mouseleave",

            ()=>{

                card.classList.remove(

                    "hover"

                );

            }

        );


    });

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        applyInterfaceSettings();


        bindInterfaceSettings();


        pageAnimation();


        animateCards();


    }

);// ===========================
// OlyGYM - script.js (28-ci hissə)
// Data Sync Preparation + Cloud Ready Structure
// ===========================


// ---------- Sync State ----------

const syncState = JSON.parse(

    localStorage.getItem(

        "olygym-sync"

    )

) || {

    lastSync:null,

    synced:false

};



// ---------- Save Sync ----------

function saveSyncState(){

    localStorage.setItem(

        "olygym-sync",

        JSON.stringify(

            syncState

        )

    );

}



// ---------- Collect All Data ----------

function collectAllUserData(){

    return {

        profile:profile,

        stats:stats,

        weeklyPlan:weeklyPlan,

        currentWorkout:currentWorkout,

        progressHistory:progressHistory,

        workoutHistory:workoutHistory,

        stories:stories,

        settings:settings,

        level:userLevel,

        nutrition:nutritionData,

        calendar:workoutCalendar

    };

}



// ---------- Prepare Upload ----------

function prepareSync(){

    const data =

        collectAllUserData();


    const json =

        JSON.stringify(

            data

        );


    syncState.lastSync =

        new Date()

        .toISOString();


    syncState.synced = true;


    saveSyncState();


    return json;

}



// ---------- Download Simulation ----------

function restoreSyncData(json){

    try{


        const data =

            JSON.parse(

                json

            );



        if(data.profile){

            Object.assign(

                profile,

                data.profile

            );

        }



        if(data.stats){

            Object.assign(

                stats,

                data.stats

            );

        }



        if(data.weeklyPlan){

            Object.assign(

                weeklyPlan,

                data.weeklyPlan

            );

        }



        if(data.settings){

            Object.assign(

                settings,

                data.settings

            );

        }



        saveAllData();


        showNotification(

            "Məlumatlar bərpa edildi."

        );


    }

    catch(error){


        showNotification(

            "Sinxronizasiya xətası."

        );


    }

}



// ---------- Sync Button ----------

function bindSyncButton(){

    const button =

        document.getElementById(

            "syncButton"

        );


    if(!button){

        return;

    }


    button.addEventListener(

        "click",

        ()=>{


            const data =

                prepareSync();



            console.log(

                "OlyGYM Sync Data:",

                data

            );


            showNotification(

                "Hazırda lokal yaddaş istifadə olunur."

            );


        }

    );

}



// ---------- Sync Status ----------

function updateSyncStatus(){

    const status =

        document.getElementById(

            "syncStatus"

        );


    if(!status){

        return;

    }


    status.textContent =


        syncState.synced

        ?

        "Son sinxronizasiya: "

        +

        syncState.lastSync

        :

        "Sinxronizasiya yoxdur";

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        bindSyncButton();


        updateSyncStatus();


    }

);// ===========================
// OlyGYM - script.js (29-cu hissə)
// Performance Tracker + Charts Data
// ===========================


// ---------- Performance Data ----------

let performanceData = JSON.parse(

    localStorage.getItem(

        "olygym-performance"

    )

) || [];



// ---------- Save Performance ----------

function savePerformance(){

    localStorage.setItem(

        "olygym-performance",

        JSON.stringify(

            performanceData

        )

    );

}



// ---------- Add Performance ----------

function addPerformance(){

    performanceData.push({

        date:

            new Date()

            .toLocaleDateString(),


        calories:

            stats.calories,


        workouts:

            workoutHistory.length,


        streak:

            stats.streak,


        weight:

            profile.weight


    });


    savePerformance();

}



// ---------- Get Weight Progress ----------

function getWeightProgress(){

    return performanceData.map(

        item=>({

            date:item.date,

            weight:item.weight

        })

    );

}



// ---------- Get Calories Progress ----------

function getCaloriesProgress(){

    return performanceData.map(

        item=>({

            date:item.date,

            calories:item.calories

        })

    );

}



// ---------- Performance Summary ----------

function updatePerformanceSummary(){

    const totalWorkouts =

        document.getElementById(

            "totalWorkouts"

        );


    const totalCalories =

        document.getElementById(

            "totalCalories"

        );


    const averageStreak =

        document.getElementById(

            "averageStreak"

        );



    if(totalWorkouts){

        totalWorkouts.textContent =

            workoutHistory.length;

    }



    if(totalCalories){

        totalCalories.textContent =

            stats.calories

            +

            " kcal";

    }



    if(averageStreak){

        averageStreak.textContent =

            stats.streak;

    }

}



// ---------- Weekly Report ----------

function createWeeklyReport(){

    const report = {

        week:

            new Date()

            .toLocaleDateString(),


        workouts:

            workoutHistory.length,


        calories:

            stats.calories,


        water:

            stats.water,


        level:

            userLevel.level

    };


    return report;

}



// ---------- Save Report ----------

function saveWeeklyReport(){

    const reports = JSON.parse(

        localStorage.getItem(

            "olygym-reports"

        )

    ) || [];


    reports.push(

        createWeeklyReport()

    );


    localStorage.setItem(

        "olygym-reports",

        JSON.stringify(

            reports

        )

    );


}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        addPerformance();


        updatePerformanceSummary();


    }

);// ===========================
// OlyGYM - script.js (30-cu hissə)
// App Security + Validation System
// ===========================


// ---------- Input Validation ----------

function validateNumber(value){

    const number = Number(value);


    if(

        isNaN(number) ||

        number < 0

    ){

        return 0;

    }


    return number;

}



// ---------- Profile Validation ----------

function validateProfile(){

    profile.age =

        validateNumber(

            profile.age

        );


    profile.height =

        validateNumber(

            profile.height

        );


    profile.weight =

        validateNumber(

            profile.weight

        );



    if(

        profile.age > 120

    ){

        profile.age = 0;

    }



    if(

        profile.height > 250

    ){

        profile.height = 0;

    }



    if(

        profile.weight > 400

    ){

        profile.weight = 0;

    }



    saveAllData();

}



// ---------- Text Filter ----------

function cleanText(text){

    if(!text){

        return "";

    }


    return text

    .replace(

        /<script.*?>.*?<\/script>/gi,

        ""

    )

    .replace(

        /<.*?>/g,

        ""

    )

    .trim();

}



// ---------- Clean Profile ----------

function cleanProfileData(){

    profile.name =

        cleanText(

            profile.name

        );


    profile.goal =

        cleanText(

            profile.goal

        );


    saveAllData();

}



// ---------- Login Validation ----------

function validateLogin(email){

    if(!email){

        return false;

    }


    return (

        email.includes("@")

        &&

        email.includes(".")

    );

}



// ---------- Workout Validation ----------

function validateWorkout(){

    if(

        !currentWorkout.exercise

    ){

        showNotification(

            "Məşq seçilməyib."

        );

        return false;

    }


    if(

        currentWorkout.sets <= 0

        ||

        currentWorkout.reps <= 0

    ){

        showNotification(

            "Set və təkrar daxil et."

        );

        return false;

    }


    return true;

}



// ---------- Secure Save ----------

function secureSave(){

    validateProfile();

    cleanProfileData();

    saveAllData();

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        validateProfile();


        cleanProfileData();


    }

);// ===========================
// OlyGYM - script.js (31-ci hissə)
// Final Integration + Application Launcher
// ===========================


// ---------- Application State ----------

const appState = {

    loaded:false,

    version:"1.0.0",

    startTime:

        new Date()

        .toISOString()

};



// ---------- Save App State ----------

function saveAppState(){

    localStorage.setItem(

        "olygym-app-state",

        JSON.stringify(

            appState

        )

    );

}



// ---------- Load Application ----------

function loadApplication(){


    if(appState.loaded){

        return;

    }



    applySettings();


    updateAccountUI();


    updateAvatar();


    updateProfileCard();


    updateProfileStats();


    renderStories();


    renderWorkoutHistory();


    renderAchievements();


    renderChallenges();


    renderCalendar();


    renderBodyMap();


    renderFavorites();


    updateNutritionUI();


    updateRecordsUI();


    updateLevelUI();


    updateRankingUI();


    updateSyncStatus();



    appState.loaded=true;


    saveAppState();



    showNotification(

        "OlyGYM hazırdır 💪"

    );

}



// ---------- Global Refresh ----------

function refreshApplication(){


    updateProfileCard();


    updateProfileStats();


    renderWorkoutHistory();


    renderAchievements();


    renderChallenges();


    renderCalendar();


    renderMuscleProgress();


    updateNutritionUI();


    updateRecordsUI();


    updateLevelUI();


    updateRankingUI();


}



// ---------- App Reset Button ----------

function bindResetButton(){

    const button =

        document.getElementById(

            "refreshApp"

        );


    if(!button){

        return;

    }



    button.addEventListener(

        "click",

        ()=>{


            refreshApplication();


            showNotification(

                "Məlumatlar yeniləndi."

            );


        }

    );

}



// ---------- Online Status ----------

function monitorConnection(){

    window.addEventListener(

        "online",

        ()=>{


            showNotification(

                "İnternet bağlantısı bərpa edildi."

            );


        }

    );


    window.addEventListener(

        "offline",

        ()=>{


            showNotification(

                "Offline rejim."

            );


        }

    );

}



// ---------- Start App ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        bindResetButton();


        monitorConnection();


        loadApplication();


    }

);// ===========================
// OlyGYM - script.js (32-ci hissə)
// Advanced User Goals + Progress Tracking
// ===========================


// ---------- Goals ----------

let userGoals = JSON.parse(

    localStorage.getItem(

        "olygym-user-goals"

    )

) || {

    main:"",

    targetWeight:0,

    targetDays:0,

    startDate:null

};



// ---------- Save Goals ----------

function saveGoals(){

    localStorage.setItem(

        "olygym-user-goals",

        JSON.stringify(

            userGoals

        )

    );

}



// ---------- Set Goal ----------

function setUserGoal(){

    const goal =

        document.getElementById(

            "goalSelect"

        );


    const weight =

        document.getElementById(

            "targetWeight"

        );


    const days =

        document.getElementById(

            "targetDays"

        );



    userGoals.main =

        goal

        ?

        goal.value

        :

        "";



    userGoals.targetWeight =

        weight

        ?

        Number(weight.value)

        :

        0;



    userGoals.targetDays =

        days

        ?

        Number(days.value)

        :

        0;



    userGoals.startDate =

        new Date()

        .toISOString();



    saveGoals();


    showNotification(

        "Məqsəd yadda saxlanıldı."

    );

}



// ---------- Goal Progress ----------

function calculateGoalProgress(){

    if(

        !userGoals.startDate

        ||

        !userGoals.targetDays

    ){

        return 0;

    }



    const start =

        new Date(

            userGoals.startDate

        );



    const now =

        new Date();



    const passed =

        Math.floor(

            (

                now-start

            )

            /

            (

                1000 *

                60 *

                60 *

                24

            )

        );



    let progress =

        (

            passed /

            userGoals.targetDays

        )

        *

        100;



    if(progress > 100){

        progress = 100;

    }



    return Math.round(

        progress

    );

}



// ---------- Goal UI ----------

function updateGoalProgress(){

    const bar =

        document.getElementById(

            "goalProgress"

        );


    const text =

        document.getElementById(

            "goalProgressText"

        );



    const progress =

        calculateGoalProgress();



    if(bar){

        bar.style.width =

            progress +

            "%";

    }



    if(text){

        text.textContent =

            progress +

            "% tamamlandı";

    }

}



// ---------- Goal Button ----------

function bindGoalButton(){

    const button =

        document.getElementById(

            "saveGoal"

        );


    if(!button){

        return;

    }



    button.addEventListener(

        "click",

        setUserGoal

    );

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        bindGoalButton();


        updateGoalProgress();


    }

);// ===========================
// OlyGYM - script.js (33-cü hissə)
// Water Tracker System
// ===========================


// ---------- Water Data ----------

let waterData = JSON.parse(

    localStorage.getItem(

        "olygym-water"

    )

) || {

    amount:0,

    goal:2500,

    date:

        new Date()

        .toISOString()

        .split("T")[0]

};



// ---------- Save Water ----------

function saveWater(){

    localStorage.setItem(

        "olygym-water",

        JSON.stringify(

            waterData

        )

    );

}



// ---------- Reset Daily Water ----------

function checkWaterDay(){

    const today =

        new Date()

        .toISOString()

        .split("T")[0];



    if(

        waterData.date !== today

    ){

        waterData.amount = 0;

        waterData.date = today;

        saveWater();

    }

}



// ---------- Add Water ----------

function addWater(value=250){

    checkWaterDay();


    waterData.amount += value;


    if(

        waterData.amount >

        waterData.goal

    ){

        waterData.amount =

            waterData.goal;

    }



    saveWater();


    updateWaterUI();


    showNotification(

        "Su əlavə edildi 💧"

    );

}



// ---------- Remove Water ----------

function removeWater(value=250){

    waterData.amount -= value;


    if(

        waterData.amount < 0

    ){

        waterData.amount = 0;

    }



    saveWater();


    updateWaterUI();

}



// ---------- Water Progress ----------

function updateWaterUI(){

    const amount =

        document.getElementById(

            "waterAmount"

        );


    const progress =

        document.getElementById(

            "waterProgress"

        );


    const percent =

        Math.round(

            (

                waterData.amount /

                waterData.goal

            )

            *

            100

        );



    if(amount){

        amount.textContent =

            waterData.amount +

            " ml";

    }



    if(progress){

        progress.style.width =

            Math.min(

                percent,

                100

            )

            +

            "%";

    }

}



// ---------- Water Buttons ----------

function bindWaterButtons(){

    const add =

        document.getElementById(

            "addWater"

        );


    const remove =

        document.getElementById(

            "removeWater"

        );



    if(add){

        add.addEventListener(

            "click",

            ()=>{

                addWater();

            }

        );

    }



    if(remove){

        remove.addEventListener(

            "click",

            ()=>{

                removeWater();

            }

        );

    }

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        checkWaterDay();


        updateWaterUI();


        bindWaterButtons();


    }

);// ===========================
// OlyGYM - script.js (34-cü hissə)
// Weekly Plan Manager
// ===========================


// ---------- Weekly Plan State ----------

let weeklySchedule = JSON.parse(

    localStorage.getItem(

        "olygym-weekly-schedule"

    )

) || {

    monday:[],

    tuesday:[],

    wednesday:[],

    thursday:[],

    friday:[],

    saturday:[],

    sunday:[]

};



// ---------- Save Weekly Schedule ----------

function saveWeeklySchedule(){

    localStorage.setItem(

        "olygym-weekly-schedule",

        JSON.stringify(

            weeklySchedule

        )

    );

}



// ---------- Add Exercise To Day ----------

function addExerciseToDay(day, exercise){

    if(

        !weeklySchedule[day]

    ){

        weeklySchedule[day]=[];

    }


    weeklySchedule[day].push({

        exercise:exercise,

        completed:false,

        date:

            new Date()

            .toISOString()

    });


    saveWeeklySchedule();


    renderWeeklySchedule();

}



// ---------- Remove Exercise ----------

function removeExerciseFromDay(

    day,

    index

){

    if(

        weeklySchedule[day]

    ){

        weeklySchedule[day].splice(

            index,

            1

        );

    }


    saveWeeklySchedule();


    renderWeeklySchedule();

}



// ---------- Complete Exercise ----------

function completeScheduledExercise(

    day,

    index

){

    if(

        weeklySchedule[day]

        &&

        weeklySchedule[day][index]

    ){

        weeklySchedule[day][index]

        .completed=true;

    }


    saveWeeklySchedule();


    renderWeeklySchedule();


    addXP(10);


    showNotification(

        "Plan üzrə məşq tamamlandı."

    );

}



// ---------- Render Weekly Plan ----------

function renderWeeklySchedule(){

    const container =

        document.getElementById(

            "weeklySchedule"

        );


    if(!container){

        return;

    }


    container.innerHTML="";



    Object.keys(

        weeklySchedule

    )

    .forEach(day=>{


        const box =

            document.createElement(

                "div"

            );


        box.className=

            "day-plan";



        box.innerHTML=

        `

        <h3>

            ${day}

        </h3>


        <div>

        ${

            weeklySchedule[day]

            .map(

                (item,index)=>


                `

                <div class="plan-item">

                    <span>

                    ${item.exercise}

                    </span>


                    <button

                    data-complete-day="${day}"

                    data-index="${index}">

                    ${

                        item.completed

                        ?

                        "✓"

                        :

                        "Bitir"

                    }

                    </button>


                </div>

                `

            )

            .join("")

        }

        </div>

        `;


        container.appendChild(box);


    });



    bindScheduleButtons();

}



// ---------- Buttons ----------

function bindScheduleButtons(){

    document

    .querySelectorAll(

        "[data-complete-day]"

    )

    .forEach(button=>{


        button.addEventListener(

            "click",

            ()=>{


                completeScheduledExercise(

                    button.dataset.completeDay,

                    Number(

                        button.dataset.index

                    )

                );


            }

        );


    });

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        renderWeeklySchedule();


    }

);// ===========================
// OlyGYM - script.js (35-ci hissə)
// Language System + Translation Base
// ===========================


// ---------- Language Data ----------

const translations = {

    aze: {

        home:"Ana səhifə",

        profile:"Profil",

        workout:"Məşq",

        settings:"Ayarlar",

        save:"Yadda saxla",

        start:"Başla",

        complete:"Tamamla",

        water:"Su",

        calories:"Kalori"

    },


    eng: {

        home:"Home",

        profile:"Profile",

        workout:"Workout",

        settings:"Settings",

        save:"Save",

        start:"Start",

        complete:"Complete",

        water:"Water",

        calories:"Calories"

    },


    tur: {

        home:"Ana sayfa",

        profile:"Profil",

        workout:"Antrenman",

        settings:"Ayarlar",

        save:"Kaydet",

        start:"Başla",

        complete:"Tamamla",

        water:"Su",

        calories:"Kalori"

    },


    rus: {

        home:"Главная",

        profile:"Профиль",

        workout:"Тренировка",

        settings:"Настройки",

        save:"Сохранить",

        start:"Начать",

        complete:"Завершить",

        water:"Вода",

        calories:"Калории"

    }

};



// ---------- Current Language ----------

function getCurrentLanguage(){

    return (

        settings.language

        ||

        "aze"

    );

}



// ---------- Translate ----------

function translate(key){

    const lang =

        getCurrentLanguage();



    return (

        translations[lang]

        &&

        translations[lang][key]

    )

    ||

    key;

}



// ---------- Apply Translation ----------

function applyTranslations(){

    document

    .querySelectorAll(

        "[data-i18n]"

    )

    .forEach(element=>{


        const key =

            element.dataset.i18n;



        element.textContent =

            translate(key);


    });

}



// ---------- Change Language ----------

function changeLanguage(language){

    if(

        !translations[language]

    ){

        return;

    }


    settings.language =

        language;


    saveSettings();


    applyTranslations();


    showNotification(

        "Dil dəyişdirildi."

    );

}



// ---------- Language Buttons ----------

function bindLanguageButtons(){

    document

    .querySelectorAll(

        "[data-lang]"

    )

    .forEach(button=>{


        button.addEventListener(

            "click",

            ()=>{


                changeLanguage(

                    button.dataset.lang

                );


            }

        );


    });

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        applyTranslations();


        bindLanguageButtons();


    }

);// ===========================
// OlyGYM - script.js (36-cı hissə)
// Login Form + User Registration System
// ===========================


// ---------- Users Database ----------

let usersDatabase = JSON.parse(

    localStorage.getItem(

        "olygym-users"

    )

) || [];



// ---------- Save Users ----------

function saveUsers(){

    localStorage.setItem(

        "olygym-users",

        JSON.stringify(

            usersDatabase

        )

    );

}



// ---------- Register ----------

function registerUser(){

    const username =

        document.getElementById(

            "registerUsername"

        )?.value.trim();



    const email =

        document.getElementById(

            "registerEmail"

        )?.value.trim();



    const password =

        document.getElementById(

            "registerPassword"

        )?.value;



    if(

        !username ||

        !email ||

        !password

    ){

        showNotification(

            "Bütün məlumatları doldur."

        );

        return;

    }



    const exists =

        usersDatabase.some(

            user=>

            user.email===email

        );



    if(exists){

        showNotification(

            "Bu email artıq istifadə olunur."

        );

        return;

    }



    const newUser = {

        id:

            Date.now(),


        username:username,


        email:email,


        password:password,


        created:

            new Date()

            .toISOString()

    };



    usersDatabase.push(

        newUser

    );


    saveUsers();



    loginUser(

        username,

        email

    );



    showNotification(

        "Qeydiyyat uğurludur."

    );

}



// ---------- Login ----------

function loginWithAccount(){

    const email =

        document.getElementById(

            "loginEmail"

        )?.value.trim();



    const password =

        document.getElementById(

            "loginPassword"

        )?.value;



    const user =

        usersDatabase.find(

            item=>

            item.email===email

            &&

            item.password===password

        );



    if(!user){

        showNotification(

            "Email və ya şifrə yanlışdır."

        );

        return;

    }



    loginUser(

        user.username,

        user.email

    );



    showNotification(

        "Xoş gəldin "

        +

        user.username

    );

}



// ---------- Logout Advanced ----------

function advancedLogout(){

    logoutUser();


    localStorage.removeItem(

        "olygym-current-user"

    );


    showNotification(

        "Hesabdan çıxıldı."

    );

}



// ---------- Buttons ----------

function bindAuthButtons(){

    const register =

        document.getElementById(

            "registerButton"

        );


    const login =

        document.getElementById(

            "accountLoginButton"

        );


    const logout =

        document.getElementById(

            "advancedLogout"

        );



    if(register){

        register.addEventListener(

            "click",

            registerUser

        );

    }



    if(login){

        login.addEventListener(

            "click",

            loginWithAccount

        );

    }



    if(logout){

        logout.addEventListener(

            "click",

            advancedLogout

        );

    }

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        bindAuthButtons();


    }

);// ===========================
// OlyGYM - script.js (37-ci hissə)
// Muscle Exercise Library Expansion
// ===========================


// ---------- Extended Exercise Library ----------

const advancedExerciseLibrary = {


    chest:[

        "Push Up",

        "Bench Press",

        "Incline Push Up",

        "Chest Fly",

        "Cable Crossover",

        "Dumbbell Press",

        "Incline Bench Press",

        "Decline Push Up",

        "Diamond Push Up",

        "Wide Push Up"

    ],



    back:[

        "Pull Up",

        "Lat Pulldown",

        "Barbell Row",

        "Dumbbell Row",

        "Deadlift",

        "Seated Row",

        "T-Bar Row",

        "Reverse Fly",

        "Back Extension",

        "Superman"

    ],



    shoulders:[

        "Shoulder Press",

        "Lateral Raise",

        "Front Raise",

        "Arnold Press",

        "Face Pull",

        "Upright Row",

        "Reverse Fly",

        "Pike Push Up",

        "Cable Raise",

        "Shrug"

    ],



    legs:[

        "Squat",

        "Lunge",

        "Leg Press",

        "Calf Raise",

        "Romanian Deadlift",

        "Step Up",

        "Wall Sit",

        "Bulgarian Split Squat",

        "Jump Squat",

        "Glute Bridge"

    ],



    arms:[

        "Biceps Curl",

        "Hammer Curl",

        "Triceps Pushdown",

        "Skull Crusher",

        "Dips",

        "Close Grip Push Up",

        "Concentration Curl",

        "Cable Curl",

        "Overhead Extension",

        "Diamond Push Up"

    ],



    abs:[

        "Crunch",

        "Plank",

        "Leg Raise",

        "Russian Twist",

        "Mountain Climber",

        "Bicycle Crunch",

        "Hanging Knee Raise",

        "V-Up",

        "Side Plank",

        "Sit Up"

    ]

};



// ---------- Merge Library ----------

function mergeExerciseLibraries(){

    Object.keys(

        advancedExerciseLibrary

    )

    .forEach(muscle=>{


        if(

            exerciseLibrary[muscle]

        ){

            advancedExerciseLibrary[muscle]

            .forEach(name=>{


                const exists =

                    exerciseLibrary[muscle]

                    .some(

                        item=>

                        item.name===name

                    );


                if(!exists){


                    exerciseLibrary[muscle]

                    .push({

                        name:name,

                        kcal:50

                    });


                }


            });

        }


    });


    saveAllData();

}



// ---------- Exercise Count ----------

function getExerciseCount(){

    let count=0;


    Object.keys(

        advancedExerciseLibrary

    )

    .forEach(muscle=>{


        count +=

            advancedExerciseLibrary[muscle]

            .length;


    });


    return count;

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        mergeExerciseLibraries();


    }

);// ===========================
// OlyGYM - script.js (38-ci hissə)
// Workout Builder + Custom Exercise Creator
// ===========================


// ---------- Custom Exercises ----------

let customExercises = JSON.parse(

    localStorage.getItem(

        "olygym-custom-exercises"

    )

) || [];



// ---------- Save Custom Exercises ----------

function saveCustomExercises(){

    localStorage.setItem(

        "olygym-custom-exercises",

        JSON.stringify(

            customExercises

        )

    );

}



// ---------- Create Exercise ----------

function createCustomExercise(){

    const name =

        document.getElementById(

            "customExerciseName"

        )?.value.trim();



    const muscle =

        document.getElementById(

            "customExerciseMuscle"

        )?.value;



    const kcal =

        Number(

            document.getElementById(

                "customExerciseKcal"

            )?.value

        )

        || 50;



    if(

        !name ||

        !muscle

    ){

        showNotification(

            "Məlumatları doldur."

        );

        return;

    }



    const exercise = {

        id:

            Date.now(),


        name:name,


        muscle:muscle,


        kcal:kcal,


        created:

            new Date()

            .toISOString()

    };



    customExercises.push(

        exercise

    );


    saveCustomExercises();



    addExerciseToLibrary(

        exercise

    );



    showNotification(

        "Yeni məşq əlavə edildi."

    );

}



// ---------- Add To Library ----------

function addExerciseToLibrary(exercise){


    if(

        !exerciseLibrary[exercise.muscle]

    ){

        exerciseLibrary[exercise.muscle]=[];

    }



    exerciseLibrary[exercise.muscle]

    .push({

        name:exercise.name,

        kcal:exercise.kcal

    });


}



// ---------- Render Custom ----------

function renderCustomExercises(){

    const container =

        document.getElementById(

            "customExerciseList"

        );


    if(!container){

        return;

    }



    container.innerHTML="";



    customExercises.forEach(item=>{


        const card =

            document.createElement(

                "div"

            );


        card.className=

            "custom-exercise-card";



        card.innerHTML=

        `

        <h3>

            ${item.name}

        </h3>


        <p>

            Əzələ:

            ${item.muscle}

        </p>


        <p>

            🔥

            ${item.kcal}

            kcal

        </p>

        `;



        container.appendChild(

            card

        );


    });


}



// ---------- Builder ----------

function buildWorkout(){

    const selected =

        document.querySelectorAll(

            ".selected-exercise"

        );


    const workout=[];



    selected.forEach(item=>{


        workout.push({

            name:

                item.dataset.exercise,


            sets:3,


            reps:10

        });


    });



    return workout;

}



// ---------- Create Button ----------

function bindCreateExerciseButton(){

    const button =

        document.getElementById(

            "createExercise"

        );


    if(button){

        button.addEventListener(

            "click",

            createCustomExercise

        );

    }

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        renderCustomExercises();


        bindCreateExerciseButton();


    }

);// ===========================
// OlyGYM - script.js (39-cu hissə)
// Workout Sharing + Social Profile
// ===========================


// ---------- Shared Workouts ----------

let sharedWorkouts = JSON.parse(

    localStorage.getItem(

        "olygym-shared-workouts"

    )

) || [];



// ---------- Save Shared ----------

function saveSharedWorkouts(){

    localStorage.setItem(

        "olygym-shared-workouts",

        JSON.stringify(

            sharedWorkouts

        )

    );

}



// ---------- Share Workout ----------

function shareWorkout(){

    const workout = {

        id:

            Date.now(),


        user:

            account.username

            ||

            "Guest",


        exercise:

            currentWorkout.exercise

            ||

            "Məşq",


        muscle:

            currentWorkout.muscle

            ||

            "",


        sets:

            currentWorkout.sets

            ||

            0,


        reps:

            currentWorkout.reps

            ||

            0,


        calories:

            currentWorkout.calories

            ||

            0,


        likes:0,


        date:

            new Date()

            .toLocaleDateString()

    };


    sharedWorkouts.push(

        workout

    );


    saveSharedWorkouts();


    renderSharedWorkouts();


    showNotification(

        "Məşqin paylaşıldı."

    );

}



// ---------- Like System ----------

function likeWorkout(id){

    const workout =

        sharedWorkouts.find(

            item=>

            item.id===id

        );


    if(workout){

        workout.likes++;

    }


    saveSharedWorkouts();


    renderSharedWorkouts();

}



// ---------- Render Feed ----------

function renderSharedWorkouts(){

    const container =

        document.getElementById(

            "workoutFeed"

        );


    if(!container){

        return;

    }



    container.innerHTML="";



    sharedWorkouts

    .slice()

    .reverse()

    .forEach(item=>{


        const card =

            document.createElement(

                "div"

            );


        card.className=

            "shared-workout-card";



        card.innerHTML=

        `

        <h3>

            ${item.user}

        </h3>


        <p>

            ${item.exercise}

        </p>


        <p>

            ${item.sets}

            set ×

            ${item.reps}

            təkrar

        </p>


        <p>

            🔥

            ${item.calories}

            kcal

        </p>


        <button

        data-like="${item.id}">

            ❤️ ${item.likes}

        </button>

        `;



        container.appendChild(

            card

        );


    });



    bindLikeButtons();

}



// ---------- Like Buttons ----------

function bindLikeButtons(){

    document

    .querySelectorAll(

        "[data-like]"

    )

    .forEach(button=>{


        button.addEventListener(

            "click",

            ()=>{


                likeWorkout(

                    Number(

                        button.dataset.like

                    )

                );


            }

        );


    });

}



// ---------- Share Button ----------

function bindShareButton(){

    const button =

        document.getElementById(

            "shareWorkout"

        );


    if(!button){

        return;

    }



    button.addEventListener(

        "click",

        shareWorkout

    );

}



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        renderSharedWorkouts();


        bindShareButton();


    }

);// ===========================
// OlyGYM - script.js (40-cı hissə)
// Workout Reminder + Daily Notification System
// ===========================


// ---------- Reminder Data ----------

let reminders = JSON.parse(

    localStorage.getItem(

        "olygym-reminders"

    )

) || [];



// ---------- Save Reminders ----------

function saveReminders(){

    localStorage.setItem(

        "olygym-reminders",

        JSON.stringify(

            reminders

        )

    );

}



// ---------- Add Reminder ----------

function addReminder(){

    const title =

        document.getElementById(

            "reminderTitle"

        )?.value.trim();



    const time =

        document.getElementById(

            "reminderTime"

        )?.value;



    if(

        !title ||

        !time

    ){

        showNotification(

            "Xatırlatma məlumatlarını doldur."

        );

        return;

    }



    reminders.push({

        id:

            Date.now(),


        title:title,


        time:time,


        active:true

    });



    saveReminders();


    renderReminders();


    showNotification(

        "Xatırlatma əlavə edildi."

    );

}



// ---------- Render Reminders ----------

function renderReminders(){

    const container =

        document.getElementById(

            "reminderList"

        );


    if(!container){

        return;

    }



    container.innerHTML="";



    reminders.forEach(item=>{


        const card =

            document.createElement(

                "div"

            );


        card.className=

            "reminder-card";



        card.innerHTML=

        `

        <h3>

            ${item.title}

        </h3>


        <p>

            Vaxt:

            ${item.time}

        </p>


        <button

        data-remove-reminder="${item.id}">

            Sil

        </button>

        `;



        container.appendChild(

            card

        );


    });



    bindRemoveReminder();

}



// ---------- Remove Reminder ----------

function bindRemoveReminder(){

    document

    .querySelectorAll(

        "[data-remove-reminder]"

    )

    .forEach(button=>{


        button.addEventListener(

            "click",

            ()=>{


                reminders =

                    reminders.filter(

                        item=>

                        item.id !==

                        Number(

                            button.dataset.removeReminder

                        )

                    );



                saveReminders();


                renderReminders();


            }

        );


    });

}



// ---------- Check Reminder ----------

function checkReminders(){

    const now =

        new Date();


    const current =

        now.getHours()

        .toString()

        .padStart(2,"0")

        +

        ":"

        +

        now.getMinutes()

        .toString()

        .padStart(2,"0");



    reminders.forEach(item=>{


        if(

            item.active

            &&

            item.time===current

        ){

            showNotification(

                "Vaxtıdır: "

                +

                item.title

            );


        }


    });


}



// ---------- Reminder Button ----------

function bindReminderButton(){

    const button =

        document.getElementById(

            "addReminder"

        );


    if(button){

        button.addEventListener(

            "click",

            addReminder

        );

    }

}



// ---------- Start Checker ----------

setInterval(

    checkReminders,

    60000

);



// ---------- Init ----------

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        renderReminders();


        bindReminderButton();


    }

);
