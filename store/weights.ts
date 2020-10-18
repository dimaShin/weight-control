import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export type DateType = Dayjs;

export type Weight = {
    weight: number;
    date: DateType;
}

const history = [85.4, 85.8, 85.1, 84.6, 84.8, 86.8, 84.8, 84.7, 84.6, 83.6, 83.3, 84.8, 84.9, 84.2, 84.3, 83.4, 84.3, 85.9, 85.5, 85.1, 84.9, 84.5, 85.1, 84.2, 84.3, 84.6, 85.3, 85.8, 84.5, 83.7, 84.9, 84.7, 85];

export class WeightsStore {
    private store: Weight[] = [];

    constructor(initialData: number[] = history) {
        this.store = initialData
            .map((weight, index) => ({ weight, date: dayjs().subtract(index, 'day') }))
            .sort((a, b) => a.date > b.date ? 1 : -1);
    }

    public get() {
        return this.store;
    }

    public add(weight: number): Weight[] {
        this.store = [...this.store, { weight, date: dayjs() }];
        return this.store;
    }
}