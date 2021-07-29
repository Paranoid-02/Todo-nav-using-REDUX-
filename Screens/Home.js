import React, { useState } from 'react'
import { View, Text, Button, FlatList, TouchableOpacity,TextInput,StyleSheet } from 'react-native'
import { global } from '../styles/global';
import { useSelector,useDispatch } from 'react-redux';
import {addTask,didTask,deleteTask} from '../store/taskAction';

const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks) //from store 
    const [text,setText] = useState('')
    const changeHandler = (val)=>{
      setText(val)
    }   

    const submitTask = (text) => dispatch(addTask(text))
    const removeTask = id => dispatch(deleteTask(id))
    const finishTask = id => dispatch(didTask(id))

    return (
        <View style={global.container}>
            <TextInput  
            style={styles.input}
            placeholder= "ADD NEW TASK"
            onChangeText={changeHandler}
            />
        <Button  title = "Add Task"
                 color = 'blue'
                onPress ={()=>submitTask(text)}
         />
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TouchableOpacity style={global.item} onPress={() => navigation.navigate("Task", item)}>
                        <Text onPress={()=>{finishTask(item.id)}}
                        style={item.done? null:{fontWeight:'bold'}}>{item.task}</Text>
                        <Button title="Delete" onPress={()=>{removeTask(item.id)}}/>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    input :{
        paddingVertical : 6,
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor:'grey',
        margin:10,
        borderStyle:'dashed'
    }
  });

export default Home
