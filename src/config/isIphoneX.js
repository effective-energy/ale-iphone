import { Dimensions, Platform } from 'react-native';
let d = Dimensions.get('window');
const { height, width } = d;

export default Platform.OS === 'ios' && (height === 812 || width === 812);