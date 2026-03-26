APP_NAME=notion-lite
APP_EXECUTABLE="./out/$(APP_NAME)"

build:
	mkdir -p ./out
	go build -o $(APP_EXECUTABLE)
	@echo "build passed"
	
clean:
	go clean
	rm -rf ./out/
	rm -f coverage*.out	

run: build
	chmod +x $(APP_EXECUTABLE)
	$(APP_EXECUTABLE)

.PHONY: build run clean
