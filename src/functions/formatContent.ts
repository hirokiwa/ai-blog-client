const removeNewlineInAngleBrackets = (inputString: string): string => {
  const startSymbol = '「';
  const endSymbol = '」';
  const sentenceEndings = [startSymbol, endSymbol];

  const sentences = inputString.split(new RegExp(`([${sentenceEndings.join('')}])`, 'g')).filter((text)=>text!=="");
  const reversedSentences = sentences.reverse();

  const reversedResult =  reversedSentences.map((current, index, array) => {
    if (index === 0) {
      return current;
    }

    const previous = array[index - 1];
    return previous === endSymbol
      ? current.replaceAll('\n', '')
      : current;
  })

  return reversedResult.reverse().join('');
}

const insertNewline = (inputString: string): string => {
  const sentenceEndings = ['。', '！', '？', '!', '?', '♪', '.'];

  const sentences = inputString.split(new RegExp(`([${sentenceEndings.join('')}])`, 'g')).filter((text)=>text!=="");
  const reversedSentences = sentences.reverse();

  const reversedResult =  reversedSentences.map((current, index, array) => {
    if (index === 0) {
      return current;
    }

    const previous = array[index - 1];
    return sentenceEndings.includes(current) && !sentenceEndings.includes(previous)
      ? `${current}\n\n\n`
      : current;
  })

  return removeNewlineInAngleBrackets(reversedResult.reverse().join(''));
}

const formatContent = (inputString: string): string => {
  const insertedNewline = insertNewline(inputString);
  const removedNewlie = removeNewlineInAngleBrackets(insertedNewline);
  const removedHalfIndent = removedNewlie.replaceAll(' ', '');
  const removedFullIndent = removedHalfIndent.replaceAll('　', '');

  return removedFullIndent;
}

export default formatContent;
