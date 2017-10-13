import {EventEmitter} from 'events';
import CatalogSource from './catalog-source.model';
var CatalogSourceEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CatalogSourceEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CatalogSource.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CatalogSourceEvents.emit(event + ':' + doc._id, doc);
    CatalogSourceEvents.emit(event, doc);
  }
}

export default CatalogSourceEvents;
