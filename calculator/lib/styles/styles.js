import {StyleSheet, Dimensions} from 'react-native';
import 'mobx-react-lite/batchingForReactNative';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const createStyle = function() {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      width: wp((66 / 264) * 100),
      height: hp((50 / 465) * 100),
    },
    buttonText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      lineHeight: hp((21 / 465) * 100),
      textAlign: 'center',
      fontSize: hp((18 / 465) * 100),
    },
    row: {
      width: '100%',
      flexDirection: 'row',
    },
    row1: {
      backgroundColor: '#F4EBE5',
    },
    row2: {
      backgroundColor: '#ECE4DE',
    },
    rowEnd1: {
      backgroundColor: '#CABAB7',
    },
    rowEnd2: {
      backgroundColor: '#B8ADAC',
      color: '#F4EBE5',
    },
    screen: {
      backgroundColor: '#A09595',
      minHeight: Dimensions.get('window').height,
    },
    inputWrapper: {
      paddingTop: getStatusBarHeight(),
      flex: 1,
      minHeight: hp((190 / 465) * 100),
      width: '100%',
    },
    inputInner: {
      alignItems: 'flex-end',
      paddingHorizontal: wp((12 / 261) * 100),
    },
    input: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontSize: hp((60 / 465) * 100),
      lineHeight: hp((72 / 465) * 100),
      color: '#FFF5EE',
    },
    downbtn: {
      backgroundColor: '#988D8D',
      width: '100%',
      height: hp((25 / 465) * 100),
      alignItems: 'center',
      justifyContent: 'center',
    },
    keyboard: {
      width: wp('100%'),
      height: hp(((465 - 215) / 465) * 100),
    },
  });
};
