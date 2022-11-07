
//Bibliotecas a serem utilizadas
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <MFRC522.h>
#include <SPI.h>

//Definição das portas de entrada do programa
#define RFID_SS_SDA   21
#define RFID_RST      14

//Definição das portas de saída do programa
#define buzzer 35
#define LEDverde 4
#define LEDazul 5
#define I2C_SDA  15
#define I2C_SCL  16

LiquidCrystal_I2C  lcd_i2cBase(0x27, 16, 2);
MFRC522 rfidBase = MFRC522(RFID_SS_SDA, RFID_RST);

//Definição das funções a serem utilizadas, em relação ao RFID e aos dispositivos de saída como os LEDs e o buzzer
class LeitorRFID{
  private:
    char codigoRFIDLido[100] = "";
    char codigoRFIDEsperado[100] = "";
    MFRC522 *rfid = NULL;
    int cartaoDetectado = 0;
    int cartaoJaLido = 0;
    void processaCodigoLido(){
      char codigo[3*rfid->uid.size+1];
      codigo[0] = 0;
      char temp[10];  
      for(int i=0; i < rfid->uid.size; i++){
        sprintf(temp,"%X",rfid->uid.uidByte[i]);
        strcat(codigo,temp);
      }
      codigo[3*rfid->uid.size+1] = 0;    
      strcpy(codigoRFIDLido,codigo);
      Serial.println(codigoRFIDLido);
    }
  public:

    LeitorRFID(MFRC522 *leitor){
      rfid = leitor;
      rfid->PCD_Init(); 
      Serial.printf("MOSI: %i MISO: %i SCK: %i SS: %i\n",MOSI,MISO,SCK,SS);
    };

    char *tipoCartao(){
      MFRC522::PICC_Type piccType = rfid->PICC_GetType(rfid->uid.sak);
      Serial.println(rfid->PICC_GetTypeName(piccType));
      return((char *)rfid->PICC_GetTypeName(piccType));
    };

    int cartaoPresente(){
      return(cartaoDetectado);
    };

    int cartaoFoiLido(){
      return(cartaoJaLido);
    };

    void leCartao(){
      if (rfid->PICC_IsNewCardPresent()) { // new tag is available
        Serial.println("Cartao presente");
        cartaoDetectado = 1;
        if (rfid->PICC_ReadCardSerial()) { // NUID has been readed      
          Serial.println("Cartao lido");  
          cartaoJaLido = 1;
          processaCodigoLido();
          rfid->PICC_HaltA(); // halt PICC
          rfid->PCD_StopCrypto1(); // stop encryption on PCD
          digitalWrite(LEDverde, HIGH);
          tone(buzzer, 3000, 1000);
          delay(1000);
        }
      }else{
        cartaoDetectado = 0;
      }
    };

    char *cartaoLido(){
      return(codigoRFIDLido);
    };

    void resetarLeitura(){
      cartaoDetectado = 0;
      cartaoJaLido = 0;
      digitalWrite(LEDverde, LOW);
      lcd_i2cBase.clear();
    }

    void listI2CPorts(){
      Serial.println("\nI2C Scanner");
      byte error, address;
      int nDevices;
      Serial.println("Scanning...");
      nDevices = 0;
      for(address = 1; address < 127; address++ ) {
        Wire.beginTransmission(address);
        error = Wire.endTransmission();
        if (error == 0) {
          Serial.print("I2C device found at address 0x");
          if (address<16) {
            Serial.print("0");
          }
          Serial.println(address,HEX);
          nDevices++;
        }
        else if (error==4) {
          Serial.print("Unknow error at address 0x");
          if (address<16) {
            Serial.print("0");
          }
          Serial.println(address,HEX);
        }    
      }
      if (nDevices == 0) {
        Serial.println("No I2C devices found\n");
      }
      else {
        Serial.println("done\n");
      }
    };
};

LeitorRFID *leitor = NULL;


//Definição das funções a serem utilizadas, em relação ao LCD (dispositivo de saída)
class MostradorLCD {

  private:
    LiquidCrystal_I2C *lcd_i2c;
  public:

    MostradorLCD (LiquidCrystal_I2C *lcd){
      lcd_i2c = lcd;     
      lcd_i2c->init(); // inicializa o LCD
      lcd_i2c->backlight();

    };

    //essa função se refere ao que será exibido na primeira linha do display LCD
    void mostraL1(char *texto){
      Serial.printf("L1: %s\n",texto);
      lcd_i2c->setCursor(0, 0); 
      lcd_i2c->printf(texto);
    };

    //essa função se refere ao que será exibido na segunda linha do display LCD
    void mostraL2(char *texto){
      lcd_i2c->setCursor(0, 1); 
      lcd_i2c->printf(texto);
    };

};

MostradorLCD *lcd = NULL;

//////////////////////////////

//configuração inicial dos pinos, considerando se serão de entrada ou saída
//este pedaço de código roda apenas uma vez, no inicio da execução
void setup() {
  
  //frequencia da porta serial
  Serial.begin(115200);

  SPI.begin();

  pinMode(LEDverde, OUTPUT);
  pinMode(LEDazul, OUTPUT);
  pinMode(buzzer, OUTPUT);

  
  digitalWrite(LEDazul, HIGH);
  leitor = new LeitorRFID(&rfidBase);

  // o pedaço de código abaixo serviu para saber quais portas conectar do RFID com o ESP32 S3
  
  // Serial.print("MOSI: "); Serial.println(MOSI);
  // Serial.print("MISO: "); Serial.println(MISO);
  // Serial.print("SCK: "); Serial.println(SCK);
  // Serial.print("SS: "); Serial.println(SS);
  
  Wire.begin(I2C_SDA, I2C_SCL);

  lcd = new MostradorLCD(&lcd_i2cBase);

}

//essa função rodará repetidamente durante a execução do programa
void loop() {
  
  Serial.println("Lendo Cartao:");
  leitor->leCartao();
  lcd->mostraL1("nenhum ativo");
  lcd->mostraL2("detectado");

  //esse if possibilita que as saídas definidas aconteçam, que são ativadas quando a etiqueta é lida pelo RFID
  if(leitor->cartaoFoiLido()){
    Serial.println(leitor->tipoCartao());
    Serial.println(leitor->cartaoLido());
    lcd->mostraL1("DSK033 detectado");
    lcd->mostraL2("sala 2    ");
    
    delay(2000);
    
    leitor->resetarLeitura();
  }

}
