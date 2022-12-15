#include <MFRC522.h> //biblioteca responsável pela comunicação com o módulo RFID-RC522
#include <SPI.h> 
#include "WiFi.h"
#include "HTTPClient.h"
#include <iostream>
#include <ArduinoJson.h>
#include <cstring>
#include <string>

// Change the SSID and PASSWORD here if needed
const char * WIFI_FTM_SSID = "Inteli-COLLEGE"; // SSID of AP that has FTM Enabled
const char * WIFI_FTM_PASS = "QazWsx@123"; // STA Password


#define SS_PIN    21
#define RST_PIN   14

#define SIZE_BUFFER     18
#define MAX_SIZE_BLOCK  16

#define pinVerde     4
#define pinVermelho  6

//esse objeto 'chave' é utilizado para autenticação
MFRC522::MIFARE_Key key;
//código de status de retorno da autenticação
MFRC522::StatusCode status;

// Definicoes pino modulo RC522
MFRC522 mfrc522(SS_PIN, RST_PIN); 




String trans(unsigned char *p)
{
    //byte to string
    String s(reinterpret_cast<const char *>(p), 16);
    Serial.print(s);  
    return s;
}

String modelo(String txt){
  int temp = 0;
  for(int i = 0; i < txt.length()-1; i++){
    if(txt[i] == '/'){
      temp = 1;
    }
    if(temp == 1){
      txt[i] = ' ';
    }
  }
  return txt;
}


String beacon(String txt){
  int temp = 0;
  for(int i = 0; i < txt.length()-1; i++){
    if(txt[i] == '/'){
      txt[i] = ' ';
      return txt;
    }
      txt[i] = ' ';
    }
    return ("deu ruim");
  }


int postRequest(unsigned char *p){
  HTTPClient http;
  const char* url = "https://ocff9f-5500.preview.csb.app/rfid";
  http.begin(url);
  http.addHeader("Content-Type", "application/json");

     StaticJsonDocument<200> doc;
      doc["modelo"] = modelo(trans(p));//modelo(trans(p))
      doc["beaconP"] = beacon(trans(p));//beacon(trans(p))
      doc["salaatt"] = "sala joaoa";

      String requestBody;
      serializeJson(doc, requestBody);

      // int httpResponseCode = http.POST("{\"sensor\":\"ACCEL-MMA845X\",\"value1\":\"24.25\",\"value2\":\"49.54\",\"value3\":\"1005.14\"}");

      int httpResponseCode = http.POST(requestBody);


    if(httpResponseCode>0){

      String response = http.getString();  //Get the response to the request

      Serial.println(httpResponseCode);   //Print return code
      Serial.println(response);           //Print request answer

    }else{
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }
      http.end();
      return 1;
  
}


int patchRequest(){
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "https://ocff9f-5500.preview.csb.app/wifi/buzer/pat/";
    http.begin(url);
    http.addHeader("Content-Type", "application/json");
     StaticJsonDocument<200> doc;
      doc["buzer"] = 0;
      String requestBody;
      serializeJson(doc, requestBody);
      int httpResponseCode = http.PATCH(requestBody);
    if(httpResponseCode>0){
      Serial.println("Sucesso Patch");
      String response = http.getString();  //Get the response to the request
    }else{
      Serial.println("Fracasso Patch");
    }
      http.end();
      return 1;
  }
}


void reinit(){
    // Inicia MFRC522
  mfrc522.PCD_Init(); 
  // Mensagens iniciais no serial monitor
  Serial.println("Aproxime o seu cartao do leitor...");
  Serial.println();
}



//faz a leitura dos dados do cartão/tag
void leituraDados()
{
  //imprime os detalhes tecnicos do cartão/tag
  mfrc522.PICC_DumpDetailsToSerial(&(mfrc522.uid)); 

  //Prepara a chave - todas as chaves estão configuradas para FFFFFFFFFFFFh (Padrão de fábrica).
  for (byte i = 0; i < 6; i++) key.keyByte[i] = 0xFF;

  //buffer para colocar os dados ligos
  byte buffer[SIZE_BUFFER] = {0};

  //bloco que faremos a operação
  byte bloco = 1;
  byte tamanho = SIZE_BUFFER;


  //faz a autenticação do bloco que vamos operar
  status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, bloco, &key, &(mfrc522.uid)); //line 834 of MFRC522.cpp file
  if (status != MFRC522::STATUS_OK) {
    Serial.print(F("Authentication failed: "));
    Serial.println(mfrc522.GetStatusCodeName(status));
    digitalWrite(pinVermelho, HIGH);
    delay(1000);
    digitalWrite(pinVermelho, LOW);
    return;
  }

  //faz a leitura dos dados do bloco
  status = mfrc522.MIFARE_Read(bloco, buffer, &tamanho);
  if (status != MFRC522::STATUS_OK) {
    Serial.print(F("Reading failed: "));
    Serial.println(mfrc522.GetStatusCodeName(status));
    digitalWrite(pinVermelho, HIGH);
    delay(1000);
    digitalWrite(pinVermelho, LOW);
    return;
  }
  else{
      digitalWrite(pinVerde, HIGH);
      delay(2000);
      digitalWrite(pinVerde, LOW);
  }

  Serial.print(F("\nDados bloco ["));
  Serial.print(bloco);Serial.print(F("]: "));

  //imprime os dados lidos
  for (uint8_t i = 0; i < MAX_SIZE_BLOCK; i++)
  {
      Serial.write(buffer[i]);

  }

  Serial.println(trans(buffer));
  delay(500);
  postRequest(buffer);
  Serial.println(" ");
  delay(1000);
  reinit();
}


void setup() {
  // Inicia a serial
  Serial.begin(115200);
  SPI.begin(); // Init SPI bus

  pinMode(pinVerde, OUTPUT);
  pinMode(pinVermelho, OUTPUT);

  Serial.println("Conectando ao Wifi");
  WiFi.begin(WIFI_FTM_SSID, WIFI_FTM_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi Conectado");
  delay(500);
  reinit();


}

void loop() 
{
  digitalWrite(pinVermelho,1);
   // Aguarda a aproximacao do cartao
  if ( ! mfrc522.PICC_IsNewCardPresent()) 
  {
    return;
  }
  // Seleciona um dos cartoes
  if ( ! mfrc522.PICC_ReadCardSerial()) 
  {
    return;
  }

    // Dump debug info about the card; PICC_HaltA() is automatically called
//  mfrc522.PICC_DumpToSerial(&(mfrc522.uid));

    leituraDados();
  // instrui o PICC quando no estado ACTIVE a ir para um estado de "parada"
  mfrc522.PICC_HaltA(); 
  // "stop" a encriptação do PCD, deve ser chamado após a comunicação com autenticação, caso contrário novas comunicações não poderão ser iniciadas
  mfrc522.PCD_StopCrypto1();  
}

