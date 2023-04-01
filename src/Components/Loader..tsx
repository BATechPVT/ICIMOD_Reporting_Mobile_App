import * as React from 'react';
import {ActivityIndicatorComponent, ActivityIndicator} from 'react-native';
import {ThemeContext} from '../../theme/theme-context';

const Loader = () => {
  const {dark, theme, toggle} = React.useContext(ThemeContext);
  return (
    <ActivityIndicator animating={true} color={theme.primary} size="large" />
  );
};

export default Loader;
