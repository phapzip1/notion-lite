package main

import (
	"fmt"
	"net/http"
	"os"

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
