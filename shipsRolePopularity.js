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

module.exports = shipsRolePopularity