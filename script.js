const ul = document.querySelector('#transaction')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector ('#amount')


const LocalStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? LocalStorageTransactions : []

const removeTransaction  = id =>{
    transactions = transactions.filter(transaction => transaction.id != id)
    add()
    UptadeLocalStorage()
}



const addTransactionintoDom = (transaction) => {
    
    const chooseOperator = transaction.amount < 0 ? '-' : '+'
    
    const li = document.createElement('li')
    
    const whichClass = transaction.amount < 0 ? 'minus' : 'plus'
    
    const amountwithoutOperator = Math.abs(transaction.amount)
    
    li.classList.add(whichClass)
    li.innerHTML = ` ${transaction.name} <span>${chooseOperator} R$ ${amountwithoutOperator}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`
    ul.prepend(li)

}

const filterValues = () => {
    const Values = transactions.map(transaction => transaction.amount)
    const actualBalance = document.getElementById('balance')

    const positiveValues = document.getElementById('positive')
    
    const ValuesaboveZero = Values.filter(values => values > 0)
    
    if (ValuesaboveZero.length !== 0) ValuesaboveZero.reduce((acumulador,valorAtual) => acumulador+valorAtual)
    let ValuesaboveZerowithoutOperator = 0
    ValuesaboveZero.map(number => {ValuesaboveZerowithoutOperator += number})
    positiveValues.innerHTML =  `R$ ${Math.floor(ValuesaboveZerowithoutOperator).toFixed(2)}`
    
    
    const negativeValues = document.getElementById('negative')

    const ValuesbelowZero = Values.filter(values => values < 0)
    if (ValuesbelowZero.length !== 0) ValuesbelowZero.reduce((acumulador,valorAtual) => acumulador+valorAtual);
    let ValuesbelowZerowithoutOperator = 0
    ValuesbelowZero.map(number => {ValuesbelowZerowithoutOperator -= number})
    negativeValues.innerHTML =  `R$ ${Math.floor(ValuesbelowZerowithoutOperator).toFixed(2)}`
    

    
    
    const SubtractactualBalance = ValuesaboveZerowithoutOperator - ValuesbelowZerowithoutOperator
    actualBalance.innerHTML = `R$ ${SubtractactualBalance.toFixed(2)}`

    

   
}


const add = () => {
    ul.innerHTML = ''
    transactions.forEach(addTransactionintoDom)
    filterValues()

}

const UptadeLocalStorage = () => {
    localStorage.setItem('transactions',JSON.stringify(transactions))
 }

function addTransaction(){
    event.preventDefault()
   
    if(inputTransactionName.value.trim() === '' & inputTransactionAmount.value.trim() === '' ){
        alert('Digite o Nome e o Valor da Transação')
        return
    }else if(inputTransactionName.value.trim() === ''){
        alert('Digite o Nome da Transação')
        return
    }else if(inputTransactionAmount.value.trim() === '' ){
        alert('Digite o Valor da Transação')
        return
      
    }
        
    const generateID = function() {return Math.round(Math.random() * 1000)}
    
    const Transaction = {
        id:generateID() , 
        name:inputTransactionName.value , 
        amount:Number(inputTransactionAmount.value.replace(",","."))
    }
    transactions.push(Transaction)
    add()
    UptadeLocalStorage()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
}

window.onload = add()