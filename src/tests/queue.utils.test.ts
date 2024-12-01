import { Queue } from './queue';

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  test('should initialize an empty queue', () => {
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
  });

  test('should enqueue items', () => {
    queue.enqueue(1);
    expect(queue.isEmpty()).toBe(false);
    expect(queue.size()).toBe(1);

    queue.enqueue(2);
    expect(queue.size()).toBe(2);
  });

  test('should dequeue items in FIFO order', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.size()).toBe(2);

    expect(queue.dequeue()).toBe(2);
    expect(queue.size()).toBe(1);

    expect(queue.dequeue()).toBe(3);
    expect(queue.isEmpty()).toBe(true);
  });

  test('should return undefined when dequeuing from an empty queue', () => {
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.isEmpty()).toBe(true);
  });

  test('should handle enqueue and dequeue operations correctly', () => {
    for (let i = 1; i <= 5; i++) {
      queue.enqueue(i);
    }
    expect(queue.size()).toBe(5);

    for (let i = 1; i <= 5; i++) {
      expect(queue.dequeue()).toBe(i);
    }
    expect(queue.isEmpty()).toBe(true);
  });

  test('should correctly report size after multiple operations', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.size()).toBe(2);

    queue.dequeue();
    expect(queue.size()).toBe(1);

    queue.enqueue(3);
    expect(queue.size()).toBe(2);

    queue.dequeue();
    queue.dequeue();
    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);
  });

  test('should handle enqueue after dequeueing all items', () => {
    queue.enqueue(1);
    queue.dequeue();
    expect(queue.isEmpty()).toBe(true);

    queue.enqueue(2);
    expect(queue.isEmpty()).toBe(false);
    expect(queue.dequeue()).toBe(2);
    expect(queue.isEmpty()).toBe(true);
  });

  test('should handle large number of enqueue and dequeue operations', () => {
    const numOperations = 1000;
    for (let i = 0; i < numOperations; i++) {
      queue.enqueue(i);
    }
    expect(queue.size()).toBe(numOperations);

    for (let i = 0; i < numOperations; i++) {
      expect(queue.dequeue()).toBe(i);
    }
    expect(queue.isEmpty()).toBe(true);
  });

  test('should not throw error when dequeueing from empty queue multiple times', () => {
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.isEmpty()).toBe(true);
  });

  test('should maintain correct state after mixed operations', () => {
    queue.enqueue(1);
    expect(queue.dequeue()).toBe(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(2);
    queue.enqueue(4);
    expect(queue.dequeue()).toBe(3);
    expect(queue.dequeue()).toBe(4);
    expect(queue.isEmpty()).toBe(true);
  });
});
