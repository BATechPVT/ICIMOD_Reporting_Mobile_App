import AsyncStorage from "@react-native-async-storage/async-storage";

export const setData = async (key, data) => {
  return await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const getData = async (key) => {
  let data = await AsyncStorage.getItem(key);
  data = typeof data !== undefined && data ? JSON.parse(data) : null;
  return data;
};

export const removeData = async (key) => {
  return await AsyncStorage.removeItem(key);
};
