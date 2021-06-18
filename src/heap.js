import React, { Component } from 'react';
import colors from './colors.js';
let array_length;
let heapSort = {
  comparisons: 0,
  swaps: 0,
  colorState: [],
  isClicked: false
}
class Heap extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       array: [108, 52, 168, 28, 8, 147, 177, 251, 98, 241, 282, 19, 279, 63, 229, 32, 100, 263, 57, 76, 190, 25, 111, 87, 186, 123, 262, 69, 238, 141, 258, 125, 7, 5, 160, 54, 89, 113, 143, 30, 18, 86, 90, 275, 119, 15,108, 52, 168, 28, 8, 147],
       color: colors[Math.floor(Math.random() * colors.length)]
    }
  }
  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async resetArray() {
    heapSort.isClicked = false;
    heapSort.comparisons = 0;
    heapSort.swaps = 0;
    this.setState({color: colors[Math.floor(Math.random() * colors.length)]}) ;
    const array = this.state.array;
    for (let i = 0; i < 52; i++) {
      array[i] = (randomNum(5, 290));
      await this.sleep(10);
      this.setState({array});
    }
  }
  componentDidMount() {
    this.resetArray()
  }

  heap_root(input, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;
    heapSort.comparisons++;
    if (left < array_length && input[left] > input[max]) {
        max = left;
    }
    heapSort.comparisons++;
    if (right < array_length && input[right] > input[max])     {
        max = right;
    }

    if (max !== i) {
      this.swap(input, i, max);
      this.heap_root(input, max);
    }
}

 async swap(input, index_A, index_B) {
    heapSort.swaps++;
    var temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;
    await this.sleep(50);
    this.setState({array: input});
}

  async heapSort(input) {
    heapSort.isClicked = true;
    array_length = input.length;
    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
        this.heap_root(input, i);
      }
    for (i = input.length - 1; i > 0; i--) {
        this.swap(input, 0, i);
        array_length--;
        this.heap_root(input, 0);
        await this.sleep(50);
        this.setState({array: input});
    }
    this.setState({array: input});
    this.setState({color: 'rgb(0,100,0'})
    await this.sleep(3000);
    this.resetArray();
  }
  render() {
    const { array, color} = this.state;
    return (
      <div>
        <div className="card">
          <div className="container">
            <div style={{backgroundColor: "#242836", height: "300px", width: "100%"}}>
            <br></br>
            <div className="array-container">{array.map((num, idx) => {
                return(
                  <div className="array-bar"
                    key={idx} style={{width: '5px',margin: '1px',
                    backgroundColor: color,height: `${num}px`,
                  }}></div>
                )
              })}</div>
            </div>
            <h4><b>HEAP-SORT</b></h4>
            <p> heapsort is a comparison-based sorting algorithm.
                heapsort divides its 
                input into a sorted and an unsorted region, and 
                it iteratively shrinks the unsorted region by 
                extracting the largest element from it and 
                inserting it into the sorted region.
              </p>
              <div style={{fontWeight: 'bold'}}># of Comparisons - <span style={{fontSize: '20px'}}>{heapSort.comparisons}</span></div>
                
                <div style={{fontWeight: 'bold'}}># of Swaps - <span style={{fontSize: '20px'}}>{heapSort.swaps}</span></div>
            
              <div onClick={() => this.heapSort(array)} className="play-btn" href="#"></div>
            
          </div>
        </div>
      </div>
    )
  }
}
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default Heap;
