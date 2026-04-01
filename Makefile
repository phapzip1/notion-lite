APP_NAME=notion-lite
APP_EXECUTABLE="./out/$(APP_NAME)"

YJS_BINDING=./thirdparty/yjs-binding

OUT_DIR=./out

build:
	mkdir -p $(OUT_DIR)
	cargo build --lib --manifest-path="$(YJS_BINDING)/Cargo.toml" --target-dir=$(OUT_DIR)
	go build -o $(APP_EXECUTABLE)
	@echo "build passed"
	
clean:
	go clean
	rm -rf ./out/
	rm -f coverage*.out	

run: build
	chmod +x $(APP_EXECUTABLE)
	export LD_LIBRARY_PATH=$(OUT_DIR)/debug; $(APP_EXECUTABLE)
	# $(APP_EXECUTABLE)

.PHONY: build run clean
