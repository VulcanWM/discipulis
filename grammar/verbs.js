import {verbs, numbers, persons, tenses, perfect_stems, verb_types} from '../grammar/vocab'

const first_conjugation = {
    'present': ['o', 'as', 'at', 'amus', 'atis', 'ant'],
    'imperfect': ['abam', 'abas', 'abat', 'abamus', 'abatis', 'abant'],
    'perfect': ['i', 'isti', 'it', 'imus', 'istis', 'erunt'],
    'future': ['abo', 'abis', 'abit', 'abimus', 'abitis', 'abunt'],
    'future perfect': ['ero', 'eris', 'erit', 'erimus', 'eritis', 'erint'],
    'pluperfect': ['eram', 'eras', 'erat', 'eramus', 'eratis', 'erant'],
    'present passive': ['or', 'aris', 'atur', 'amur', 'amini', 'antur'],
    'future passive': ['abor', 'aberis', 'abitur', 'abimur', 'abimini', 'abuntur']
}

const second_conjugation = {
    'present': ['o', 'es', 'et', 'emus', 'etis', 'ent'],
    'imperfect': ['ebam', 'ebas', 'ebat', 'ebamus', 'ebatis', 'ebant'],
    'perfect': ['i', 'isti', 'it', 'imus', 'istis', 'erunt'],
    'future': ['ebo', 'ebis', 'ebit', 'ebimus', 'ebitis', 'ebunt'],
    'future perfect': ['ero', 'eris', 'erit', 'erimus', 'eritis', 'erint'],
    'pluperfect': ['eram', 'eras', 'erat', 'eramus', 'eratis', 'erant'],
    'present passive': ['eor', 'eris', 'etur', 'emur', 'emini', 'entur'],
    'future passive': ['ebor', 'eberis', 'ebitur', 'ebimur', 'ebimini', 'ebuntur']
}

const third_conjugation = {
    'present': ['o', 'is', 'it', 'imus', 'itis', 'unt'],
    'imperfect': ['ebam', 'ebas', 'ebat', 'ebamus', 'ebatis', 'ebant'],
    'perfect': ['i', 'isti', 'it', 'imus', 'istis', 'erunt'],
    'future': ['am', 'es', 'et', 'emus', 'etis', 'ent'],
    'future perfect': ['ero', 'eris', 'erit', 'erimus', 'eritis', 'erint'],
    'pluperfect': ['eram', 'eras', 'erat', 'eramus', 'eratis', 'erant'],
    'present passive': ['or', 'eris', 'itur', 'imur', 'imini', 'untur'],
    'future passive': ['ar', 'eris', 'etur', 'emur', 'emini', 'entur']
}

const fourth_conjugation = {
    'present passive': ['or', 'ris', 'tur', 'mur', 'mini', 'untur']
}


export function verb_english_to_latin(word, person, number, tense){
  if (tenses.includes(tense) == false){
    return {latin_word: "This is not a case", nominative: false}
  }
  if (numbers.includes(number) == false){
    return {latin_word: "A number has to be singular or plural", nominative: false}
  }
  if (Object.keys(verbs).includes(word) == false){
    return {latin_word: (word + " is not in the word list"), nominative: false}
  }
  if (persons.includes(person) == false){
    return {latin_word: "The person has to be 1st, 2nd or 3rd", nominative: false}
  }
  let latin_form = verbs[word]
  let nominative = latin_form.split(", ")[0]
  let infinitive = latin_form.split(", ")[1]
  let perfect = latin_form.split(", ")[2]
  let conjugation = latin_form.split(", ").slice(-1)[0]
  var index = persons.indexOf(person)
  var latin_word
  if ((number == "singular") && (person == "1st") && (tense == "present")){
    return {latin_word: nominative, nominative: nominative}
  }
  if (number == "plural"){
    index += 3
  }
  if (conjugation == "1st"){
    // 1st conjugation
    if (perfect_stems.includes(tense) == false){
      latin_word = infinitive.slice(0,-3) + first_conjugation[tense][index]
    } else {
      latin_word = perfect.slice(0,-1) + first_conjugation[tense][index]
    
    }
  }
  if (conjugation == "2nd"){
    // 2nd conjugation
    if (perfect_stems.includes(tense) == false){
      latin_word = infinitive.slice(0,-3) + second_conjugation[tense][index]
    } else {
      latin_word = perfect.slice(0,-1) + second_conjugation[tense][index]
    }
  }
  if (conjugation == "3rd"){
    // 3rd conjugation
    if (perfect_stems.includes(tense) == false){
      latin_word = infinitive.slice(0,-3) + third_conjugation[tense][index]
    } else {
      latin_word = perfect.slice(0,-1) + third_conjugation[tense][index]
    }
  }
  if (conjugation == "4th"){
    // 4th conjugation
    if (perfect_stems.includes(tense)){
      latin_word = perfect.slice(0,-1) + third_conjugation[tense][index]
    } else if (tense == "present"){
      latin_word = infinitive.slice(0,-3) + third_conjugation[tense][index]
    } else if (tense == "present passive"){
      latin_word = infinitive.slice(0,-2) + fourth_conjugation[tense][index]
    } else {
      latin_word = infinitive.slice(0,-2) + third_conjugation[tense][index]
    }
  }
  if (conjugation == "mixed"){
  // mixed conjugation
    if (perfect_stems.includes(tense)){
      latin_word = perfect.slice(0,-1) + third_conjugation[tense][index]
    } else if (tense == "present"){
      latin_word = infinitive.slice(0,-3) + third_conjugation[tense][index]
    } else if (tense == "present passive"){
        if (0 < index < 5){
          latin_word = nominative.slice(0,-2) + third_conjugation[tense][index]
        } else {
          latin_word = nominative.slice(0,-1) + third_conjugation[tense][index]
        }
    } else {
      latin_word = nominative.slice(0,-1) + third_conjugation[tense][index]
    }
  }
  return {latin_word: latin_word, nominative: nominative}
}

export function get_verb_table(first_sing){
  var word = null
  const key_list = Object.keys(verbs)
  const val_list = Object.values(verbs)
  var latin_form = null
  val_list.forEach(form => {
    if (form.split(", ")[0] == first_sing){
      var position = val_list.indexOf(form)
      word = key_list[position]
      latin_form = form
    }
  });
  if (word == null){
    return {table: false, latin_form: false, word: false}
  }
  var table = {"present": {},
           "future": {},
           "imperfect": {},
           "perfect": {},
           "pluperfect": {},
           "future perfect": {},
           'present passive': {},
           'future passive': {}}
  Object.keys(table).forEach(tense => {
    verb_types.forEach(type => {
      var person = type.split(" ")[0]
      var number = type.split(" ")[1]
      table[tense][type] = verb_english_to_latin(word, person, number, tense).latin_word
    })
  })
  return {table: table, latin_form: latin_form, word: word}
}