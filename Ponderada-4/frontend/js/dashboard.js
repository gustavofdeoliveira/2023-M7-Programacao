window.addEventListener("load", function () {
  if (!localStorage.getItem("token")) {
    window.location.href = "http://3.208.163.53:80/";
  }
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    // Send the message to the server using Fetch
    fetch("http://3.208.163.53:3000/user/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          response = await response.json();
          console.log(response);
          this.document.getElementById("number_users").innerHTML =
            response["number_users"];
        } else {
          throw new Error("Failed to send message");
        }
      })
      .catch((error) => {
        console.error(error);
        alert(`Error: ${error.message}`);
        // Handle the error, e.g., display an error message to the user
      })
      .finally(() => {});

    fetch("http://3.208.163.53:3000/prediction/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          response = await response.json();
          this.document.getElementById("number_predictions").innerHTML =
            response.length;
          dates = [];
          values = [];
          for (i = 0; i < response.length; i++) {
            if (i % 2 == 0) {
              prediction =
                '<tr><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">' +
                response[i]["value"] +
                '</td><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">' +
                response[i]["createdAt"] +
                "</td></tr>";
            } else {
              prediction =
                '<tr class="bg-gray-50"><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">' +
                response[i]["value"] +
                '</td><td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">' +
                response[i]["createdAt"] +
                "</td></tr>";
            }
            this.document.getElementById("predictions").innerHTML += prediction;
            dates.push(response[i]["createdAt"].split(" ", 2)[0]);
            values.push(response[i]["value"]);
          }
          dates = dates.filter(function (este, i) {
            return dates.indexOf(este) === i;
          });
          values.sort();
          const ctx = document.getElementById("myChart");
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: dates,
              datasets: [
                {
                  label: "predictions per day",
                  data: values,
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        } else {
          throw new Error("Failed to send message");
        }
      })
      .catch((error) => {
        console.error(error);
        alert(`Error: ${error.message}`);
        // Handle the error, e.g., display an error message to the user
      })
      .finally(() => {});

    document.getElementById("logout").addEventListener("click", function (e) {
      e.preventDefault(); // Prevent the default form submission behavior
      debugger;
      localStorage.removeItem("token");
      window.location.href = "http://3.208.163.53:80/";
    });

    document
      .getElementById("new-prediction")
      .addEventListener("click", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior
        document.getElementById("modal").classList.add("absolute", "z-10");
        document.getElementById("modal").classList.remove("hidden");
        document.getElementById("content").classList.add("relative", "z-0");
      });

    document
      .getElementById("close-modal")
      .addEventListener("click", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior
        document.getElementById("modal").classList.remove("absolute", "z-10");
        document.getElementById("modal").classList.add("hidden");
        document.getElementById("content").classList.remove("relative", "z-0");
        location.reload();
      });

    document
      .getElementById("prediction-form")
      .addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior
        // Get the user's message from the input field
        debugger;
        const subscribers = document.getElementById("subscribers").value;
        const video_views = document.getElementById("video_views").value;
        const category = document.getElementById("category").value;
        const uploads = document.getElementById("uploads").value;
        const country = document.getElementById("country").value;
        const channel_type = document.getElementById("channel_type").value;
        const video_views_rank =
          document.getElementById("video_views_rank").value;
        const country_rank = document.getElementById("country_rank").value;
        const channel_type_rank =
          document.getElementById("channel_type_rank").value;
        const video_views_last_30_days = document.getElementById(
          "video_views_last_30_days"
        ).value;
        const subscribers_last_30_days = document.getElementById(
          "subscribers_last_30_days"
        ).value;

        const parts = token.split(".");

        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));

          user_id = payload.id;
        } else {
          console.error("Invalid JWT format");
        }

        const submitButton = document.getElementById("submit-button");
        submitButton.disabled = true;
        submitButton.innerHTML = "Loading...";
        if (
          subscribers != "" &&
          video_views != "" &&
          category != "" &&
          uploads != "" &&
          country != "" &&
          channel_type != "" &&
          video_views_rank != "" &&
          country_rank != "" &&
          channel_type_rank != "" &&
          video_views_last_30_days != "" &&
          subscribers_last_30_days != "" &&
          user_id != ""
        ) {
          // Send the message to the server using Fetch
          fetch("http://3.208.163.53:3000/prediction/predict", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              subscribers,
              video_views,
              category,
              uploads,
              country,
              channel_type,
              video_views_rank,
              country_rank,
              channel_type_rank,
              video_views_last_30_days,
              subscribers_last_30_days,
              user_id,
            }),
          })
            .then(async (response) => {
              if (response.ok) {
                response = await response.json();
                document.getElementById("result").innerHTML =
                  '<div class="bg-green-500 text-center mt-4 w-full border-2 text-white py-2 px-2">' +
                  response.value +
                  "</div>";
              } else {
                submitButton.disabled = false;
                submitButton.innerHTML = "Submit";
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
        } else {
          document.getElementById("result").innerHTML =
            '<div class="bg-red-500 text-center mt-4 w-full border-2 text-white py-2 px-2">Please fill all the fields </div>';
        }
      });
  }
});
