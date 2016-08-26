#include<iostream>
#include<vector>
#include<cstdlib>
#include<iomanip>
using namespace std;

class tile{

public:

    unsigned int value;
    bool blocked;

    tile():value(0),blocked(false){}

};

class game2048{

    vector<vector<tile> >board;
    bool moved,done;
    unsigned int score;


    void addTile(){

        int x,y;
        do{

        x=rand()%4;
        y=rand()%4;
        }while(board[x][y].value);

        rand()%100;
        (rand()%100)>89?board[x][y].value=4:board[x][y].value=2;

        if(canMove())return;

        done=true;

    return;

    }


    bool canMove(){

        for(int i=0;i<4;i++){

            for(int j=0;j<4;j++){

                if(!board[i][j].value)
                        return true;
            }

        }


    for(int i=0;i<4;i++){

        for(int j=0;j<4;j++){

            if(testMove(i+1,j,board[i][j].value))return true;
            if(testMove(i,j+1,board[i][j].value))return true;
            if(testMove(i,j-1,board[i][j].value))return true;
            if(testMove(i-1,j,board[i][j].value))return true;

        }

    }


    return false;
    }


    bool testMove(int i,int j,unsigned int val){

    return (i<0||i>3||j<0||j>3)?false:board[i][j].value==val;


    }




bool is2048Achieved(){

for(int i=0;i<4;i++){
for(int j=0;j<4;j++){
if(board[i][j].value==2048) return true;

}
}
return false;
}

    void transpose(){

        for(int i=0;i<4;i++){
            for(int j=i+1;j<4;j++){

            int temp=board[i][j].value;
            board[i][j].value=board[j][i].value;
            board[j][i].value=temp;
            }

        }

    return;
    }

void displayBoard(){

system("clear");
cout<<setw(38)<<"+----------+"<<endl<<setw(27)<<"|";
cout<<setw(5)<<"  2048!!!"<<setw(2)<<"|"<<endl;
cout<<setw(38)<<"+----------+"<<endl<<endl<<endl;
cout<<"SCORE : "<<score<<endl<<endl;
for(int i=0;i<4;i++){
     cout<<"+-----+-----+-----+-----+"<<endl<<"|";
     for(int j=0;j<4;j++){
     if(!board[i][j].value) cout<<setw(4)<<" ";
     else cout<<setw(4)<<board[i][j].value;
     cout<<" |";
     }
cout<<endl;
}
cout<<"+-----+-----+-----+-----+"<<endl<<endl;
return;
}


        void moveVerti(int i,int j,int d){

   if(board[i][j].value&&!board[i][j].blocked&&!board[i+d][j].blocked&&board[i+d][j].value==board[i][j].value){

                board[i][j].value=0;
                board[i+d][j].value*=2;
                board[i+d][j].blocked=true;
                score+=board[i+d][j].value;
                moved=true;
            }

            else if(!board[i+d][j].value&&board[i][j].value){

                board[i+d][j].value=board[i][j].value;
                board[i][j].value=0;
                moved=true;
            }
        if(d>0)
                    {
          if (i+d<3)
            moveVerti(i+d,j,1);
}
       else
            if(i+d>0)
                moveVerti(i+d,j,-1);


            return;
        }




        void takeInput(){


        moved=false;
        char ch;
        cout<<"UP(W) DOWN(S) LEFT(A) RIGHT(D): "<<endl;
        cin>>ch;
        ch=toupper(ch);
        switch(ch){

            case 'W': for(int j=0;j<4;j++){

                            for(int i=1;i<4;i++){

                                    if(board[i][j].value)moveVerti(i,j,-1);

                                }

                            }

                        break;

            case 'S': for(int j=0;j<4;j++){

                        for(int i=2;i>=0;i--){

                                if(board[i][j].value)moveVerti(i,j,1);

                                }
                            }
                        break;


        case 'A':       transpose();

                        for(int j=0;j<4;j++){

                            for(int i=1;i<4;i++){

                                    if(board[i][j].value)moveVerti(i,j,-1);

                                }

                            }
                            transpose();

                        break;

            case 'D':   transpose();


                    for(int j=0;j<4;j++){

                        for(int i=2;i>=0;i--){

                                if(board[i][j].value)moveVerti(i,j,1);

                                }
                            }
                            transpose();

            break;

};


    for(int i=0;i<4;i++){

        for(int j=0;j<4;j++){

        board[i][j].blocked=false;

        }

    }

    return;
    }

public:

    game2048():board(4,vector<tile>(4)),score(0),moved(true),done(false){}

    void start(){

        addTile();
        while(true){

            if(moved) addTile();
            displayBoard();
            if(is2048Achieved())cout<<"congrats,you made a 2048!!!"<<endl;
            if(done)break;
            takeInput();


        }

    cout<<"Game Over"<<endl;
    return;

    }

};

int main(){


game2048 G;
G.start();

return 0;

}
