#ifndef LIB_MCP3425
#define LIB_MCP3425

#include <stdio.h>
#include <stdlib.h>
#include <wiringPi.h>
#include <wiringPiI2C.h>

//MPC3425コンフィギュレーション
#define CONFIG 0x88

double calcVoltage(int fd);

#endif
