async function getJoke() {
  const jokeElement = document.getElementById('joke');

  try {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    jokeElement.innerHTML = `${data.setup} <br><strong>${data.punchline}</strong>`;
  } catch (error) {
    jokeElement.textContent = 'Oops! Could not fetch a joke.';
    console.error(error);
  }
}
