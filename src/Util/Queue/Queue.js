// 행동 큐
// 애니메이션은 시간이 걸린다 -> 한번에 많은 동작을 할 수 없다. ->  대기열 큐가 필요하다?

// 서버에서 
export default class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) {
            return "empty queue";
        }
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    front() {
        if (this.isEmpty()) {
            return "empty queue";
        }
        return this.items[0];
    }
}