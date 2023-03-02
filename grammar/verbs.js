import {verbs, numbers, persons, tenses, perfect_stems, verb_types} from '../grammar/vocab'

const first_conjugation = {
    'present': ['o', 'as', 'at', 'amus', 'atis', 'ant'],
    'imperfect': ['abam', 'abas', 'abat', 'abamus', 'abatis', 'abant'],
    'perfect': ['i', 'isti', 'it', 'imus', 'istis', 'erunt'],
    'future': ['abo', 'abis', 'abit', 'abimus', 'abitis', 'abunt'],
    'future perfect': ['ero', 'eris', 'erit', 'erimus', 'eritis', 'erint'],
    'pluperfect': ['eram', 'eras', 'erat', 'eramus', 'eratis', 'erant'],
    'present passive': ['or', 'aris', 'atur', 'amur', 'amini', 'antur']
}

const second_conjugation = {
    'present': ['o', 'es', 'et', 'emus', 'etis', 'ent'],
    'imperfect': ['ebam', 'ebas', 'ebat', 'ebamus', 'ebatis', 'ebant'],
    'perfect': ['i', 'isti', 'it', 'imus', 'istis', 'erunt'],
    'future': ['ebo', 'ebis', 'ebit', 'ebimus', 'ebitis', 'ebunt'],
    'future perfect': ['ero', 'eris', 'erit', 'erimus', 'eritis', 'erint'],
    'pluperfect': ['eram', 'eras', 'erat', 'eramus', 'eratis', 'erant'],
    'present passive': ['eor', 'eris', 'etur', 'emur', 'emini', 'entur']
}

const third_conjugation = {
    'present': ['o', 'is', 'it', 'imus', 'itis', 'unt'],
    'imperfect': ['ebam', 'ebas', 'ebat', 'ebamus', 'ebatis', 'ebant'],
    'perfect': ['i', 'isti', 'it', 'imus', 'istis', 'erunt'],
    'future': ['am', 'es', 'et', 'emus', 'etis', 'ent'],
    'future perfect': ['ero', 'eris', 'erit', 'erimus', 'eritis', 'erint'],
    'pluperfect': ['eram', 'eras', 'erat', 'eramus', 'eratis', 'erant'],
    'present passive': ['or', 'eris', 'itur', 'imur', 'imini', 'untur']
}

const fourth_conjugation = {
    'present passive': ['or', 'ris', 'tur', 'mur', 'mini', 'untur']
}


export function verb_english_to_latin(word, person, number, tense){
  if (tenses.includes(tense) == false){
    return "This is not a case", false
  }
  if (numbers.includes(number) == false){
    return "A number has to be singular or plural", false
  }
  if (Object.keys(verbs).includes(word) == false){
    return (word + " is not in the word list"), false
  }
  if (persons.includes(person) == false){
    return "The person has to be 1st, 2nd or 3rd", false
  }
  let latin_form = verbs[word]
  let nominative = latin_form.split(", ")[0]
  let infinitive = latin_form.split(", ")[1]
  let perfect = latin_form.split(", ")[2]
  let conjugation = latin_form.split(", ").slice(-1)[0]
  var index = persons.indexOf(person)
  var latin_word
  if ((number == "singular") && (person == "1st") && (tense == "present")){
    return nominative, nominative
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
      var latin_word = infinitive.slice(0,-3) + second_conjugation[tense][index]
    } else {
      var latin_word = perfect.slice(0,-1) + second_conjugation[tense][index]
    }
  }
  if (conjugation == "3rd"){
    // 3rd conjugation
    if (perfect_stems.includes(tense) == false){
      var latin_word = infinitive.slice(0,-3) + third_conjugation[tense][index]
    } else {
      var latin_word = perfect.slice(0,-1) + third_conjugation[tense][index]
    }
  }
  if (conjugation == "4th"){
    // 4th conjugation
    if (perfect_stems.includes(tense)){
      var latin_word = perfect.slice(0,-1) + third_conjugation[tense][index]
    } else if (tense == "present"){
      var latin_word = infinitive.slice(0,-3) + third_conjugation[tense][index]
    } else if (tense == "present passive"){
      var latin_word = infinitive.slice(0,-2) + fourth_conjugation[tense][index]
    } else {
      var latin_word = infinitive.slice(0,-2) + third_conjugation[tense][index]
    }
  }
  if (conjugation == "mixed"){
  // mixed conjugation
    if (perfect_stems.includes(tense)){
      var latin_word = perfect.slice(0,-1) + third_conjugation[tense][index]
    } else if (tense == "present"){
      var latin_word = infinitive.slice(0,-3) + third_conjugation[tense][index]
    } else if (tense == "present passive"){
        if (0 < index < 5){
          var latin_word = nominative.slice(0,-2) + third_conjugation[tense][index]
        } else {
          var latin_word = nominative.slice(0,-1) + third_conjugation[tense][index]
        }
    } else {
        var latin_word = nominative.slice(0,-1) + third_conjugation[tense][index]
    }
  }
  return {latin_word: latin_word, nominative: nominative}
}