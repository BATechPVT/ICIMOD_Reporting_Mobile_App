var passwordValidator = require("password-validator");
export const schema = new passwordValidator();
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase(1) // Must have uppercase letters
  .has()
  .lowercase(1) // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

export const Unit = (unit: number) => {
  if (unit === 1) {
    return "Acre";
  } else if (unit === 2) {
    return "Avenue Miles";
  } else if (unit === 3) {
    return "Acreage";
  } else if (unit === 4) {
    return "Hectare";
  } else if (unit === 5) {
    return "Avenue Kilometer";
  } else if (unit === 6) {
    return "Kanal";
  } else {
    return "N/A";
  }
};

export default async function base64File(url) {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
}