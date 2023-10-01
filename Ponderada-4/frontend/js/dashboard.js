window.addEventListener("load", function () {
  if (!localStorage.getItem("token")) {
    window.location.href = "http://54.175.176.57:80/";
  }
  if (localStorage.getItem("token")) {

    const token = localStorage.getItem("token");
    // Send the message to the server using Fetch
    fetch("http://54.175.176.57:3000/user/all", {
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

    fetch("http://54.175.176.57:3000/prediction/all", {
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
                  label: "numebr of predictions per day",
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
  }
});
