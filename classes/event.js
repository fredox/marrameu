class Event {
	static init() {
		Event.handlers = {};
	}

	static emit(event, data={}) {
		if (Event.handlers.hasOwnProperty(event))
        	for (var callback of Event.handlers[event])
            	callback(data);
	}

	static on(event, callback) {
		if (typeof Event.handlers[event] != 'undefined')
            Event.handlers[event].push(callback);
        else
            Event.handlers[event] = [callback];
	}

	static remove() {
		delete Event.handlers[event];
	}
}

export default Event;