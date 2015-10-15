var fnselbri=(function() {

function genverb(verb) {
  return {
    present:[verb,verb,verb+'s',
      verb,verb,verb],
    past:verb+'ed',
    future:'will '+verb,
    ing:verb+'ing',
    inf:'to '+verb
  }
}

var verbs={
  is:{
    present:['am','are','is',
      'are','are','are'],
    past:['was','were','was',
      'were','were','were'],
    future:'will be',
    ing:'being',
    inf:'to be'
  },
  own:genverb('own'),
  go:['go','go','goes',
    'go','go','go','going','go']
};
/* KEY
?: can be replaced by 'something'
*: tanru
#: prepositions
:: conjugation
^: tense prepositions
*/
var gismu = {
	klama: {
		//x1 comes/goes to destination x2 from origin x3
		// via route x4 using means/vehicle x5.
		args: 5,
		defs: [
			['^ x1?s *:1go #2345','x1?s, #2345, *:1go','#2345, x1?s *:1 go']
		],
		prep: ['by x1','to destination x2','from origin x3','via route x4',
			'using means/vehicle x5'
		],
		sumti: ['*goer','*destination','*origin','*route','*means/vehicle'],
		tanru: 'going'
	},
	zdani: {
		args: 2,
		defs: [
			['x2? :2own a *house #','a *house is owned by x2'],
			'x1 :1is a *house #2'
		],
		prep: ['of/for x1','owned by x2'],
		sumti: ['*house','*house owner'],
		tanru: 'house'
	}
};
var cmavo = {
  //baseline demonstration of how function works
	"co'e": function(o) {
    if(o.type='bridi') {
      /*
      step 1:
      */
    }
  }
};


})();
