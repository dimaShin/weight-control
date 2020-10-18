import { Svg, Circle } from "react-native-svg";
import React from "react";
import { StyleSheet, View } from 'react-native';
import { Data } from "../../data";

export type ChartProps = {
    data: Data[];
}

export type Scale = {
    getPositionFor: (v: number, i: number) => { x: number, y: number };
}

const VIEW_BOX = {
    HEIGHT: 300,
    WIDTH: 300,
    OFFSET: 20,
}

export function Chart({ data }: ChartProps) {
    const weights = data.map(({ weight }) => weight);
    const scale = getScale(weights);
    return (
        <Svg viewBox={`0 0 ${VIEW_BOX.WIDTH + VIEW_BOX.OFFSET * 2} ${VIEW_BOX.HEIGHT + VIEW_BOX.OFFSET * 2}`}>
            {data.map((d, index) => <Dot value={d.weight} index={index} scale={scale} key={d.date.toString()} />)}
        </Svg>
    );
}

function Dot({ value, scale, index, radius = 2, fill = '#000' }: { value: number, scale: Scale, index: number, radius?: number, fill?: string }) {
    const { x, y } = scale.getPositionFor(value, index);
    return <Circle cx={x} cy={y} r={radius} fill={fill} />
}

function getScale(data: number[]): Scale {
    const min = data.reduce((a, b) => a < b ? a : b);
    const max = data.reduce((a, b) => a > b ? a : b);
    const scale = max - min;

    return {
        getPositionFor: (value: number, index: number) => {
            const diff = value - min;
            console.log({ diff, min, max });
            return {
                y: VIEW_BOX.OFFSET + (diff / scale * VIEW_BOX.HEIGHT),
                x: VIEW_BOX.OFFSET + (VIEW_BOX.WIDTH / (data.length - 1)) * index,
            };
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 30,
    },
    chart: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 300,
        height: 300,
    },
    yAxis: {
        position: 'absolute',
        left: -30,
        top: 0,
        width: 30,
        height: 300,
    },
    xAxis: {
        position: 'absolute',
        left: 0,
        top: 300,
        width: 300,
        height: 30,
    }
});

function getTrends(values: number[]): number[] {
    const trends = [];
    for (let i = 2; i < values.length; i++) {
        const offset = getOffset(values.slice(0, i));
        trends.push(offset);
    }
    return trends;
}

function getOffset(values: number[]): number {
    let offset = values[values.length - 1] - values[values.length - 2];

    for (let i = values.length - 3; i >= 1; i--) {
        const localOffset = values[i] - values[i - 1];
        debugger;
        offset = (offset + localOffset / 2);
    }

    return offset;
}
