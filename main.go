package main

/*
#cgo LDFLAGS: -L${SRCDIR}/out/debug/ -lyjs_binding
#include <stdlib.h>
void* yrs_doc_new();
void yrs_doc_free(void* doc);
char* yrs_doc_get(void* doc);
void yrs_doc_insert(void* doc, const char* input);
*/
import "C"

import (
	"fmt"
	"net/http"
	"os"
	"unsafe"

	"github.com/go-chi/chi/v5"
)

func helloWorld(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Hello world!"))
}

func main() {
	port := "8080"
	if httpPort, ok := os.LookupEnv("HTTP_PORT"); ok {
		port = httpPort
	}

	router := chi.NewRouter()

	doc := C.yrs_doc_new()
	
	input := C.CString("Hello from go")
	C.yrs_doc_insert(doc, input)

	result := C.yrs_doc_get(doc)
	fmt.Println(C.GoString(result))
	fmt.Println(doc)

	C.free(unsafe.Pointer(result))
	C.yrs_doc_free(doc)

	router.Get("/", helloWorld)

	server := http.Server{
		Handler: router,
		Addr:    fmt.Sprintf("%v:%v", "", port),
	}

	runChan := make(chan error)

	go func() {
		runChan <- server.ListenAndServe()
	}()

	fmt.Printf("server started at %v:%v", "", port)

	err := <-runChan

	if err != nil {
		fmt.Printf("server stopped with error: %v", err.Error())
	} else {
		fmt.Printf("server stopped peacefully")
	}
}
