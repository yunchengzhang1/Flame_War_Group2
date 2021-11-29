import axios from 'axios';


export class Repository {
    url = "http://localhost:8000"

    config = {
        headers: {

        }
    };

    addBattle(battle){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/makeBattle`, battle, this.config)
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
                .then(x =>{
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
    
    getMessagesById(params) {
        if(params){
            this.config.params = params;
        }
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getmessagesbyid`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }
}