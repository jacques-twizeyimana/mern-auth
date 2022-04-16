function makeId(length) {
  var result = "";
  var characters =
    "ABC-DEFGHIJKL&MNOPQRSTUV.WXYZ01234@56789abc$efghij_klmnopqr#stuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = { makeId };
