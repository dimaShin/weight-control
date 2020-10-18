import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';


type WrapperProps = React.PropsWithChildren<{}>

function NativeWrapper({ children }: WrapperProps) {
    return (
        <SafeAreaView style={styles.main}>
            <KeyboardAvoidingView
                style={styles.main}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={20}
            >
                <TouchableWithoutFeedback
                    style={styles.main}
                    onPress={Keyboard.dismiss}
                >
                    <View style={styles.main}>
                        {children}
                    </View>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
            <StatusBar style="auto" />
        </SafeAreaView >
    );
}

function WebWrapper({ children }: WrapperProps) {
    return (
        <>{children}</>
    );
}

export const PlatformWrapper = Platform.select({
    native: NativeWrapper,
    default: WebWrapper,
})

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
});