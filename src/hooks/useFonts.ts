import { useFonts as uf } from 'expo-font'

/*
The custom fonts for the project
*/
export const useFonts = () =>
  uf({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Display: require('../assets/fonts/Display/DMSerifDisplay-Regular.ttf'),
    Mukta: require('../assets/fonts/Mukta/Mukta-Regular.ttf'),
  })
