#include <stdio.h>
main() {
  int c;
  while ((c=getc(stdin)) == 0) ;
  while (c != EOF) {
    putc(c,stdout);
    c = getc(stdin);
  }
}
