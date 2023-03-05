import {noun_english_to_latin} from '../grammar/nouns'
import {verb_english_to_latin} from '../grammar/verbs'

export function word_nominative(word_type, word){
  var nominative;
  if (word_type == "noun"){
    nominative = noun_english_to_latin(word, "nominative", "singular").latin_word
  }
  if (word_type == "verb"){
    nominative = verb_english_to_latin(word, "1st", "singular", "present").latin_word
  }
  return {nominative: nominative}
}