type EventCallback = (event: Event) => void;

export class EventEmitter {
    private events: Map<string, EventCallback[]> = new Map();

    on(event: string, callback: EventCallback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)?.push(callback);
    }

    off(event: string, callback: EventCallback) {
        const listeners = this.events.get(event);
        if (listeners) {
            this.events.set(event, listeners.filter((listener) => listener !== callback));
        }
    }

    emit(event: string, data: Event) {
        const listeners = this.events.get(event);
        if (listeners) {
            listeners.forEach((listener) => listener(data));
        }
    }
}
