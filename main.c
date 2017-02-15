#include <stdio.h>
#include "./lib/lib_mcp3425.h"

//MCP3425 i2cアドレス
#define MPL3425_ID 0x68

int main(){
  int fd;
  double voltage;
  
  fd = wiringPiI2CSetup(MPL3425_ID);
  printf("setup return FileDescript: %d\n",fd);

  while(-1){
    voltage= calcVoltage(fd);
    printf("OUT: %f [V]\n",voltage);
  }
}
