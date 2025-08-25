const userInput = document.getElementById('user-input');
const addBtn = document.getElementById('add-btn');
const totalSale = document.getElementById('total-sale');
const saleList = document.getElementById('sale-list');
const time = new Date();

const sales = [];


addBtn.addEventListener('click', () => {

    if (userInput.value === '') {
        return;
    } else {
        const show = document.createElement('li');
        show.innerText = `P ${userInput.value}`;

        saleList.appendChild(show);

        const timer = document.createElement('span');
        timer.innerText = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        show.appendChild(timer);

        sales.push(Number(userInput.value));
        calculateTotal();

        addData();

        userInput.value = '';
    }
});

function calculateTotal() {
    const total = sales.reduce((neg, pos) => {
        return neg + pos;
    })

    totalSale.innerText = `Total Sale: P${total} as of ${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`;

    addData();
}

function getToday() {
    return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
}

function checkDate() {
    const savedDate = localStorage.getItem('date');
    const today = getToday();

    if (savedDate !== today) {
        
        localStorage.clear();
        localStorage.setItem('date', today);
        saleList.innerHTML = '';
        totalSale.innerHTML = 'Total Sale: P0';
    }
}


function addData() {
    localStorage.setItem('sales', saleList.innerHTML);
    localStorage.setItem('total', totalSale.innerHTML);
    localStorage.setItem('date', getToday());
}

function showData() {
    saleList.innerHTML = localStorage.getItem('sales') || '';
    totalSale.innerHTML = localStorage.getItem('total') || 'Total Sale: P0 as of 0/0/0';
}

showData();
checkDate();