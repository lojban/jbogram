function t(lojban) {
  //tanruizes
  function tanru(desc,txt) {
    return txt.replace('*',desc+' ');
  }
  //retrieves the definition object of a brivla
  function brivladef(brivla) {
    return dictionary.selbri[brivla.type][brivla.name];
  }
  //totally illegal
  function keygen(sumti,args) {
    console.log(arguments);
    var key='';
    for(var i=0;i<sumti.length&&i<args;++i) {
      key+=sumti[i]?'y':'n';
    }
    console.log(key);
    return key;
  }
  //retrieves the dictionary definition of a selbri/tanru
  function dictionize(selbri,o) {
    //console.log('wot',selbri);
    var desc;
    if(selbri.type==='tanru') {
      //TODO: if left is a tanru; if multiple SE
      var left=selbri.left,right=selbri.right;
      var def=brivladef(right.brivla);
      var sedef=def[o.type][right.brivla.SE[0]||'d'],
        adj=brivladef(left.brivla).tanru;
      console.log(o.type);
      if(o.type==='selbri') {

        console.log(o.sumti,def.args,keygen(o.sumti,def.args));
        sedef=sedef[keygen(o.sumti,def.args)];}
      desc=tanru(adj,sedef);

    } else {//selbri
      //TODO tanru changes here
      var brivla=selbri.brivla;
      var def=brivladef(brivla);
      var sedef=def[o.type][brivla.SE[0]||'d'];
      if(o.type==='selbri')
        sedef=sedef[keygen(o.sumti,def.args)];
      sedef=sedef.replace('*','');
      desc=sedef;
    }
    return desc;
  }

  function tsumti(sumti) {
    if(!sumti) return '';
    if(sumti.cmavo) {
      return dictionary.sumti[sumti.cmavo];
    } else if(sumti.gadri==='lo') {
      var desc=dictionize(sumti.selbri,{type:'sumti'});
      return 'a/the '+desc;
    }
  }
  function tbridi(selbri,sumti) {
    var predicate=dictionize(selbri,{type:'selbri',sumti:sumti});
    for(var i=1;i<=sumti.length;++i) {
      predicate=predicate.replace('x'+i,tsumti(sumti[i-1]));
    }
    return predicate;
  }
  var p=parser.parse(lojban);
  console.log(JSON.stringify(p,undefined,2));
  var emptyhead=true;//whether the bridi head has no sumti in it
  if(p.type==='fragment') {
    var bhead=p.terms;//just to reuse code
  } else {
    var bhead=p.head,
      bselbri=p.selbri,
      btail=p.tail;
  }
  var pos=0,sumti=[];
  //fill in our sumti places using position counting rules and such
  for(var i=0;i<bhead.length;++i) {
    var cur=bhead[i];
    if(cur.type==='FA') {
      emptyhead=false;
      pos='aeiou'.indexOf(cur.name[1])
    } else if(cur.type==='sumti') {
      emptyhead=false;
      sumti[pos++]=cur;
    }
  }
  //return a list of sumti if there's no predicate
  if(p.type==='fragment') {
    var ret='';
    for(var i=0;i<sumti.length;++i) {
      if(i!==0) ret+=', ';
      ret+=tsumti(sumti[i]);
    }
    return ret;
  }
  //e.g. zdani mi
  if(emptyhead) pos=1;
  //checking terms in bridi tail now
  for(var i=0;i<btail.length;++i) {
    var cur=btail[i];
    if(cur.type==='FA') {
      pos='aeiou'.indexOf(cur.name[1])
    } else if(cur.type==='sumti') {
      sumti[pos++]=cur;
    }
  }
  return tbridi(bselbri,sumti);
}
