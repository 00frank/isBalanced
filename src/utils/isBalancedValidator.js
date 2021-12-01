/**
 * @param {string} message - message to validate is or not balanced
 * @returns {boolean}
 */
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (message) => {
  let aux = [];
  let result = "balanceado";

  if (isClosedInParenthesis(message)) {
    // is closed in parenthesis, so its balanced
  } else {
    let chars = getMessageWithoutEmojis(message);
    console.log("chars elimnando primeros", chars);
    for (const char of chars) {
      if (char === "(") {
        aux.push(char);
      } else if (char === ")") {
        if (aux.length === 0) {
          result = "desbalanceado";
          return;
        } else {
          aux.pop()
        }
      }
    }

    if (aux.length > 0) {
      result = "desbalanceado";
    }
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

function isClosedInParenthesis(message) {
  let result = false;
  if (message[0] === "(" && message[message.length - 1] === ")")
    result = true;

  return result;
}