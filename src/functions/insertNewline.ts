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
      ? `${current}\n`
      : current;
  })

  return reversedResult.reverse().join('');
}

export default insertNewline;
