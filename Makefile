main.out: main.o lib_mcp3425.o
	gcc -o main.out main.o lib_mcp3425.o  -lm -I/usr/local/include -L/usr/local/lib  -lwiringPi -g

# サフィックスルール (.c → .o)
#.c.o:
#	gcc -c $<
main.o:main.c
	gcc -c main.c
lib_mcp3425.o:main.c
	gcc -c ./lib/lib_mcp3425.c

lib_mcp3425.o: ./lib/lib_mcp3425.h
# mpl115a2.o: ./mpl115a2.h
