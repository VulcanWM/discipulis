import { get_set } from "../lib/database"
import { verb_types, verb_questions, noun_questions, all_questions, tenses, cases } from "../grammar/vocab"
import { verb_english_to_latin, get_verb_table } from '../grammar/verbs'
import { noun_english_to_latin, get_noun_table } from '../grammar/nouns'

export async function generate_question(quiz_id, answer_type, question_type){
    const quiz_set = await get_set(quiz_id)
    if (quiz_set == false){
        return {question:false, choices:false, answers:false}
    }
    var this_a_type = ""
    if (answer_type == "both"){
        const written_multiple = ['written', 'multiple']
        this_a_type = written_multiple[Math.floor(Math.random()*written_multiple.length)];
    } else {
        this_a_type = answer_type
    }
    const question_word = Object.keys(quiz_set['Words'])[Math.floor(Math.random()*Object.keys(quiz_set['Words']).length)];
    const question_word_type = quiz_set['Words'][question_word]
    var word_question_type_list = []
    for (var i = 0; i < question_type.length; i++) {
        var char = question_type.charAt(i)
        if (question_word_type == "noun"){
            if (Object.keys(noun_questions).includes(char)){
                word_question_type_list.push(char)
            }
        }
        if (question_word_type == "verb"){
            if (Object.keys(verb_questions).includes(char)){
                word_question_type_list.push(char)
            }
        }
    }
    const this_q_type_index = Math.random() * ((word_question_type_list.length)-1);
    const this_q_type_char = word_question_type_list[this_q_type_index]
    const this_q_type = all_questions[this_q_type_char]
    if (this_q_type == "Cases"){
        const question_case = cases[Math.floor(Math.random()*cases.length)];
        const singular_plural = ['singular', 'plural']
        const number = singular_plural[Math.floor(Math.random()*singular_plural.length)];
        const nominative = noun_english_to_latin(question_word, "nominative", "singular").nominative
        const word_table = get_noun_table(nominative).table
        const latin_word = word_table[number][question_case]
        const question = `${latin_word} is ${number}. What case is it?`
        var answers = []
        Object.keys(word_table[number]).forEach((loop_case) => {
            if (word_table[number][loop_case] == latin_word) {
              answers.push(loop_case)
            }
        });
        answers = answers.join(",")
        var choices;
        if (this_a_type == "written"){
            choices = "input"
        } else {
            var question_cases = ['nominative', 'vocative', 'accusative', 'genitive', 'dative', 'ablative']
            choices = [question_case]
            question_cases = question_cases.filter(item => item !== question_case)
            for(var i = 0; i < 3; i++){
                var option_case = question_cases[Math.floor(Math.random()*question_cases.length)];
                choices.push(option_case)
                question_cases = question_cases.filter(item => item !== option_case)
            }
        }
        return {question:question, choices:choices, answers:answers}
    }
    if (this_q_type == "Tenses"){
        const tense = tenses[Math.floor(Math.random()*tenses.length)];
        const present_singular = verb_english_to_latin(question_word, "1st", "singular", "present").nominative
        const word_table = get_verb_table(present_singular).table
        const word_verb_type = verb_types[Math.floor(Math.random()*verb_types.length)];
        const latin_word = word_table[tense][word_verb_type]
        const question = `What tense is ${latin_word}?`
        var choices;
        if (this_a_type == "written"){
            choices = "input"
        } else {
            var question_tenses = ['present', 'imperfect', 'perfect', 'future', 'pluperfect', 'future perfect']
            choices = [tense]
            question_tenses = question_tenses.filter(item => item !== tense)
            for(var i = 0; i < 3; i++){
                var option_tense = question_tenses[Math.floor(Math.random()*question_tenses.length)];
                choices.push(option_tense)
                question_tenses = question_tenses.filter(item => item !== option_tense)
            }
        }
        return {question:question, choices:choices, answers:tense}
    }
    if (this_q_type == "English to Latin"){
        // do nothing
    }
    if (this_q_type == "Latin to English"){
        // do nothing
    }
    return {question:false, choices:false, answers:false}
}