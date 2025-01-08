document.addEventListener("DOMContentLoaded", () => {
    // Select the input field and the form
    const inputItem = document.getElementById("input-item");
    const form = document.querySelector("form");
    const list = document.querySelector(".list");
  
    // Function to update the list in localStorage
    function updateLocalStorage() {
      const items = [];
      const listItems = document.querySelectorAll(".list-item");
  
      listItems.forEach(item => {
        items.push(item.textContent.replace("❌", "").trim());
      });
  
      // Save the list to localStorage
      localStorage.setItem("todoList", JSON.stringify(items));
    }
  
    // Function to create a list item with a delete button
    function createListItem(text) {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
  
      // Add the text content
      listItem.textContent = text;
  
      // Create a delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.classList.add("delete-btn");
  
      // Add the delete button to the list item
      listItem.appendChild(deleteButton);
  
      // Add an event listener to the delete button
      deleteButton.addEventListener("click", () => {
        listItem.remove(); // Remove the item from the DOM
        updateLocalStorage(); // Update localStorage
      });
  
      return listItem;
    }
  
    // Retrieve the stored list from localStorage (if it exists)
    const storedList = JSON.parse(localStorage.getItem("todoList"));
  
    // If there is a stored list, render it
    if (storedList) {
      storedList.forEach(item => {
        const listItem = createListItem(item);
        list.appendChild(listItem);
      });
    }
  
    // Listen for the form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form from reloading the page
  
      // Get the value from the input field
      const inputValue = inputItem.value.trim();
  
      // Check if the input is not empty
      if (inputValue) {
        // Create a new list item
        const listItem = createListItem(inputValue);
        list.appendChild(listItem);
  
        // Update the list in localStorage
        updateLocalStorage();
  
        // Clear the input field
        inputItem.value = "";
      } else {
        alert("Please enter a valid item!");
      }
    });
  });
  