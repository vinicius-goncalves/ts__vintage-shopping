interface ObservableFunctions<T> {
    remove: (index: number) => Array<T>;
    insert: (...items: Array<T>) => Array<T>;
    on: (eventName: CustomEvents<T> & string, callback: (...args: any[]) => void) => Array<T>;
}

type CustomEvents<T> = Exclude<keyof ObservableFunctions<T>, 'on'>;

function observer<T = any>(target: Array<T>) {

    const observable = {};
    const observables: Array<{ eventName: string, callback: (...args: any[]) => void }> = [];

    function triggerEvent(eventName: CustomEvents<T> & string, ...args: any[]): void | undefined {

        const event = observables.find(evt => evt.eventName === eventName);

        if(!event) {
            return undefined;
        }

        return event.callback.apply(event, args);
    }

    Object.defineProperties(observable, {
        on: {
            enumerable: true,
            value: function on(eventName: string, callback: (...args: any[]) => void) {
                observables.push({ eventName, callback });
            }
        },

        remove: {
            enumerable: true,
            value: function remove(index: number) {

                const removedTarget = target[index];

                target.splice(index, 1);
                triggerEvent('remove', removedTarget);

                return target;
            }
        },

        insert: {
            enumerable: true,
            value: function insert(...items: Array<T>) {
                target.push.apply(target, items);
                triggerEvent('insert', items);
            }
        }
    });

    return Object.preventExtensions(observable) as ObservableFunctions<T>;
}