import axios from 'axios';


export class Repository {
    url = "http://ec2-52-15-121-86.us-east-2.compute.amazonaws.com:8000"

    config = {
        headers: {

        }
    };

    addBattle(battle) {
        console.log("Adding Battle", battle);
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/makeBattle`, battle, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    joinBattle(battleID, user2) {
        console.log("Joining Battle", battleID, user2);
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/joinbattle`, { battleID, user2 }, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getBattles() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getbattles`, this.config)
                .then(x => {
                    //alert(x.data);
                    console.log(x.data);
                    resolve(x.data)
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    postMessage(message) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/postmessage`, message, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }



    addAccount(user) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/signup`, user, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }
    getUsers() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/users`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getMessagesById(battleID) {
        let append = "/?battleID=" + battleID;
        return new Promise((resolve, reject) => {
            axios.get(`${this.url }/getmessagesbyid` + append, this.config)
                .then(x => resolve(x.data))
                .catch(x => { alert(x); reject(x); 
                })
        });
    }

    getUserById(userID) {
        let append = "/?userID=" + userID;
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getuserbyid` + append, this.config)
                .then(x => {
                    resolve(x.data)})
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    login(username, password) {
        if (username && password) {
            this.config.username = username;
            this.config.password = password;
        }
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getuserbyid`, this.config)
                .then(
                    x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    likeMessage(messageID, userID){
        let append = "/?messageID=" + messageID + "&userID=" + userID;
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/likemessage`+append, this.config)
                .then(
                    x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    unlikeMessage(messageID, userID){
        let append = "/?messageID=" + messageID + "&userID=" + userID;
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/unlikemessage`+append, this.config)
                .then(
                    x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }
    
    getBattleScore(battleID, userID){
        let append = "/?battleID=" + battleID + "&userID=" + userID;
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getbattlescore`+append, this.config)
                .then(
                    x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }
    
}