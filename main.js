


const  mainMenuItems = document.querySelectorAll('.main-menu li')

mainMenuItems.forEach(function (item) {
    item.addEventListener('mouseover', function () {
       const submenu = item.querySelector('.submenu')
       //console.log(submenu);
        if(submenu){
            submenu.style.display = 'block'
        }
    })

 item.addEventListener('mouseout',function () {
    const submenu = item.querySelector('.submenu')
    if(submenu) {
        submenu.style.display = 'none'
    }

 } )
})

const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const slides = document.querySelectorAll('.slide') 


let currentSlide = 0; //индекс текущего слайда

function showSlide(index) {
    slides.forEach((slide, i) =>{
        if(i == index) {
            slide.style.display = 'block'
        } else {
            slide.style.display = 'none'
        }
    })

}
showSlide(currentSlide)
prevBtn.addEventListener('click', function(){
    currentSlide = (currentSlide - 1 + slides.length) % slides.length
    showSlide(currentSlide)
})
    nextBtn.addEventListener('click', function(){
    currentSlide = (currentSlide + 1 ) % slides.length
    showSlide(currentSlide)
})

// Найдем нашу форму и добавим обработчик событий submit
document.getElementById('feedbackForm').addEventListener('submit', function (event) {
    // Предотвращаем стандартное поведение формы (перезагрузка страницы)
    event.preventDefault();
    // Создаем объект FormData для сбора данных из формы
    let formData = new FormData(this);
    // Создаем пустой объект для хранения данных формы
    let feedbackData = {};
    

    // Преобразуем данные из объекта FormData в обычный объект
    formData.forEach(function (value, key) {
        feedbackData[key] = value;
    });
    // Добавляем дополнительное поле userId к данным формы
    feedbackData['userId'] = 1;
    // Делаем асинхронный HTTP-запрос методом POST к JSONPlaceholder
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
    })
    .then(response => response.json())
    .then(data => {
       
        if  (data['email'].length === 0) {
            alert('Некорректое заполнение!')
          } else { alert('Спасибо, с вами свяжутся!')
            
          }
        
        // Выводим успешный результат в консоль
        console.log('Успешно отправлено:', data);
        
        // Очищаем значения полей формы
        this.reset();
    })
    
    .catch(error => {
       
         // Выводим ошибку в консоль
        console.error('Ошибка:', error);
        
        
        // Здесь можно добавить обработку ошибки
    });
});
