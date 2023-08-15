#include <iostream>

void sayHello(std::string name){
  auto data = "Hello, " + name + "!";
  std::cout << data << std::endl;
}

int main(int argc, const char* argv[]){
  auto name = "world";
  if(argc > 1){
    name = argv[1];
  }
  sayHello(name);
}