import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bingo-board',
  templateUrl: './bingo-board.component.html',
  styleUrl: './bingo-board.component.css'
})
export class BingoBoardComponent implements OnInit {

  numbers!: number[][];

  result:boolean[][]=[[false,false,false,false,false],
                      [false,false,false,false,false],
                      [false,false,false,false,false],
                      [false,false,false,false,false],
                      [false,false,false,false,false]];

  count:number=0;
  ldFlag:boolean=false;
  rdFlag:boolean=false;
  cornerFlag:boolean=false;

  // Index signature
  [key: string]: any;

  'r1Flag':boolean=false;
  ['r2Flag']:boolean=false;
  'r3Flag':boolean=false;
  'r4Flag':boolean=false;
  'r5Flag':boolean=false;

  'c1Flag':boolean=false;
  'c2Flag':boolean=false;
  'c3lag':boolean=false;
  'c4Flag':boolean=false;
  'c5Flag':boolean=false;

  ngOnInit(): void {
    this.numbers=[[1,2,3,4,5],
                  [6,7,8,9,10],
                  [11,12,13,14,15],
                  [16,17,18,19,20],
                  [21,22,23,24,25]];
  }

  shuffle(){
    // Flatten the 2D array into a 1D array
    const flattenedArray: number[] = this.numbers.flat();

    // Fisher-Yates shuffle algorithm
    for (let i = flattenedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flattenedArray[i], flattenedArray[j]] = [flattenedArray[j], flattenedArray[i]];
    }

    // Reshape the shuffled 1D array back into a 2D array
    const numberOfRows = this.numbers.length;
    const numberOfCols = this.numbers[0].length;
    const shuffled2DArray: number[][] = [];

    for (let i = 0; i < numberOfRows; i++) {
      shuffled2DArray.push(flattenedArray.slice(i * numberOfCols, (i + 1) * numberOfCols));
    }

    this.numbers=shuffled2DArray;
  }

  selected(event:Event, row: number, col:number){

    
    
    let previous=(<HTMLInputElement>event.target).style.backgroundColor;
    if(previous!='red'){
      (<HTMLInputElement>event.target).style.backgroundColor='red';

      this.result[row][col]=true;

    }
    else{
      (<HTMLInputElement>event.target).style.backgroundColor='';
      this.result[row][col]=false;

      if(this.ldFlag && row==col){
        this.count--;
        this.ldFlag = false;
      }
      if(!this.rdFlag && row+col==4){
        this.count--;
        this.rdFlag = false;
      }
  
      if(this['r'+(row+1)+'Flag']){
        this.count--;
        this['r'+(row+1)+'Flag'] = false;
      }
  
      if(this['c'+(col+1)+'Flag']){
        this.count--;
        this['c'+(col+1)+'Flag'] = false;
      }
  
      if(this.cornerFlag && ((row==0 && col==0) || (row==0 && col==4) || (row==4 && col==0) || (row==4 && col==4))){
        this.count--;
        this.cornerFlag =false;
      }
      
    }

    
    this.check(row, col);

    console.log(this.count);
    
  }

  check(row:number, col:number){
    
    if(!this.ldFlag && row==col){
      this.checkLeftDiagonal();
    }
    if(!this.rdFlag && row+col==4){
      this.checkRightDiagonal();
    }

    if(!this['r'+(row+1)+'Flag']){
      this.checkRow(row);
    }

    if(!this['c'+(col+1)+'Flag']){
      this.checkCol(col);
    }

    if(!this.cornerFlag){
      this.checkCorner();
    }
    
  }

  checkRow(row:number){
    let arr=this.result;

    let flag=true;

    for(let i=0; i<5; i++){

      if(!arr[row][i]){
        flag=false;
        break;
      }
    }

    if(flag){
      this.count++;
      this['r'+(row+1)+'Flag'] = true;
    }
  }

  checkCol(col:number){
    
    let arr=this.result;

    let flag=true;

    for(let i=0; i<5; i++){

      if(!arr[i][col]){
        flag=false;
        break;
      }
    }

    if(flag){
      this.count++;
      this['c'+(col+1)+'Flag'] = true;
    }

  }

  checkCorner(){
    let arr=this.result;
    if(arr[0][0] && arr[0][4] && arr[4][0] && arr[4][4]){
      this.cornerFlag=true;
      this.count++;
    }
  }

  checkLeftDiagonal(){
    let arr=this.result;

    let flag=true;

    for(let i=0; i<5; i++){

      if(!arr[i][i]){
        flag=false;
        break;
      }
    }

    if(flag){
      this.count++;
      this.ldFlag = true;
    }
  }

  checkRightDiagonal(){
    let arr=this.result;

    let flag=true;
    for(let i=0; i<5; i++){

      if(!arr[i][4-i]){
        flag=false;
        break;
      }
    }

    if(flag){
      this.count++;
      this.rdFlag = true;
    }
  }



}
