import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export type DateType = Dayjs;

export type Data = {
    weight: number;
    date: DateType;
}

const history: number[] = [85.4, 85.8, 85.1, 84.6, 84.8, 86.8, 84.8, 84.7, 84.6, 83.6, 83.3, 84.8, 84.9, 84.2, 84.3, 83.4, 84.3, 85.9, 85.5, 85.1, 84.9, 84.5, 85.1, 84.2, 84.3, 84.6, 85.3, 85.8, 84.5, 83.7, 84.9, 84.7, 85]

export type GetDataProps = {
    start?: DateType;
    duration?: number;
    end?: DateType;
    last?: number;
}

export function getData(props?: GetDataProps): Data[] {
    const data = history
        .map((weight, index) => ({ weight, date: dayjs().subtract(index, 'day') }))
        .sort((a, b) => a.date > b.date ? 1 : -1);
    if (!props) {
        return data;
    }

    const { start, end } = getDateRange(props);

    return data.filter(({ date }) => date.isBetween(start, end, null, '(]'));
}

export function addWeight(weight: number, data: Data[]): Data[] {
    return [...data, { weight, date: dayjs() }];
}


export type DateRange = { start: DateType, end: DateType };

function getDateRange({ start, end, duration, last }: GetDataProps): DateRange {
    if (!start && !end && !last) {
        throw new Error('GetDataProps must have start, end or last defined');
    }

    const result: Partial<DateRange> = {};

    if (last) {
        result.start = dayjs();
        result.end = result.start.subtract(last, 'day');
        return result as DateRange;
    }

    if (start) {
        result.start = start;
    }

    if (end) {
        result.end = end;
    }

    if (!start) {
        result.start = duration ? end!.subtract(duration, 'day') : dayjs(0);
    }

    if (!end) {
        result.end = duration ? start!.add(duration, 'day') : dayjs();
    }

    return result as DateRange;
}