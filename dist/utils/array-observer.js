"use strict";
function observer(target) {
    const observable = {};
    const observables = [];
    function triggerEvent(eventName, ...args) {
        const event = observables.find(evt => evt.eventName === eventName);
        if (!event) {
            return undefined;
        }
        return event.callback.apply(event, args);
    }
    Object.defineProperties(observable, {
        on: {
            enumerable: true,
            value: function on(eventName, callback) {
                observables.push({ eventName, callback });
            }
        },
        remove: {
            enumerable: true,
            value: function remove(index) {
                const removedTarget = target[index];
                target.splice(index, 1);
                triggerEvent('remove', removedTarget);
                return target;
            }
        },
        insert: {
            enumerable: true,
            value: function insert(...items) {
                target.push.apply(target, items);
                triggerEvent('insert', items);
            }
        }
    });
    return Object.preventExtensions(observable);
}
