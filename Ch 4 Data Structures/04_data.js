document.addEventListener("DOMContentLoaded", () => {
  const squirrelForm = document.querySelector(".event_form");
  const eventsContainer = document.querySelector(".events_display");

  var journal = JOURNAL;

  function addEntry(events, squirrel) {
    journal.push({ events, squirrel });
  }

  function phi(table) {
    return (
      (table[3] * table[0] - table[2] * table[1]) /
      Math.sqrt(
        (table[2] + table[3]) *
          (table[0] + table[1]) *
          (table[1] + table[3]) *
          (table[0] + table[2])
      )
    );
  }

  function tableFor(event, journal) {
    let table = [0, 0, 0, 0];
    for (let i = 0; i < journal.length; i++) {
      let entry = journal[i],
        index = 0;
      if (entry.events.includes(event)) index += 1;
      if (entry.squirrel) index += 2;
      table[index] += 1;
    }
    return table;
  }

  function journalEvents(journal) {
    let events = [];
    for (let entry of journal) {
      for (let event of entry.events) {
        if (!events.includes(event)) {
          events.push(event);
        }
      }
    }
    return events;
  }

  function max(...numbers) {
    let result = -Infinity;
    for (let number of numbers) {
      if (number > result) result = number;
    }
    return result;
  }

  var list = {
    value: 1,
    rest: {
      value: 2,
      rest: {
        value: 3,
        rest: null
      }
    }
  };

  function postEvents() {
    eventsContainer.innerHTML = "";
    const events = journalEvents(journal);
    for (let event of events) {
      let correlation = phi(tableFor(event, journal));

      if (correlation > 0.1 || correlation < -0.1) {
        eventsContainer.innerHTML += `<li>${event}: ${correlation}</li><br>`;
      }
    }
  }

  squirrelForm.addEventListener("click", e => {
    const events = document.getElementById("events").value.split(",");
    const squirrel = document.getElementById("squirrel?").checked;

    if (e.target.name === "Submit") {
      e.preventDefault();
      addEntry(events, squirrel);
      postEvents();
      document.getElementById("events").value = "";
      document.getElementById("squirrel?").checked = "";
    }
  });

  postEvents();
});
