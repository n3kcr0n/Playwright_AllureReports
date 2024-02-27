
import Generator from "../generator/fakeDataGenerator"

export default class User {
    private firstName:string;
    private lastName:string;
    private password:string;
    private email:string;
    private generator = new Generator();
    private accessToken:string;
    private userID:string;


    constructor(){     
        this.firstName = this.generator.generateName();
        this.lastName = this.generator.generateLastName();
        this.password = 'Test@1234'
        this.email = this.generator.generateFakeEmail();
    }

    getFirstname = ():string =>{
        return this.firstName;
    }

    getLastname = ():string =>{
        return this.lastName;
    }

    getPassword = ():string =>{
        return this.password;
    }

    getEmail = ():string =>{
        return this.email;
    }

    getAccessToken =():string =>{
        return this.accessToken;
    }

    getUserID =():string =>{
        return this.userID;
    }

    setFirstName = (firstName:string)=>{
        this.firstName = firstName;
    }

    setLastName = (lastName:string)=>{
        this.lastName = lastName;
    }

    setEmail = (email:string)=>{
        this.email=email;
    }

    setPassword = (pw:string)=>{
        this.password = pw;
    }

    setAccessToken = (token:string)=>{
        this.accessToken = token;
    }

    setUserID = (userId:string)=>{
        this.userID = userId;
    }


}