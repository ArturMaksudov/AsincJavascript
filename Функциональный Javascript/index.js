document.addEventListener("DOMContentLoaded", function () {
	// Получить список пользователей с бесплатного API
	fetch("https://jsonplaceholder.typicode.com/users")
		.then(response => response.json())
		.then(users => {
			// Отобразить пользователей на странице
			const userList = document.getElementById("user-list");
			users.forEach(user => {
				const li = document.createElement("li");
				li.innerHTML = `
                    <span>${user.name}</span>
                    <button data-id="${user.id}">Удалить</button>
                `;
				userList.appendChild(li);
			});

			// Добавить обработчики событий для кнопок удаления
			const deleteButtons = document.querySelectorAll("button[data-id]");
			deleteButtons.forEach(button => {
				button.addEventListener("click", deleteUser);
			});
		})
		.catch(error => {
			console.error("Ошибка при получении данных:", error);
		});

	// Функция удаления пользователя
	function deleteUser(event) {
		const userId = event.target.getAttribute("data-id");

		// Удалить пользователя из локального хранилища
		const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
		const updatedUsers = storedUsers.filter(user => user.id !== parseInt(userId));
		localStorage.setItem("users", JSON.stringify(updatedUsers));

		// Удалить пользователя из списка на странице
		const userItem = event.target.parentElement;
		userItem.remove();
	}
});