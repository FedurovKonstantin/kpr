
let pie = null
const rolesToCount = {}
let rolesToCountView = {}


// https://github.com/r-spacex/SpaceX-API/blob/master/docs/ships/v4/all.md
fetch('https://api.spacexdata.com/v4/ships')
    .then(response => response.json())
    .then(ships => {
        const popularity = shipsRolePopularity(ships)

        console.log(123)

        document.getElementById("theMostPopularShipRole").textContent = "Самая распространенная роль корабля: " + popularity.mostPopularName
        document.getElementById("theMostPopularShipRoleCount").textContent = "Количество самых распространенных ролей корабля: " + popularity.mostPopularCount
        document.getElementById("theMostUnpopularShipRole").textContent = "Самая нераспространенная роль корабля: " + popularity.mostUnpopularName
        document.getElementById("theMostUnpopularShipRoleCount").textContent = "Количество самых нераспространенных ролей корабля: " + popularity.mostUnpopularCount



        ships.forEach(ship => {
            ship.roles.forEach(role => {
                if (role in rolesToCount) {
                    rolesToCount[role]++
                } else {
                    rolesToCount[role] = 1
                }
            })
        });

        rolesToCountView = structuredClone(rolesToCount)

        const data = {
            labels: Object.keys(rolesToCount),
            datasets: [{
                label: 'Bar Chart',
                data: Object.values(rolesToCount),
            }]
        };

        // Get the canvas element and create the chart
        const ctx = document.getElementById('myChart').getContext('2d');

        const checkboxes = []

        for (role in rolesToCount) {
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = role;
            checkbox.name = role;
            checkbox.title = "wer"

            checkbox.checked = true;

            checkboxes.push(checkbox)

            var label = document.createElement('label')
            label.htmlFor = role;
            label.appendChild(document.createTextNode(role));
            var container = document.getElementById('pieCheckboxes');
            container.appendChild(label);
            container.appendChild(checkbox);
        }

        checkboxes.forEach(checkbox =>
            checkbox.onclick = () => {

                const role = checkbox.id

                if (checkbox.checked) {
                    rolesToCountView[role] = rolesToCount[role]
                } else {
                    delete rolesToCountView[role];
                }

                pie.data.labels = Object.keys(rolesToCountView)
                pie.data.datasets[0].data = Object.values(rolesToCountView)

                pie.update()
            }
        )



        pie = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                aspectRatio: 3,

            }
        });
    })