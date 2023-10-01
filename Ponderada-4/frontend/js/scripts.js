if (document.getElementById("login-form")) {
  document
    .getElementById("login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the default form submission behavior
      // Get the user's message from the input field
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Perform any necessary client-side validation here

      // Add loading button
      const submitButton = document.getElementById("submit-button");
      submitButton.disabled = true;
      submitButton.innerHTML = "Loading...";

      // Send the message to the server using Fetch
      fetch("http://54.145.7.217:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then(async (response) => {
          if (response.ok) {
            tokenJson = await response.json();
            // Message sent successfully, you can handle the response here
            localStorage.setItem("token", tokenJson.token); // Clear the input field
            window.location.href = "http://54.145.7.217:80/pages/dashboard.html";
          } else {
            throw new Error("Failed to send message");
          }
        })
        .catch((error) => {
          console.error(error);
          alert(`Error: ${error.message}`);
          // Handle the error, e.g., display an error message to the user
        })
        .finally(() => {
          // Remove loading button
          submitButton.disabled = false;
          submitButton.innerHTML = "Submit";
        });
    });
}
if (document.getElementById("account-form")) {
  document
    .getElementById("account-form")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the default form submission behavior
      // Get the user's message from the input field
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Perform any necessary client-side validation here

      // Add loading button
      const submitButton = document.getElementById("submit-button");
      submitButton.disabled = true;
      submitButton.innerHTML = "Loading...";

      // Send the message to the server using Fetch
      fetch("http://54.145.7.217:3000/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password }),
      })
        .then(async (response) => {
          if (response.ok) {
            window.location.href = "http://54.145.7.217:80";
          } else {
            throw new Error("Failed to send message");
          }
        })
        .catch((error) => {
          console.error(error);
          alert(`Error: ${error.message}`);
          // Handle the error, e.g., display an error message to the user
        })
        .finally(() => {
          // Remove loading button
          submitButton.disabled = false;
          submitButton.innerHTML = "Submit";
        });
    });
}
