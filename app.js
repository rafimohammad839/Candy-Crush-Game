document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const squares = []
    let score = 0

    const candyColors = [
        'url(images/red-candy.png)',
        'url(images/yellow-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/green-candy.png)',
        'url(images/blue-candy.png)'
    ]

    //create board
    function createBoard(){
        for(let i = 0; i < width*width; i++){
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
    }

    createBoard()

    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    //drag the candies
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart(){
        colorBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id)
        console.log(colorBeingDragged)
        console.log(this.id, 'dragstart')
    }

    function dragOver(e){
        e.preventDefault()
        console.log(this.id, 'dragover')
    }

    function dragEnter(){
        e.preventDefault()
        console.log(this.id, 'dragEnter')
    }

    function dragLeave(){
        console.log(this.id, 'dragLeave')
    }

   
    function dragDrop(){
        console.log(this.id, 'dragDrop')
        colorBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
    }

    function dragEnd(){
        console.log(this.id, 'dragEnd')
        //what is a valid move?
        let validMoves = [
            squareIdBeingDragged-1,
            squareIdBeingDragged-width,
            squareIdBeingDragged+1,
            squareIdBeingDragged+width
        ]
        let validMove = validMoves.includes(squareIdBeingReplaced)

        if(squareIdBeingReplaced && validMove){
            squareIdBeingReplaced = null
        } else if(squareIdBeingReplaced && !validMove){
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        } else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    }

    //drop candies once some have been cleared
    function moveDown(){
        for(let i = 0; i < 55; i++){
            if(squares[i+width].style.backgroundImage === ''){
                squares[i+width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ''
                const firstRow = [1,2,3,4,5,6,7]
                const isFirstRow = firstRow.includes(i)
                if(isFirstRow && squares[i].style.backgroundImage === ''){
                    let randomColor = Math.floor(Math.random() * candyColors.length)
                    squares[i].style.backgroundImage = candyColors[randomColor]
                }
            }
        }
    }

    //checking for matches
        //check for row of four
        function checkRowForFour(){
            for(let i = 0; i < 60; i++){
                let rowOFFour = [i, i+1, i+2, i+3]
                let decidedColor = squares[i].style.backgroundImage
                const isBlank = squares[i].style.backgroundImage === ''
    
                const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]
                if(notValid.includes(i)) continue
    
                if(rowOFFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                    score += 4
                    scoreDisplay.innerHTML = score
                    rowOFFour.forEach(index => {
                        squares[index].style.backgroundImage = ''
                    })
                }
            }
        }
    
        checkRowForFour()
    
        //check for column of three
        function checkColumnForFour(){
            for(let i = 0; i < 47; i++){
                let columnOFFour = [i, i+width, i+width*2, i+width*3]
                let decidedColor = squares[i].style.backgroundImage
                const isBlank = squares[i].style.backgroundImage === ''
    
                if(columnOFFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                    score += 4
                    scoreDisplay.innerHTML = score
                    columnOFFour.forEach(index => {
                        squares[index].style.backgroundImage = ''
                    })
                }
            }
        }
    
        checkColumnForFour()

    //check for row of three
    function checkRowForThree(){
        for(let i = 0; i < 61; i++){
            let rowOFThree = [i, i+1, i+2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
            if(notValid.includes(i)) continue

            if(rowOFThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 3
                scoreDisplay.innerHTML = score
                rowOFThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    checkRowForThree()

    //check for column of three
    function checkColumnForThree(){
        for(let i = 0; i < 47; i++){
            let columnOFThree = [i, i+width, i+width*2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if(columnOFThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 3
                scoreDisplay.innerHTML = score
                columnOFThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    checkColumnForThree()

    window.setInterval(function(){
        moveDown()
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
    }, 100)





})