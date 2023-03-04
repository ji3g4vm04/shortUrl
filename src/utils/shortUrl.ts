const baseChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const baseCharLength = baseChar.length;


const shortUrlCreate = (shortUrlLength : number) => {
  let result = '';
  for(let i = 0 ; i < shortUrlLength ; i++){
    const randomIndex = Math.floor(Math.random() * baseCharLength + 1);
    result += baseChar[randomIndex];
  }
  return result;
}

export default shortUrlCreate;