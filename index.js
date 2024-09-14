
/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */
import { useColorScheme } from 'react-native';
import './globals';
import 'react-native-get-random-values';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';

// import 'react-native-gesture-handler';


import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { darkMode, lightMode } from './src/presentation/Screen/theme/theme';
import { registerTranslation } from 'react-native-paper-dates'
registerTranslation('en', {
  save: 'Save',
  selectSingle: 'Select date',
  selectMultiple: 'Select dates',
  selectRange: 'Select period',
  notAccordingToDateFormat: (inputFormat) =>
    `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later then ${date}`,
  mustBeLowerThan: (date) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: 'Day is not allowed',
  previous: 'Previous',
  next: 'Next',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Pick date from calendar',
  close: 'Close',
})
export default function Main() {
  const colorScheme = useColorScheme();


  return (
    <PaperProvider theme={colorScheme === 'dark' ? darkMode : lightMode}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);




