import { IFood } from "../types/food";

const validFood = (newFood: IFood): boolean => {
    const valid: boolean =
        (
            Boolean(newFood) &&
            Boolean(newFood.id) &&
            Boolean(newFood.name) &&
            Boolean(newFood.image) &&
            Boolean(newFood.amount) &&
            Boolean(newFood.calories)
        );
    return valid;
};

export default { validFood };