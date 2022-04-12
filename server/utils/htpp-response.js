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

function createError(code, message) {
  return {
    success: false,
    message,
    code,
  };
}

function createSuccess(data, code = 200) {
  return {
    success: true,
    data,
    code,
  };
}

module.exports = { makeId, createError, createSuccess };
