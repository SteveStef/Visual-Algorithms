import './App.css';
import React, { Component } from 'react';
import colors from './colors.js';
import InsertionSort from './insertionSort.js';
import Heap from './heap.js';
import Selection from './selection.js';
import CockTail from './CockTail.js';

let bubbleSort = {
  comparisons: 0,
  swaps: 0,
  color: 'black',
  isClicked: false
}
let quickSort = {
  comparisons: 0,
  swaps: 0,
  color: colors[Math.floor(Math.random() * colors.length)],
  colorState: [],
  isClicked: false
}

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      array: [108, 52, 168, 28, 8, 147, 177, 251, 98, 241, 282, 19, 279, 63, 229, 32, 100, 263, 57, 76, 190, 25, 111, 87, 186, 123, 262, 69, 238, 141, 258, 125, 7, 5, 160, 54, 89, 113, 143, 30, 18, 86, 90, 275, 119, 15,108, 52, 168, 28],
      quickSortArr: [108, 52, 168, 28, 8, 147, 177, 251, 98, 241, 282, 19, 279, 63, 229, 32, 100, 263, 57, 76, 190, 25, 111, 87, 186, 123, 262, 69, 238, 141, 258, 125, 7, 5, 160, 54, 89, 113, 143, 30, 18, 86, 90, 275, 119, 15,108, 52, 168, 28, 8, 147, 177, 251, 98, 241, 282,108, 52, 168, 28, 8, 147, 177, 251, 98, 241, 282,222,23],
      bubbleColor: colors[Math.floor(Math.random() * colors.length)],
    }
  }
  async resetArray() {
    bubbleSort.isClicked = false;
    bubbleSort.comparisons = 0;
    bubbleSort.swaps = 0;
    this.setState({bubbleColor: colors[Math.floor(Math.random() * colors.length)]});
    const array = this.state.array;
    for (let i = 0; i < 50; i++) {
      array[i] = (randomNum(5, 290));
      await this.sleep(10);
      this.setState({array});
    }
  }
  async resetQuick() {
    quickSort.isClicked = false;
    quickSort.comparisons = 0;
    quickSort.swaps = 0;
    const array = this.state.quickSortArr;
    for (let i = 0; i < 70; i++) {
      array[i] = (randomNum(5, 290));
      await this.sleep(6);
      this.setState({quickSortArr: array});
    }
  }
  componentDidMount() {
    this.resetArray();
    this.resetQuick();
  }
  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  quickSort = async (arr, start, end) => {
    if(!quickSort.isClicked) quickSort.isClicked = true;
    for(let i=start;i<end;i++){
      quickSort.colorState[i] = 1;
    }
    if(start >= end){
      console.log("here")
      return this.setState({quickSortArr: arr})
  }
    let index = await this.partitionFn(arr, start, end);
    quickSort.colorState[index] = -1;
    await this.quickSort(arr,start,index-1);
    await this.quickSort(arr,index+1,end);
  }
  partitionFn = async (arr,start,end) => {
    let pivitI = start;
    let pivitV = arr[end];
    quickSort.colorState[pivitI] = 0;
    for(let i=start;i<end;i++) {
      quickSort.comparisons++;
      if(arr[i] < pivitV) {
        quickSort.swaps++;
        let temp = arr[i];
        arr[i] = arr[pivitI];
        arr[pivitI] = temp;
        quickSort.colorState[pivitI] = -1;
        pivitI++;
        quickSort.colorState[pivitI] = 0;
      }
    }
    let temp = arr[pivitI];
    arr[pivitI] = arr[end];
    arr[end] = temp;
    
    await this.sleep(70);
    this.setState({quickSortArr: arr})
    for(let i=start;i<end;i++){
      quickSort.colorState[i] = -1;
    }
    return pivitI;
  }

  async bubbleSort(Array) {
    bubbleSort.isClicked = true;
    let len = Array.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        bubbleSort.comparisons++;
        if (Array[j] > Array[j + 1]) {
        bubbleSort.swaps++;
          let tmp = Array[j];
          Array[j] = Array[j + 1];
          Array[j + 1] = tmp;
        }
      }
      await this.sleep(150);
      this.setState({array: Array});
    }
    this.setState({bubbleColor: 'rgb(0,100,0)'});
    await this.sleep(3000);
    this.resetArray()
  }


  render() {
    const { array, quickSortArr,bubbleColor } = this.state;
    return (
      <div>
        <header className="main-header dark-theme">
          <ul className="header-options">
          <li className="title"> Sorting <b>Algorithm</b> Visulization </li>
          </ul>
        </header>
        
        <div className="wrap">
            <div className="card">
              <div className="container">
                <div style={{backgroundColor: "#242836", height: "600px", width: "350px"}}>
                <div className="array-container">{array.map((num, idx) => {
                return(
                  <div className="array-bar"
                    key={idx} style={{width: '5px',margin: '1px',
                    backgroundColor: bubbleColor,height: `${num}px`,
                  }}></div>
                )
              })}</div>
              <h4><b>BUBBLE-SORT</b></h4>
 
            <p> This sorting algorithm is comparison-based algorithm in which each pair of adjacent elements is compared and the elements are swapped if they are not in order. This algorithm is not suitable for large data sets as its average and worst case complexity are of Ο(n^2).</p>
              <div style={{fontWeight: 'bold'}}># of Comparisons - <span style={{fontSize: '20px'}}>{bubbleSort.comparisons}</span></div>
              
              <div style={{fontWeight: 'bold'}}># of Swaps - <span style={{fontSize: '20px'}}>{bubbleSort.swaps}</span></div>
              <span onClick={() => this.bubbleSort(array)} className="play-btn" href="#"></span>
                </div>
              </div>
          </div>
          <div className="card">
              <div className="container">
                <div style={{backgroundColor: "#242836", height: "600px", width: "350px"}}>
                <div className="array-container">{quickSortArr.map((num, idx) => {
                  if(quickSort.colorState[idx] === 0){
                    quickSort.color = 'blue'
                  }else if(quickSort.colorState[idx] === 1){
                    quickSort.color = 'darkred';
                  }else quickSort.color = 'gray';
                return(
                  <div className="array-bar"
                    key={idx} style={{width: '5px',margin: '0px',
                    backgroundColor: quickSort.color,height: `${num}px`,
                  }}></div>
                )
              })}</div>
            <h4><b>QUICK-SORT</b></h4>

            <p>Quicksort is a divide-and-conquer algorithm. It works by selecting a 'pivot' 
              element from the array and partitioning the other elements into two sub-arrays,
               according to whether they are less than or greater than the pivot. This has a time complexity of O(n log n).</p>
                <div style={{fontWeight: 'bold'}}># of Comparisons - <span style={{fontSize: '20px'}}>{quickSort.comparisons}</span></div>
                
                <div style={{fontWeight: 'bold'}}># of Swaps - <span style={{fontSize: '20px'}}>{quickSort.swaps}</span></div>
              {
              quickSort.isClicked ? <div onClick={() => this.resetQuick()} className="play-btn" href="#"></div> 
              : <div onClick={() => this.quickSort(quickSortArr, 0,quickSortArr.length-1 )} className="play-btn" href="#"></div>
            }
                </div>
              </div>
          </div>
            <Selection/>
            <InsertionSort/>
            <Heap/>
            <CockTail/>
        </div>
      </div>

      )
  }
}
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default App;
