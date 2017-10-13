import {EventEmitter} from 'events';
import Partner from './partner.model';
var PartnerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PartnerEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Partner.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PartnerEvents.emit(event + ':' + doc._id, doc);
    PartnerEvents.emit(event, doc);
  }
}

export default PartnerEvents;
