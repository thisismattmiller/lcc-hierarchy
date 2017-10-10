const fs = require('fs')



var countHierarchy = {
  'A':{code:'A', subject:'General Works',count:0,children:{}},
  'B':{code:'B', subject:'Philosophy, Psychology, Religion',count:0,children:{}},
  'C':{code:'C', subject:'Auxiliary Sciences of History (General)',count:0,children:{}},
  'D':{code:'D', subject:'World History (except American History)',count:0,children:{}},
  'E':{code:'E', subject:'American History',count:0,children:{}},
  'F':{code:'F', subject:'Local History of the United States and British, Dutch, French, and Latin America',count:0,children:{}},
  'G':{code:'G', subject:'Geography, Anthropology, Recreation',count:0,children:{}},
  'H':{code:'H', subject:'Social Sciences',count:0,children:{}},
  'J':{code:'J', subject:'Political Science',count:0,children:{}},
  'K':{code:'K', subject:'Law',count:0,children:{}},
  'L':{code:'L', subject:'Education',count:0,children:{}},
  'M':{code:'M', subject:'Music',count:0,children:{}},
  'N':{code:'N', subject:'Fine Arts',count:0,children:{}},
  'P':{code:'P', subject:'Language and Literature',count:0,children:{}},
  'Q':{code:'Q', subject:'Science',count:0,children:{}},
  'R':{code:'R', subject:'Medicine',count:0,children:{}},
  'S':{code:'S', subject:'Agriculture',count:0,children:{}},
  'T':{code:'T', subject:'Technology',count:0,children:{}},
  'U':{code:'U', subject:'Military Science',count:0,children:{}},
  'V':{code:'V', subject:'Naval Science',count:0,children:{}},
  'Z':{code:'Z', subject:'Bibliography, Library Science',count:0,children:{}}
}




var all = JSON.parse(fs.readFileSync('lcc_simple_count.json').toString())


Object.keys(countHierarchy).forEach((level)=>{

  var nodes = []
  var nodesIds = []
  var links = []
  var maxCount = 0

  function traverse (obj, callback, trail) {
    trail = trail || []

    if (obj.id){
      if (obj.id.length==2){
        links.push({source:obj.id.substring(0,1),target:obj.id})
        if (nodesIds.indexOf(obj.id.substring(0,1))==-1){
          nodesIds.push(obj.id.substring(0,1))
          nodes.push({id:obj.id.substring(0,1),size:0, subject:countHierarchy[level].subject})
          if (obj.count > maxCount) maxCount = obj.count
        }

      }

      if (nodesIds.indexOf(obj.id)==-1){
        nodesIds.push(obj.id)
        nodes.push({id:obj.id,size:obj.count, subject:obj.subject})
        if (obj.count > maxCount) maxCount = obj.count
      }
      // console.log(obj.id)
      if (Object.keys(obj.children).length>0){
        Object.keys(obj.children).forEach((cKey)=>{
          // console.log(obj.id,"-->",cKey)
          links.push({source:obj.id,target:cKey})
        })
      }
    }




    Object.keys(obj).forEach(function (key) {
      var value = obj[key]

      if (Object.getPrototypeOf(value) === Object.prototype) {
        traverse(value, callback, trail.concat(key))
      } else {
        callback.call(obj, key, value, trail)
      }
    })
  }



  traverse(all[level], function (key, value, trail) {

    // console.log(key,value,trail)
    // console.log('-----')
    
  })
  fs.writeFileSync('data/'+level+'.json',JSON.stringify({nodes:nodes,links:links,maxCount:maxCount},null,2))

  console.log(links)


})



