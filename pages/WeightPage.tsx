import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chart } from '../components/Chart';
import { Stats } from '../components/Stats';
import { WeightInput } from '../components/WeightInput';
import { WeightsStore } from '../store';

export function WeightPage() {
    const weightsStore = new WeightsStore();
    const [data, setData] = React.useState(weightsStore.get());
    const handleInput = React.useCallback((value) => { setData(weightsStore.add(value)) }, []);
    const weights = data.map(({ weight }) => weight);
    return (
        <View style={styles.contentView}>
            <View style={styles.bigBlock}>
                <Stats data={weights} />
            </View>
            <View style={styles.bigBlock}>
                <Chart data={data} />
            </View>
            <View style={styles.inputBlock}>
                <WeightInput onChange={handleInput} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    bigBlock: {
        flex: 2,
        padding: 20,
    },
    inputBlock: {
        flex: 1,
    },
});