document.getElementById('zipForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  console.log(`The zip code is ${zipCode}`);
  console.log(`Feelings: ${feelings}`);

  fetch('/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ zip: zipCode })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const parent = document.getElementById('parent');
    parent.innerHTML = `
      <p>Date: ${data.list[0].dt_txt}</p>
      <p>Temperature: ${data.list[0].main.temp_max}°C</p>
      <p>Feelings: ${feelings}</p>
    `;
  })
  .catch(error => console.error('Error:', error));
}); 