
class userEntity {

    id: string;

    firstName: string;

    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.id = Math.floor(Math.random() * 10).toString();
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export default userEntity;