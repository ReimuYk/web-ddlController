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
  TextInput,
} from 'react-native';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';

function $(NID){
  return document.getElementById(NID);
}

var dataa=[];
var urlhead = "http://39.106.198.27:9000/"
// urlhead = "http://192.168.1.109:9000/"
export default class App extends Component {    
  constructor(props){
    super(props)
    var ds = new ListView.DataSource({
      rowHasChanged:(r1,r2) => r1!==r2,
    })
    this.state = {
      dataSource:ds,
      data:[{'n1':'data1'}],
      newdata_name:'',
      newdata_ddl:'',
      newdata_content:'',
    }
  }
  _renderRow(rowData,rowID){
    return(
      <View style={{flexDirection:'row'}}>
        <View style={{borderWidth:1,marginTop:-1,flex:4}}>
          <Text>    name:{rowData['n1']}  id:{rowData['id']}</Text>
          <Text style={{fontWeight:'bold'}}>    DDL:{rowData['ddl']}</Text>
          <Text>    content:{rowData['content']}</Text>
        </View>
        <View style={{flex:1}}>
          <TouchableOpacity onPress={()=>this.modifyDDL(rowData)}>
            <Text style={{borderWidth:1,textAlign:'center'}}>修改</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1}}>
          <TouchableOpacity onPress={()=>this.deleteDDL(rowData)}>
            <Text style={{borderWidth:1,textAlign:'center'}}>删除</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  render() {
    return (
      <ScrollableTabView 
      tabBarPosition='bottom'
      renderTabBar={()=><DefaultTabBar/>}>

        <View tabLabel="DDLs" style={styles.container}>
          <TouchableOpacity onPress={()=>this.refreshDDL()}>
              <Text style={{borderWidth:1,textAlign:'center'}}>refresh list</Text>
          </TouchableOpacity>
          <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
              renderRow={(rowData,sectionId,rowId)=>this._renderRow(rowData,rowId)}
              showsVerticalScrollIndicator={false}
              enableEmptySections = {true}
          />

          <View style={{borderWidth:2}}>
            <View style={{flexDirection:'row',margin:5}}>
              <Text style={{flex:1}}>name:</Text>
              <TextInput
                style={{height:30,borderColor:'gray',borderWidth:1,flex:5}}
                onChangeText={(text)=>this.setState({newdata_name:text})}
                value={this.state.newdata_name}
              />
            </View>
            <View style={{flexDirection:'row',margin:5}}>
              <Text style={{flex:1}}>DDL:</Text>
              <TextInput
                style={{height:30,borderColor:'gray',borderWidth:1,flex:5}}
                onChangeText={(text)=>this.setState({newdata_ddl:text})}
                value={this.state.newdata_ddl}
              />
            </View>
            <View style={{flexDirection:'row',margin:5}}>
              <Text style={{flex:1}}>content:</Text>
              <TextInput
                style={{height:30,borderColor:'gray',borderWidth:1,flex:5}}
                onChangeText={(text)=>this.setState({newdata_content:text})}
                value={this.state.newdata_content}
              />
            </View>
            <View>
              <TouchableOpacity onPress={()=>this.new_ddl()}>
                  <Text style={{textAlign:'center'}}>Make New DDL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <View tabLabel="tab1" style={styles.container}>
          <TouchableOpacity onPress={()=>this.printdata(urlhead+"else")}>
              <Text>printdata</Text>
          </TouchableOpacity>
          <Text>ajklsd</Text>
          <TouchableOpacity onPress={()=>this.postdata()}>
              <Text>postdata</Text>
          </TouchableOpacity>
        </View>


      
      </ScrollableTabView>
    );
  }
  refreshDDL = ()=>{
    let options = {}
    options.method = 'GET'
    url = urlhead + 'else'
    fetch(url,options).then(function(response){return response.text()})
    .then(function(data){
      data = eval('('+data+')')
      dataa.splice(0,dataa.length)
      for(var i=0;i<data.length;i++){
        dataa.push(data[i])
      }
    })
    this.setState({data:dataa})
  }
  new_ddl = ()=>{
    url = urlhead+'new/'
    let options = {}
    options.method = 'POST'
    options.headers = {'Content-Type':'application/json'}
    options.body = JSON.stringify({
      'newname':this.state.newdata_name,
      'newddl':this.state.newdata_ddl,
      'newcontent':this.state.newdata_content
    })
    fetch(url,options).then(function(res){
      console.log("status",res.status);
      
    })
    this.setState({
      newdata_content:'',
      newdata_ddl:'',
      newdata_name:''
    })
    this.refreshDDL()
  }
  modifyDDL = (rowData)=>{
    url = urlhead+'modify/'
    let options = {}
    options.method = 'POST'
    options.headers = {'Content-Type':'application/json'}
    options.body = JSON.stringify({
      'id':rowData['id'],
      'newname':this.state.newdata_name,
      'newddl':this.state.newdata_ddl,
      'newcontent':this.state.newdata_content
    })
  }
  deleteDDL = (rowData)=>{
    url = urlhead+'delete/'
    let options = {}
    options.method = 'POST'
    options.headers = {'Content-Type':'application/json'}
    options.body = JSON.stringify({
      'id':rowData['id']
    })
    fetch(url,options).then(function(res){
      console.log('status',res.status)
    })
    this.refreshDDL();
  }
  printdata = (conf)=>{
    console.log("printdata")
    // conf="http://10.162.103.75:9000/else";
    let options = {};
    options.method = 'GET';
    // var dataa;
    fetch(conf,options).then(function(response) { return response.text(); })
    .then(function(data) {
      console.log("data::")
      console.log(data)
      console.log("other")
      data = eval('('+data+')')
      dataa.splice(0,dataa.length)
      for (var i = 0; i < data.length; i++) {
        console.log(data[i])
        dataa.push(data[i]);
      }
      
    });
    console.log('data',dataa)
    this.setState({data:dataa})
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
    // justifyContent: 'center',
    // alignItems: 'center',
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
