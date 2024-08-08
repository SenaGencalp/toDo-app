const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

//Bu satır, localStorage'da saklanan yapılacaklar listesini alır ve bir JavaScript nesnesine dönüştürür.
const todos = JSON.parse(localStorage.getItem("todos"));

//Eğer localStorage'da saklanmış yapılacaklar varsa, her birini döngüyle dolaşır ve addTodo fonksiyonu ile listeye ekler.
if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

//Form gönderildiğinde (kullanıcı enter tuşuna bastığında veya formu gönderdiğinde), varsayılan form gönderme işlemi engellenir ve addTodo fonksiyonu çağrılır.
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

//addTodo fonksiyonu, input alanındaki metni veya bir todo nesnesinin metnini alır.Yeni bir liste elemanı (li) oluşturur.Eğer todo tamamlanmışsa, completed sınıfını ekler.Liste elemanını tıklanabilir yapar: tıklanınca tamamlandı olarak işaretlenir veya kaldırılır.Sağ tıklanınca (context menu) yapılacak listeden kaldırılır.Yeni elemanı listeye ekler ve input alanını temizler.Güncel listeyi localStorage'a kaydeder.
function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");

      updateLS();
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      todoEl.remove();

      updateLS();
    });

    todosUL.appendChild(todoEl);

    input.value = "";

    updateLS();
  }
}

//Liste elemanlarını alır ve bir diziye ekler.Bu diziyi localStorage'a JSON formatında kaydeder.
function updateLS() {
  const todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
