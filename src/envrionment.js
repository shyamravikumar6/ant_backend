class Environment{
    //port 
    port;
    //secert key
    secert_key;

    constructor(){
        this.secert_key=Date.now().toString();
        this.port=3006;
    }

    getDbName(){
        return { host: '172.105.59.115', port: 5432, user: 'techteam_qc', database: 'ant_database', password: 'Ej7RfBTk' };
    }

}

module.exports = new Environment();