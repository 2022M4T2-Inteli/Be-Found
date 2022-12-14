#include "WiFi.h"
#include "HTTPClient.h"
#include <iostream>
#include <ArduinoJson.h>
#include <cstring>
#include <string>
#include <WiFiMulti.h>

#define NAMEDEV "DSK002"
WiFiMulti wifiMulti;

const uint32_t connectTimeoutMs = 10000;
const int buz = 16;
const char * endp = "teste";
int aux = 0;
String loc = "";
String locA = "";
String locL = "";
const char* wifi_network_ssid     = "Inteli-COLLEGE";
const char* wifi_network_password = "QazWsx@123";
// const char* wifi_network_ssid     = "SHARE-RESIDENTE";
// const char* wifi_network_password = "Share@residente";


void first(){
  // Define o wifi no Station Mode, ou seja, ele ira se conectar a uma rede que já existe
  WiFi.mode(WIFI_STA);
  // Definição das redes que ele vai se conectar
  wifiMulti.addAP("Portaria");
  wifiMulti.addAP("Sala 73");
  wifiMulti.addAP("Sala 83");
}

int patchRequestLoc(String loc){
  WiFi.begin(wifi_network_ssid, wifi_network_password);
  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(200);
  }
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String urll = "https://ocff9f-5500.preview.csb.app/wifi/rec/";
    String url = urll + NAMEDEV;
    http.begin(url);
    http.addHeader("Content-Type", "application/json");
     StaticJsonDocument<200> doc;
      doc["loc"] = loc;
      String requestBody;
      serializeJson(doc, requestBody);
      int httpResponseCode = http.PATCH(requestBody);
    if(httpResponseCode>0){
      Serial.println("Sucesso Patch Localização atual");
      String response = http.getString();  //Get the response to the request
    }else{
      Serial.println("Fracasso Patch Localização atual");
    }
      http.end();
      return -1;
  }
}

int patchRequestLocA(String locA){
  WiFi.begin(wifi_network_ssid, wifi_network_password);
  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(200);
  }
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String urll = "https://ocff9f-5500.preview.csb.app/wifi/rec/";
    String url = urll + NAMEDEV;
    http.begin(url);
    http.addHeader("Content-Type", "application/json");
     StaticJsonDocument<200> doc;
      doc["locAnterior"] = locA;
      String requestBody;
      serializeJson(doc, requestBody);
      int httpResponseCode = http.PATCH(requestBody);
    if(httpResponseCode>0){
      Serial.println("Sucesso Patch Localização Anterior");
      String response = http.getString();  //Get the response to the request
    }else{
      Serial.println("Fracasso Patch Localização Anterior");
    }
      http.end();
      return -1;
  }
}

int patchRequest(){
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
  String urll = "https://ocff9f-5500.preview.csb.app/wifi/buzer/pat/";
  String url = urll + NAMEDEV;
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
     StaticJsonDocument<200> doc;
      doc["buzer"] = 0;
      String requestBody;
      serializeJson(doc, requestBody);
      int httpResponseCode = http.PATCH(requestBody);
    if(httpResponseCode>0){
      Serial.println("Sucesso Patch Buzer");
      String response = http.getString();  //Get the response to the request
    }else{
      Serial.println("Fracasso Patch Buzer");
    }
      http.end();
      return 1;
  }
}

int patchPerimetro(){
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
  String urll = "https://ocff9f-5500.preview.csb.app/wifi/perm/pat/";
  String url = urll + NAMEDEV;
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
     StaticJsonDocument<200> doc;
      doc["perm"] = 1;
      String requestBody;
      serializeJson(doc, requestBody);
      int httpResponseCode = http.PATCH(requestBody);
    if(httpResponseCode>0){
      Serial.println("Sucesso Patch Perimetro");
      String response = http.getString();  //Get the response to the request
    }else{
      Serial.println("Fracasso Patch Perimetro");
    }
      http.end();
      return 1;
  }
}


void getRequest(){
  // WiFi.begin(wifi_network_ssid, wifi_network_password);
  // while(WiFi.status() != WL_CONNECTED){
  //   Serial.print(".");
  //   delay(200);
  // }
  if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;  //Declare an object of class HTTPClient
      String GETCommandd = "https://ocff9f-5500.preview.csb.app/wifi/buzer/rec/";
      String GETCommand = GETCommandd + NAMEDEV;
      http.begin(GETCommand);  //Specify request destination
      int httpCode = http.GET(); //Send the request
      String payload = http.getString();//Get the request response payload
      if (httpCode > 0) { //Check the returning code
        Serial.println("Sucesso Get Buzer");
        if (payload[9] == '1'){
          Serial.println("True response from FrontEnd");
          tone(buz,261,1000);
          patchRequest();
        } else {
          Serial.println("No response from FrontEnd");
          http.end();}   //Close connection
      } else {   
        Serial.println("Fracasso Get Buzer");}
  }
}


void setup() {
  Serial.begin(115200);
  pinMode(buz,OUTPUT);
}

void loop() {
  first();
  
  //Printa a rede em que foi conectado e o distância entre o dispositivo e o wifi (em negativo)
  if (wifiMulti.run(connectTimeoutMs) == WL_CONNECTED) {
    Serial.print("Conectado na rede: ");
    Serial.print(WiFi.SSID());
  }
  else {
    Serial.println("WiFi não conectado!");
  }

  loc = WiFi.SSID();
  if(loc != locL && locL != ""){
    locA = locL;
    patchRequestLocA(locA);
  }
  locL = loc;
  if(loc == "Portaria"){
    patchPerimetro();
  }
  delay(500);
  WiFi.disconnect();
  delay(500);
  patchRequestLoc(loc);
  delay(500);
  getRequest();
  delay(2000);
  //Desconecta do wifi para conseguir verificar o mais proximo
  
}
