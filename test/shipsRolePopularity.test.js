const shipsRolePopularity = require('../shipsRolePopularity');


describe('shipsRolePopularity', () => {
    test('should return null values when ships array is empty', () => {
        const ships = [];
        const result = shipsRolePopularity(ships);
        expect(result).toEqual({
            mostPopularName: null,
            mostUnpopularName: null,
            mostPopularCount: null,
            mostUnpopularCount: null,
        });
    });

    test('should return correct values when ships array has a single role', () => {
        const ships = [
            { roles: ["Attacker"] },
            { roles: ["Attacker"] },
            { roles: ["Attacker"] },
        ];
        const result = shipsRolePopularity(ships);
        expect(result).toEqual({
            mostPopularName: "Attacker",
            mostUnpopularName: "Attacker",
            mostPopularCount: 3,
            mostUnpopularCount: 3,
        });
    });

    test('should return correct values when ships array has multiple roles', () => {
        const ships = [
            { roles: ["Tank", "Support"] },
            { roles: ["Attacker"] },
            { roles: ["Support"] },
        ];
        const result = shipsRolePopularity(ships);

        expect([
            {
                mostPopularName: "Support",
                mostUnpopularName: "Tank",
                mostPopularCount: 2,
                mostUnpopularCount: 1,
            },
            {
                mostPopularName: "Support",
                mostUnpopularName: "Attacker",
                mostPopularCount: 2,
                mostUnpopularCount: 1,
            },
        ]).toContainEqual(result)
    });
});
