function byTagName(node, tag_wanted){

    var tag_wanted_array = [];

    if (node.tagName.toLowerCase() == tag_wanted){
        tag_wanted_array.push(node)
    }
    //search through each of the child nodes and check if they, or their
    //own child nodes are the same as the tag_wanted
    for (var i = 0; i < node.childNodes.length; i++){
        //checking if the current child is tag_wanted and if it has its own nodes
        if (node.childNodes[i].nodeType != document.ELEMENT_NODE){
            continue
        }
        else if ((node.childNodes[i].tagName.toLowerCase() == tag_wanted)){
                     if (node.childNodes[i].hasChildNodes()){
                         var childs_tag_array = byTagName(node.childNodes[i], tag_wanted);
                         //adding the recursive call's array to our current array
                         tag_wanted_array.concat(childs_tag_array);
                     }
                     else {
                         tag_wanted_array.push(node.childNodes[i]);
                     }
                 }
        else if (node.childNodes[i].hasChildNodes()){
                     var childs_tag_array = byTagName(node.childNodes[i], tag_wanted);
                     //adding the recursive call's array to our current array
                     tag_wanted_array.concat(childs_tag_array);
        }
    }
    return tag_wanted_array;
}

 console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  var para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2