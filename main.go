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
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
	"unsafe"

	"github.com/coder/websocket"
	"github.com/go-chi/chi/v5"
)

func responseJson(w http.ResponseWriter, statusCode int, payload any) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	err := json.NewEncoder(w).Encode(payload)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func responseError(w http.ResponseWriter, statusCode int, err error) {
	payload := struct {
		Message string `json:"message"`
		Detail  string `json:"detail"`
	}{
		Message: "error",
		Detail:  err.Error(),
	}

	responseJson(w, statusCode, payload)
}

func helloWorld(w http.ResponseWriter, r *http.Request) {
	responseJson(w, http.StatusOK, struct {
		Message string `json:"message"`
	}{
		Message: "Hello world!",
	})
}

func writeTimeout(ctx context.Context, timeout time.Duration, c *websocket.Conn, msg []byte) error {
	ctx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()

	return c.Write(ctx, websocket.MessageText, msg)
}

func handleWs(w http.ResponseWriter, r *http.Request) {
	chi.URLParam(r, "docID")

	conn, err := websocket.Accept(w, r, &websocket.AcceptOptions{
		OriginPatterns: []string{"http://localhost:5173"},
	})
	if err != nil {
		fmt.Printf("%v\n", err.Error())
		return
	}

	defer conn.CloseNow()

	ctx := conn.CloseRead(context.Background())

	writeTimeout(ctx, time.Second*5, conn, []byte("haha"))

	for err := range ctx.Done() {
		fmt.Printf("%v\n", err)
	}
}

var doc unsafe.Pointer

func main() {
	port := "8080"
	if httpPort, ok := os.LookupEnv("HTTP_PORT"); ok {
		port = httpPort
	}

	router := chi.NewRouter()

	router.Get("/", helloWorld)
	router.Get("/ws/{docID}", handleWs)

	doc = C.yrs_doc_new()
	defer C.yrs_doc_free(doc)

	server := http.Server{
		Handler: router,
		Addr:    fmt.Sprintf("%v:%v", "", port),
	}

	runChan := make(chan error)

	go func() {
		runChan <- server.ListenAndServe()
	}()

	fmt.Printf("server started at %v:%v\n", "", port)

	err := <-runChan

	if err != nil {
		fmt.Printf("server stopped with error: %v", err.Error())
	} else {
		fmt.Printf("server stopped peacefully")
	}
}
