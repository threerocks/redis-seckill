const randomInt = function (minNum, maxNum){  
  const chioces = maxNum - minNum + 1 ;    //可能数的总数  
  return Math.floor(Math.random() * chioces + minNum);  
}

exports.randomInt = randomInt;

exports.randomString = (number) => {
  // 10个数字 + 26个字母
  const arr = ["m","0","j","f","8","o","z","w","5","t","p","a","1","d","s","h","v","x","9","b","r","y","2","e","7","4","3","q","6","n","u","l","c","g","i","k"];
  const resArr = [];
  for (let i = 0; i < number; i++) {
    const index = randomInt(0, 35);
    resArr.push(arr[index]);
  }
  // 返回结果
  return resArr.join('');
}


exports.checkObjNull = function(obj) {
  return !!Object.keys(obj).length
}