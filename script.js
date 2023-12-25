document.addEventListener('DOMContentLoaded', () => {
  // Function to create a promise that resolves after a random time between 1 and 3 seconds
  function createRandomPromise() {
    const randomTime = Math.floor(Math.random() * 3000) + 1000; // Random time between 1 and 3 seconds
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(randomTime / 1000); // Resolving with the time in seconds
      }, randomTime);
    });
  }

  // Function to update the table with the resolved promises
  function updateTable(promises) {
    // Get the tbody element to append rows
    const tbody = document.getElementById('output');

    // Loop through promises and add rows to the table
    promises.forEach((promise, index) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>Promise ${index + 1}</td>
        <td>Loading...</td>
      `;
      tbody.appendChild(newRow);
    });

    // Update table after all promises resolve using Promise.all()
    Promise.all(promises)
      .then(times => {
        // Loop through promises and update rows with resolved times
        promises.forEach((promise, index) => {
          const row = tbody.children[index];
          row.children[1].textContent = times[index].toFixed(3);
        });

        // Calculate and add the total time row
        const totalTime = times.reduce((sum, time) => sum + time, 0);
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
          <td>Total</td>
          <td>${totalTime.toFixed(3)}</td>
        `;
        tbody.appendChild(totalRow);
      })
      .catch(error => console.error('Error:', error));
  }

  // Create an array of 3 promises
  const promises = [createRandomPromise(), createRandomPromise(), createRandomPromise()];

  // Call the updateTable function to populate the table with promises
  updateTable(promises);
});