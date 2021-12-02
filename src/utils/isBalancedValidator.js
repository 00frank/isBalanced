const Result = {
  DESBALANCEADO: "desbalanceado",
  BALANCEADO: "balanceado"
}

/**
 * @param {string} message - message to validate is or not balanced
 * @returns {boolean}
 */
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (message) => {
  let chars = [];
  let result = Result.BALANCEADO;

  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    if (char === "(" || char === ":" || char === ")") {
      chars.push(char);
    }
  }

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    let hasBefore = (chars[i - 1]);
    let nextIsTwoPoints = (chars[i + 1] && chars[i + 1] === ":");
    let secondIsOpenOrClose = (chars[i + 2] && chars[i + 2] === ")") || (chars[i + 2] && chars[i + 2] === "(");
    let thirdIsClose = (chars[i + 3] && chars[i + 3] === ")");

    if (char === "(") {
      if (hasBefore && nextIsTwoPoints && secondIsOpenOrClose && thirdIsClose) {
        // (:)
        chars.splice(i, 1); //(
        chars.splice(i, 1); //:
        chars.splice(i, 1); //)
        i = 0;
      }
    } else if (char === ")") {
      if (chars.includes("(")) {
        chars.splice(i, 1);
        chars = chars.join("").replace("(", "").split("")
        i = 0;
      }
    }
  }

  chars = getMessageWithoutEmojis(chars.join(""))

  if (chars.includes("(") || chars.includes(")")) {
    result = Result.DESBALANCEADO;
  } else {
    result = Result.BALANCEADO;
  }
  
  return result;
}

/**
 * @param {string} message - message to remove emojis
 * @returns {string}
 */
function getMessageWithoutEmojis(message) {
  let emojis = [":)", ":("];
  let result;

  emojis.forEach((emoji, i) => {
    if (i === 0) {
      result = message.replaceAll(emoji, "");
    } else {
      result = result.replaceAll(emoji, "")
    }
  })
  return result;
}