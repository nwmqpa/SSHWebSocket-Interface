function msg_sort(msg) {
	var data;
	try {
		data = JSON.parse(msg);
	} catch (e) {
		return("Parsing error:" + e); 
	}
	console.log(data);
	if (data.hasOwnProperty("stdout"))
		print_command_return(data)
	term.echo(return_slave_list(data));
}

function return_slave_list(object) {
	var text = ""
	for (var i = 0; i < object.length; i++) {
		if (object[i]["name"] != null) {
			text += text == "" ? "" : " ";
			text += object[i]["name"] 
		}
	}
	return text;
}

function print_command_return(object) {
	term.echo(object["stdout"].substring(0, object["stdout"].length - 1));
	connected = true;
}

function sleep (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}