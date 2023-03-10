numbers = ['singular', 'plural']
cases = ['nominative', 'vocative', 'accusative', 'genitive', 'dative', 'ablative']
persons = ['1st', '2nd', '3rd']
tenses = ['present', 'future', 'imperfect', 'perfect', 'pluperfect', 'future perfect', 'present passive']
perfect_stems = ['perfect', 'pluperfect', 'future perfect']
verb_types = ['1st singular', '2nd singular', '3rd singular', '1st plural', '2nd plural', '3rd plural']
noun_questions = {"c": "Cases"}
verb_questions = {"d": "Tenses"}
all_questions = {"a": "English to Latin", "b": "Latin to English", "c": "Cases", "d": "Tenses"}
metadata = {
    "index": {"Description": "Discipulis is a website for students who are studying Latin"
                             " and want to find fun resources to help them learn",
              "Tags": "discipulis,verbs,nouns,convert,students,latin,fun,gcse,student"
                      ",puella,mensa,amo,ocr,puer,school,moneo,vulcanwm"},
    "all_nouns": {"Description": "View all the nouns you need to learn to be proficient in Latin",
                  "Tags": "discipulis,verbs,nouns,convert,students,latin,fun,gcse,student,declension,1st,2nd,3rd,4th"
                      "5th,puella,mensa,amo,ocr,puer,school,moneo,vulcanwm,filius,deus,bellum,vir,gradus,genu"},
    "all_verbs": {"Description": "View all the verbs you need to learn to be proficient in Latin",
                  "Tags": "discipulis,verbs,nouns,convert,students,latin,fun,gcse,student,declension,1st,2nd,3rd,4th"
                      "mixed,puella,mensa,amo,ocr,puer,school,moneo,vulcanwm,capio,ambulo,ago,cogo,clamo,bibo"},
    "browse_sets": {"Description": "View all the sets you can be tested in and how many plays they each have",
                    "Tags": "discipulis,verbs,nouns,convert,students,latin,fun,gcse,student"
                      ",puella,mensa,amo,ocr,puer,school,moneo,vulcanwm,sets,quiz"},
    "convert_noun": {"Description": "Convert any english noun in the wordlist to a Latin case and number",
                     "Tags": "noun,convert,case,number,discipulis,verbs,nouns,convert,students,latin,fun,gcse,student"
                      ",puella,mensa,amo,ocr,puer,school,moneo,vulcanwm"},
    "convert_verb": {"Description": "Convert any english verb in the wordlist to a Latin number, tense and person",
                     "Tags": "verb,convert,number,tense,person,discipulis,verbs,nouns,convert,students,latin,fun,gcse,student"
                      ",puella,mensa,amo,ocr,puer,school,moneo,vulcanwm"},
    "quiz_question": {"Description": "", "Tags": ""},
    "quiz_start": {"Description": "", "Tags": ""},
    "view_set": {"Description": "", "Tags": ""},
    "main": {"Description": "", "Tags": "discipulis,verbs,nouns,convert,students,latin,fun,gcse,student"
                      ",puella,mensa,amo,ocr,puer,school,moneo,vulcanwm"}
}

nouns = {
    "girl": "puella, puellae, f, 1st",
    "table": "mensa, mensae, f, 1st",
    "year": "annus, anni, m, 2nd",
    "boy-1": "puer, pueri, m, 2nd",
    "war": "bellum, belli, n, 2nd",
    "man": "vir, viri, m, 2nd",
    "boy-2": "filius, filii, m, 2nd",
    "god": "deus, dei, m, 2nd",
    "step": "gradus, -us, m, 4th",
    "knee": "genu, genus, n, 4th",
    "house": "domus, domus, m, 4th",
    "king": "rex, regis, m, 3rd",
    "work": "opus, operis, n, 3rd",
    "bed": "cubile, cubilis, n, 3rd",
    "citizen": "civis, civis, c, 3rd",
    "thing": "res, rei, f, 5th",
    "day": "dies, diei, m, 5th"
}

verbs = {
    'love': 'amo, amare, amavi, amatus, 1st',
    'warn': 'moneo, monere, monui, monitum, 2nd',
    'rule': 'rego, regere, rexi, rectus, 3rd',
    'climb': 'ascendo, ascendere,ascendi, ascensus, 3rd',
    "hear": 'audio, audire, audivi, auditus, 4th',
    'capture': 'capio, capere, cepi, captus, mixed',
    'arrive': 'advenio, advenire, adveni, , 4th',
    'build': 'aedifico, aedificare, aedificavi, aedificatus, 1st',
    'walk': 'ambulo, ambulare, ambulavi, , 1st',
    'do': 'ago, agere, egi, actus, 3rd',
    'happen': 'accido, accidere, accidi, , 3rd',
    'accept': 'accipio, accipere, accepi, acceptus, 3rd',
    'approach': 'appropinquo, appropinquare, appropinquavi, , 1st',
    # 'dare': 'audeo, audere, ausus sum, , 2nd',
    'drink': 'bibo, bibere, bibi, , 3rd',
    'fall': 'cado, cadere, cecidi, casus, 3rd',
    'hide': 'celo, celare, celavi, celatus, 1st',
    'shout': 'clamo, clamare, clamavi, clamatus, 1st',
    'think': 'cogito, cogitare, cogitavi, cogitatus, 1st',
    'get to know': 'cognosco, cognoscere, cognovi, cognitus, 3rd',
    'force': 'cogo, cogere, coegi, coactus, 3rd',
    'finish': 'conficio, conficere, confeci, confectus, 3rd',
    # 'try': 'conor, conari, conatus sum,1st',

}

prepositions = {
    "from": "a/ab, ablative"
}
