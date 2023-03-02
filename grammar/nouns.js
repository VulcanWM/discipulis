import {nouns, numbers, cases} from '../grammar/vocab'

const first_declension = ["a", "a", "am", "ae", "ae", "a", "ae", "ae", "as", "arum", "is", "is"]
const second_declension_masc = ['us', 'e', 'um', 'i', 'o', 'o', 'i', 'i', 'os', 'orum', 'is', 'is']
const second_declension_masc_er = ['', '', 'um', 'i', 'o', 'o', 'i', 'i', 'os', 'orum', 'is', 'is']
const second_declension_neut = ['um', 'um', 'um', 'i', 'o', 'o', 'a', 'a', 'a', 'orum', 'is', 'is']
const second_declension_irregular = 
  {
    'filius': ['filius', 'fili', 'filium', 'fili', 'filio/filii', 'filio', 'filio',
              'filii', 'filii', 'filios', 'filiorum', 'filiis', 'filiis'],
   'deus': ['deus', 'deus', 'deum', 'dei', 'deo', 'deo',
            'di/dei', 'di/dei', 'deos', 'deorum/deum', 'dis/deis', 'dis/deis'],
   'vir': ['vir', 'vir', 'virum', 'viri', 'viro', 'viro',
           'viri', 'viri', 'viros', 'virorum/virum', 'viris', 'viris']
    }
const fourth_declension_masc = ['us', 'us', 'um', 'us', 'ui', 'u', 'us', 'us', 'us', 'uum', 'ibus', 'ibus']
const fourth_declension_neut = ['u', 'u', 'u', 'us', 'u', 'u', 'ua', 'ua', 'ua', 'uum', 'ibus', 'ibus']
const fourth_declension_irregular = 
  {
    "domus": ['domus', 'domus', 'domum', 'domus', 'domui/domo', 'domo', "domus", "domus", "domos/domus", "domuum/domorum", "domibus", "domibus"]
  }
const non_increasing_third_declension = ['civis', 'cubile']
const third_declension_normal = ['', '', 'em', 'is', 'i', 'e', 'es', 'es', 'es', 'um', 'ibus', 'ibus']
const third_declension_neut = ['', '', '', 'is', 'i', 'e', 'a', 'a', 'a', 'um', 'ibus', 'ibus']
const third_declension_non_normal = ['', '', 'em', 'is', 'i', 'e', 'es', 'es', 'es', 'ium', 'ibus', 'ibus']
const third_declension_non_neut = ['', '', '', 'is', 'i', 'i', 'ia', 'ia', 'ia', 'ium', 'ibus', 'ibus']
const fifth_declension = ['es', 'es', 'em', 'ei', 'ei', 'e', 'es', 'es', 'es', 'erum', 'ebus', 'ebus']


export function noun_english_to_latin(word, the_case, number){
  if (cases.includes(the_case) == false){
    return {latin_word: "This is not a case", nominative: false}
  }
  if (numbers.includes(number) == false){
    return {latin_word: "A number has to be singular or plural", nominative: false}
  }
  var index = cases.indexOf(the_case)
  if (number == "plural"){
    index += 6
  }
  if (Object.keys(nouns).includes(word + "-1")){
    var latin_form = nouns[word + "-1"]
  } else if (Object.keys(nouns).includes(word)) {
    var latin_form = nouns[word]
  } else {
    return {latin_word: (word + " is not in the word list"), nominative: false}
  }
  let nominative = latin_form.split(", ")[0]
  let genitive = latin_form.split(", ")[1]
  let gender = latin_form.split(", ")[2]
  let declension = latin_form.split(", ")[3]
  var latin_word;
  if (declension == "1st"){
    // 1st declension
    latin_word = nominative.slice(0,-1) + first_declension[index]
  }
  if (declension == "2nd"){
    // 2nd declension
    if (Object.keys(second_declension_irregular).includes(nominative)){
      // 2nd declension irregular
      latin_word = second_declension_irregular[nominative][index]
    } else {
      // not irregular
      if (nominative.endsWith("us")){
        // 2nd declension masculine normal
        latin_word = nominative.slice(0,-2) + second_declension_masc[index]
      }
      if (nominative.endsWith("um")){
        // 2nd declension neuter
        latin_word = nominative.slice(0,-2) + second_declension_neut[index]
      }
      if (nominative.endsWith("er")){
        // 2nd declension masculine other
        latin_word = nominative + second_declension_masc_er[index]
      }
    }
  }
  if (declension == "3rd"){
    // 3rd declension noun
    if (non_increasing_third_declension.includes(nominative)){
      // Non-increasing 3rd declension
      if (gender == "n."){
        // Neuter non-increasing 3rd declension
        if ([0, 1, 2].includes(index)){
          latin_word = nominative
        } else {
          latin_word = genitive.slice(0,-2) + third_declension_non_neut[index]
        }
      } else {
        // Masc/Fem non-increasing 3rd declension
        if ([0, 1].includes(index)) {
          latin_word = nominative
        } else {
            latin_word = genitive.slice(0,-2) + third_declension_non_normal[index]
        }
      } 
    } else {
      // Increasing 3rd declension
      if (gender == "n."){
        // Neuter increasing 3rd declension
        if ([0, 1, 2].includes(index)){
          latin_word = nominative
        } else {
          latin_word = genitive.slice(0,-2) + third_declension_neut[index]
        }
      } else {
        // Masc/Fem increasing 3rd declension
        if ([0, 1].includes(index)){
          latin_word = nominative
        } else {
          latin_word = genitive.slice(0,-2) + third_declension_normal[index]
        }
      }
    }
  }
  if (declension == "4th"){
    // 4th declension
    if (Object.keys(fourth_declension_irregular).includes(nominative)){
      // 4th declension irregular
      latin_word = fourth_declension_irregular[nominative][index]
    } else {
      // not irregular
      if (nominative.endsWith("us")){
        // 2nd declension masculine
        latin_word = nominative.slice(0,-2) + fourth_declension_masc[index]
      }
      if (nominative.endsWith("u")){
        // 2nd declension neuter
        latin_word = nominative.slice(0,-1) + fourth_declension_neut[index]
      }
    } 
  }
  if (declension == "5th"){
    // 5th declension
    latin_word = genitive.slice(0,-2) + fifth_declension[index]
  }
  return {latin_word: latin_word, nominative: nominative}
}

export function get_noun_table(nominative){
  var word = null
  const key_list = Object.keys(nouns)
  const val_list = Object.values(nouns)
  var latin_form = null
  val_list.forEach(form => {
    if (form.split(", ")[0] == nominative){
      var position = val_list.indexOf(form)
      word = key_list[position]
      latin_form = form
    }
  });
  if (word == null){
    return {table: false, latin_form: false, word: false}
  }
  var table = {"singular": {}, "plural": {}}
  Object.keys(table).forEach(number => {
    cases.forEach(the_case => {
      table[number][the_case] = noun_english_to_latin(word, the_case, number).latin_word
    })
  })
  return {table: table, latin_form: latin_form, word: word}
}