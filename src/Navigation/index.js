import React, {useEffect, createRef} from 'react';
import {View, Platform, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

import styles from './styles';

const Navigation = ({authToken, setIsConnected, isConnected}) => {
  const navigationRef = createRef();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return unsubscribe;
  }, [setIsConnected, isConnected]);

  return (
    <View style={styles.safeAreaContainer}>
      {Platform.OS !== 'ios' && (
        <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      )}
      {/* {isConnected !== true && <OfflineMessage />} */}
      <NavigationContainer ref={navigationRef}>
        {authToken ? <AppNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </View>
  );
};

const mapStateToProps = ({authModel: {userData, isConnected}}) => ({
  authToken: userData?.token,
  isConnected,
});

const mapDispatchToProps = ({authModel: {setIsConnected}}) => ({
  setIsConnected,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
