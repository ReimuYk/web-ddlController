/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  TouchableOpacity,
  ListView,
} from 'react-native';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';

function $(NID){
  return document.getElementById(NID);
}

export default class App extends Component {    
  constructor(props){
    super(props)
    var ds = new ListView.DataSource({
      rowHasChanged:(r1,r2) => r1!==r2,
    })
    this.state = {
      dataSource:ds,
      data:["h","e","l","l","o"]
    }
  }
  _renderRow(rowData,rowID){
    return(
      <Text>{rowData+'     '+rowID}</Text>
    )
  }
  render() {
    return (
      <ScrollableTabView 
      tabBarPosition='bottom'
      renderTabBar={()=><DefaultTabBar/>}>
        <View tabLabel="tab1" style={styles.container}>
          <TouchableOpacity onPress={()=>this.printdata("http://10.162.103.75:9000/else")}>
              <Text>printdata</Text>
          </TouchableOpacity>
          <Text>ajklsd</Text>
          <TouchableOpacity onPress={()=>this.postdata()}>
              <Text>postdata</Text>
          </TouchableOpacity>
        </View>

        <View tabLabel="tab2" style={styles.container}>
          <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
              renderRow={(rowData,sectionId,rowId)=>this._renderRow(rowData,rowId)}
              showsVerticalScrollIndicator={false}
          />
        </View>


      
      </ScrollableTabView>
    );
  }
  printdata = (conf)=>{
    console.log("printdata")
    // conf="http://10.162.103.75:9000/else";
    let options = {};
    options.method = 'GET';
    fetch(conf,options).then(function(response) { return response.text(); })
    .then(function(data) {
      console.log("data::")
      console.log(data)
      console.log("other")
      data = eval('('+data+')')
      for (var i = 0; i < data.length; i++) {
        console.log(data[i])
      }
    });
    // fetch(conf,options).then(function(response) { 
    //   console.log(response.text())
    // })
  }
  postdata = ()=>{
    console.log("postdata");
    url = "http://10.162.103.75:9000/new/"
    let options = {};
    options.method = 'POST'
    options.headers = {'Content-Type':'application/json'}
    options.body = JSON.stringify({
      'postData':'datadatadata'
    })
    fetch(url,options).then(function(res){
      console.log("status",res.status);
      
      })
    }

  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
