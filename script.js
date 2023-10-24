// Initialize the map
var map = L.map('map').setView([25, -10], 1);

// Add a tile layer to the map (you can use different map tile providers)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let users = []
let todos = []
let chart = null

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(userss => {
    users = userss
    updateChart()
    for (user of userss) {
      const geo = user.address.geo;
      L.marker([geo.lat, geo.lng]).addTo(map)
    }
  })

fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(todoss => {
    todos = todoss
    updateChart()
  })


function onCheckboxesClick() {
  var a = document.getElementById("isCompleted").checked;
  var b = document.getElementById("isUncompleted").checked;

  isCompltedChecked = a;
  isUncompletedChecked = b

  updateChart()

}

function shipsRolePopularity(ships) {
  const rolesToCount = {};

  ships.forEach(ship => {
    ship.roles.forEach(role => {
      if (role in rolesToCount) {
        rolesToCount[role]++
      } else {
        rolesToCount[role] = 1
      }
    })
  });

  const rolesCount = Object.keys(rolesToCount).length

  const mostPopularName = "most_popular_name";
  const mostPopularCount = "most_popular_count";
  const mostUnpopularName = "most_unpopular_name";
  const mostUnpopularCount = "most_unpopular_count";

  if (rolesCount == 0) {
    return {
      mostPopularName: null,
      mostUnpopularName: null,
      mostPopularCount: null,
      mostUnpopularCount: null,
    }
  } else if (rolesCount == 1) {
    const value = Object.keys(rolesToCount)[0]

    return {
      mostPopularName: value,
      mostUnpopularName: value,
      mostUnpopularCount: rolesToCount[value],
      mostPopularCount: rolesToCount[value],
    }

  } else {
    const value = Object.keys(rolesToCount)[0]

    let maxCountRole = value
    let minCountRole = value

    for (let role in rolesToCount) {
      const roleCount = rolesToCount[role]

      if (roleCount > rolesToCount[maxCountRole]) {
        maxCountRole = role
      }

      if (roleCount < rolesToCount[minCountRole]) {
        minCountRole = role
      }
    }

    return {
      mostPopularName: maxCountRole,
      mostUnpopularName: minCountRole,
      mostUnpopularCount: rolesToCount[minCountRole],
      mostPopularCount: rolesToCount[maxCountRole],
    }

  }
}

function updateChart() {
  if (users.length == 0 || todos.length == 0) return

  let datasets = []

  const names = users.map(user => user.name)

  if (isCompltedChecked) {
    datasets.push(
      {
        label: 'Завершенные задачи',
        data: users.map(user => todos.filter(todo => user.id == todo.userId && todo.completed).length
        ),
        backgroundColor: 'green',

      },
    );
  }
  if (isUncompletedChecked) {
    datasets.push(
      {
        label: 'Незавершенные задачи',
        data: users.map(user => todos.filter(todo => user.id == todo.userId && !todo.completed).length
        ),
        backgroundColor: 'red',

      },
    );
  }


  // Data for the chart
  var data = {
    labels: users.map(user => user.name),
    datasets: datasets,
  };

  // Configuration options for the chart
  var options = {
    responsive: true,
    aspectRatio: 3,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Create the bar chart
  var ctx = document.getElementById('chart').getContext('2d');

  if (chart == null) {
    chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    })
  } else {
    chart.data.datasets = datasets
    chart.update()
  }
}


let isUncompletedChecked = true;
let isCompltedChecked = true;


document.getElementById("isCompleted").checked = isCompltedChecked
document.getElementById("isUncompleted").checked = isUncompletedChecked