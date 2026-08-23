export type EventCallback<T = any> = (data: T) => void;

export class EventEmitter {
  private events: Map<string, Set<EventCallback>> = new Map();

  on<T = any>(event: string, callback: EventCallback<T>): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    const callbacks = this.events.get(event)!;
    callbacks.add(callback);
    return () => this.off(event, callback);
  }

  once<T = any>(event: string, callback: EventCallback<T>): () => void {
    const wrapper: EventCallback<T> = (data: T) => {
      this.off(event, wrapper);
      callback(data);
    };
    return this.on(event, wrapper);
  }

  off(event: string, callback: EventCallback): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.events.delete(event);
      }
    }
  }

  emit<T = any>(event: string, data?: T): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(data);
        } catch (err) {
          console.error(`[EventEmitter] Error in listener for event "${event}":`, err);
        }
      });
    }
  }

  clear(): void {
    this.events.clear();
  }
}
