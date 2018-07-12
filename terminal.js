var ws = createWebSocket(document.getElementById("ip_selection").value);
var connected = false;
var pswd_connected = "";
var slave_connected = "";

var term = $('.term #ssh').terminal({
    help: function() {
        this.echo("Available commands :\n" +
                    "\tlist\tList the currently available slaves.\n" + 
                    "\tconnect <slave_name>\tConnect to this slave.\n", {
            keepWords: true
        });
    },
    list: function() {
        ws.send("list")
    },
    connect: function() {
        this.push(function(command, term) {
            ws.send(JSON.stringify({"slave": slave_connected, "command": command, "pswd": pswd_connected}))
        }, {
            prompt: ' $> ',
            login: function(slave, password, callback) {
                var shaObj = new jsSHA("SHA-512", "TEXT");
                shaObj.update(password);
                password = shaObj.getHash("HEX");
                ws.send(JSON.stringify({"slave": slave, "command": "", "pswd": password}));
                sleep(500).then(() => {
                    if (connected) {
                        slave_connected = slave
                        pswd_connected = password
                        callback(true)
                    } else {
                        callback(null);
                    }
                });
            }
        });
    }
    }, {
    greetings: false,
    onInit: function(term) {
        term.echo('SSH via Websockets, type [[b;#fff;]help] to display '+
                    'available commands.', {
            keepWords: true
        });
    },
    completion: true,
    keydown: function(e, term) {
    }
});