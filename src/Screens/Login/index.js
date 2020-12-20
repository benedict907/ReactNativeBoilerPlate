import React from 'react';
import {View, Text, Button} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
const Login = ({logIn}) => {
  const onButtonPressed = () => {
    let params = [];
    // props.logIn vilikunathinu pakaram logIn ne deconstruct cheythit call cheyunu
    logIn(params);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Login Page</Text>
    </View>
  );
};

const mapDispatchToProps = ({authModel: {logIn}}) => ({logIn});

export default connect(null, mapDispatchToProps)(Login);
