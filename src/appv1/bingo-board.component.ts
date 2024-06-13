import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bingo-board',
  templateUrl: './bingo-board.component.html',
  styleUrl: './bingo-board.component.css'
})
export class BingoBoardComponent implements OnInit {

  numbers!: number[][];


  // Index signature
  [key: string]: any;

  // 'r1Flag':number=0;
  // ['r2Flag']:number=0;

  'rowsData': number[]=[0,0,0,0,0];
  ['colsData']: number[]=[0,0,0,0,0];

  ldFlag:number=0;
  rdFlag:number=0;

  cornerFlag:number=0;

  count:number=0;


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

      // this.result[row][col]=true;

    }
    else{
      (<HTMLInputElement>event.target).style.backgroundColor='';
      // this.result[row][col]=false;

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

    if(!this.cornerFlag && ((row==0 && col==0) || (row==0 && col==4) || (row==4 && col==0) || (row==4 && col==4))){
      this.checkCorner();
    }
    
  }

  checkRow(row:number){
    this.rowsData[row]++;

    if(this.rowsData[row]==5){
      this.count++;
    }
  }

  checkCol(col:number){
    this.colsData[col]++;

    if(this.colsData[col]==5){
      this.count++;
    }

  }

  checkCorner(row:number, col:number){
    this.cornerFlag++;

    if(this.cornerFlag==4){
      this.count++;
    }
  }

  checkLeftDiagonal(){this.cornerFlag++;

    this.ldFlag++;
    if(this.ldFlag==5){
      this.count++;
    }
  }

  checkRightDiagonal(){

    this.rdFlag++;
    if(this.rdFlag==5){
      this.count++;
    }
  }



}
