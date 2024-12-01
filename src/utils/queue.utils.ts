export class Queue<T> {
  private storage: { [key: number]: T } = {};
  private head: number = 0;
  private tail: number = 0;

  enqueue(item: T): void {
    this.storage[this.tail] = item;
    this.tail++;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.storage[this.head];
    delete this.storage[this.head];
    this.head++;
    return item;
  }

  isEmpty(): boolean {
    return this.head === this.tail;
  }

  size(): number {
    return this.tail - this.head;
  }
}
