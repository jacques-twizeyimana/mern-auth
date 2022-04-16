function makeId(length) {
  var result = "";
  var characters =
    "ABC-DEFGHIJKLMNOPQRSTUV.WXYZ0123456789abcefghij_klmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = { makeId };
