#include <WiFi.h>
#include <WiFiMulti.h>

WiFiMulti wifiMulti;

const uint32_t connectTimeoutMs = 10000;

void setup(){
  Serial.begin(115200);
}

void first(){
  // Define o wifi no Station Mode, ou seja, ele ira se conectar a uma rede que já existe
  WiFi.mode(WIFI_STA);

  // Definição das redes que ele vai se conectar
  wifiMulti.addAP("BRUNOO", "CLARINHA1234");
  wifiMulti.addAP("CLARINHA", "CLARINHA123");
  

  // WiFi.scanNetworks retorna o número de redes encontradas
  int n = WiFi.scanNetworks();
  Serial.println("Escaneamento concluido");
  if (n == 0) {
      Serial.println("Nenhuma rede encontrada");
  } 
  else {
    Serial.print(n);
    Serial.println(" Redes encontradas");
  }

  Serial.println("Conectando no Wifi...");
  if(wifiMulti.run() == WL_CONNECTED) {
    Serial.println("");
    Serial.println("Wi-Fi Conectado!");
  }
}

void loop(){
  first();
  //Printa a rede em que foi conectado e o distância entre o dispositivo e o wifi (em negativo) 
  if (wifiMulti.run(connectTimeoutMs) == WL_CONNECTED) {
    Serial.print("Conectado na rede: ");
    Serial.print(WiFi.SSID());
    Serial.print(" ");
    Serial.println(WiFi.RSSI());
  }
  else {
    Serial.println("WiFi não conectado!");
  }
  //Delay definido para ele verificar novamente a rede mais proxima
  delay(5000);
  //Desconecta do wifi para conseguir verificar o mais proximo
  WiFi.disconnect();
}