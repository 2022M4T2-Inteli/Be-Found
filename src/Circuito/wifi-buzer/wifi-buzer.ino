#include "WiFi.h"
#include "HTTPClient.h"
#include <iostream>
// #include <Arduino_JSON.h>
#include <ArduinoJson.h>
#include <cstring>
#include <string>
// #include <WiFiMulti.h>

// WiFiMulti wifiMulti;

// const uint32_t connectTimeoutMs = 10000;

const int buz = 16;

// Change the SSID and PASSWORD here if needed
// const char * WIFI_FTM_SSID = "Inteli-COLLEGE"; // SSID of AP that has FTM Enabled
// const char * WIFI_FTM_PASS = "QazWsx@123"; // STA Password

//const char * endp = "teste";


// void first(){
//   // Define o wifi no Station Mode, ou seja, ele ira se conectar a uma rede que já existe
//   WiFi.mode(WIFI_STA);

//   // Definição das redes que ele vai se conectar
//   wifiMulti.addAP("Sala 03");
//   wifiMulti.addAP("Sala 02");
  

//   // WiFi.scanNetworks retorna o número de redes encontradas
//   int n = WiFi.scanNetworks();
//   Serial.println("Escaneamento concluido");
//   if (n == 0) {
//       Serial.println("Nenhuma rede encontrada");
//   } 
//   else {
//     Serial.print(n);
//     Serial.println(" Redes encontradas");
//   }

//   Serial.println("Conectando no Wifi...");
//   if(wifiMulti.run() == WL_CONNECTED) {
//     Serial.println("");
//     Serial.println("Wi-Fi Conectado!");
//   }
// }


int patchRequest(){
  HTTPClient http;
  const char* url = "http://  :5500/wifi/buzer/638681419209e5ab623c1bcb" ;
  http.begin(url);
  http.addHeader("Content-Type", "application/json");

     StaticJsonDocument<200> doc;
      doc["buzer"] = 0;

      String requestBody;
      serializeJson(doc, requestBody);

      // int httpResponseCode = http.POST("{\"sensor\":\"ACCEL-MMA845X\",\"value1\":\"24.25\",\"value2\":\"49.54\",\"value3\":\"1005.14\"}");

      int httpResponseCode = http.PATCH(requestBody);


    if(httpResponseCode>0){

      String response = http.getString();  //Get the response to the request

      Serial.println(httpResponseCode);   //Print return code
      Serial.println(response);           //Print request answer

    }else{
      Serial.print("Error on sending PATCH: ");
      Serial.println(httpResponseCode);
    }
      http.end();
      return 1;
  
}


void getRequest(){
  //if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection statu
      HTTPClient http;  //Declare an object of class HTTPClient
      const char* GETCommand = "http://  :5500/wifi/buzer/638681419209e5ab623c1bcb";
      http.begin(GETCommand);  //Specify request destination

      int httpCode = http.GET(); //Send the request
      Serial.print("Get command: ");
      Serial.println(GETCommand);
      String payload = http.getString();   //Get the request response payload
      Serial.println("payload: " + payload); 
      if (httpCode > 0) { //Check the returning code
        Serial.println("oioioio");
        String payload = http.getString();   //Get the request response payload
        Serial.println("payload: " + payload); 
        Serial.println(payload[7]);                     //Print the response payload 
        if (payload[7] == '1'){
          tone(buz,261,1000);
          patchRequest();
      } else {

        Serial.println("No response");
      }
      Serial.println("http code: " + String(httpCode));
      http.end();   //Close connection
      
    }
//   else 
//   {    
//     Serial.println("--> connection failed");
//   }
// }

}


void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  pinMode(buz,OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  //first();
  //Printa a rede em que foi conectado e o distância entre o dispositivo e o wifi (em negativo) 
  // if (wifiMulti.run(connectTimeoutMs) == WL_CONNECTED) {
  //   Serial.print("Conectado na rede: ");
  //   Serial.print(WiFi.SSID());
  //   Serial.print(" ");
  //   Serial.println(WiFi.RSSI());
  // }
  // else {
  //   Serial.println("WiFi não conectado!");
  // }
  //Delay definido para ele verificar novamente a rede mais proxima
  getRequest();

  delay(3000);
  //Desconecta do wifi para conseguir verificar o mais proximo
  //WiFi.disconnect();
}
