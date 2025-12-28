document.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('vote-btn')) return;

  const button = e.target;
  const topicDiv = button.closest('.topic');
  const topicId = topicDiv.dataset.id;
  const value = Number(button.dataset.value);

  console.log('votes.js cargado');

  try {
    console.log(topicId);
    const res = await fetch(`/topics/${topicId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.message);
      return;
    }

    const data = await res.json();

    // Actualizar votos en pantalla
    topicDiv.querySelector('.votes').textContent = data.votesCount;
    topicDiv.dataset.updated = data.updatedAt;

    reorderTopics();
  } catch (err) {
    console.error(err);
  }
});

function reorderTopics() {
  const container = document.querySelector('#topics-container');
  const topics = Array.from(container.children);

  topics
    .sort((a, b) => {
      const votesA = Number(a.querySelector('.votes').textContent);
      const votesB = Number(b.querySelector('.votes').textContent);

      if (votesB !== votesA) return votesB - votesA;

      return new Date(b.dataset.updated) - new Date(a.dataset.updated);
    })
    .forEach(topic => container.appendChild(topic));
}
