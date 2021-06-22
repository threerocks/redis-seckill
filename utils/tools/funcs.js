const random_int = function (minNum, maxNum){  
  const chioces = maxNum - minNum + 1 ;    //可能数的总数  
  return Math.floor(Math.random() * chioces + minNum);  
}

exports.random_int = random_int;

exports.random_String = (number) => {
  // 10个数字 + 26个字母
  const arr = ["m","0","j","f","8","o","z","w","5","t","p","a","1","d","s","h","v","x","9","b","r","y","2","e","7","4","3","q","6","n","u","l","c","g","i","k"];
  const resArr = [];
  for (let i = 0; i < number; i++) {
    const index = random_int(0, 35);
    resArr.push(arr[index]);
  }
  // 返回结果
  return resArr.join('');
}