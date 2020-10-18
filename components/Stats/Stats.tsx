import * as React from 'react';
import { getStats } from "../../utils"
import { Text, View, StyleSheet } from 'react-native';
// @ts-ignore
import FlipNumbers from 'react-flip-numbers';

export default () => {
    return <FlipNumbers height={12} width={12} color="red" background="white" play perspective={100} numbers="12345" />;
};

type StatsProps = {
    data: number[],
}

export function Stats({ data }: StatsProps) {
    const { avarage, current } = getStats({ data });
    const labelStyle = [styles.fontColorLight, styles.fontSizeSmall];
    const currentStyle = [styles.fontSizeBig, current <= avarage.short ? styles.fontColorSuccess : styles.fontColorFail];
    const statsStyle = [styles.fontColorStrong, styles.fontSizeMedium];
    return (
        <View style={styles.main}>
            <View style={styles.currentBlock}>
                <Text style={labelStyle}>Current</Text>
                <Text style={currentStyle}>{current}</Text>
            </View>
            <View style={styles.previousBlock}>
                <View style={styles.statsBlock}>
                    <Text style={labelStyle}>last</Text>
                    <Text style={labelStyle}>{avarage.shortRange} days</Text>
                    <Text style={statsStyle}>{avarage.short}</Text>
                </View>
                <View style={styles.statsBlock}>
                    <Text style={labelStyle}>previous</Text>
                    <Text style={labelStyle}> {avarage.shortRange} days</Text>
                    <Text style={statsStyle}>{avarage.prevShort}</Text>
                </View>
                <View style={styles.statsBlock}>
                    <Text style={labelStyle}>last</Text>
                    <Text style={labelStyle}>{avarage.longRange} days</Text>
                    <Text style={statsStyle}>{avarage.long}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    currentBlock: {
        padding: 20,
        flex: 1,
        textAlign: 'center'
    },
    previousBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        textAlign: 'center'
    },
    statsBlock: {
        flex: 1,
        padding: 10,
    },
    weightBlock: {
        flex: 1,
        flexDirection: 'column',
    },
    fontSizeBig: {
        fontSize: 36,
    },
    fontSizeMedium: {
        fontSize: 28
    },
    fontSizeSmall: {
        fontSize: 14
    },
    fontColorSuccess: {
        color: '#5cb85c',
    },
    fontColorFail: {
        color: '#d9534f',
    },
    fontColorStrong: {
        color: '#292b2c',
    },
    fontColorLight: {
        color: '#bdc3c7',
    }
});