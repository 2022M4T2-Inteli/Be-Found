import { openDb } from "../configDB";

export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTIS Rfid (id INTEGER PRIMARY KEY, register TEXT, posicao TEXT, hora TIME' )
    })
}

export async function insertPosition(position){
    openDb().then(db=>{
        db.run('INSERT INTO Rfid (register,posicao) VALUES (?,?)' , [position.register,position.posicao])
    })
}

export async function updatePosition(position){
    openDb().then(db=>{
        db.run('UPDATE INTO Rfid SET register=?, posicao=? WHERE id=? (?,?,?)' , [position.register,position.posicao,position.id])
    })
}