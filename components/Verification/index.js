import React, {Component} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  codeFieldRoot: {marginTop: 20},
  cell: {
    color:'#7d53ea',
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth:2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#7d53ea',
  },
});
export default class App extends Component {
  state ={
    vCodeText:''
  }
  setValue = (vCodeText) =>{
    console.log(vCodeText);
    this.setState({vCodeText})
    this.props.codeOnChangeText
  }
  render() {
    return (
      <CodeField
        value={this.props.vCodeText}
        onChangeText={this.props.codeOnChangeText}
        cellCount={6}
        rootStyle={styles.codeFieldRoot}
        onSubmitEditing={this.props.onSubmitEditing}
        keyboardType="number-pad"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    )
  }
}
