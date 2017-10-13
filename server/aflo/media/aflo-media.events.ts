
import {EventEmitter} from 'events';
import AfloMedia from './aflo-media.model';
var AfloMediaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AfloMediaEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  AfloMedia.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AfloMediaEvents.emit(event + ':' + doc._id, doc);
    AfloMediaEvents.emit(event, doc);
  };
}

export default AfloMediaEvents;
