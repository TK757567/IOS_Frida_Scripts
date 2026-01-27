const memcpy = Module.findExportByName("libsystem_c.dylib", "memcpy");

Interceptor.attach(memcpy, {
    onEnter: function (args) {
        this.dest = args[0];
        this.src = args[1];
        this.size = args[2].toInt32();

        if (this.size > 4) {
            try {
                const content = this.src.readUtf8String(this.size);
                if (content.includes("key")) { // change key to any other string to detect it
                    console.log("\n[!] Data Copy Detected: " + content);
                    console.log("[+] To Address: " + this.dest);
                }
            } catch (e) {

            }
        }
    }
});
