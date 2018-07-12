function createWebSocket(server) {
	if ("WebSocket" in window) {
	    try {
			ws = new WebSocket("ws://" + server + ":8080/");
	    } catch (err) {
			$(".lead").html("<p style='color:red;'>Error in WebSocket connection.</p>");
	    }
	    ws.onopen = function (error) {
			$(".lead").html("<p style='color:green;'>Up and running</p>");
			if(window.timerID){
				window.clearInterval(window.timerID);
				window.timerID=0;
			}
	    };
	    ws.onclose = function (error) {
			$(".lead").html("<p style='color:red;'>Websocket has been closed.</p>");
			if(!window.timerID){
				window.timerID = setInterval(
				function () {
					createWebSocket(
					document.getElementById("ip_selection").value
					);
				}, 5000);
			}
	    };
	    
	    ws.onerror = function (error) {
			$(".lead").html("<p style='color:red;'>Error in WebSocket connection.</p>");
	    };
	    
	    ws.onmessage = function (evt) {
			var received_msg    = evt.data;
			msg_sort(received_msg);
		};
		return ws
	} else {
	    alert("Websocket not found on the browser.");
	}
}