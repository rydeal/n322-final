export interface User {
    id: string;
    name: string;
    calorieCount: number;
    dates: Date[];
}

export interface Date {
    id: string;
    name: string;
    meals: Meal[];
}

export interface Meal {
    name: string;
    mealItems: MealItems[];
    mealTotal: number;
}

export interface MealItems {
    name: string;
    calories: number;
}