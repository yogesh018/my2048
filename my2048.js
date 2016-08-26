var game=(function(){

var mat=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var mat1=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var prev_mat=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var score,el,flag_undo;

	
	function redraw(){

		console.log("redraw");
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				console.log(mat[i][j]);
				var x=4*i+j;
				el=document.getElementById(x);
				if(mat[i][j]){
					if(mat[i][j]<=2048){
						var class_name=" _"+mat[i][j];
						el.className="tile";
						el.className+=class_name;
					}
					else{
						el.className="tile_big";
						el.innerHTML=mat[i][j];
					}
				}
				else{
					el.innerHTML="";
					el.className="tile";
				}
			}
		}
		document.getElementById("score").innerHTML="Score= "+score;
	}

	function isGameOver(){
		if(canMove())
			return false;
		
		return true;

	}

	function canMove(){

		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(!mat[i][j])
						return true;
			}
		}

		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(testMove(i+1,j,mat[i][j])) return true;
				if(testMove(i,j-1,mat[i][j])) return true;
				if(testMove(i,j+1,mat[i][j])) return true;
				if(testMove(i-1,j,mat[i][j])) return true;
			}
		}

	}
	
	function testMove(i,j,value){

		return (i<0||i>3||j<0||j>3)?false:mat[i][j]===value;

	}


	function is2048Achieved(){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(mat[i][j]===2048)
					return true;
			}
		}
	
		return false;
	}

	function fillRandomEmptyCell(){

		console.log("fill  Random Empty cell")		
		
		do{
			var x=Math.floor(Math.random()*4);
			var y=Math.floor(Math.random()*4);

		}while(mat[x][y]);

		Math.random()<=0.7?mat[x][y]=2:mat[x][y]=4;
		



	}



	function shiftDown(){
		console.log("shift down");
        var i,j;
        for(j=0;j<4;j++){
            var start=0, list_zeroes=[],check=false;
            for(i=3;i>=0;i--){
                if(mat[i][j]===0){
                    check = true;
                    list_zeroes.push(i);
                }
                else if(mat[i][j] && check){
                    mat[list_zeroes[start]][j] = mat[i][j];
                    mat[i][j]=0;
                    list_zeroes.push(i);
                    start++;
                }
            }
        }
	}
	
	function copy(){
		console.log("copy");
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				mat1[i][j]=mat[i][j];
			}
		}
	}


	function copy_prev_matrix(){

		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				prev_mat[i][j]=mat[i][j];
			}
		}
	}
	function moved(){

		console.log("moved");
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(mat1[i][j]!==mat[i][j])return true;
			}
		}
		return false;
	}

	function moveDown(){

		console.log("move down");
		copy();
				for (var j=0;j<4;j++){
			for (var i=3;i>=0;i--){
				if (mat[i][j]!==0){
					for (var k=i-1;k>=0;k--){
						if (mat[i][j]===mat[k][j]){
							mat[i][j]=2*mat[k][j];
							mat[k][j]=0;
							score+=mat[i][j];
							i=k;
							break;
						}
						else if(mat[k][j]!==0){
							break;
						}
					}
				}
			}
		}
	

		shiftDown();
		if(moved())
				fillRandomEmptyCell();

	}



	function col_reverse(){

		console.log("col_reverse");
		for(var j=0;j<4;j++){
			var temp=mat[0][j];
			mat[0][j]=mat[3][j];
			mat[3][j]=temp;
			temp=mat[1][j];
			mat[1][j]=mat[2][j];
			mat[2][j]=temp;
		}
	}

	function row_reverse(){
		console.log("row_reverse");
		for(var i=0;i<4;i++){
			var temp=mat[i][0];
			mat[i][0]=mat[i][3];
			mat[i][3]=temp;
			temp=mat[i][1];
			mat[i][1]=mat[i][2];
			mat[i][2]=temp;
		}
	}



	function transpose(){
		console.log("transpose");
		for(var i=0;i<4;i++){
			for(var j=i+1;j<4;j++){
				var temp=mat[i][j];
				mat[i][j]=mat[j][i];
				mat[j][i]=temp;
			}
		}
	}


	function move(e){
		e.preventDefault();
		copy_prev_matrix();
		flag_undo=true;
		console.log("something!")
		if(e.keyCode===37){
			console.log("blah");
			transpose();
			col_reverse();// rotate 90 degree anti clockwise
			moveDown();
			transpose();
			row_reverse();
		}

	

		if(e.keyCode===38){

				transpose();
				row_reverse();
				transpose();
				row_reverse();
				moveDown();
				transpose();
				col_reverse();
				transpose();
				col_reverse();
															/// rotate 180 degree clockwise
		}
	

		if(e.keyCode===39){

			transpose();
			row_reverse();
			moveDown();
			transpose();
			col_reverse();								///rotating 90 degree clock wise		

		}

	
		if(e.keyCode===40){

			moveDown();
		}
		redraw();
		if(isGameOver()){
				console.log("game over");
								
				document.getElementById("over").style.height="100%";
	}
		
	} 


	function undo(){

		if(flag_undo){
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					mat[i][j]=prev_mat[i][j];
				}
			}
			redraw();
			flag_undo=false;		
		}
		else{
			document.getElementById("invalid-undo").style.height="100%";
		}
	}
	function reset(){


		document.getElementById("over").style.height="0%";		
			
		if(localStorage.matrix&&!isGameOver()){
			 mat=JSON.parse(localStorage.matrix);
			
		}
		else{
			mat=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			score=0;
			fillRandomEmptyCell();
			fillRandomEmptyCell();
			

		}
	
		redraw();
	}
	
	function BeforeUnload(){

		localStorage.setItem("mat",JSON.stringify(prev_mat));
		


	}
	function init(id){
		
		flag_undo=false;
		reset();
		

		var el1=document.getElementById(id);
		el1.addEventListener("click",reset);
		
		
		document.getElementById("try-again").addEventListener("click",reset);
		document.getElementById("undo").addEventListener("click",undo);
		
		document.getElementById("ok").addEventListener("click",function(){
			document.getElementById("invalid-undo").style.height="0%";
		});
		
		document.body.addEventListener('keydown',move);
		window.addEventListener("unload",BeforeUnload);


}

return {

			init:init
	};

})();