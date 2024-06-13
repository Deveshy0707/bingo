import { style } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bingo-board',
  templateUrl: './bingo-board.component.html',
  styleUrl: './bingo-board.component.css'
})
export class BingoBoardComponent implements OnInit {

  numbers!: number[][];

  initial!:number[][];

  shuffleDisabled: boolean = false;

  // Index signature
  [key: string]: any;

  // 'r1Flag':number=0;
  // ['r2Flag']:number=0;
  'rowsData': number[]=[0,0,0,0,0];
  ['colsData']: number[]=[0,0,0,0,0];

  diagonalData:number[]=[0,0];

  cornerFlag:number=0;

  count:number=0;


  ngOnInit(): void {
    this.numbers=[[1,2,3,4,5],
                  [6,7,8,9,10],
                  [11,12,13,14,15],
                  [16,17,18,19,20],
                  [21,22,23,24,25]];

    this.initial=[[1,2,3,4,5],
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

  reset(){
    this.numbers=[[...this.initial[0]],
                  [...this.initial[1]],
                  [...this.initial[2]],
                  [...this.initial[3]],
                  [...this.initial[4]]];
    
    this.shuffleDisabled=false;

    this['rowsData']=[0,0,0,0,0];
    this['colsData']=[0,0,0,0,0];

    this.diagonalData=[0,0];

    this.cornerFlag=0;

    this.count=0;
  }


  selected(event:Event, row: number, col:number){

    if(this.count!=5 && this.shuffleDisabled==true){
      let operation:string;
    
    
      let previous=(<HTMLInputElement>event.target).style.backgroundColor;
      if(previous!='red'){
        (<HTMLInputElement>event.target).style.backgroundColor='red';
  
        operation='select';
      }
      else{
        (<HTMLInputElement>event.target).style.backgroundColor='';
        operation='deselect';
      }
      
      this.check(row, col, operation);
      console.log(this.count);
  
      if(this.count==5){
        alert('Bingo! You win!');
        // this.reset();
      }
    }
  }

  check(row:number, col:number, operation:string){
    
    this.checkRowColDiagonal(this.rowsData ,row, operation);
    this.checkRowColDiagonal(this.colsData ,col, operation);

    if(row==col){
      this.checkRowColDiagonal(this.diagonalData ,0, operation);
    }
    if(row==4-col){
      this.checkRowColDiagonal(this.diagonalData ,1, operation);
    }
    
    if((row==0 && col==0) || (row==0 && col==4) || (row==4 && col==0) || (row==4 && col==4)){
      this.checkCorner(operation);
    }
    
  }

  checkRowColDiagonal(arr:number[] ,i:number, operation:string){

    switch(operation){

      case 'select':
        arr[i]++;
        if(arr[i]==5){
          this.count++;
        }
        break;
      
      case 'deselect':
        if(arr[i]==5){
          this.count--;
        }
        arr[i]--;
        break;

    }
  }

  checkCorner(operation:string){

    switch(operation){

      case 'select':
        this.cornerFlag++;
        if(this.cornerFlag==4){
          this.count++;
        }
        break;
      
      case 'deselect':
        if(this.cornerFlag==4){
          this.count--;
        }
        this.cornerFlag--;
        break;

    }
  }

}
