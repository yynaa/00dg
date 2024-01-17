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