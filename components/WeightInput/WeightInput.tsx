import * as React from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, Keyboard } from 'react-native';

type WeightInputProps = {
    onChange: (value: number) => void;
}

export function WeightInput({ onChange }: WeightInputProps) {
    const [value, setValue] = React.useState('');
    const handleSubmit = React.useCallback(() => {
        onChange(+value);
        setValue('');
        Keyboard.dismiss();
    }, [value]);

    return (
        <View style={styles.inputBlock}>
            <View style={styles.flex1}>
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    keyboardType="numeric"
                    placeholder="75.0"
                    style={styles.textInput}
                />
            </View>
            <View style={styles.flex1}>
                <TouchableOpacity style={styles.action} disabled={!value} onPress={handleSubmit}>
                    <Text style={styles.actionText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputBlock: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    flex1: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    action: {
        textAlign: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: '#f9f9f9',
        color: '#292b2c',
        borderRadius: 5,
        borderColor: '#292b2c',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    actionText: {
        fontSize: 18,
    },
    textInput: {
        height: 20,
        fontSize: 18,
        width: 50,
    }
});
