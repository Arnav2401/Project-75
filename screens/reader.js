import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SearchBar } from 'react-native-elements';
import db from '../config'
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from "react-native";
import { FlatList } from "react-native";


export default class Reader extends React.Component {

    constructor() {
        super()
        this.state = {
            search: null,
            titles: [],
            story: []
        }
    }

    searchingTitle = async (text) => {
        var searchtitle = await db
            .collection('stories')
            .where('author', '==', text)
            .get()
        searchtitle.docs.map(x => {
            this.setState({ titles: [...this.state.titles, x.data()] })
        })
    }

    componentDidMount = async () => {
        var story = await db
            .collection('stories')
            .get()
        story.docs.map(x => {
            this.setState({ story: [...this.state.story, x.data()] })
        })
    }



    // searchingAuthor = async () => {
    //     var searchauthor = await db
    //         .collection('stories')
    //         .where('author', '==', this.state.search)
    //         .get()
    //     searchauthor.docs.map(x => {
    //         this.setState({ authors: x.data() })
    //     })
    // }


    render() {
        return (

            <View>
                <View style={styles.view}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Search A Story'}
                        onChangeText={(search) => {
                            this.setState({ search: search })
                        }}
                        value={this.state.search}
                    />
                    <TouchableOpacity
                        onPress={() => {

                            this.searchingTitle(this.state.search)
                        }}
                    >
                        <FontAwesome name="search" size={24} color="white" style={styles.opacity} />
                    </TouchableOpacity>
                </View>


                <FlatList           

            data={this.state.search==null?(this.state.story):(this.state.titles)}
            renderItem={({item})=>{
                return(
                    <View style={{ borderBottomWidth: 2, margin: 8, padding: 8 }}>
                        <Text>Author: {item.author}</Text>
                        <Text style={{marginTop:8}}>Title: {item.title}</Text>
                        <Text style={{marginTop:8}}>Story: {item.story}</Text>
                    </View>
                )
                
            }}
            keyExtractor={(item,index)=>index.toString()}
            />

             </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 4,
        textAlign: 'center',
        width: 320,
        marginTop: 12,
        height: 40
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        justifyContent: 'center'
    },
    opacity: {
        borderWidth: 3,
        width: 50,
        marginTop: 12,
        height: 40,
        textAlign: 'center',
        backgroundColor: 'black',
        alignItems: 'center',
        padding: 7

    }
})
