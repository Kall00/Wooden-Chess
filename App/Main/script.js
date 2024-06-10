let rback_clr_list = [];
let gback_clr_list = [];
let bback_clr_list = [];
let temp_id=[]; // temporary storage of id
let x_mark=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let clicked_chesspc_ele=null;
let turn_of='white';

const boxes = document.getElementsByClassName('center');

// click event on grid items

Array.from(boxes).forEach(element => { element.addEventListener('click', (e) => {

  temp_id=[]; // clearing temp ids

  // click event on chess pcs
  if (element.getElementsByTagName('img').length > 0){

    if (element.getElementsByTagName('img')[0].alt.includes(turn_of)){

    // for getting this value when clicked on non chesspc grid
    clicked_chesspc_ele=element;
    
  // getting the moves of selected chess pieces
  let valid_moves=GetValidMoves(element);

// adding one more item to valid moves list
    valid_moves.push({e:element,clr:"blue"});
    
    // passing the moves to manage colors
manage_backcolors(valid_moves);

    }
    
  }

  // click listen for valid moves
   if (element.classList.contains('red') || element.classList.contains('green')){

     move_pcs(element);
     
   }
  
  
  });
});

function GetValidMoves(element){
  
  // getting the selected chess pieces
 const clicked_src = element.getElementsByTagName('img').item(0).src;
  
  let id=element.getAttribute('id');
  
  let valid_moves=[];
  
  if (clicked_src.includes("pawn")){

valid_moves=getPawnmoves(clicked_src,id);
    
  }
  
  else if (clicked_src.includes("rook")){
    valid_moves=getRookmoves(clicked_src,id);
  }
  
  else if (clicked_src.includes("knight")){
    valid_moves=getKnightmoves(clicked_src,id);
  }
  
  else if (clicked_src.includes("bishop")){
    valid_moves=getBishopmoves(clicked_src,id);
  }
  
  else if (clicked_src.includes("queen")){
    valid_moves=getQueenmoves(clicked_src,id);
  }
  
  else if (clicked_src.includes("king")){
    valid_moves=getKingmoves(clicked_src,id);
  }

  return valid_moves;
}

function manage_backcolors(obj_clr){

  // clearing all previous list of background colors
  rback_clr_list.forEach((e) => {
    e.classList.remove("red");
  })

  gback_clr_list.forEach((e) => {
    e.classList.remove("green");
  })

  bback_clr_list.forEach((e) => {
    e.classList.remove("blue");
  })

  rback_clr_list = [];
  gback_clr_list = [];
  bback_clr_list = [];

  // adding new background colors

  for (let i = 0; i < obj_clr.length; i++){

    // getting attributes from obj_clr
    let e = obj_clr[i].e;
    let clr = obj_clr[i].clr;

    // adding the background color
   e.classList.add(clr);

    // updating the background color list
    if (clr == "blue"){
      bback_clr_list.push(e);
    }else if(clr == "green"){
      gback_clr_list.push(e);
    }else if (clr == "red"){
      rback_clr_list.push(e);
    }
    
  }
  
}

function getPawnmoves(clicked_src,id){
  let valid_moves=[];

  // for normal moves i.e. green moves

  // for double moves
  // for black pawn moves
      if (id.includes("2")&&clicked_src.includes("bpawn")){
        temp_id.push(id.charAt(0)+"3");
temp_id.push(id.charAt(0)+"4");

      }
      // for white pawn moves
      else if (id.includes("7")&&clicked_src.includes("wpawn")){
        temp_id.push(id.charAt(0)+"6");
temp_id.push(id.charAt(0)+"5");

        // for single moves
    }else{
        // black pawn
      if (clicked_src.includes("bpawn")){

        temp_id.push(id.charAt(0)+(parseInt(id.charAt(1))+1));
        
      }
      // white pawn
      else if (clicked_src.includes("wpawn")){

        temp_id.push(id.charAt(0)+(parseInt(id.charAt(1))-1));  
        
      }

   }

  // push the green ids to valid moves
    for(i=0;i<(temp_id.length);i++){
      if(get_element_by_id(temp_id[i])!=null){
    if (!has_chess_pieces(temp_id[i])){
  valid_moves.push({e:get_element_by_id(temp_id[i]),clr:"green"}); 
    }else {
      break;
    }
  }
}


  // for capturing moves i.e. red moves

  let temp_index=0;
  let rival_clr=[];

  // resetting temp_id
  temp_id=[];

  // getting index
temp_index=x_mark.indexOf(id.charAt(0));
  
  // black pawn
  if (clicked_src.includes("bpawn")){

    // for non zero
    if (temp_index!=0){
    temp_id.push(x_mark[temp_index-1]+(parseInt(id.charAt(1))+1));

      rival_clr.push("white");
    }

    // for non seven
        if (temp_index!=7){
    temp_id.push(x_mark[temp_index+1]+(parseInt(id.charAt(1))+1));
        
        rival_clr.push("white");
        }

}
  // white pawn
  else if (clicked_src.includes("wpawn")){

    // for non zero
    if (temp_index!=0){
    temp_id.push(x_mark[temp_index-1]+(parseInt(id.charAt(1))-1));

      rival_clr.push("black");
    }  
    
    // for non seven
        if (temp_index!=7){
    temp_id.push(x_mark[temp_index+1]+(parseInt(id.charAt(1))-1));

          rival_clr.push("black");
          
        }
    
  }

  //pushing the red ids to valid moves
  for(i=0;i<(temp_id.length);i++){
    if (get_element_by_id(temp_id[i])!=null){
      if(has_chess_pieces(temp_id[i])){
      if (get_element_by_id(temp_id[i]).getElementsByTagName('img').item(0).alt.startsWith(rival_clr[i])){

        console.log(rival_clr[i]);
        valid_moves.push({e:get_element_by_id(temp_id[i]),clr:"red"});
      }
      }
    }
  }
  

  return valid_moves;
}

function getRookmoves(){
  let valid_moves=[];

  return valid_moves;
}

function getKnightmoves(){
  let valid_moves=[];

  return valid_moves;
}

function getBishopmoves(){
  let valid_moves=[];

  return valid_moves;
}

function getQueenmoves(){
  let valid_moves=[];

  return valid_moves;
}

function getKingmoves(){
  let valid_moves=[];

  return valid_moves;
}

function move_pcs(element){

  // getting the src and alt of moved chess pcs
  let src=clicked_chesspc_ele.getElementsByTagName('img').item(0).src; let alt=clicked_chesspc_ele.getElementsByTagName('img').item(0).alt;

    // deleting the moved chess pcs img
    clicked_chesspc_ele.getElementsByTagName('img').item(0).remove();

    // adding the moved chess pcs img
let elem = document.createElement("img");
elem.setAttribute("src", src);
elem.setAttribute("alt",alt);
  console.log(elem)
element.appendChild(elem);

  // special condition for red moves
   if (element.classList.contains('red')){

    // removing the chess pcs which were replaced by moved chess pc
    
element.getElementsByTagName('img').item(0).remove()
    
    
  }

  // Clearing the background colors
  manage_backcolors([]);

  // change the turn 
  mng_turn();
  
}

function mng_turn(){

  if (turn_of == 'white'){
    turn_of='black';
  }else{
    turn_of='white';
  }
  
}

function get_element_by_id(id){
  return document.getElementById(id);
}

// function to check if grid has chess pieces 
function has_chess_pieces(id){
  if( get_element_by_id(id).getElementsByTagName('img').length > 0) {
    return true;
  }else{
    return false;
  }
}