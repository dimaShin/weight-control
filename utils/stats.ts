enum DEFAULT_AVARAGE_RANGES {
    LONG = 30,
    SHORT = 5,
};

export type AvarageType = {
    long: number | null;
    short: number;
    prevShort: number | null;
    shortRange: number;
    longRange: number;
}

export type StatsType = {
    avarage: AvarageType;
    current: number;
}

type StatsArgs = {
    data: number[],
    ranges?: {
        short: number,
        long: number,
    }
}

export function getStats({ data, ranges = { short: DEFAULT_AVARAGE_RANGES.SHORT, long: DEFAULT_AVARAGE_RANGES.LONG } }: StatsArgs) {
    const length = data.length;
    const avarage: AvarageType = {
        short: getAvarage(data, ranges.short),
        long: length >= ranges.long ? getAvarage(data, ranges.long) : null,
        prevShort: length >= ranges.short * 2 ? getAvarage(data.slice(0, length - ranges.short), ranges.short) : null,
        shortRange: length >= ranges.short ? ranges.short : length,
        longRange: ranges.long,
    }

    return { avarage, current: data[length - 1] };
}

function getAvarage(data: number[], range: number, precise: number = 1): number {
    const length = data.length;
    const sliceIndex = length > range ? length - range : 0;
    const avarage = data.slice(sliceIndex).reduce((avarage: number, value: number) => (avarage + value) / 2);
    console.log(`avarage for ${range} is ${avarage} and sliceIndex is ${sliceIndex} and size of statistic is ${data.slice(sliceIndex).length}`);
    const power = Math.pow(10, precise);
    return Math.round(avarage * power) / power;
}