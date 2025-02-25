import { PostgresModel } from "../../db/db.js";

export class LoginModel {
    #db
    constructor() {
        this.#db = new PostgresModel()
    }

    async getAll(){
        const data = await this.#db.fetch(`SELECT * FROM winnie`)
        return data
    }

    async userRetrieve(user_tg) {
        const data = await this.#db.fetch(
            `
            SELECT * FROM users  WHERE user_tg = $1 
        `,
        user_tg
        );

        return data;
    }

    async signIn(user_tg){
        const data = await this.#db.fetch(`
        SELECT * FROM users  WHERE user_tg = $1   
        `,user_tg)
        return data
    }

    async signUp(user_tg,referal,first_name){    
        const data = await this.#db.fetch(`INSERT INTO users(user_tg,referer,first_name) VALUES ($1,$2,$3) RETURNING user_tg,balance_winnie,balance_ton,status,lastDate,bonuses,date,spin_date,referer,question`,user_tg,referal,first_name) 
        return data
    }

    async newTaskUser (user_tg) {
        const data = await this.#db.fetch(`INSERT INTO mytasks (user_tg,task_id) values ($1,0) returning user_tg,task_id`,user_tg)
        return data
    }



    async updateStatus(user_tg,status){
        const data = await this.#db.fetch(`UPDATE users SET status = $1 WHERE user_tg = $2 RETURNING user_tg`,status,user_tg)
        return data
    }

    async updateByBalance(user_tg,balance_winnie,date){
        const data = await this.#db.fetch(`UPDATE users SET balance_winnie = $1, date = $2 WHERE user_tg = $3 RETURNING user_tg`,balance_winnie,date,user_tg)
        return data
    }

    async updateDate(user_tg,lastdate,bonuses,balance_winnie) {
        const retrive = await this.#db.fetch(`UPDATE users SET lastDate = $1, bonuses = $2, balance_winnie = $3 WHERE user_tg = $4 RETURNING user_tg`,lastdate,bonuses,balance_winnie,user_tg)
        return retrive
    }


    async getTournament(){
        const data = await this.#db.fetch(`SELECT *
FROM users
ORDER BY balance_winnie DESC`)
        return data
    }


    async getTasks (user_tg) {
        const data = await this.#db.fetch(`SELECT 
    t.id, 
    t.title,
    t.link,
    t.amount, 
    t.status, 
    t.image
    
FROM 
    tasks t
LEFT JOIN 
    mytasks mt 
ON 
    t.id = mt.task_id 
    AND mt.user_tg = $1
WHERE 
    mt.task_id IS NULL;
` ,user_tg)
        return data
    }



    async getcompletedtasks(user_tg) {
        const data = await this.#db.fetch(`SELECT 
    t.id, 
    t.title, 
    t.amount,
    t.link,
    t.status, 
    t.image
FROM 
    mytasks mt
JOIN 
    tasks t 
ON 
    mt.task_id = t.id
WHERE 
    mt.user_tg  = $1`,user_tg)
        return data
    }



    async postcompletedTasks(user_tg,task_id) {
        const data = await this.#db.fetch(`INSERT INTO mytasks (user_tg,task_id) VALUES ($1,$2) RETURNING id`,user_tg,task_id)
        return data
    }

    async updatestatus(user_tg,status,date) {
        const data = await this.#db.fetch(`UPDATE users SET status = $1, date = $2 WHERE user_tg = $3 RETURNING user_tg`,status,date,user_tg)
        return data
    }

    async updatespin(user_tg,balance_winnie,spin_date) {
        const data = await this.#db.fetch(`UPDATE users SET spin_date = $1, balance_winnie = $2 WHERE user_tg = $3 RETURNING user_tg`,spin_date, balance_winnie,user_tg)
        return data
    }

    async swapToken(user_tg,balance_winnie,balance_ton) {
        const data = await this.#db.fetch(`UPDATE users SET balance_winnie = $1, balance_ton = $2 WHERE user_tg = $3 RETURNING user_tg`,balance_winnie,balance_ton,user_tg)
        return data
    }

    async getMyReferals(user_tg) {
        const data = await this.#db.fetch(`SELECT first_name FROM users WHERE referer = $1`,user_tg)
        return data
    }

    async updateBalanceReferal(referal) {
        const data = await this.#db.fetch(`UPDATE users 
SET balance_winnie = balance_winnie::numeric + 500, 
    balance_ton = balance_ton::numeric + 0.001 
WHERE user_tg = $1;`,referal)
    
        return data
    }

    async updateBalance(user_tg,amount) {
        const data = await this.#db.fetch(`UPDATE users SET balance_winnie = balance_winnie::numeric + $1 WHERE user_tg = $2 RETURNING user_tg`,amount,user_tg)
        return data
    }

    async updateUser(user_tg,question) {
        const data = await this.#db.fetch(`UPDATE users SET question = $1,balance_winnie = balance_winnie::numeric + 4500 WHERE user_tg = $2 RETURNING user_tg`,question,user_tg)
        return data
    }





}

export default new LoginModel();


