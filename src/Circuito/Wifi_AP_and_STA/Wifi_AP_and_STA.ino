#include <WiFi.h>

const char* wifi_network_ssid     = "SHARE-RESIDENTE";
const char* wifi_network_password = "Share@residente";

const char *soft_ap_ssid          = "Sala 03";
const char *soft_ap_password      = NULL;

void setup()
{
    Serial.begin(115200);
    WiFi.mode(WIFI_AP_STA);

    WiFi.begin(wifi_network_ssid, wifi_network_password);
    Serial.println("Conectando a rede wifi");

    while(WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(100);
    }

    Serial.print("Wifi IP local: ");
    Serial.println(WiFi.localIP());

    Serial.println("Criando Wifi AP");
    WiFi.softAP(soft_ap_ssid, soft_ap_password);
    Serial.print("AP IP: ");
    Serial.println(WiFi.softAPIP());
}

void loop() {}
