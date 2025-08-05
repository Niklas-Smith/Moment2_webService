### Backend-baserad webbutveckling <br> Moment2 Introduktion till webbtjänster.<br> av: Niklas Smith <br>  student-id : nism2400 <br> Kurs: DT207G

Denna uppgiften gå ut på hur man ska använda sig av en SQL database   
Jag valde att använde mig av MYSQL database 
Använda sig av CRUD som är delete,uppdate,select och insert.   
Skapar api som kan använda CRUD   
Detta repositories innhåller:  
1. package.json med dev_dependencies cors, express, dotenv,  mysql och nodemon.
2. install.js skapar tablen, sätter in några värden och ansluter.
3. server.js gör så kan använda mina dev_dependencies, anlsuter till databasen och mina CRUD delete,uppdate,select och insert.

tre saker jag har gjort
* Jag har skapat min tabel workexperience
* Använt mig av .env fil för DB_HOST , DB_PASSWORD, DB_USER OCH DB_DATABSE
* Gjort get,post,put och delete med sql frågor


min tabel för MYSQL:

| Tabel                    |      fält                                                                             |
|--------------------------|---------------------------------------------------------------------------------------|
| WorkexperienceSchema     | _id:INT, companyname:VARCHAR(150) , jobtitle:VARCHAR(150) , location:VARCHAR(150)     |


Hur man använder mitt api:

1. GET /api/jobs  hämtar alla job som finns tillagda.
2. POST /api/jobs  Lägg till nytt job. måste skicka med rätt information i object.
3. PUT /api/jobs/:id  uppdatera ett job baserat på id. måste skicka med rätt information i object.
4. DELETE /api/jobs/:id Ta bort ett job baserat på id. måste skicka med rätt information i object.

exempel på hur object kan se ut och ska har följade fält och uppbyggnad.   

   {
  "companyname" : "namn på företag",   
"jobtitle": "namn på jobtitle",   
    "location": "namn på location"  
}
