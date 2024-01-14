import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Modal, TextInput, Keyboard, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
let flag=true;
let flaga=true;
const storeData = async (key, contacts) => {
  try {
    const jsonValue = JSON.stringify(contacts)
    await AsyncStorage.setItem(`@${key}`, jsonValue)
  } catch (e) {
    // saving error
  }
  console.log(contacts);
}

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}

export default class App extends React.Component {

  state = {
    contacts: [{
      fname: "Mohit",
      lname: "Kumar",
      gpa: "3.2",
      studentid: "1",
    },
    {
      fname: "Roch",
      lname: "Bajracharya",
      gpa: "4",
      studentid: "2"
    }],
    modalVisible: false,
    fname: "",
    lname: "",
    gpa: "",
    studentid: "",
    currentIndex: 0
  }
  componentDidMount() {
    getData('key').then(result => {
      if (result) {
        this.setState({ contacts: result })
      }
      else {
        storeData('key', this.state.contacts)
        // this.setState({contacts: result})
      }
    })
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }


  deletevalue = () => {
    let temp = this.state.contacts;
    temp.splice(this.state.currentIndex, 1);
    this.setState({ contacts: temp, currentIndex: 0 })
    storeData('key', temp);
  }

  sortbygpa = () => {
    let temp = this.state.contacts;
    flag=!flag;
    // if(gpaReverse)
    // temp.reverse();
    if(flag)
    {
    temp = temp.sort((a, b) => (+a.gpa) - (+b.gpa));
    this.setState({ contacts: temp, currentIndex: 0 })
    storeData('key', temp);

    }
    else
    {
    temp=temp.reverse();
    this.setState({ contacts: temp, currentIndex: 0 })
    storeData('key', temp);
    }
  }
  sortbylastname = () => {
    let temp = this.state.contacts;
    flaga=!flaga;
    if(flaga)
    {
    temp = temp.sort((a, b) => {
      if (a.lname < b.lname) { return -1; }
      if (a.lname > b.lname) { return 1; }
      return 0;
    });
    this.setState({ contacts: temp, currentIndex: 0 })
    storeData('key', temp);
  }
  else
  {
    temp = temp.sort((a, b) => {
      if (a.lname < b.lname) { return -1; }
      if (a.lname > b.lname) { return 1; }
      return 0;
    });
    temp = temp.reverse();
    this.setState({ contacts: temp, currentIndex: 0 })
    storeData('key', temp);
  }
  }
  addContact = () => {
    let contactsCopy = JSON.parse(JSON.stringify(this.state.contacts));
    contactsCopy.push({
      fname: this.state.fname,
      lname: this.state.lname,
      gpa: this.state.gpa,
      studentid: this.state.studentid
    });
    storeData('key', contactsCopy)
    this.setState({ contacts: contactsCopy })
    this.setState({
      fname: "",
      lname: "",
      gpa: "",
      studentid: ""
    })
    this.setModalVisible(!this.state.modalVisible)

  }

  _renderItem = (item) => {
    return (
      <TouchableOpacity style={stylesfla.itemStyle}>
        <Text style={styles.fname}>
          {item.fname}
        </Text>
        <Text style={styles.lname}>
          {item.lname}
        </Text>
        <Text style={styles.studentid}>
          {item.studentid}
        </Text>
        <Text style={styles.gpa}>
          {item.gpa}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <SafeAreaView style={styles.container}>
            <TouchableHighlight
              style={{ flex: 1, width: '100%', justifyContent: 'center' }}
              onPress={() => Keyboard.dismiss()}
              underlayColor={'#ffffff00'}>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <Text
                  style={styles.headerStyle}>
                  New Student
                </Text>
                <View style={styles.labelAndInput}>
                  <Text style={styles.label}> fName </Text>
                  <TextInput
                    autoCorrect={false}
                    style={styles.TextInput}
                    value={this.state.fname}
                    onChangeText={(text) => this.setState({ fname: text })} />
                </View>
                <View style={styles.labelAndInput}>
                  <Text style={styles.label}> LName </Text>
                  <TextInput
                    autoCorrect={false}
                    style={styles.TextInput}
                    value={this.state.lname}
                    onChangeText={(text) => this.setState({ lname: text })} />
                </View>
                <View style={styles.labelAndInput}>
                  <Text style={styles.label}> Student Id </Text>
                  <TextInput
                    keyboardType='number-pad'
                    style={styles.TextInput}
                    value={this.state.studentid}
                    onChangeText={(text) => this.setState({ studentid: text })} />
                </View>
                <View style={styles.labelAndInput}>
                  <Text style={styles.label}> GPA </Text>
                  <TextInput
                    keyboardType='number-pad'
                    style={styles.TextInput}
                    value={this.state.gpa}
                    onChangeText={(text) => this.setState({ gpa: text })} />
                </View>
                <TouchableOpacity
                  onPress={this.addContact}
                  style={[styles.addButton, { marginTop: 32 }]}>
                  <Text style={styles.addText}> Add new contact </Text>
                </TouchableOpacity>
              </View>
            </TouchableHighlight>
          </SafeAreaView>
        </Modal>
        <Text
          style={styles.headerStyle}>
          Student Info
        </Text>
        {/* <View style={[styles.separtor, {width: '100%'}]}/>
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListInner}
          data={this.state.contacts}
          renderItem={({item}) => this._renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separtor}/>}
        />
        <View> */}

        <View style={styles.container}>
          <Text>Student Id: {this.state.contacts.length ? this.state.contacts[this.state.currentIndex].studentid : ''}</Text>
          <Text>First Name: {this.state.contacts.length ? this.state.contacts[this.state.currentIndex].fname : ''}</Text>
          <Text>Last Name: {this.state.contacts.length ? this.state.contacts[this.state.currentIndex].lname : ''}</Text>
          <Text>GPA: {this.state.contacts.length ? this.state.contacts[this.state.currentIndex].gpa : ''}</Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              disabled={this.state.currentIndex === 0}
              style={styles.button}
              onPress={() => this.state.currentIndex > 0 ? this.setState({ currentIndex: this.state.currentIndex - 1 }) : {}}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={this.state.currentIndex === (this.state.contacts.length - 1)}
              style={styles.button}
              onPress={() => this.state.currentIndex < (this.state.contacts.length - 1) ? this.setState({ currentIndex: this.state.currentIndex + 1 }) : {}}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.setModalVisible(true)}
          style={styles.addButton}>
          <Text style={styles.addText}> Add new Student </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.deletevalue('key')}
          style={styles.addButton}>
          <Text style={styles.addText}> Delete </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.sortbygpa}
          style={[styles.addButton, { marginTop: 32 }]}>
          <Text style={styles.addText}> Sort by GPA </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.sortbylastname}
          style={[styles.addButton, { marginTop: 32 }]}>
          <Text style={styles.addText}> Sort by Last Name </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16
  },
  flatList: {
    width: '100%',
    flex: 1,
  },
  flatListInner: {
    alignItems: 'stretch',
  },
  itemStyle: {
    padding: 8,
    paddingLeft: 16,
    backgroundColor: 'white'
  },
  name: {
    fontSize: 18,
    marginBottom: 8
  },
  number: {
    fontSize: 12,
    color: '#4E4E4E'
  },
  separtor: {
    height: 1,
    backgroundColor: '#A5A5A5',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  addText: {
    color: 'white'
  },
  labelAndInput: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center'
  },
  label: {
    fontSize: 16,
    color: '#4E4E4E'
  },
  TextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingLeft: 8,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 16,
    marginLeft: 8
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5
  }
});