import * as React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert, ToastAndroid } from "react-native";
import db from '../config'

export default class Writer extends React.Component {

    constructor() {
        super()
        this.state = {
            title: undefined,
            author: undefined,
            story: undefined
        }
    }

    write = () => {
        db.collection('stories').add({
            author: this.state.author,
            title: this.state.title,
            story: this.state.story
        })
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled
                behavior={'padding'}
                keyboardVerticalOffset={50}
            >

                <View style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <TextInput
                        style={styles.input}
                        placeholder='Title'
                        onChangeText={(title) => {
                            this.setState({
                                title: title,
                            })
                        }}
                        value={this.state.title}
                    />

                    <TextInput
                        style={[styles.input, { marginTop: 30 }]}
                        placeholder='Author'
                        onChangeText={(author) => {
                            this.setState({
                                author: author,
                            })
                        }}
                        value={this.state.author}

                    />

                    <TextInput
                        style={[styles.input, { marginTop: 30 }, { height: 320 }]}
                        placeholder='Write Your Story'
                        multiline={true}
                        onChangeText={(story) => {
                            this.setState({
                                story: story,
                            })
                        }}
                        value={this.state.story}
                    />

                </View>
                <TouchableOpacity onPress={() => {

                    if (this.state.story === undefined || this.state.author === undefined || this.state.title === undefined) {
                        Alert.alert('Warning', 'All Fields Are Mandatory', [{ text: "OK" }])
                        return;
                    }

                    else {

                        ToastAndroid.showWithGravityAndOffset(
                            "Your Story Is Submitted",
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            20,
                            120
                        )
                        this.write()
                        this.setState({
                            title: undefined,
                            author: undefined,
                            story: undefined
                        })
                    }
                }}>
                    <Text style={styles.button}>Submit</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 80,
        borderWidth: 3,
        width: 380,
        height: 50
    },
    button: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'black',
        height: 60,
        paddingTop: 20,
        fontWeight: 'bold',

    }
})








