import {faker } from "@faker-js/faker";

export default class Generator{

    public generateName():string{
        return  faker.person.firstName();
    }

    public generateLastName():string{
        return faker.person.lastName();
    }

    public generateFakeEmail():string{
        return faker.internet.email();
    }

    public generateRandomNumber(range:number):number{
        return Math.floor(Math.random() * range) + 1;
    }
}