#include "lib_mcp3425.h"

double calcVoltage(int fd){
  
  int ret;
  unsigned char bufPresData[4];
  int raw;
  double voltage,volParBit;

  if((ret =wiringPiI2CWrite(fd,CONFIG))<0){
      printf("write error register CONFIG");
      exit(1);
    };
    delay(70);
    
    if(read(fd,bufPresData,2)!=2){
      printf("Error reading to i2c\n");
    }

    raw = bufPresData[0] << 8;
    raw = raw | bufPresData[1];
    if(raw>32767){
      raw -= 65535;
    }
    volParBit=2.048 / 32767;
    voltage=volParBit*raw;
    return voltage;
}


