// fetch from API

let fetching = true;
fetch("http://localhost:9650/api/settings")
    .then(response => response.json())
    .then(data => {
        // set the settings
        settings = data;
        // set fetching to false
        fetching = false;
        // call settings found
        settingsFound();
    })

setTimeout(function(){
    if (fetching) {
        fetching = false;
        document.write("Error: Settings not found from API")
    }
}, 5000)

function settingsFound() {
    // check if reversed

    if (settings.reversed) {
        document.getElementById("container").style = "flex-direction: column;";
    }

    // get the incoming

    var incoming = settings.incoming;

    // get the goals

    var goals = settings.goals;

    // get the template

    var template = document.getElementById("goal-template");

    // get the container

    var container = document.getElementById("container");

    // how many goals non reached goals are displayed

    var goalsDisplayed = 0;
    var totalGoals = 0;

    // function to create a goal

    function createGoal(id) {
        // get the goal
        var goal = goals[id];
        // create a clone of the template
        clone = template.content.cloneNode(true);
        // set the id
        clone.querySelector(".goal").id = "goal-" + id;
        // set the image
        clone.querySelector(".goal-icon").src = goal.image;
        // set the background
        clone.querySelector(".goal-bg").src = goal.background;
        // set the background hue
        clone.querySelector(".goal-bg").style.filter = "hue-rotate(" + goal.hue + "deg)";
        // set the goal
        clone.querySelector(".goal-info").querySelector("h1").innerHTML = goal.goal.toFixed(2);
        clone.querySelector(".goal-info").querySelector("p").innerHTML = goal.description;
        // append the clone to the container
        container.appendChild(clone);
        // update counter
        goalsDisplayed++;
        totalGoals++;
    }

    // function to remove a goal

    function removeGoal(id) {
        // get the goal
        var goal = goals[id];
        // get the goal element
        var goalElement = document.getElementById("goal-" + id);
        // remove the element
        goalElement.remove();
    }

    // function to remove a goal from price

    function removeGoalFromPrice(price) {
        // loop through goals and remove the matching one
        for (var i = 0; i < goals.length; i++) {
            if (goals[i].goal == price) {
                removeGoal(i);
                break;
            }
        }
    }

    // function to remove all goals which have been reached

    function removeAllReachedGoals(){
        // loop through goals and remove the matching one
        for (var i = 0; i < goals.length; i++) {
            if (goals[i].goal < old_mone) {
                removeGoal(i);
            }
        }
    }

    // function to complete the goals

    function completeGoal(id) {
        // get the goal
        var goal = goals[id];
        // get the goal element
        var goalElement = document.getElementById("goal-" + id);
        // update counter
        goalsDisplayed--;
        // set background saturation to 0
        goalElement.querySelector(".goal-bg").style.filter = "saturate(0)";
        //if autocomplete
        if (settings.autocomplete) {
            removeGoal(id)
        }
    }

    // updater
    var old_mone = 0;
    function update(mone){
        // check if a goal was reached using old mone
        for (var i = 0; i < goals.length; i++) {
            if (old_mone < goals[i].goal && mone >= goals[i].goal) {
                if (i >= totalGoals) {
                    createGoal(i);
                }
                completeGoal(i);
            }
        }

        // make sure there are enough goals displayed
        while (totalGoals < goals.length && goalsDisplayed < incoming) {
            // get the goal id
            var id = totalGoals;
            // create the goal
            createGoal(id);
        }

        // update old mone
        old_mone = mone;
    }

    update(0);

    // get the queue

    function getQueue(){
        fetch("http://localhost:9650/api/queue")
            .then(response => response.json())
            .then(data => {
                let command = data.command
                let value = data.value

                if (command == "delete"){
                    removeGoalFromPrice(value)
                }
                if (command == "deleteall"){
                    removeAllReachedGoals()
                }
            })
        }

    // regularly get the queue
    setInterval(getQueue, 2000)

    // create the websocket

    var socket = new WebSocket(settings.api.ws);

    // subscribe

    socket.onopen = function(e) {
        socket.send(JSON.stringify(settings.api.message));
    };

    // handle messages

    socket.onmessage = function(event) {
        // get the message
        var message = JSON.parse(event.data);
        // check if data is correct
        if (message.r != "pot") return;
        // get the mone
        var mone = message.d.pot;
        // update
        update(mone/100);
    };

}