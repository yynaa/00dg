# 00dg
a donation goal tracker styled like the internet of the 00s

## Requirements
1. install [python](https://www.python.org/downloads/) and [pip](https://pip.pypa.io/en/stable/installation/)
2. install pip package `fastapi`: `pip install fastapi`
3. install `uvicorn` or another webserver. *this tutorial will use `uvicorn`.* you can install `uvicorn` from apt or pip.

## Setup
1. clone the repository anywhere you'd like. `git clone https://github.com/yynaa/00dg`
2. in the root of the repo, run `uvicorn run:app --port 9650`
3. in OBS, create a new browser source
4. set it's path to local, and set it to be `tracker.html`
5. open `dashboard.html` to remove donation goals

## Customisation - sample settings file
```pyp
settings = {
    "incoming": 3, # how many incoming goals
    "reversed": False, # if True, goals appear at the bottom
    "api": {
        "ws": "ws://mywebsocket.xyz",
        "message": { "op": "sub", "msg": "donations" }, # message to send to the websocket to subscribe
        # see script.js:socket.onmessage to edit the receiving routine
    },
    "goals": [
        {
            "goal": 420.69,
            "description": "Goal 1",
            "hue": 0,
            "image": "assets/icon.png",
            "background": "assets/background.png"
        }
    ]
}
```

